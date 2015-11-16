<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Settings.aspx.cs" Inherits="GPSWeixin.Views.Settings" %>
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
<link href="../Content/css/bootstrap.min.css" rel="stylesheet" />
<link href="../Content/css/bootstrap-switch.css" rel="stylesheet" />
<link rel="alternate icon" type="image/png" href="../Content/frame/assets/i/favicon.png">
<link rel="stylesheet" href="../Content/frame/assets/css/amazeui.css" />
<link rel="stylesheet" href="../Content/css/style.css" />
<style type="text/css">
  .am-list li {line-height:200%;}
   .am-popup-bd p{
     text-align:left;
     text-indent:2em;
  }
</style>
</head>
<body>
<!--
	<header data-am-widget="header" class="am-header am-header-default">
		<h1 class="am-header-title" style="line-height:49px">设置帮助</h1>
	</header>
-->
  <div id="menuBar" class="menuBar" style="margin-top: -1px;">
    <table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td width="1">
	      <a href="./CarGroup.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm">车辆分组</a>
      </td><td width="1">
	      <a href="./Report.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm">报表统计</a>
      </td><td width="1">		
	      <a href="./Settings.aspx" target="_self" class="am-btn am-btn-primary am-btn-sm" disabled="true">设置帮助</a>
      </td></tr></table>
  </div>

	<ul class="am-list">
	  <li onclick="com_info()"><span>
	  <a href="javascript:void(0)" style="margin-left:20%;">公司介绍</a>
	  <span class="am-icon-chevron-right" style="float:right;margin-right:5%;color:gray"></span>
	  </span></li>
	  <li onclick="com_tel()"><span>
	  <a href="javascript:void(0)" style="margin-left:20%;">公司客服</a>
	  <span class="am-icon-chevron-right" style="float:right;margin-right:5%;color:gray"></span>
	  </span></li>
	  <li onclick="openAlarmSwitch()"><span>
	  <a href="javascript:void(0)" style="margin-left:20%;">警情开关</a>
	  <span class="am-icon-chevron-right" style="float:right;margin-right:5%;color:gray"></span>
	  </span></li>
	  <li onclick="interval_time()"><span>
	  <a href="javascript:void(0)" style="margin-left:20%;">刷新间隔</a>
	  <span class="am-icon-chevron-right" style="float:right;margin-right:5%;color:gray"></span>
	  </span></li>
    <li onclick="Re_registration()"><span>
	  <a href="javascript:void(0)" style="margin-left:20%;">重新注册</a>
	  <span class="am-icon-chevron-right" style="float:right;margin-right:5%;color:gray"></span>
	  </span></li>
	</ul>
	<!-- 公司介绍 -->
	<div class="am-popup" id="com_info">
  <div class="am-popup-inner">
    <div class="am-popup-hd">
      <h4 class="am-popup-title">公司介绍</h4>
      <span data-am-modal-close
            class="am-close">&times;</span>
    </div>
    <div class="am-popup-bd">
      <p>我公司是“深圳市赛格导航科技股份有限公司”（简称“赛格导航”）的子公司，
        “赛格导航”是中国卫星导航应用领域及汽车在线服务（Telematics）领域的开拓者，从1994年
        开始研究卫星导航应用技术，1999年起从事Telematics汽车在线服务网络的运营。</p>
      <p>“赛格导航”注册资本6000万元，净资产超过1.6亿元，深圳总部员工480余名，
        投资子公司35家，员工超过2100人，拥有在网用户逾60万。</p>
      <p>在公众产品领域，”赛格导航”生产车载智能安防信息终端、车载导航安全系统等
        多种具有高品质和竞争力的产品，为用户提供涵盖安全、导航、信息、价值在内的汽车在线服务，
        并依托千人导航、万人救援、遍及全国336个城市的服务后台，全方位满足用户在车联网服务时代
        的"精彩车生活"需求。</p>
      <p>在行业产品领域，“赛格导航”依靠多年在卫星导航行业应用领域积累的经验和案例，
        为客户提供十大行业解决方案和丰富的信息化管理手段，帮助客户优化作业流程， 提升运营效率，
        降低作业成本，成为更具竞争力的现代化企业和事业机构。</p>
      <p>“赛格导航”秉承“服务引领科技”理念，始终以技术创新作为企业第一推动力。公司是
        广东省的“知识产权优势企业”、广东省知识产权示范企业，深圳市知识产权示范企业。截至2012年6月，
        赛格导航累计已取得专利98项，其中发明专利22项，已获受理专利申请310项，并获得业内最严格的
        质量管理标准——TS16949-2009版管理体系认证。</p>
      <p>“赛格导航”是一个具有远大理想的民族企业，在汽车电子产品、位置信息产品和汽车
        在线服务领域，我们深知世界级强手如林。但我们也深信，只要通过正确的方法和不懈的努力，一定
        能够实现理想，在这里开创出广阔的天地。</p>
      <p>我公司成立于200７年，公司将自身定位于集市场开拓、应用开发、服务于一体的
        北斗/GPS综合应用服务商，公司拥有专业的平台开发、车载终端安装/维护及坐席监控团队，始终
        坚持以开拓、创新为企业精神，做大、做强为发展目标，该目标为公司持续性发展提供了夯实的基础。</p>
      <p>公司是上海市运输行业管理部门指定的GPS网络服务运营商，业务涉及的行业跨度广、
        客户规模大，成为行业中的佼佼者，在全国尤其长三角的危险品运输、客运、集卡、重型货车、车辆租赁、
        物流配送、快递、混凝土运输、拖车救援、城市环卫、城管监察和水运等行业领域拥有较大的市场占有率。</p>
      <p>公司目前拥有“移动目标GPS调度监控系统”、“赛格烟草配送排单软件”、“赛格物流配送
        GPS调度监控软件”等近二十项“计算机软件著作权”，展现了公司强大的技术实力。</p>
      <p>公司平台多年来根据客户的需求不断改进及完善，平台可以实时监控车辆点火/熄火、
        开关门、温度/湿度、油量消耗、载重、车辆驾驶行为等车辆状态，还可实时产生抢劫、主电被切断、
        电瓶欠压、卸油、非法卸料、疲劳驾驶、超速、越界、车门开启、长时间停留、超出线路范围、温度
        异常等通用报警，也能根据特定行业设定特色报警，比如洒水、扫地、车辆震动、移位、安防等报警，
        同时平台能产生很多实用的智能统计报表，如里程统计、行程统计、超速统计、怠速统计、越界统计等。</p>
      <p>公司拥有24小时在线的坐席监控服务，可实时监控客户车辆，并随时与客户进行沟通，
        通知车辆故障及回答客户疑问等，同时对故障终端提供即时的维护服务，切实做到实时响应，24小时内维护完毕。</p>
    </div>
  </div>
	</div>
	
<!-- 公司客服 -->
	<div class="am-popup" id="com_tel">
  <div class="am-popup-inner">
    <div class="am-popup-hd">
      <h4 class="am-popup-title">公司客服</h4>
      <span data-am-modal-close
            class="am-close">&times;</span>
    </div>
    <div class="am-popup-bd">
      <h5>1.监控中心：</h5>
      <p>公司拥有24小时在线的坐席监控服务，可实时监控客户车辆，并随时与客户进行
        沟通，通知车辆故障及回答客户疑问等，同时对故障终端提供即时的维护服务，切实做
        到实时响应，24小时内维护完毕,热线电话：021-65525760/65525712/65525808。
      </p>
      <h5>2.服务体系</h5>
      <p>服务是现代型企业的持续性发展的核心要素，作为专业的GPS运营商，注重完善的服务
        体系建设，注重差异化服务的价值体现，将售前、售中、售后环节并重，不仅努力为客
        户提供更趋完善的软、硬件产品和系统集成，承诺对车载终端及系统软件提供终身技术
        支持，更重视对客户端的培训及提高远程售后服务能力，力争做到“以服务完善网络”。
      </p>
      <p>为高品质的、极负责任的承兑每一项服务承诺，我们配备了一支15人以上的专职
        的售后维护团队，与此同时，在行业服务领域前瞻的提出了7*24*3的全新服务模式。
        （即一周工作7天，每天24小时，确保工程维护、监控调度与技术支持3项服务的全
        天候不间断运行）。
      </p>
      <h5>3.安装调试</h5>
        <ul>
          <li>上门安装或到指定区域进行统一安装</li>
          <li>每台安装设备均有安装单以备核实</li>
          <li>与安装配套，24小时调试</li>
          <li>调试记录监控，以确保调试质量</li>
          <li>调试成功后实行72小时运行情况跟踪</li>
        </ul>
      <h5>4.售后服务</h5>
      <p>“上海赛格车圣”将对客户提供必要的系统维护、操作培训以及设备的安装、维护等培训。
      </p>
      <p>作为资深的GPS综合运营商，我们突破了传统、单一的售后服务概念，引导全面的，
        贯穿于售前、售中、售后的立体式服务理念，力求营造一个无缝式的服务网络，竭诚为
        用户提供优质、高效的专业化服务，接到报修后24小时内到达现场完成维修工作。
      </p>
    </div>
  </div>
	</div>
	
<!-- 警情开关 -->
	<div class="am-modal am-modal-no-btn" tabindex="-1" id="alarm_btn">
	  <div class="am-modal-dialog">
	    <div class="am-modal-hd">警情开关
	      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close
            onclick="setAlarmType()">&times;</a>
	    </div>
	    <div class="am-modal-bd">
				<div>
          <label style="margin-left:30px;">劫警：</label>
          <input id="switch1" type="checkbox" name="my-checkbox" data-size="mini" checked />
        </div>
        <div>
          <label style="display:inline-block">超速报警：</label>
          <input id="switch2" type="checkbox" name="my-checkbox" data-size="mini" checked />
        </div>
        <div>
          <label style="display:inline-block;margin-left:30px;">熄火：</label>
          <input id="switch3" type="checkbox" name="my-checkbox" data-size="mini" checked />
        </div>
	    </div>
	  </div>
	</div>

<!-- 刷新间隔 -->
	<div class="am-modal am-modal-no-btn" tabindex="-1" id="interval">
	  <div class="am-modal-dialog">
	    <div class="am-modal-hd">刷新间隔
	      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close 
            onclick="setInterval()">&times;</a>
	    </div>
	    <div class="am-modal-bd">
	    <div class="am-form-group">
	      <select id="interval_time">
	        <option value="10">10秒</option>
	        <option value="20">20秒</option>
	        <option value="30">30秒</option>
	        <option value="60">1分</option>
	        <option value="120">2分</option>
	        <option value="300">5分</option>
	        <option value="600">10分</option>
	        <option value="900">15分</option>
	        <option value="1200">20分</option>
	        <option value="1800">30分</option>
	      </select>
	    </div>
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
  <script src="../Content/js/bootstrap-switch.js"></script>
	<script type="text/javascript" src="../Content/js/setting.js"></script>
</body>
</html>