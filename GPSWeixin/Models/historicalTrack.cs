using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Models
{
  public class HistoricalTrack
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
    public int rowCount
    {
      set;
      get;
    }
    public int pageIndex
    {
      set;
      get;
    }
    public IList<GPSData> data
    {
      set;
      get;
    }
  }
}