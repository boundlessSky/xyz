using GPSWeixin.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GPSWeixin.Actions
{
    public partial class SetRealtimeAlarm : System.Web.UI.Page
    {
        public JavaScriptSerializer SerializerProperty
        {
            get
            {
                return serializer;
            }
        }
        private JavaScriptSerializer serializer = new JavaScriptSerializer();

        protected void Page_Load(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader(Request.InputStream);
            string jsonStr = reader.ReadToEnd();
            ContractRealtimeAlarm alarm = SerializerProperty.Deserialize<ContractRealtimeAlarm>(jsonStr);
            if (alarm.alarmType!=null) {
              Session.Remove("alarmType");
              Session["alarmType"] = alarm.alarmType;
            }
            if (alarm.interval!=0) {
              Session.Remove("interval");
              Session["interval"] = alarm.interval;
            }
        }
    }
}