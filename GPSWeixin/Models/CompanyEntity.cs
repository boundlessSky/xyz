using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class CompanyEntity
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
        /// 公司名称
        /// </summary>
        public string cname
        {
            get;
            set;
        }

        /// <summary>
        /// 行业类别
        /// </summary>
        public string tradeType
        {
            get;
            set;
        }
    }
}