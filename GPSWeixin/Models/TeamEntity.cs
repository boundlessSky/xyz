using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class TeamEntity
    {
        /// <summary>
        /// 公司编号
        /// </summary>
        public string cid
        {
            get;
            set;
        }

        /// <summary>
        /// 车队编号
        /// </summary>
        public string tid
        {
            get;
            set;
        }

        /// <summary>
        /// 车队名称
        /// </summary>
        public string tname
        {
            get;
            set;
        }
    }
}