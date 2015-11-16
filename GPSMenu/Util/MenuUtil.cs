using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace GPSMenu.Util
{
    public class MenuUtil
    {
        //public const string HOST_URL = "http://www.shsgcs.com/wx_test/";
        public const string HOST_URL = "http://zhangyihao.cn/wx_fwh";
        public const string CAR_GROUP_URL = "/views/CarGroup.aspx";
        public const string REPORT_URL = "/views/Report.aspx";
        public const string SETTINGS_URL = "/views/settings.aspx";

        /// <summary>
        /// 服务号常量
        /// </summary>
        public const string APP_ID = "wxeaedd234921a257f";
        public const string APP_SECRET = "9df081a8ad8e38eac7979682f59da62c";
        public const string WECHAT_URL_CREAT_MENU = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=";

        public static string GenearteMennUrl(string redirectUri)
        {
            #region 服务号，自定义菜单需要设置成redirect的情况
            redirectUri = HttpUtility.UrlEncode(redirectUri);
            string resultUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}"
                + "&redirect_uri={1}"
                + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            return string.Format(resultUrl, MenuUtil.APP_ID, redirectUri);
            #endregion
        }
    }
}
