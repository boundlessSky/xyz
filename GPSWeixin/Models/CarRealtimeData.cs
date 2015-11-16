using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class CarRealtimeData
    {
        public string vid
        {
            get;
            set;
        }

        /// <summary>
        /// 速度
        /// </summary>
        public string speed
        {
            get;
            set;
        }

        /// <summary>
        /// 位置
        /// </summary>
        public string position
        {
            get;
            set;
        }

        /// <summary>
        /// 最后上报时间
        /// </summary>
        public string gpsTime
        {
            get;
            set;
        }


    }
}