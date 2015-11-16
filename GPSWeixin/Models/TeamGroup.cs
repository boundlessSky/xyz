using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class TeamGroup: TeamEntity
    {
        public TeamGroup() { }

        public TeamGroup(TeamEntity entity)
        {
            this.cid = entity.cid;
            this.tid = entity.tid;
            this.tname = entity.tname;
        }

        /// <summary>
        /// 公司名称
        /// </summary>
        public string cname
        {
            get;
            set;
        }

        /// <summary>
        /// 该车队里的所有车辆的实时信息列表
        /// </summary>
        public IList<CarRealtimeInfo> carList
        {
            get;
            set;
        }
    }
}