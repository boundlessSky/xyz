using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GPSWeixin.Actions
{
  public partial class GetRealtimeAlarm : System.Web.UI.Page
  {

    protected void Page_Load(object sender, EventArgs e)
    {
      Dictionary<string, object> map = new Dictionary<string, object>();

      int interval;
      IList<int> alarmType = new List<int>();
      if ((Session["interval"] == null) || (Session["interval"].Equals("")))
      {
        interval = 60;
      }
      else
      {
        interval = int.Parse(Session["interval"].ToString());
      }

      if ((Session["alarmType"] == null) || (Session["alarmType"].Equals("")))
      {
        alarmType.Add(8);
        alarmType.Add(15);
        alarmType.Add(22);
      }
      else {
        alarmType = (List<int>) Session["alarmType"];
      }

      map.Add("interval", interval);
      map.Add("alarmType", alarmType);
      string responseStr = new JavaScriptSerializer().Serialize(map);
      Response.Clear();
      Response.Write(responseStr);//sent result to client
      Response.End();
    }
  }
}