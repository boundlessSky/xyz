using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class CarEntity
    {
        /// <summary>
        /// 车辆编号
        /// </summary>
        public string vid
        {
            get;
            set;
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
        /// 车队编号
        /// </summary>
        public string tid
        {
            get;
            set;
        }

        /// <summary>
        /// 公司编号
        /// </summary>
        public string cid
        {
            get;
            set;
        }
    }
}