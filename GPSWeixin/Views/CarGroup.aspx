<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CarGroup.aspx.cs" Inherits="GPSWeixin.Views.CarGroup" %>

<!DOCTYPE html>
<html>
<head lang="en" runat="server">
    <meta charset="UTF-8">
    <title>上海赛格车圣导航微信公众平台系统</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <!--meta http-equiv="Cache-Control" content="no-siteapp" /-->
    <link rel="alternate icon" type="image/png" href="../Content/frame/assets/i/favicon.png">
    <link rel="stylesheet" href="../Content/frame/assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="../Content/css/style.css" />
    <style type="text/css">
      body {
          background-color:#efeff4;
      }
      .content {
          border-bottom: 1px solid #8A8A8A;
          margin-bottom: 5px;
          padding-bottom: 5px;
      }
      .am-accordion-title {
        background-color: #FFFFFF;
      }
      .alarmInfo {
          border-bottom: 1px solid #DCDCDC;
          padding-left: 2%;
      }

      .am-modal-bd {
          line-height: 150%;
          text-align: left;
      }
      #search {
        color: #8A8A8A;
        cursor: pointer;
        display:block;
        margin-right:10px;
        margin-top:4px;
        float: left;
      }
      img {
        cursor: pointer;
        display:block;
      }
      input[type="checkbox"] {
        margin-right: 0.5em;
        height: 18px;
        width: 18px;
      }
      #icon_alarm {
        display:block;
        margin-top:-2px;
        margin-right:10px;
        width:41px;
        height:35px;
        float:left;
      }
      .fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height:80px;
        z-index: 1010;
        background-color:#efeff4;
      }
      #content {
        position:absolute;
        top:80px;
      }
      .img {
        width:30px;
        height:14px;
      }
      .chb {
         -webkit-appearance: radio;
      }
      .title {
        font-size: 1.4rem;
      }
    </style>
</head>
<body>
<div class="fixed">

<%--    
<header data-am-widget="header" class="am-header am-header-default ">
    <div class="am-header-left am-header-nav">
        <a id="left-link" href="javascript:void(0)" onclick="switchView()" class="">
          <img id="switchViewImg" style="width:25px;height:25px;margin-top:12px;" src="../Content/img/fullScreen.png" />
        </a>
    </div>
    <h1 class="am-header-title">车圣导航</h1>
    <div class="am-header-right am-header-nav">
        <a id="right-link" href="javascript:void(0)" onclick="multMonitor()">
          <img style="width:30px;height:30px;margin-top:8px;" src="../Content/img/target.png" />
        </a>
    </div>
</header>
--%>

    <div id="menuBar" class="menuBar">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td width="1">
	        <a href="./CarGroup.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm" disabled="true">车辆分组</a>
        </td><td width="1">
	        <a href="./Report.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm">报表统计</a>
        </td><td width="1">		
	        <a href="./Settings.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm">设置帮助</a>
        </td></tr></table>
    </div>
    <div style="margin-top:10px;">
        <div style="padding-right:150px;">
        <input id="searchCar" type="text" class="am-form-field am-round am-input-sm" placeholder="车牌号搜索"
            style="width: 100%; float: left; margin: 0 10px 0 10px" />
        </div>
        <i class="am-icon-search am-icon-sm" id="search" ></i>
        <img id="icon_alarm" src="../Content/img/alert_off.png" />
        <a id="right-link" href="javascript:void(0)" onclick="multMonitor()">
          <img style="width:30px;height:30px;margin-top:8px;background-color:#efeff4" src="../Content/img/target.png" />
        </a>
    </div>
</div> 
  <!--车辆信息列表-->
  <div id="content"></div>

    <div class="am-modal am-modal-no-btn" tabindex="-1" id="modal">
        <div class="am-modal-dialog">
            <div class="am-modal-hd">
                <div id="title"></div>
                <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
            </div>
            <div class="am-modal-bd" id="body">
            </div>
        </div>
    </div>
    <%--TO DELETE
    <label>UserId:</label>
    <label><%=Session["UserId"] %> </label>
  --%>

  <script type="text/javascript">
      var hostUrl = '<%="http://"+Request.Url.Host+ (Request.Url.Port==80?"":":"+Request.Url.Port) %>';
      //客户的website采用了虚拟路径
      //var hostUrl = '<%=Session["HostUrl"]%>';
    </script>
    <script src="../Content/frame/assets/js/jquery.min.js"></script>
    <script src="../Scripts/jquery.cookie.js"></script>
    <script src="../Content/frame/assets/js/amazeui.min.js"></script>
    <script src="../Content/frame/assets/js/handlebars.min.js"></script>
    <script src="../Content/frame/assets/js/amazeui.widgets.helper.js"></script>
    <script src="../Content/js/mapUtil.js"></script>
    <script src="../Content/js/basic.js"></script>
    <script type="text/javascript" src="../Content/js/carGroup.js"></script>
  <script>
    //测试代码，看看能否不刷新页面
/*
    function pushHistory() {
      var state = {
          title: "title",
        url: "CarGroup.aspx"
      };
      window.history.pushState(state, "title", "CarGroup.aspx");
    }

    window.addEventListener("popstate", function (e) {
      //如果当前是从审核页面过来的 页面将会关闭
      try{
        //WeixinJSBridge.call('closeWindow'); 
      }catch (e) {
        //window.location.href="#";
      }
      pushHistory();
    }, true);

    pushHistory();
    */
  </script>
</body>
</html>
