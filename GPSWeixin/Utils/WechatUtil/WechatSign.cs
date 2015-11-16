using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Configuration;
using GPSWeixin.Utils.Misc;

namespace GPSWeixin.Utils.WechatUtil
{
    public class WechatSign
    {
        private static string token = MiscConstants.ENTRY_TOKEN;

        public static bool CheckSignature(string signature, string timestamp, string nonce)
        {
            String[] arr = new String[] { token, timestamp, nonce };
            // 将token、timestamp、nonce三个参数进行字典序排序    
            Array.Sort<String>(arr);

            StringBuilder content = new StringBuilder();
            for (int i = 0; i < arr.Length; i++)
            {
                content.Append(arr[i]);
            }

            String tmpStr = SHA1Encrypt(content.ToString());


            // 将sha1加密后的字符串可与signature对比，标识该请求来源于微信    
            return tmpStr != null ? tmpStr.Equals(signature) : false;  
        }

        /// <summary>  
        /// 使用缺省密钥给字符串加密  
        /// </summary>  
        /// <param name="Source_String"></param>  
        /// <returns></returns>  
        public static string SHA1Encrypt(string Source_String)
        {
            byte[] StrRes = Encoding.Default.GetBytes(Source_String);
            HashAlgorithm iSHA = new SHA1CryptoServiceProvider();
            StrRes = iSHA.ComputeHash(StrRes);
            StringBuilder EnText = new StringBuilder();
            foreach (byte iByte in StrRes)
            {
                EnText.AppendFormat("{0:x2}", iByte);
            }
            return EnText.ToString();
        }  
    }
}