using GPSWeixin.DAO;
using GPSWeixin.Models;
using GPSWeixin.Utils.Misc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Services
{
    public class DataProcessService
    {
        private DataInterfaceDAO dao = new DataInterfaceDAO();

        public DataInterfaceDAO DAOProperty
        {
            get
            {
                return dao;
            }
        }

        public IList<TeamGroup> GetAllTeamGroups(string openId)
        {
            IDictionary<string, string> companyNameDict = DAOProperty.GetComanyNameDictionary(openId);

            IList<TeamGroup> groupList = DAOProperty.GetAllTeams(openId);
            IList<CarEntity> carList = DAOProperty.GetAllCars(openId);

            // tid=0的情况的处理
            IList<string> emptyTeamList = GetEmptyTeamList(carList);
            foreach (string cid in emptyTeamList)
            {
                TeamGroup teamGroup = new TeamGroup()
                {
                    cid = cid,
                    cname = companyNameDict[cid],
                    tid = "0",
                    tname = "无车队",
                    carList = new List<CarRealtimeInfo>()
                };
                groupList.Add(teamGroup);
            }

            IList<string> vidList = new List<string>();
            foreach (CarEntity car in carList)
            {
                vidList.Add(car.vid);
            }
            IList<CarRealtimeData> carDataList = DAOProperty.GetAllCarRealtimeDatas(openId, vidList, "30");

            // Generate a dictionary of CarRealtimeData
            IDictionary<string, CarRealtimeData> carDataDict = new Dictionary<string, CarRealtimeData>();
            foreach (CarRealtimeData item in carDataList)
            {
                carDataDict.Add(item.vid, item);
            }
            // 对车辆分组groupList按照公司ID来排序, cid
            IList<TeamGroup> newGroupList = groupList.OrderBy((item) => item.cid).ToList();

            foreach (TeamGroup team in newGroupList)
            {
                team.cname = companyNameDict[team.cid];
                team.carList = (from CAR in carList
                                where (CAR.tid.Equals(team.tid) && CAR.cid.Equals(team.cid) )
                                select new CarRealtimeInfo()
                                {
                                    vid = CAR.vid ?? string.Empty,
                                    vLicense = CAR.vLicense ?? string.Empty,
                                    position = (!string.IsNullOrEmpty(CAR.vid) && carDataDict.ContainsKey(CAR.vid)) ? carDataDict[CAR.vid].position : string.Empty,
                                    speed = (!string.IsNullOrEmpty(CAR.vid) && carDataDict.ContainsKey(CAR.vid)) ? carDataDict[CAR.vid].speed : string.Empty,
                                    gpsTime = (!string.IsNullOrEmpty(CAR.vid) && carDataDict.ContainsKey(CAR.vid)) ? carDataDict[CAR.vid].gpsTime : string.Empty
                                }).ToList<CarRealtimeInfo>();
            }

            return newGroupList;
        }

        private IList<string> GetEmptyTeamList(IList<CarEntity> carList)
        {
            IEnumerable<CarEntity> carListTmp = from car in carList
                             orderby car.cid
                             where car.tid.Equals("0")
                             select car;

            IList<string> emptyTeamList = carListTmp.Distinct(new UserComparerEmptyTeam()).Select((item) => item.cid).ToList();
            return emptyTeamList;
        }
    }
}