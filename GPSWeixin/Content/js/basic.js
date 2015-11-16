//定义请求协议对象
function Protocol(code, content) {
  this.code = code;
  this.content = content;
}

//获取url参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

//获取公司信息
function getCompanies() {
    var pro_2 = new Protocol('2', null);
    var data_2 = JSON.stringify(pro_2);
    var company_arr = [];
    $.ajax({
        async: false,
        type: "POST",
        url: hostUrl + "/ApiHandler.aspx",
        data: data_2,
        dataType: 'json',
        success: function (msg) {
            if (msg.commResponse.result == '1') { //成功
                company_arr = msg.content;
            } else if (msg.commResponse.result == '4') {  //无记录
                //do nothing
            }
        }
    });
    return company_arr;
}

//获取车队信息
function getCarFleet() {
  var pro_3 = new Protocol('3', null);
  var data_3 = JSON.stringify(pro_3);
  var fleet_arr = [];
  $.ajax({
    async: false,
    type: "POST",
    url: hostUrl + "/ApiHandler.aspx",
    data: data_3,
    dataType: 'json',
    success: function (msg) {
      if (msg.commResponse.result == '1') { //成功
        fleet_arr = msg.content;
      } else if (msg.commResponse.result == '4') {  //无记录
        //do nothing
      }
    }
  });
  return fleet_arr;
}

//获取车辆信息
function getCarBasicInfo() {
  //alert('getCarBasicInfo begin');
  var car_arr = [];
  var pro_4 = new Protocol('4', null);
  var data_4 = JSON.stringify(pro_4);
  $.ajax({
    async: false,
    type: "POST",
    url: hostUrl + "/ApiHandler.aspx",
    data: data_4,
    dataType: 'json',
    success: function (msg) {
      if (msg.commResponse.result == '1') { //成功
        //alert('getCarBasicInfo success');
        car_arr = msg.content;
        //alert("车辆总数:" + car_arr.length);
      } else if (msg.commResponse.result == '4') {  //无记录
        //do nothing
      }
    }
  });
  return car_arr;
}

//获取公司-车队-车辆关系
function getRelation() {
  //alert('getRelation begin');
  var relation;
  $.ajax({
    async: false,
    url: hostUrl + "/actions/GetAllGroups.aspx",
    type: "POST",
    dataType: "json",
    success: function (msg) {
      //alert('getRelation success');
      relation = msg;
    }
  });
  return relation;
}

//车辆实时信息下载
function getCarActualInfo(vids, interval) {
  //alert('getCarActualInfo begin');
  var pro_5 = new Protocol('5', { "vid": vids, "interval": interval });
  var data_5 = JSON.stringify(pro_5);
  var car_actual_arr = [];	//存返回的结果
  $.ajax({
    async: false,
    type: "POST",
    url: hostUrl + "/ApiHandler.aspx",
    data: data_5,
    dataType: 'json',
    success: function (msg) {
      if (msg.commResponse.result == '1') { //成功
        //alert('getCarActualInfo success');
        car_actual_arr = msg.content;
      } else if (msg.commResponse.result == '4') {  //无记录
        //do nothing 
      }
    }
  });
  return car_actual_arr;
}

//车辆实时报警信息下载
function getAlarmInfo(alarmType, interval) {
  var pro_6 = new Protocol('6', { "alarmType": alarmType, "interval": interval });
  var data_6 = JSON.stringify(pro_6);
  var alarmInfo = [];
  $.ajax({
    async: false,
    type: "POST",
    url: hostUrl + "/ApiHandler.aspx",
    data: data_6,
    dataType: 'json',
    success: function (msg) {
      if (msg.commResponse.result == '1') { //成功
        //alert('getMileage success');
        alarmInfo = msg.content;
      } else if (msg.commResponse.result == '4') {  //无记录
        //do nothing 
      }
    }
  });
  return alarmInfo;
}

//车辆历史轨迹信息下载
function getCarHistoricalTrack(vid, startTime, endTime, rowCount, pageIndex) {
  var pro_7 = new Protocol('7', { "vid": vid, "startTime": startTime, "endTime": endTime, "rowCount": rowCount, "pageIndex": pageIndex });
  var data_7 = JSON.stringify(pro_7);
  var trackInfo = new Object(); //存返回的信息
  trackInfo.totalCount = 0;
  trackInfo.data = [];
  $.ajax({
    async: false,
    type: "POST",
    url: hostUrl + "/ApiHandler.aspx",
    data: data_7,
    dataType: 'json',
    success: function (msg) {
      if (msg.commResponse.result == '1') { //成功
        trackInfo.totalCount = msg.content.totalCount;
        trackInfo.data = msg.content.data;
      } else if (msg.commResponse.result == '4') {  //无记录
        //do nothing 
      }
    }
  });
  return trackInfo;
}

//里程统计
function getMileage(vids, startTime, endTime) {
  var pro_9 = new Protocol('9', { "vid": vids, "startTime": startTime, "endTime": endTime });
  var data_9 = JSON.stringify(pro_9);
  var mile_arr = [];  //存返回的结果
  $.ajax({
    async: false,
    type: "POST",
    url: hostUrl + "/ApiHandler.aspx",
    data: data_9,
    dataType: 'json',
    success: function (msg) {
      if (msg.commResponse.result == '1') { //成功
        //alert('getMileage success');
        mile_arr = msg.content;
      } else if (msg.commResponse.result == '4') {  //无记录
        //do nothing 
      }
    }
  });
  return mile_arr;
}

//定义全局变量
var GLOBAL = {};
GLOBAL.company_arr = [];  //公司数组
GLOBAL.fleet_arr = [];  //车队数组

//页面初始化
function init() {
  if (!GLOBAL.hasOwnProperty('car_arr')) {
    GLOBAL.car_arr = getCarBasicInfo();
  }

  if (!GLOBAL.hasOwnProperty('car_map')) {
    var car_map = new Map();
    for (var i = 0, len = GLOBAL.car_arr.length; i < len; i++) {
      var carId = GLOBAL.car_arr[i].vid;
      var carLicense = GLOBAL.car_arr[i].vLicense;
      car_map.put(carId, carLicense);
    }
    GLOBAL.car_map = car_map;
  }

  if (!GLOBAL.hasOwnProperty('alarm_map')) {
    var alarm_map = new Map();
    alarm_map.put('1', '主电被切断');
    alarm_map.put('2', '电瓶欠压');
    alarm_map.put('4', '卸油报警');
    alarm_map.put('5', '遥控报警');
    alarm_map.put('6', '卸料');
    alarm_map.put('7', '盗警');
    alarm_map.put('8', '劫警');
    alarm_map.put('9', '入站报警');
    alarm_map.put('10', '出站报警');
    alarm_map.put('11', 'GPS定位时间过长');
    alarm_map.put('12', '拖车');
    alarm_map.put('13', 'GPS接收机没有输出');
    alarm_map.put('14', '连续行驶报警');
    alarm_map.put('15', '超速报警');
    alarm_map.put('16', '越界报警');
    alarm_map.put('17', '遥控器故障');
    alarm_map.put('18', '车门开启');
    alarm_map.put('19', '震动报警');
    alarm_map.put('20', '移位报警');
    alarm_map.put('21', '车辆点火');
    alarm_map.put('22', '车辆熄火');
    alarm_map.put('23', '设防');
    alarm_map.put('24', '车门没锁');
    alarm_map.put('25', '入界报警');
    alarm_map.put('26', '出界报警');
    alarm_map.put('27', '激活报警');
    alarm_map.put('28', '长时间停留报警');
    alarm_map.put('29', '事故报警');
    alarm_map.put('30', '超载报警');
    alarm_map.put('31', '左扫把放下');
    alarm_map.put('32', '左扫把收起');
    alarm_map.put('33', '超出线路报警');
    alarm_map.put('34', '开始喷淋');
    alarm_map.put('35', '停止喷淋');
    alarm_map.put('36', '锁油电');
    alarm_map.put('37', '解锁油电');
    alarm_map.put('38', '30分钟未上报');
    alarm_map.put('39', '未按时发车报警');
    alarm_map.put('40', '未按时到站报警');
    alarm_map.put('41', '冷藏低温报警');
    alarm_map.put('42', '冷藏高温报警');
    alarm_map.put('43', '冷冻低温报警');
    alarm_map.put('44', '冷冻高温报警');
    alarm_map.put('45', '非法卸料');
    alarm_map.put('46', '右扫把放下');
    alarm_map.put('47', '右扫把收起');
    alarm_map.put('48', '防撞栏放下');
    alarm_map.put('49', '加油/水报警');
    alarm_map.put('50', '5分钟未上报');
    alarm_map.put('51', '1小时未是哪个吧哦');
    alarm_map.put('52', '24小时未上报');
    alarm_map.put('53', '超速预警');
    alarm_map.put('54', '驾驶员插卡');
    alarm_map.put('55', '非运营时间报警');
    alarm_map.put('56', '油量传感器断开');

    GLOBAL.alarm_map = alarm_map;
  }

}

//切换全屏和非全屏显示
function switchView() {
  //get current state
  var isVisible = !($("#menuBar")[0].style.display == "none");
  $("#menuBar")[0].style.display = isVisible ? "none" : "";
  document.getElementById("switchViewImg").src = "../Content/img/" + (isVisible ? "restore.png" : "fullScreen.png");
  console.log(document.getElementById("switchViewImg").src);
}

//根据方向创建百度地图标记物图标
function createIcon(angle) {
  //从正y轴方向开始顺时针
  var icons = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
  var index = 0;
  if ((angle >= 338 && angle <= 359) || (angle >= 0 && angle <= 22)) {
    index = 0;
  } else if (angle >= 23 && angle <= 67) {
    index = 1;
  } else if (angle >= 68 && angle <= 112) {
    index = 2;
  } else if (angle >= 113 && angle <= 157) {
    index = 3;
  } else if (angle >= 158 && angle <= 202) {
    index = 4;
  } else if (angle >= 203 && angle <= 247) {
    index = 5;
  } else if (angle >= 248 && angle <= 292) {
    index = 6;
  } else if (angle >= 293 && angle <= 337) {
    index = 7;
  }
  icon = new BMap.Icon("../Content/img/arrow_" + icons[index] + ".png", new BMap.Size(22, 22));
  return icon;
}

$(function () {
  init();
})