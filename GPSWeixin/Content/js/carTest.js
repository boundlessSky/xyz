
$(function () {
  /** 动态加载数据 */
  var data = getRelation();
  //alert('fleet count:' + data.length);
  //车辆分组列表 begin
  //内容数组,包括title和content
  var content = [];
  for (var i = 0, len = data.length; i < len; i++) {
    var obj = new Object();
    var cname = data[i].cname;
    var tname = data[i].tname;
    var tid = data[i].tid;
    var cars_arr = data[i].carList;
    var count = cars_arr.length;
    obj.title = "<div class=\"title\"><input id=\"" + tid + "\" name=\"fleet\" type=\"checkbox\" onclick=\"check('" + tid + "')\"/>&nbsp;"
       + cname + "/" + tname + "(" + count + ")" + "辆</div>";
    var body = "";
    for (var j = 0; j < count; j++) {
      var vid = cars_arr[j].vid;
      var vLicense = cars_arr[j].vLicense;
      var position = cars_arr[j].position;
      var speed = cars_arr[j].speed;
      var gpsTime = cars_arr[j].gpsTime;
      body += "<div class=\"content\"><div><input id=\"" + vid + "\" name=\"car\" type=\"checkbox\"/>&nbsp;车牌号码:"
              + vLicense + "<img style=\"float:right\" src=\"/Content/img/dian.png\" onclick=\"carTrack('" + vid + "');\" /></div>"
              + "<div id=\"carInfo_" + vid + "\">&nbsp;&nbsp;位置:<a href=\"javascript:void(0)\" "
              + "onclick=\"singleMonitor('" + vid + "')\">" + position + "</a><br/>&nbsp;&nbsp;速度:"
              + speed + "<br/>&nbsp;&nbsp;最后上报时间:" + gpsTime + "<br/></div></div>";
    }
    obj.content = body;
    content.push(obj);
  }

  //展示车辆list
  showCarList(content);

  //车辆分组列表 end

/**
  $("#searchCar").keydown(function (e) {
    var curKey = e.which;
    if (curKey == 13) {
      //alert("enter按下了!");
    }
  });
*/
  //车辆搜索---begin
  $("#search").click(function () {
    var license = $("#searchCar").val().toUpperCase();
    if (license == "") {
      $("#content").empty();
      showCarList(content);
    } else {
      $("#content").empty();
      //查询车牌号为license的车辆信息
      var content_search = [];
      for (var i = 0, len_1 = data.length; i < len_1; i++) {
        var obj = new Object();
        obj.content = "";
        var count = 0;  //记录每一个车队查询的车辆数
        var team = data[i];
        var carList = team.carList;
        for (var j = 0, len_2 = carList.length; j < len_2; j++) {
          var vLicense = carList[j].vLicense;
          if (vLicense.toUpperCase().indexOf(license) > -1) {
            count++;
            var vid = carList[j].vid;
            var position = carList[j].position;
            var speed = carList[j].speed;
            var gpsTime = carList[j].gpsTime;
            obj.content += "<div class=\"content\"><div><input id=\"" + vid + "\" name=\"car\" type=\"checkbox\"/>&nbsp;车牌号码:"
              + vLicense + "<img style=\"float:right\" src=\"/Content/img/dian.png\" onclick=\"carTrack('"+vid+"');\" /></div>"
              + "<div>&nbsp;&nbsp;位置:<a href=\"javascript:void(0)\" onclick=\"singleMonitor('" + vid + "')\">" + position + "</a><br/>"
              + "&nbsp;&nbsp;速度:" + speed + "<br/>&nbsp;&nbsp;最后上报时间:" + gpsTime + "<br/></div></div>";
          }
        }

        if (count > 0) {  //表示搜索到结果
          var cname = team.cname;
          var tname = team.tname;
          var tid = team.tid;
          obj.title = "<input id=\"" + tid + "\" name=\"fleet\" type=\"checkbox\" />&nbsp;"
            + cname + "/" + tname + "(" + count + ")" + "辆";

          content_search.push(obj);
        }
      }

      showCarList(content_search);
    }
  });
  //车辆搜索---end

  //获取interval,alarmType值
  var PARA = {};
  PARA.interval = 60;
  PARA.alarmType = [8, 15, 22];
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
  });
  //实时报警信息数组
  var alarm_arr = getAlarmInfo(PARA.alarmType, PARA.interval);
  changeIcon(alarm_arr);
  //定时任务
  setInterval(function () {
    alarm_arr = getAlarmInfo(PARA.alarmType, PARA.interval);
    changeIcon(alarm_arr);

    //获取车队车辆信息数组
    data = getRelation();
    //替换车辆的位置,速度,最后上报时间等信息
    replaceCarInfo(data);
  }, 1000 * PARA.interval);

  //点击报警图标弹出对话框
  $("#icon_alarm").click(function () {
    if (alarm_arr.length == 0) {
      $("#title").empty();
      $("#body").empty();
      $("#body").append("当前没有报警信息!");
      $("#modal").modal('open');
    } else {
      var text = "";
      for (var i = 0, len = alarm_arr.length; i < len; i++) {
        var carId = alarm_arr[i].vid;
        var license = GLOBAL.car_map.get(carId);
        var position = alarm_arr[i].position;
        var alarmType = alarm_arr[i].alarmType;
        var alarm = GLOBAL.alarm_map.get(alarmType);
        var time = alarm_arr[i].gpsTime;
        text += "<div class=\"alarmInfo\">车牌号码:" + license + "<br/>位置:" + position
             + "<br/>状态:" + alarm + "<br/>报警时间:" + time + "<br/></div>"
      }
      $("#title").empty();
      $("#body").empty();
      $("#title").append("实时报警");
      $("#body").append(text);
      $("#modal").modal('open');
    }
  });
  //--alarm dialog end
})

//改变报警图标
function changeIcon(alarm_arr) {
  if (alarm_arr.length != 0) {
    //将报警图标颜色改变
    $("#icon_alarm").attr("src", "/Content/img/alert_on.gif");
  } else {
    $("#icon_alarm").attr("src", "/Content/img/alert_off.png");
  }
}

//单车实时监控
function singleMonitor(vid) {
  window.location.href = "singleCar.aspx?vid=" + vid;
}

//check box 选中车队则选中下面所有车辆
function check(fid) {
    var checked = document.getElementById(fid).checked;
    //车辆基本信息数组
    var car_arr = GLOBAL.car_arr;
  for (var i = 0, len = car_arr.length; i < len; i++) {
    var _fid = car_arr[i].tid;
    if (_fid == fid) {
      var carId = car_arr[i].vid;
      if (checked) {
        document.getElementById(carId).checked = true;
      } else {
        document.getElementById(carId).checked = false;
      }
    }
  }
}

//多车监控
function multMonitor() {
  var count = 0;	//选中的车辆数
  var carIds = "";
  $("input[name='car']:checkbox:checked").each(function () {
    carIds += $(this).attr("id") + ",";
    count++;
  })

  if (count == 0) {
    $("#title").empty();
    $("#body").empty();
    $("#body").append("请选择车辆!");
    $("#modal").modal('open');
  } else {
    window.location.href = "multCar.aspx?carIds=" + carIds;
  }
}

//展示车辆信息列表
function showCarList(content) {

  var template = Handlebars.compile('{{>accordion}}'),
    data = {
      accordionData: {
        "id": "doc-accordion-example",
        "className": "doc-accordion-class",
        "theme": "gapped",
        "content": content
      }
    },
    html = template(data.accordionData);

  $('#content').append(html);
  $.AMUI.accordion.init();
}

//车辆历史轨迹
function carTrack(vid) {
  //跳转到轨迹回放页面
  window.location.href = "Track.aspx?carId=" + vid;
}

//替换车辆信息
function replaceCarInfo(data) {
  for (var i = 0, len_1 = data.lenght; i < len_1; i++) {
    var carList = data[i].carList;
    for (var j = 0, len_2 = carList.length; j < len_2; j++) {
      var carId = carList[j].vid;
      var position = carList[j].position;
      var speed = carList[j].speed;
      var time = carList[j].gpsTime;
      var html = "&nbsp;&nbsp;位置:<a href=\"javascript:void(0)\" onclick=\"singleMonitor('" + vid + "')\">" + position + "</a>"
              + "<br/>&nbsp;&nbsp;速度:" + speed + "<br/>&nbsp;&nbsp;最后上报时间:" + gpsTime + "<br/>"
      document.getElementById("carInfo_" + carId).innerHTML = html;
    }
  }

}