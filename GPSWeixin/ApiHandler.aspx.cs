using Inctech.Foundation.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using GPSWeixin.Utils.Misc;

namespace GPSWeixin
{
    public partial class ApiHandler : System.Web.UI.Page
    {
        private JavaScriptSerializer serializer = new JavaScriptSerializer();

        protected void Page_Load(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader(Request.InputStream);
            string jsonStr = reader.ReadToEnd();
            // jsonObj 中已经含有字段"code"和"content"
            IDictionary<string,object> jsonObj = (IDictionary<string,object>)serializer.DeserializeObject(jsonStr);
           
            // 时间戳
            DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            DateTime nowTime = DateTime.Now;
            long unixTime = (long)Math.Round((nowTime - startTime).TotalMilliseconds, MidpointRounding.AwayFromZero);

#if DEBUG
            // 已经绑定的openId, 某个openId如下
            string userId = "oRggMwOdVpu4OeS8H3dJkEgdiEuo";
#else
            string userId = (Session["UserId"] == null) ? "" : Session["UserId"].ToString();
#endif  // DEBUG 结束

            IDictionary<string, string> commRequestObj = new Dictionary<string, string>();
            string responseStr = string.Empty;
            if (userId != string.Empty)
            {
                commRequestObj.Add("openid", userId);

                // jsonObj 中已经含有字段"code"和"content"
                jsonObj.Add("serialNum", unixTime);
                jsonObj.Add("commRequest", commRequestObj);
                string paramsString = serializer.Serialize(jsonObj);

                // 请求GPS数据接口
                responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
            }
            Response.Clear();
            Response.Write(responseStr);//sent result to client
            Response.End();            
        }
    }
}