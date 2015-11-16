<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="GPSWeixin.Views.Report" %>

<!DOCTYPE html>
<html>
<head lang="en" runat="server">
<meta charset="UTF-8">
<title>上海赛格车圣导航微信公众平台系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="alternate icon" type="image/png" href="../Content/frame/assets/i/favicon.png">
<link rel="stylesheet" href="../Content/frame/assets/css/amazeui.min.css" />
<link rel="stylesheet" href="../Content/frame/assets/css/amazeui.datetimepicker.css"/>
<link rel="stylesheet" href="../Content/css/style.css" />
<style>
  .lebel {
    width:100px;max-width:100px;
  }
  /*.content {
    width:70%;
  }*/

  .test_box {
    width: 100%;
    height: 8em;
    margin-left: 0;
    margin-right: auto;
    padding: 1%;
    outline: 0;
    border: 1px solid #a0b3d6;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .test_box  input {
    margin-right:1em;
  }

  .test_box input[type="checkbox"] {
      height: 18px;
      width: 18px;
  }
  .am-table {
    font-size:1.4rem;
  }
</style>
</head>
<body>
<!--
	<header data-am-widget="header" class="am-header am-header-default">
		<h1 class="am-header-title">报表统计</h1>
	</header>
-->
  <div id="menuBar" class="menuBar">
    <table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td width="1">
	      <a href="./CarGroup.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm">车辆分组</a>
      </td><td width="1">
	      <a href="./Report.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm" disabled="true">报表统计</a>
      </td><td width="1">		
	      <a href="./Settings.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm">设置帮助</a>
      </td></tr></table>
  </div>

	<table class="am-table">
		<tbody>
			<tr>
				<td class="label">公司/车队:</td>
				<td class="content">
					<div class=""> <!-- am-form-group -->
				      <select id="fleet" style="width:100%">
				      </select>
		    		</div>
				</td>
			</tr>
			<tr style="height:30%">
				<td class="label">车牌号:</td>
				<td class="content">
					<div id="license"> </div>
				</td>
			</tr>
			<tr>
				<td class="label">开始时间:</td>
				<td class="content">
          <input id="startTime" type="text" class="dateTimePicker" style="width:100%" readonly="readonly"/>
				</td>
			</tr>
			<tr>
				<td class="label">结束时间:</td>
				<td class="content">
          <input id="endTime" type="text" class="dateTimePicker" style="width:100%" readonly="readonly"/>
				</td>
			</tr>
			<tr>
				<td class="label">报警类型:</td>
				<td class="content">
					<div id="alarmTypes" class="test_box"> <!-- am-form-group -->
            <input type="checkbox" id="checkAll" onclick="checkAllAlarm()"/>&nbsp;全选<br />
					  <input type="checkbox" id="1" name="alarm" />&nbsp;主电被切断&nbsp;     <br />
					  <input type="checkbox" id="2" name="alarm" />&nbsp;电瓶欠压<br/>
					  <input type="checkbox" id="4" name="alarm" />&nbsp;卸油报警&nbsp;     <br />
					  <input type="checkbox" id="5" name="alarm" />&nbsp;遥控报警<br/>
					  <input type="checkbox" id="6" name="alarm" />&nbsp;卸料&nbsp;     <br />
					  <input type="checkbox" id="7" name="alarm" />&nbsp;盗警<br/>
					  <input type="checkbox" id="8" name="alarm" />&nbsp;劫警&nbsp;     <br />
					  <input type="checkbox" id="9" name="alarm" />&nbsp;入站报警<br/>
					  <input type="checkbox" id="10" name="alarm" />&nbsp;出站报警&nbsp;     <br />
					  <input type="checkbox" id="11" name="alarm" />&nbsp;GPS定位时间过长<br/>
					  <input type="checkbox" id="12" name="alarm" />&nbsp;拖车&nbsp;     <br />
					  <input type="checkbox" id="13" name="alarm" />&nbsp;GPS接收机没有输出<br/>
					  <input type="checkbox" id="14" name="alarm" />&nbsp;连续行驶超时&nbsp;     <br />
					  <input type="checkbox" id="15" name="alarm" />&nbsp;超速报警<br/>
					  <input type="checkbox" id="16" name="alarm" />&nbsp;越界报警&nbsp;     <br />
					  <input type="checkbox" id="17" name="alarm" />&nbsp;遥控器故障<br/>
					  <input type="checkbox" id="18" name="alarm" />&nbsp;车门开启&nbsp;     <br />
					  <input type="checkbox" id="19" name="alarm" />&nbsp;震动报警<br/>
					  <input type="checkbox" id="20" name="alarm" />&nbsp;移位报警&nbsp;     <br />
					  <input type="checkbox" id="21" name="alarm" />&nbsp;车辆点火<br/>
					  <input type="checkbox" id="22" name="alarm" />&nbsp;车辆熄火&nbsp;     <br />
					  <input type="checkbox" id="23" name="alarm" />&nbsp;设防<br/>
					  <input type="checkbox" id="24" name="alarm" />&nbsp;车门没锁&nbsp;     <br />
					  <input type="checkbox" id="25" name="alarm" />&nbsp;入界报警<br/>
					  <input type="checkbox" id="26" name="alarm" />&nbsp;出界报警&nbsp;     <br />
					  <input type="checkbox" id="27" name="alarm" />&nbsp;激活报警<br/>
					  <input type="checkbox" id="28" name="alarm" />&nbsp;长时间停留报警&nbsp;     <br />
					  <input type="checkbox" id="29" name="alarm" />&nbsp;事故报警<br/>
					  <input type="checkbox" id="30" name="alarm" />&nbsp;超载报警&nbsp;     <br />
					  <input type="checkbox" id="31" name="alarm" />&nbsp;左扫把放下<br/>
					  <input type="checkbox" id="32" name="alarm" />&nbsp;左扫把收起&nbsp;     <br />
					  <input type="checkbox" id="33" name="alarm" />&nbsp;超出线路报警<br/>
					  <input type="checkbox" id="34" name="alarm" />&nbsp;开始喷淋&nbsp;     <br />
					  <input type="checkbox" id="35" name="alarm" />&nbsp;停止喷淋<br/>
					  <input type="checkbox" id="36" name="alarm" />&nbsp;锁油电&nbsp;     <br />
					  <input type="checkbox" id="37" name="alarm" />&nbsp;解锁油电<br/>
					  <input type="checkbox" id="38" name="alarm" />&nbsp;30分钟未上报&nbsp;     <br />
					  <input type="checkbox" id="39" name="alarm" />&nbsp;未按时发车报警<br/>
					  <input type="checkbox" id="40" name="alarm" />&nbsp;未按时到站报警&nbsp;     <br />
					  <input type="checkbox" id="41" name="alarm" />&nbsp;冷藏低温报警<br/>
					  <input type="checkbox" id="42" name="alarm" />&nbsp;冷藏高温报警&nbsp;     <br />
					  <input type="checkbox" id="43" name="alarm" />&nbsp;冷冻低温报警<br/>
					  <input type="checkbox" id="44" name="alarm" />&nbsp;冷冻高温报警&nbsp;     <br />
					  <input type="checkbox" id="45" name="alarm" />&nbsp;非法卸料<br/>
					  <input type="checkbox" id="46" name="alarm" />&nbsp;右扫把放下&nbsp;     <br />
					  <input type="checkbox" id="47" name="alarm" />&nbsp;右扫把收起<br/>
					  <input type="checkbox" id="48" name="alarm" />&nbsp;防撞栏放下&nbsp;     <br />
					  <input type="checkbox" id="49" name="alarm" />&nbsp;加油/水报警<br/>
					  <input type="checkbox" id="50" name="alarm" />&nbsp;5分钟未上报&nbsp;     <br />
					  <input type="checkbox" id="51" name="alarm" />&nbsp;1小时未上报<br/>
					  <input type="checkbox" id="52" name="alarm" />&nbsp;24小时未上报&nbsp;     <br />
					  <input type="checkbox" id="53" name="alarm" />&nbsp;超速预警<br/>
					  <input type="checkbox" id="54" name="alarm" />&nbsp;驾驶员插卡&nbsp;     <br />
					  <input type="checkbox" id="55" name="alarm" />&nbsp;非运行时间报警<br/>
					  <input type="checkbox" id="56" name="alarm" />&nbsp;油量传感器断开&nbsp;
					  
					</div>
				</td>
			</tr>
      <tr>
				<td colspan="2" style="text-align:center;width:100%">
          <button type="button" class="am-btn am-btn-primary am-round am-btn-xs"
				    onclick="mileageInfo()">里程统计</button>
          <span style="display:inline-block;width:1em;"></span>
          <button type="button" class="am-btn am-btn-primary am-round am-btn-xs"
				    onclick="alarmInfo()">报警统计</button>
				</td>
      </tr>
		</tbody>
	</table>

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
    <script type="text/javascript">
      var hostUrl = '<%="http://"+Request.Url.Host+ (Request.Url.Port==80?"":":"+Request.Url.Port) %>';
      //客户的website采用了虚拟路径
      //var hostUrl = '<%=Session["HostUrl"] %>';
    </script>
	<script src="../Content/frame/assets/js/jquery.min.js"></script>
	<script src="../Content/frame/assets/js/amazeui.min.js"></script>  
  <script type="text/javascript" src="../Content/frame/assets/js/amazeui.datetimepicker.js"></script>
  <script src="../Content/js/dateUtil.js"></script>
  <script src="../Content/js/mapUtil.js"></script>
  <script src="../Content/js/basic.js"></script>
	<script type="text/javascript" src="../Content/js/report.js"></script>
</body>
</html>
