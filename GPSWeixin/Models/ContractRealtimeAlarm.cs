using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class ContractRealtimeAlarm
    {
        public int interval
        {
            get;
            set;
        }

        public IList<int> alarmType
        {
            get;
            set;
        }
    }
}