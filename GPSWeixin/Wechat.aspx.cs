using GPSWeixin.Utils.WechatUtil;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using GPSWeixin.Utils.Misc;

namespace CheshengGPS
{
    public partial class Wechat : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // 微信加密签名
            // I-订阅号用"signature"
            string signature = Request["signature"];
            // II-企业号用"msg_signature"
            //string signature = Request["msg_signature"];
            // 时间戮
            string timestamp = Request["timestamp"];
            // 随机数
            string nonce = Request["nonce"];
            // 随机字符串
            string echoStr = Request["echostr"];
            string result = string.Empty;
            if (Request.HttpMethod.ToUpper() == "GET")
            {
                if (echoStr != null && echoStr.Length > 1)
                {
                     //I-订阅号URL验证
                     //通过检验 signature 对请求进行校验，若校验成功则原样返回 echostr，表示接入成功，否则接入失败
                     //以下三行
                    if (WechatSign.CheckSignature(signature, timestamp, nonce))
                    {
                        result = echoStr;
                    }
                }
            }
            else
            {
                using (Stream stream = HttpContext.Current.Request.InputStream)
                {
                    Byte[] postBytes = new Byte[stream.Length];
                    stream.Read(postBytes, 0, (Int32)stream.Length);
                    string postString = Encoding.UTF8.GetString(postBytes);
                    result = Handle(postString);
                }
            }
            Response.ContentEncoding = Encoding.UTF8;
            Response.Write(result);
            Response.End();
        }

        /// <summary>
        /// 处理信息并应答
        /// </summary>
        private string Handle(string postStr)
        {
            WechatHandler handler = new WechatHandler();
            return  handler.ReturnMessage(postStr);  
        }
    }
}