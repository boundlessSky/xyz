//时间控件
(function ($) {
  $.fn.datetimepicker.dates['zh-CN'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月",
				"十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
				"十月", "十一月", "十二月"],
    today: "今日",
    suffix: [],
    meridiem: ["上午", "下午"]
  };

  $('.dateTimePicker').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    autoclose: true,
    pickerPosition: 'top-left'
  });
}(jQuery));

$(function () {
  /*
  //获取公司信息
  if (GLOBAL.company_arr.length == 0) {
      GLOBAL.company_arr = getCompanies();
  }
//获取车队信息
if (GLOBAL.fleet_arr.length == 0) {
  GLOBAL.fleet_arr = getCarFleet();
}

var getFleetDisplayName = function (fleet) {
    var company = null;
    for (var i = 0; i < GLOBAL.company_arr.length; i++) {
        if (GLOBAL.company_arr[i].cid == fleet.cid) {
            company = GLOBAL.company_arr[i];
            break;
        }
    }
    return company == null ? fleet.tname : company.cname + "\\" + fleet.tname;
}*/

  // 车队下拉框
  var str = "";
  var fleet_array = getRelation();//GLOBAL.fleet_arr;
  for (var i = 0, len = fleet_array.length; i < len; i++) {
    var item = fleet_array[i];
    str += "<option value=\"" + item.tid + "\" >" + item.cname + "\\" + item.tname + "</option>";
  }
  $("#fleet").append(str);
  var fid = $("#fleet").val();
  showLicense(fid);

  //select 选中事件
  $("#fleet").change(function () {
    var value = $(this).children('option:selected').val();
    $("#license").empty();
    showLicense(value);
  })

  //默认日期时间
  //结束时间默认当前时间，开始时间默认当前时间前6小时
  var myDate = new Date();
  var before = new Date(myDate.getTime() - 1000 * 60 * 60 * 6);
  var beginTime = before.Format("yyyy-MM-dd hh:mm:ss");
  var endTime = myDate.Format("yyyy-MM-dd hh:mm:ss");
  $("#startTime").val(beginTime);
  $("#endTime").val(endTime);
})

/** 显示车牌 */
function showLicense(fid) {
  var text = "<div class=\"test_box\" ><input type=\"checkbox\" id=\"" + fid + "\" name=\"fleet\" " +
			"onclick=\"checkAll('" + fid + "')\" />&nbsp;全选<br/>";
  var num = 1;
  var car_basic_array = GLOBAL.car_arr;
  for (var i = 0, len = car_basic_array.length; i < len; i++) {
    var _fid = car_basic_array[i].tid;
    if (_fid == fid) {
      var carId = car_basic_array[i].vid;
      var license = car_basic_array[i].vLicense;
      //if (num % 2 == 1) {
      //	text += "<input id=\""+carId+"\" name=\"car\" type=\"checkbox\" />&nbsp;"+license+"&nbsp;";
      //} else {
      text += "<input id=\"" + carId + "\" name=\"car\" type=\"checkbox\" />&nbsp;" + license + "<br/>";
      //}
      num++;
    }
  }
  text += "</div>";
  $("#license").append(text);
}

/** 全选(车辆) */
function checkAll(fid) {
  var checked = document.getElementById(fid).checked;
  var car_basic_array = GLOBAL.car_arr;

  for (var i = 0, len = car_basic_array.length; i < len; i++) {
    var _fid = car_basic_array[i].tid;
    if (_fid == fid) {
      var carId = car_basic_array[i].vid;
      if (checked) {
        document.getElementById(carId).checked = true;
      } else {
        document.getElementById(carId).checked = false;
      }
    }
  }
}

//全选所有报警类型
function checkAllAlarm() {
  var checked = document.getElementById('checkAll').checked;

  for (var i = 1; i <= 56; i++) {
    if (i == 3) {
      continue; //Don't ask me why there's no number three.
    }
    if (checked) {
      document.getElementById(i).checked = true;
    } else {
      document.getElementById(i).checked = false;
    }
  }

}



/** 报警统计 */
function alarmInfo() {
  var carIds = "";
  var arr_1 = $("#license input[name='car']");
  for (var i = 0, len_1 = arr_1.length; i < len_1; i++) {
    if (arr_1[i].checked) {
      carIds += (arr_1[i].id + ",");
    }
  }
  var startTime = $("#startTime").val();
  var endTime = $("#endTime").val();

  var alarmIds = "";
  var arr_2 = $("input[name='alarm']");
  for (var j = 0, len_2 = arr_2.length; j < len_2; j++) {
    if (arr_2[j].checked) {
      alarmIds += (arr_2[j].id + ",");
    }
  }
  if (alarmIds == "") {
    $("#title").empty();
    $("#body").empty();
    $("#title").append("提示");
    $("#body").append("请选择报警类型!");
    $("#modal").modal('open');
  } else {
    //跳转历史报警页面
    var url = "AlarmHistory.aspx";
    goToUrl(url, carIds, startTime, endTime, alarmIds);
  }


}

/** 里程统计 */
function mileageInfo() {
  var carIds = "";
  var arr = $("#license input[name='car']");
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i].checked) {
      carIds += (arr[i].id + ",");
    }
  }
  var startTime = $("#startTime").val();
  var endTime = $("#endTime").val();
  var url = "mileageStatistics.aspx";
  //跳转历史里程页面
  goToUrl(url, carIds, startTime, endTime, "");
}

/** 跳转页面 */
function goToUrl(url, carIds, startTime, endTime, alarmIds) {
  //3天的毫秒数
  var threeDays = 1000 * 3600 * 24 * 3;
  var st = startTime.replace(/-/g, "/");
  var et = endTime.replace(/-/g, "/");
  //时间差,毫秒数
  var difference = (new Date(et)).getTime() - (new Date(st)).getTime();

  var nowTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
  if (carIds == "" || startTime == "" || endTime == "") {
    $("#title").empty();
    $("#body").empty();
    $("#title").append("提示");
    $("#body").append("请输入查询条件!");
    $("#modal").modal('open');
  } else if (startTime > endTime || endTime > nowTime) {
    $("#body").empty();
    $("#body").append("请输入正确的起止时间!");
    $("#modal").modal('open');
  } else if (difference > threeDays) {
    $("#body").empty();
    $("#body").append("起止时间必须在三天之内,且开始时间在三个月以内!");
    $("#modal").modal('open');
  } else {
    //跳转页面
    if (alarmIds == "") {
      window.location.href = url + "?carIds=" + carIds +
			"&startTime=" + startTime + "&endTime=" + endTime;
    } else {
      window.location.href = url + "?carIds=" + carIds +
			"&startTime=" + startTime + "&endTime=" + endTime + "&alarmIds=" + alarmIds;
    }

  }
}