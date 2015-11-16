<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Track.aspx.cs" Inherits="GPSWeixin.Views.Track" %>

<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>上海赛格车圣导航微信公众平台系统</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <link rel="alternate icon" type="image/png" href="../Content/frame/assets/i/favicon.png">
  <link rel="stylesheet" href="../Content/frame/assets/css/amazeui.min.css" />
  <link rel="stylesheet" href="../Content/frame/assets/css/amazeui.datetimepicker.css" />
  <style type="text/css">
    html {
      height: 100%;
    }
    body {
      height: 100%;
      margin: 0px;
      padding: 0px;      
    }
    #footer {
      height: 95px;
      width: 100%;
      padding: 1px 0 0 5px;
      background-color: #87CEFA;
    }
    .label {
      font-weight: 600;
    }
    .am-header-default {
      /* background-color: #0e90d2; */
      background: url("../Content/img/header_bg.png");
      background-position: 20px 0px;
    }
    .li-tag {
	    padding:10px 5px;
	    /*border-bottom:1px solid #8A8A8A;*/
      text-align:left;
      line-height:120%;
    }
      .li-tag:nth-child(2n) {
        background-color:white;
      }

    #content {
      height:95%;
      word-wrap: break-word;
      overflow-x: hidden;
      overflow-y: auto;
      font-size:1.4rem;
    }

    #pagination {
      height:5%;
      padding:1px;
      font-size:medium;
    }
  </style>
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=EMwoMb94rarHMWw4MP1lr8rb">
  </script>
</head>
<body>
<!--
  <header data-am-widget="header" class="am-header am-header-default">
        <div class="am-header-left am-header-nav">
            <a id="left-link" href="javascript:history.go(-1)">
              <img style="width:30px;height:30px;" src="../Content/img/back.png" />
            </a>
        </div>
        <h1 class="am-header-title">车圣导航</h1>
    </header>
-->
    <div id="container"></div>
    <div id="footer">    
      <div style="height:62px;width:85px;float:left;">
<%--
        <img id="previous" src="../Content/img/left.png" />
        <img id="next" src="../Content/img/right.png" /><br />
--%>
        <span id="carLicense" style="font-size:1.2rem"></span>
      </div>
      <div style="width:100%;height:62px;">
        <label class="label">开始时间:</label>
        <input id="beginTime" type="text" style="width: 152px" class="dateTimePicker" readonly="readonly" /><br />
        <label class="label">结束时间:</label>
        <input id="endTime" type="text" style="width: 152px" class="dateTimePicker" readonly="readonly" />
      </div>
      <div style="height:30px;">
        <button id="overlay" type="button" class="am-btn am-btn-primary am-btn-xs">轨迹查询</button>
        <button id="play" type="button" class="am-btn am-btn-primary am-btn-xs">轨迹回放</button>
        <button id="trackReport" type="button" class="am-btn am-btn-primary am-btn-xs">轨迹报表</button>
        <button id="clear" type="button" class="am-btn am-btn-primary am-btn-xs">轨迹清除</button><br />
      </div>
    </div>
  <div class="am-popup" id="modal">
    <div class="am-popup-inner">
      <div class="am-popup-hd">
        <h4 class="am-popup-title" id="title"></h4>
        <span data-am-modal-close class="am-close" style="color:#000;font-size:35px;">&times;</span>
      </div>
      <div class="am-popup-bd" id="popup-bd">
        <div id="content"></div>
        <footer id="pagination" data-am-widget="footer" class="am-footer am-footer-default" data-am-footer="{  }">
          第<span class="currentPage"></span>共<span class="pageCount"></span>页&nbsp;
          <a id="firstPage" href="javascript:void(0)">首页</a>
          <a id="previousPage" href="javascript:void(0)">上一页</a>
          <a id="nextPage" href="javascript:void(0)">下一页</a>
          <a id="endPage" href="javascript:void(0)">尾页</a>
        </footer>
      </div>
    </div>
  </div>

  <script type="text/javascript">
    var hostUrl = '<%="http://"+Request.Url.Host+ (Request.Url.Port==80?"":":"+Request.Url.Port) %>';
    //客户的website采用了虚拟路径
    //var hostUrl = '<%=Session["hostUrl"] %>';
    var screen_height = document.documentElement.clientHeight;
    var height = screen_height - 95;
    document.getElementById("container").style.height = height + "px";
    //document.getElementById("content").style.height = screen_height - 100 + "px";
    document.getElementById("popup-bd").style.height = screen_height - 44 + "px";
  </script>
  <script type="text/javascript" src="../Content/frame/assets/js/jquery.min.js"></script>
  <script type="text/javascript" src="../Content/frame/assets/js/amazeui.min.js"></script>
  <script type="text/javascript" src="../Content/js/dateUtil.js"></script>
  <script type="text/javascript" src="../Content/frame/assets/js/amazeui.datetimepicker.js"></script>
  <script src="../Content/js/mapUtil.js"></script>
  <script src="../Content/js/basic.js"></script>
  <script type="text/javascript" src="../Content/js/carTrack.js"></script>

</body>
</html>
