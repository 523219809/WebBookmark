﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebBookmarkBo.Model;

namespace WebBookmarkUI.Models
{
    public class UIUserInfo
    {

        public long UserInfoID { get; set; }

        public string UserEmail { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }


        public string Phone { get; set; }

        public string QQ { get; set; }


        public string LoginName { get; set; }


        public string UserInfoComment { get; set; }


        public string UserImagURL { get;  set; }


        public DateTime CreateTime { get; set; }
       
    }
   
}