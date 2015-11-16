using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class CarRealtimeInfo
    {
        /// <summary>
        /// 车辆编号
        /// </summary>
        public string vid
        { 
            get; set; 
        }

        /// <summary>
        /// 车牌号码
        /// </summary>
        public string vLicense
        {
            get;
            set;
        }

        /// <summary>
        /// 定位位置(文字)
        /// </summary>
        public string position
        {
            get;
            set;
        }

        /// <summary>
        /// 定位速度
        /// </summary>
        public string speed
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