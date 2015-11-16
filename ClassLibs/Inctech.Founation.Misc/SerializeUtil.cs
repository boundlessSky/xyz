using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;

namespace Inctech.Founation.Misc
{
    public class SerializeUtil
    {
        /// <summary>
        /// 对象序列化为Json
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public string ToJson(Object obj)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            //JSON序列化
            return serializer.Serialize(obj);
        }
        /// <summary>
        /// Json反序列化为对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public T ToObject<T>(string json)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            //JSON反序列化
            return serializer.Deserialize<T>(json);
        }
    }
}
