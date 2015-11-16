using GPSWeixin.Utils.Misc;
using GPSWeixin.Utils.WechatUtil;
using Inctech.Foundation.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GPSWeixin.Views
{
    public partial class Report : System.Web.UI.Page
    {
        private JavaScriptSerializer serializer = new JavaScriptSerializer();

        protected void Page_Load(object sender, EventArgs e)
        {
            Session["currentView"] = "report.aspx";
            // PC的网页测试的时候，把下面两行解除注释
#if DEBUG
            Session["UserId"] = "oRggMwOdVpu4OeS8H3dJkEgdiEuo";
            Session["isBinded"] = "1";
#endif
            ValidateUser();
        }

        /// <summary>
        /// 验证用户UserId（企业号中用UserId）请求GPS数据库中此用户是否被验证成功
        /// </summary>
        private void ValidateUser()
        {
            Session["HostUrl"] = MiscConstants.HOST_URL;
            // Session["UserId"]的维护
            // userId 貌似为28位字符串，但是并未得到官方正式，至少它是长度大于9的
            if (Session["UserId"] == null || Session["UserId"].ToString().Equals(string.Empty))
            {
                string state = Request["state"];
                string code = Request["code"];
                if (code != null && code.Length > 0)
                {
                    //通过code去腾讯的微信后台换取access_token和userId
                    //OpenId
                    Session["UserId"] = OAuthUtil.GetOpenId(code);
                }
            }

            #region Session["isBinded"]的维护
            // Session["isBinded"]的维护
            if (!(Session["isBinded"] != null && Session["isBinded"].ToString().Equals("1")))
            {
                IDictionary<string, object> jsonObj = new Dictionary<string, object>();
                //时间戳
                DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
                DateTime nowTime = DateTime.Now;
                long unixTime = (long)Math.Round((nowTime - startTime).TotalMilliseconds, MidpointRounding.AwayFromZero);

                string userIdVar = (Session["UserId"] == null) ? string.Empty : Session["UserId"].ToString();
                //string UserId = "oRggMwOdVpu4OeS8H3dJkEgdiEuo";
                IDictionary<string, string> commRequestObj = new Dictionary<string, string>();
                commRequestObj.Add("openid", userIdVar);

                jsonObj.Add("serialNum", unixTime);
                jsonObj.Add("commRequest", commRequestObj);
                jsonObj.Add("code", "2");
                jsonObj.Add("content", null);

                string paramsString = serializer.Serialize(jsonObj);
                if (userIdVar != string.Empty)
                {
                    string responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
                    IDictionary<string, object> resultJsonObj = serializer.Deserialize<IDictionary<string, object>>(responseStr);

                    IDictionary<string, object> resultDict = (IDictionary<string, object>)(resultJsonObj["commResponse"]);
                    string resultCodeVar = resultDict["result"].ToString();
                    // 如果此用户未被绑定，就redirect到login.aspx页面
                    if (resultCodeVar == "2" || resultCodeVar == "5")
                    {
                        string code = Request["code"];
                        if (code != null && code.Length > 0)
                        {
                            string state1 = Request["state"];
                            //var redirectUrl = MiscConstants.HOST_URL + "/views/login.aspx?state=" + state1 + "&code=" + code + "&userId=" + userIdVar + "&resultCode=" + resultCodeVar;
                            var redirectUrl = MiscConstants.HOST_URL + "/views/login.aspx";
                            Response.Redirect(redirectUrl);
                        }
                    }
                    // 否则，设置Session["isBinded"]为“1”
                    else
                        Session["isBinded"] = "1";
                }
            }
            #endregion
        }
    }
}