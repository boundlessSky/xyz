using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace Inctech.Foundation.Web
{
    public class HttpUtil
    {
        /// <summary>
        /// 执行GET请求
        /// </summary>
        /// <param name="url">请求的url</param>
        /// <returns>返还Response得到d字符串如果请求失败，则返回空字符串</returns>
        public string ExecuteGet(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            HttpWebResponse response = null;
            Stream stream = null;
            StreamReader streamReader = null;
            string result = string.Empty;

            try
            {
                response = (HttpWebResponse)request.GetResponse();
                stream = response.GetResponseStream();
                streamReader = new StreamReader(stream, System.Text.Encoding.UTF8);
                Console.WriteLine(streamReader.CurrentEncoding);
                result = streamReader.ReadToEnd();
            }
            catch (Exception ex)
            {
            }
            finally
            {
                if (response != null)
                {
                    response.Close();
                }
                if (stream != null)
                {
                    stream.Close();
                }
                if (streamReader != null)
                {
                    streamReader.Close();
                }
            }

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="url">请求的url</param>
        /// <param name="data">POST的json数据</param>
        /// <returns></returns>
        public string ExecutePost(string url, string data)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            byte[] postData = Encoding.UTF8.GetBytes(data);
            request.ContentLength = postData.Length;
            Stream stream = null, postSt = null;
            StreamReader streamReader = null;
            HttpWebResponse response = null;
            string result = string.Empty;
            try
            {
                postSt = request.GetRequestStream();//获取请求流
                postSt.Write(postData, 0, postData.Length);
                postSt.Close();
                response = (HttpWebResponse)request.GetResponse();
                stream = response.GetResponseStream();
                //streamReader = new StreamReader(stream, System.Text.Encoding.UTF8);
                streamReader = new StreamReader(stream, Encoding.GetEncoding("GB2312"));
                
                result = streamReader.ReadToEnd();
            }
            catch (Exception ex)
            {
            }
            finally
            {
                if (postSt != null)
                {
                    postSt.Close();
                }
                if (stream != null)
                {
                    stream.Close();
                }
                if (streamReader != null)
                {
                    streamReader.Close();
                }
                if (response != null)
                {
                    response.Close();
                }
            }
            return result;
        }
    }
}
