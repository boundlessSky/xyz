<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="multCar.aspx.cs" Inherits="GPSWeixin.Views.multCar" %>

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
  <link rel="stylesheet" href="../Content/frame/assets/css/amazeui.min.css"/>
  <style type="text/css">  
		html{height:100%}  
		body{height:100%;margin:0px;padding:0px}
    #container {height:100%;width:100%}
    .am-header-default {
      /* background-color: #0e90d2; */
      background: url("../Content/img/header_bg.png");
      background-position: 20px 0px;
    }
  </style>
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=EMwoMb94rarHMWw4MP1lr8rb"></script>
  <script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/changeMore.js"></script>
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

  <script type="text/javascript">
    var hostUrl = '<%="http://"+Request.Url.Host+ (Request.Url.Port==80?"":":"+Request.Url.Port) %>';
    //客户的website采用了虚拟路径
    //var hostUrl = '<%=Session["hostUrl"] %>';
    //var screen_height = document.documentElement.clientHeight;
    //var height = screen_height - 49;
    //document.getElementById("container").style.height = height + "px";

  </script>
<script src="../Content/frame/assets/js/jquery.min.js"></script>
<script src="../Content/frame/assets/js/amazeui.min.js"></script>
<script src="../Content/js/mapUtil.js"></script>
<script src="../Content/js/basic.js"></script>
<script type="text/javascript" src="../Content/js/multCar.js"></script>
</body>
</html>