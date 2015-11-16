using GPSWeixin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GPSWeixin.Utils.Misc
{
    public class UserComparerEmptyTeam : IEqualityComparer<CarEntity> 
    {
        public bool Equals(CarEntity entity1, CarEntity entity2)    
        {    
            return entity1.cid == entity2.cid;    
        }    

        public int GetHashCode(CarEntity entity)    
        {    
            return entity.ToString().GetHashCode();    
        }    
    }
}