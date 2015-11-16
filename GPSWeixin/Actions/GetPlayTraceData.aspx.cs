using GPSWeixin.Models;
using GPSWeixin.Utils.Misc;
using Inctech.Foundation.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GPSWeixin.Actions
{
    /// <summary>
    /// 历史轨迹数据：没有分页，返回全部数据
    /// </summary>
    public partial class GetPlayTraceData : System.Web.UI.Page
    {
        private JavaScriptSerializer serializer = new JavaScriptSerializer();

        public JavaScriptSerializer SerializerProperty
        {
            get
            {
                return serializer;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            StreamReader reader = new StreamReader(Request.InputStream);
            string jsonStr = reader.ReadToEnd();
            // jsonObj 中已经含有字段"content"
            IDictionary<string, object> jsonObj = (IDictionary<string, object>)serializer.DeserializeObject(jsonStr);

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
            commRequestObj.Add("openid", userId);

            // jsonObj 中已经含有字段"content"
            jsonObj.Add("code", "10");
            jsonObj.Add("serialNum", unixTime);
            jsonObj.Add("commRequest", commRequestObj);
            string paramsString = SerializerProperty.Serialize(jsonObj);

            // 请求GPS数据接口
            string responseStr = new HttpUtil().ExecutePost(MiscConstants.DATA_INTERFACE_URL, paramsString);
            //json反序列化
            IDictionary<string, object> responseRoot = serializer.Deserialize<IDictionary<string, object>>(responseStr);
            IDictionary<string, object> commResponse = (IDictionary<string, object>)(responseRoot["commResponse"]);

            //IDictionary<string, HistoricalTrack> responseContent = null;
            BriefHistoricalTrack responseContent = null;
            IList<BriefGPSData> gpsList = new List<BriefGPSData>();
            string ak = "EMwoMb94rarHMWw4MP1lr8rb"; //百度地图密钥
            if (commResponse["result"].ToString().Equals("1") || commResponse["result"].ToString().Equals("4"))
            {  //成功
                object tmpJsonObj = responseRoot["content"];
                // 先反序列化，然后按照class 'HistoricalTrack'来反序列化
                responseContent = serializer.Deserialize<BriefHistoricalTrack>(serializer.Serialize(tmpJsonObj));
            }
            string resultString = string.Empty;
            if (commResponse["result"].ToString().Equals("1"))
            {
                gpsList = responseContent.data;

                //var logFileString = serializer.Serialize(responseContent);
                //using (var streamWriter = new StreamWriter(@"D:\gps\test.log", false, Encoding.UTF8))
                //{
                //    streamWriter.WriteLine("----------Before convert------------->");
                //    streamWriter.WriteLine(logFileString);
                //}

                int totalDataCount = gpsList.Count;
                int count = gpsList.Count / 100;        // 商
                int addition = gpsList.Count % 100;     // 余数

                // 总共请求百度坐标转换的RUL次数是count + 1次， for循环
                for (int index = 0; index < count + 1; index++)
                {
                    // 第index次请求百度坐标转换
                    StringBuilder coords = new StringBuilder(); //存待转换的gps坐标
                    int startIndex = index * 100;
                    int tmpIndex = (index + 1) * 100 - 1;
                    int endIndex = (totalDataCount > tmpIndex) ? tmpIndex : (totalDataCount - 1);
                    for (int i = startIndex; i <= endIndex; i++)
                    {
                        coords.Append(gpsList[i].lon).Append(",").Append(gpsList[i].lat).Append(";");
                    }

                    //string baiduGPSUrl = "http://api.map.baidu.com/geoconv/v1/?coords={coords}&from=1&to=5&ak={ak}";
                    string strVar = coords.ToString();
                    string coordsString = strVar.Substring(0, strVar.Length - 1);
                    string baiduGPSUrl = string.Format("http://api.map.baidu.com/geoconv/v1/?coords={0}&from=1&to=5&ak={1}", coordsString, ak);
                    // 第index次请求百度坐标转换
                    string responseBaiduStr = new HttpUtil().ExecuteGet(baiduGPSUrl);

                    IDictionary<string, object> baiduResponseDict = serializer.Deserialize<IDictionary<string, object>>(responseBaiduStr);
                    IList<ContractCoordinate> positionData = null;
                    if (baiduResponseDict["status"].Equals(0))
                        positionData = serializer.Deserialize<IList<ContractCoordinate>>(serializer.Serialize(baiduResponseDict["result"]));
                    // 将从数据接口得到的数据中的lon, lat替换成相应的客户需要的坐标系
                    if (positionData != null && positionData.Count > 0)
                    {
                        for (int i = 0, len = positionData.Count; i < len; i++)
                        {
                            gpsList[startIndex + i].lon = positionData[i].x;
                            gpsList[startIndex + i].lat = positionData[i].y;
                        }
                    }
                }
            }

            else if (commResponse["result"].ToString().Equals("4"))
            {
                responseContent.data = new List<BriefGPSData>();
            }
            resultString = serializer.Serialize(responseContent);

            Response.Clear();
            Response.Write(resultString);//sent result to client
            Response.End();
        }
    }
}