using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
    public class BriefHistoricalTrack
    {
        public String vid
        {
            set;
            get;
        }

        public int totalCount
        {
            set;
            get;
        }

        public IList<BriefGPSData> data
        {
            set;
            get;
        }
    }
}