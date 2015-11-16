using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using GPSWeixin.Services;

namespace ConsoleApplication1
{
    class ProgramTest
    {
        public static void Main(string[] args)
        {
            //TestHttpRequest();
            //TestUrlEncode();
            //TestTimestamp();
            //TestOthers();
            TestDataProcessService();
            Console.ReadLine();
        }

        /// <summary>
        /// 测试HttpRequest
        /// </summary>
        private static void TestHttpRequest()
        {
            string getUrl = "http://www.kaixin001.com/home/?uid=66878410";
            //string getUrl = "http://www.jueceji.com/login/AjaxRegValid?type=email&validValue=ansenwork@163.com";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(getUrl);
            req.Method = "GET";

            HttpWebResponse res = null;
            Stream st = null;
            StreamReader sr = null;
            string html = string.Empty;
            try
            {
                res = (HttpWebResponse)req.GetResponse();
                st = res.GetResponseStream();
                sr = new StreamReader(st, System.Text.Encoding.UTF8);
                Console.WriteLine(sr.CurrentEncoding);
                html = sr.ReadToEnd();
            }
            catch (IOException ex)
            {
                html = ex.Message;
            }
            catch (Exception ex)
            {
                html = ex.Message;
            }
            finally
            {
                if (res != null)
                {
                    res.Close();
                }
                if (st != null)
                {
                    st.Close();
                }
                if (sr != null)
                {
                    sr.Close();
                }
            }
            Console.WriteLine(html);
        }

        private static void TestUrlEncode()
        {
            string redirectUri = "http://www.inctech.cn/" + "views/CarGroup.aspx";
            redirectUri = HttpUtility.UrlEncode(redirectUri);
            Console.WriteLine(redirectUri);
        }

        private static void TestTimestamp()
        {
            DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            DateTime nowTime = DateTime.Now;
            long unixTime = (long)Math.Round((nowTime - startTime).TotalMilliseconds, MidpointRounding.AwayFromZero);
            Console.WriteLine("Timestamp:" + unixTime);
        }

        private static void TestOthers()
        {
            //object x = null;
            //Console.WriteLine(x.ToString());

            bool mBool = new Boolean();
            Console.WriteLine(mBool);

        }

        private static void TestDataProcessService()
        {
            DataProcessService service = new DataProcessService();
            // 已经绑定的openId, 小明的openId如下
            string openId = "oRggMwOdVpu4OeS8H3dJkEgdiEuo";
            var result = service.GetAllTeamGroups(openId);
        }
    }
}
