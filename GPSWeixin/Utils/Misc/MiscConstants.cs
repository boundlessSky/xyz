using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace GPSWeixin.Utils.Misc
{
    public class MiscConstants
    {
        #region 企业号常量
        //public const string DATA_INTERFACE_URL = "http://222.66.200.67:30088/WeiXin.aspx";
        //public const string CORP_CORP_ID = "wx9aafdd4997109a9d";
        //public const string CORP_ENCODING_AESKEY = "klqB1T56S2TVbKhNjsVixKKAYzjG4uNWAIQ4iO50jDt";
        //public const string CORP_TOKEN = "gpsweixin";
        //public const string CORP_SECRET = "F5VZi6pCsgJtWenp3zFIdpSbicUWSpIcJ9dGA_X0voC1BoQUf39aFimUGx3NZzfH";
        //public const string CORP_AGENT_ID = "0";

        // GPS数据接口URL
        public static string DATA_INTERFACE_URL = ConfigurationManager.AppSettings["DATA_INTERFACE_URL"].ToString();
        //public const string HOST_URL = "http://zhangyihao.cn/wx_fwh";
        public static string HOST_URL = ConfigurationManager.AppSettings["HOST_URL"].ToString();
        public static string APP_ID = ConfigurationManager.AppSettings["APP_ID"].ToString();
        public static string APP_SECRET = ConfigurationManager.AppSettings["APP_SECRET"].ToString();
        public static string ENTRY_TOKEN = ConfigurationManager.AppSettings["ENTRY_TOKEN"].ToString();
        #endregion

        /// <summary>
        /// GPS数据接口URL
        /// </summary>
        /// <returns></returns>
        //public string GetDataInterfaceURL()
        //{
        //    return ConfigurationManager.AppSettings["DATA_INTERFACE_URL"].ToString();
        //}
    }
}