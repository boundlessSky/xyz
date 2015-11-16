//全局变量参数设置
var PARA = {};
PARA.interval = 60;
PARA.alarmType = [8, 15, 22];

//获取session参数
function getParameter() {
  $.ajax({
    async: false,
    url: hostUrl + "/actions/GetRealtimeAlarm.aspx",
    type: "POST",
    dataType: "json",
    success: function (data) {
      PARA.interval = data.interval;
      PARA.alarmType.length = 0;  //清空数组
      PARA.alarmType = data.alarmType;
    }
  })
}

//设置报警类型
function setAlarmType() {
  var alarm1 = $("#switch1").bootstrapSwitch('state');
  var alarm2 = $("#switch2").bootstrapSwitch('state');
  var alarm3 = $("#switch3").bootstrapSwitch('state');
  var alarmType = [];
  if (alarm1) {
    alarmType.push(8);
  }
  if (alarm2) {
    alarmType.push(15);
  }
  if (alarm3) {
    alarmType.push(22);
  }
  var data = { "interval": 0, "alarmType": alarmType };
  var str = JSON.stringify(data);
  $.ajax({
    url: hostUrl + "/actions/SetRealtimeAlarm.aspx",
    type: "POST",
    data: str
  });

}

//设置刷新时间
function setInterval() {
  var value = $('#interval_time').children('option:selected').val();
  var data = { "interval": value, "alarmType": null };
  var str = JSON.stringify(data);
  $.ajax({
    url: hostUrl + "/actions/SetRealtimeAlarm.aspx",
    type: "POST",
    data: str
  });
}

//打开警情开关弹窗
function openAlarmSwitch() {
  //先获取最新参数
  getParameter();
  var $modal = $('#alarm_btn');
  $modal.modal({ 'closeViaDimmer': false });
  $modal.modal('open');
  $("[name='my-checkbox']").bootstrapSwitch();
  //设置报警开关状态
  var alarmType = PARA.alarmType;
  var temp = [];  // 存开关状态
  for (var i = 0; i < alarmType.length; i++) {
    temp[alarmType[i]] = true;
  }

  if (temp[8] == undefined) {  //未打开该报警
    $("#switch1").bootstrapSwitch('state', false);
  }
  if (temp[15] == undefined) {  //未打开该报警
    $("#switch2").bootstrapSwitch('state', false);
  }
  if (temp[22] == undefined) {  //未打开该报警
    $("#switch3").bootstrapSwitch('state', false);
  }
}

//打开刷新间隔弹窗
function interval_time() {
  //先获取最新参数
  getParameter();
  var $modal = $('#interval');
  $modal.modal({ 'closeViaDimmer': false });
  $modal.modal('open');
  //刷新时间选中值
  var value = PARA.interval;
  //$("#interval_time option[value='" + value + "']").attr("selected", "selected");
  var mySelect = document.getElementById("interval_time");
  for (var i = 0, len = mySelect.options.length; i < len; i++) {
    if (mySelect.options[i].value == value) {
      mySelect.options[i].selected = true;
      break;
    }
  }

}

//打开公司介绍弹窗
function com_info() {
  //var $modal = $('#com_info');
  //$modal.modal({ 'closeViaDimmer': false });
  //$modal.modal('open');
  window.location.href = "CompanyIntroduction.aspx";
}

//打开公司客服弹窗
function com_tel() {
  //var $modal = $('#com_tel');
  //$modal.modal({ 'closeViaDimmer': false });
  //$modal.modal('open');
  window.location.href = "CompanyService.aspx";
}

//重新注册跳转页面
function Re_registration() {
  var loginUrl = hostUrl + "/Views/login.aspx";
  //跳转至登录页面
  window.location.href = loginUrl;
}
