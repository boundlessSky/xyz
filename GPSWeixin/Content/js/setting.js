//ȫ�ֱ�����������
var PARA = {};
PARA.interval = 60;
PARA.alarmType = [8, 15, 22];

//��ȡsession����
function getParameter() {
  $.ajax({
    async: false,
    url: hostUrl + "/actions/GetRealtimeAlarm.aspx",
    type: "POST",
    dataType: "json",
    success: function (data) {
      PARA.interval = data.interval;
      PARA.alarmType.length = 0;  //�������
      PARA.alarmType = data.alarmType;
    }
  })
}

//���ñ�������
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

//����ˢ��ʱ��
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

//�򿪾��鿪�ص���
function openAlarmSwitch() {
  //�Ȼ�ȡ���²���
  getParameter();
  var $modal = $('#alarm_btn');
  $modal.modal({ 'closeViaDimmer': false });
  $modal.modal('open');
  $("[name='my-checkbox']").bootstrapSwitch();
  //���ñ�������״̬
  var alarmType = PARA.alarmType;
  var temp = [];  // �濪��״̬
  for (var i = 0; i < alarmType.length; i++) {
    temp[alarmType[i]] = true;
  }

  if (temp[8] == undefined) {  //δ�򿪸ñ���
    $("#switch1").bootstrapSwitch('state', false);
  }
  if (temp[15] == undefined) {  //δ�򿪸ñ���
    $("#switch2").bootstrapSwitch('state', false);
  }
  if (temp[22] == undefined) {  //δ�򿪸ñ���
    $("#switch3").bootstrapSwitch('state', false);
  }
}

//��ˢ�¼������
function interval_time() {
  //�Ȼ�ȡ���²���
  getParameter();
  var $modal = $('#interval');
  $modal.modal({ 'closeViaDimmer': false });
  $modal.modal('open');
  //ˢ��ʱ��ѡ��ֵ
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

//�򿪹�˾���ܵ���
function com_info() {
  //var $modal = $('#com_info');
  //$modal.modal({ 'closeViaDimmer': false });
  //$modal.modal('open');
  window.location.href = "CompanyIntroduction.aspx";
}

//�򿪹�˾�ͷ�����
function com_tel() {
  //var $modal = $('#com_tel');
  //$modal.modal({ 'closeViaDimmer': false });
  //$modal.modal('open');
  window.location.href = "CompanyService.aspx";
}

//����ע����תҳ��
function Re_registration() {
  var loginUrl = hostUrl + "/Views/login.aspx";
  //��ת����¼ҳ��
  window.location.href = loginUrl;
}
