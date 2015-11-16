using GPSWeixin.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GPSWeixin.Actions
{
    public partial class GetAllGroups : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.HttpMethod.Equals("POST"))
            {
#if DEBUG
                // 已经绑定的openId, 小明的openId如下
                string userId = "oRggMwOdVpu4OeS8H3dJkEgdiEuo";
#else
                string userId = (Session["UserId"] == null) ? "" : Session["UserId"].ToString();
#endif
                DataProcessService service = new DataProcessService();
                string responseStr = string.Empty;
                if (userId != string.Empty)
                {
                    var result = service.GetAllTeamGroups(userId);
                    responseStr = new JavaScriptSerializer().Serialize(result);
                }
                Response.Clear();
                Response.Write(responseStr);//sent result to client
                Response.End();
            }
        }
    }
}