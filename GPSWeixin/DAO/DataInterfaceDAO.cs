using GPSWeixin.Models;
using GPSWeixin.Utils.Misc;
using Inctech.Foundation.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace GPSWeixin.DAO
{
    public class DataInterfaceDAO
    {
        public IDictionary<string, string> GetComanyNameDictionary(string openId)
        {
            #region Make parameters and Request the GPS-DataInterface
            IDictionary<string, string> commRequestObj = new Dictionary<string, string>();
            commRequestObj.Add("openid", openId);

            IDictionary<string, object> jsonObj = new Dictionary<string, object>();
            jsonObj.Add("code", "2");
            jsonObj.Add("content", null);
            jsonObj.Add("serialNum", GenerateTimestamp());
            jsonObj.Add("commRequest", commRequestObj);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string paramsString = serializer.Serialize(jsonObj);

            // Request the GPS-DataInterface via http protocol
            string responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
            #endregion

            #region Deserialize result json string and return IList<TeamGroup> data
            IDictionary<string, object> responseDict = serializer.Deserialize<IDictionary<string, object>>(responseStr);
            IDictionary<string, object> commResponseDict = (IDictionary<string, object>)(responseDict["commResponse"]);

            IList<CompanyEntity> companyList = new List<CompanyEntity>();
            IList<object> content = new List<object>();
            if (commResponseDict["result"].ToString().Equals("1"))
            {
                content = (IList<object>)responseDict["content"];
                foreach (var item in content)
                {
                    IDictionary<string, object> itemDict = (IDictionary<string, object>)item;
                    var companyEntity = new CompanyEntity()
                    {
                        cid = itemDict["cid"].ToString(),
                        cname = itemDict["cname"].ToString(),
                        tradeType = itemDict["tradeType"].ToString()
                    };
                    companyList.Add(companyEntity);
                }
            }
            IDictionary<string, string> dict = new Dictionary<string, string>();
            foreach (CompanyEntity entity in companyList)
            {
                dict.Add(entity.cid, entity.cname);
            }
            return dict;
            #endregion
        }

        public IList<TeamGroup> GetAllTeams(string openId)
        {
            #region Make parameters and Request the GPS-DataInterface
            IDictionary<string, string> commRequestObj = new Dictionary<string, string>();
            commRequestObj.Add("openid", openId);

            IDictionary<string, object> jsonObj = new Dictionary<string, object>();
            jsonObj.Add("code", "3");
            jsonObj.Add("content", null);
            jsonObj.Add("serialNum", GenerateTimestamp());
            jsonObj.Add("commRequest", commRequestObj);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string paramsString = serializer.Serialize(jsonObj);

            // Request the GPS-DataInterface via http protocol
            string responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
            #endregion

            #region Deserialize result json string and return IList<TeamGroup> data
            IDictionary<string, object> responseDict = serializer.Deserialize<IDictionary<string, object>>(responseStr);
            IDictionary<string, object> commResponseDict = (IDictionary<string, object>)(responseDict["commResponse"]);

            IList<TeamEntity> teamsList = new List<TeamEntity>();
            IList<object> content = new List<object>();
            if (commResponseDict["result"].ToString().Equals("1"))
            {
                content = (IList<object>)responseDict["content"];
                foreach (var item in content)
                {
                    IDictionary<string, object> itemDict = (IDictionary<string, object>)item;
                    var teamEntiy = new TeamEntity()
                    {
                        cid = itemDict["cid"].ToString(),
                        tid = itemDict["tid"].ToString(),
                        tname = itemDict["tname"].ToString()
                    };
                    teamsList.Add(teamEntiy);
                }
            }

            IList<TeamGroup> result = new List<TeamGroup>();
            foreach(TeamEntity entity in teamsList)
            {
                result.Add(new TeamGroup(entity));
            }
            return result;
            #endregion
        }

        public IList<CarEntity> GetAllCars(string openId)
        {
            #region Make parameters and Request the GPS-DataInterface
            IDictionary<string, string> commRequestObj = new Dictionary<string, string>();
            commRequestObj.Add("openid", openId);

            IDictionary<string, object> jsonObj = new Dictionary<string, object>();
            jsonObj.Add("code", "4");
            jsonObj.Add("content", null);
            jsonObj.Add("serialNum", GenerateTimestamp());
            jsonObj.Add("commRequest", commRequestObj);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string paramsString = serializer.Serialize(jsonObj);

            // Request the GPS-DataInterface via http protocol
            string responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
            #endregion

            #region Deserialize result json string and return IList<TeamGroup> data
            IDictionary<string, object> responseDict = serializer.Deserialize<IDictionary<string, object>>(responseStr);
            IDictionary<string, object> commResponseDict = (IDictionary<string, object>)(responseDict["commResponse"]);

            IList<CarEntity> carList = new List<CarEntity>();
            IList<object> content = new List<object>();
            if (commResponseDict["result"].ToString().Equals("1"))
            {
                content = (IList<object>)responseDict["content"];
                foreach (var item in content)
                {
                    IDictionary<string, object> itemDict = (IDictionary<string, object>)item;
                    var carEntity = new CarEntity()
                    {
                        tid = itemDict["tid"].ToString(),
                        vid = itemDict["vid"].ToString(),
                        vLicense = itemDict["vLicense"].ToString(),
                        cid = itemDict["cid"].ToString()
                    };
                    carList.Add(carEntity);
                }
            }
            return carList;
            #endregion
        }

        public IList<CarRealtimeData> GetAllCarRealtimeDatas(string openId, IList<string> vid, string interval)
        {
            #region Make parameters and Request the GPS-DataInterface
            IDictionary<string, string> commRequestObj = new Dictionary<string, string>();
            commRequestObj.Add("openid", openId);

            IDictionary<string, object> contentParam = new Dictionary<string, object>();
            contentParam.Add("vid", vid);
            contentParam.Add("interval", interval);
            IDictionary<string, object> jsonObj = new Dictionary<string, object>();
            jsonObj.Add("code", "5");
            jsonObj.Add("content", contentParam);
            jsonObj.Add("serialNum", GenerateTimestamp());
            jsonObj.Add("commRequest", commRequestObj);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string paramsString = serializer.Serialize(jsonObj);

            // Request the GPS-DataInterface via http protocol
            string responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
            #endregion

            #region Deserialize result json string and return IList<TeamGroup> data
            IDictionary<string, object> responseDict = serializer.Deserialize<IDictionary<string, object>>(responseStr);
            IDictionary<string, object> commResponseDict = (IDictionary<string, object>)(responseDict["commResponse"]);

            IList<CarRealtimeData> carList = new List<CarRealtimeData>();
            IList<object> content = new List<object>();
            if (commResponseDict["result"].ToString().Equals("1"))
            {
                content = (IList<object>)responseDict["content"];
                foreach (var item in content)
                {
                    IDictionary<string, object> itemDict = (IDictionary<string, object>)item;
                    var dataItem = new CarRealtimeData()
                    {
                        vid = itemDict["vid"].ToString(),
                        speed = itemDict["speed"].ToString(),
                        position = itemDict["position"].ToString(),
                        gpsTime = itemDict["gpsTime"].ToString(),
                    };
                    carList.Add(dataItem);
                }
            }
            return carList;
            #endregion
        }

        private long GenerateTimestamp()
        {
            // Generate Timestamp
            DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            DateTime nowTime = DateTime.Now;
            return (long)Math.Round((nowTime - startTime).TotalMilliseconds, MidpointRounding.AwayFromZero);
        }
    }
}