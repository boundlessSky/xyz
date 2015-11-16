<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AlarmHistory.aspx.cs" Inherits="GPSWeixin.Views.AlarmHistory" %>

<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title>上海赛格车圣导航微信公众平台系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="alternate icon" type="image/png"	href="../Content/frame/assets/i/favicon.png">
<link rel="stylesheet" href="../Content/frame/assets/css/amazeui.css" />
<style type="text/css">
  body {
    font-size:1.4rem;
  }
.li-tag {
	padding-left:2%;
	border-bottom:1px solid #DCDCDC;
}
.am-header-default {
  /* background-color: #0e90d2; */
  background: url("../Content/img/header_bg.png");
  background-position: 20px 0px;
}
</style>
</head>
<body>

<%--	
  <header data-am-widget="header" class="am-header am-header-default">
    <div class="am-header-left am-header-nav">
      <a id="left-link" href="javascript:history.go(-1)">
        <img style="width:30px;height:30px;" src="../Content/img/back.png" />
      </a>
    </div>
		<h1 class="am-header-title">历史报警统计</h1>
	</header>
--%>
	<div id="json-list"></div>

	<!-- 分页组件 -->
<footer id="pagination" data-am-widget="footer" class="am-footer am-footer-default" data-am-footer="{  }">
  第<span class="current-page"></span>共<span class="page-count"></span>页&nbsp;
  <a id="firstPage" href="javascript:void(0)">首页</a>
  <a id="previous" href="javascript:void(0)">上一页</a>
  <a id="next" href="javascript:void(0)">下一页</a>
  <a id="endPage" href="javascript:void(0)">尾页</a>
</footer>
	
  <script>
    var hostUrl = '<%="http://"+Request.Url.Host+ (Request.Url.Port==80?"":":"+Request.Url.Port) %>';
    // 客户的website采用了虚拟路径
    //var hostUrl = '<%=Session["hostUrl"] %>';
  </script>
	<script src="../Content/frame/assets/js/jquery.min.js"></script>
	<script src="../Content/frame/assets/js/amazeui.min.js"></script>
  <script src="../Content/js/mapUtil.js"></script>
  <script src="../Content/js/basic.js"></script>
	<script type="text/javascript" src="../Content/js/alarmHistory.js"></script>
</body>
</html>