using GPSMenu.Util;
using Inctech.Founation.Misc;
using Inctech.Foundation.Web;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GPSMenu
{
    class Program
    {
        public static void Main(string[] args)
        {
            string settings = GenerateMenuSettings();
            //此应用的token
            string accessToken = GetAccessTokenSubscribe();

            //企业号App应用的ID：比如0，1等
            //string deleteUrl = GenerateDeleteMenuUrl(accessToken, MenuUtil.CORP_AGENT_ID);
            string createUrl = GenerateCreateMenuUrl(accessToken);
            
            //请求腾讯的服务器以创建自定义菜单
            //string deleteResult = new HttpUtil().ExecuteGet(deleteUrl);
            //Console.WriteLine("The Delete result is: {0}", deleteResult);

            string createResult = new HttpUtil().ExecutePost(createUrl, settings);
            Console.WriteLine("The Create result is: {0}", createResult);
            Console.ReadLine();
        }

        private static String GenerateMenuSettings()
        {
            IDictionary<string, object> menuObj = new Dictionary<string, object>();
            IList<object> btnArray = new List<object>();

            // 微信的三个自定义菜单设置
            // --菜单“车辆分组”
            IDictionary<string, string> item0 = new Dictionary<string, string>();
            item0.Add("type", "view");
            item0.Add("name", "车辆分组");
            item0.Add("url", MenuUtil.GenearteMennUrl(MenuUtil.HOST_URL + MenuUtil.CAR_GROUP_URL));

            // --菜单“报表统计”
            IDictionary<string, string> item1 = new Dictionary<string, string>();
            item1.Add("type", "view");
            item1.Add("name", "报表统计");
            item1.Add("url", MenuUtil.GenearteMennUrl(MenuUtil.HOST_URL + MenuUtil.REPORT_URL));

            // --菜单“设置帮助”
            IDictionary<string, string> item2 = new Dictionary<string, string>();
            item2.Add("type", "view");
            item2.Add("name", "设置帮助");
            item2.Add("url", MenuUtil.GenearteMennUrl(MenuUtil.HOST_URL + MenuUtil.SETTINGS_URL));

            btnArray.Add(item0);
            btnArray.Add(item1);
            btnArray.Add(item2);
            menuObj.Add("button", btnArray);

            SerializeUtil util = new SerializeUtil();
            return util.ToJson(menuObj);
        }

        /// <summary>
        /// 订阅号/服务号的GetAccessToken
        /// </summary>
        /// <returns></returns>
        private static string GetAccessTokenSubscribe()
        {
            string url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
                + MenuUtil.APP_ID + "&secret=" + MenuUtil.APP_SECRET;
            HttpUtil httpUtil = new HttpUtil();
            string result = httpUtil.ExecuteGet(url);
            SerializeUtil serializeUtil = new SerializeUtil();
            IDictionary<string, object> dict = serializeUtil.ToObject<IDictionary<string, object>>(result);
            string accessToken = (dict["access_token"]).ToString();
            //int expiresIn = Convert.ToInt32((dict["expires_in"]));
            Console.WriteLine("accessToken: {0}", accessToken);
            return accessToken;
        }

        /// <summary>
        /// 生成执行创建post请求创建服务号的自定义菜单的URL
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="agentId"></param>
        /// <returns></returns>
        private static string GenerateCreateMenuUrl(string accessToken)
        {
            string url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}";
            return string.Format(url, accessToken);
        }

        //private static string GenerateDeleteMenuUrl(string accessToken, string agentId)
        //{
        //    string url = "https://qyapi.weixin.qq.com/cgi-bin/menu/delete?access_token="
        //        + accessToken
        //        + "&agentid=" + agentId;
        //    return url;
        //}
    }
}
