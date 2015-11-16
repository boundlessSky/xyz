using GPSWeixin.Utils.Misc;
using Inctech.Founation.Misc;
using Inctech.Foundation.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Utils.WechatUtil
{
    /// <summary>
    /// OAuth2.0在网页获取用户信息
    /// </summary>
    public class OAuthUtil
    {
        /// <summary>
        /// 订阅号 通过code去腾讯的微信后台换取access_token和openid
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public static string GetOpenId(string code)
        {
            string url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="
                + MiscConstants.APP_ID
                + "&secret="
                + MiscConstants.APP_SECRET
                + "&code="
                + code
                + "&grant_type=authorization_code";
            HttpUtil httpUtil = new HttpUtil();
            string jsonString = httpUtil.ExecuteGet(url);
            SerializeUtil serializeUtil = new SerializeUtil();
            IDictionary<string, string> dict = serializeUtil.ToObject<IDictionary<string, string>>(jsonString);
            //string accessToken = dict["access_token"];
            string openId = dict["openid"];
            return openId;
        }
    }
}