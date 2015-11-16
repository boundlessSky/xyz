using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    /// <summary>
    /// 客户所用的坐标系结果
    /// </summary>
    public class ContractCoordinate
    {
        /// <summary>
        /// 精度
        /// </summary>
        public string x
        {
            get;
            set;
        }

        /// <summary>
        /// 纬度
        /// </summary>
        public string y
        {
            get;
            set;
        }
    }
}