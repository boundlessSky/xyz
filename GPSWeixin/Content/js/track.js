//时间控件
(function($) {
	$.fn.datetimepicker.dates['zh-CN'] = {
		days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
		daysShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
		daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
		months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月",
				"十一月", "十二月" ],
		monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
				"十月", "十一月", "十二月" ],
		today : "今日",
		suffix : [],
		meridiem : [ "上午", "下午" ]
	};

	$('.dateTimePicker').datetimepicker({
		language : 'zh-CN',
		format : 'yyyy-mm-dd hh:ii:ss',
		autoclose : true,
		pickerPosition : 'top-left'
	});
}(jQuery));

$(function() {
	//默认日期时间
	var myDate = new Date();
	var before = new Date(myDate.getTime()-1000*60*60*3);
	var beginTime = before.Format("yyyy-MM-dd hh:mm:ss");
	var endTime = myDate.Format("yyyy-MM-dd hh:mm:ss");
	$("#beginTime").val(beginTime);
	$("#endTime").val(endTime);
})

//轨迹回放的几个参数
var points = [];  //百度点坐标数组 new BMap.Point(lon, lat);
var map;  // 百度地图对象
var car;  //汽车图标
var license;  //车牌号
var label;
var centerPoint;  //中心点

var timer;     //定时器
var index = 0; //记录播放到第几个point

var overlayBtn, playBtn, previous, next;  //几个控制按钮


$(function () {
  //获取url参数
  var vid = getUrlParam('carId');
  license = GLOBAL.car_map.get(vid);
  /** ---------- 轨迹回放-----------------*/
  overlayBtn = document.getElementById('overlay');
  playBtn = document.getElementById('play');
  previous = document.getElementById('previous');
  next = document.getElementById('next');

  playBtn.disabled = true;
  overlayBtn.disabled = false;
  previous.disabled = true;
  next.disabled = true;

  //初始化百度地图
  map = new BMap.Map("container");
  map.centerAndZoom('上海', 14);
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());

  //轨迹重现
  $('#overlay').click(function () {
    var startTime = $('#beginTime').val();
    var endTime = $('#endTime').val();
    //验证时间
    var validate = validateTime();
    if (validate) {
      pageIndex = 1; //页面索引
      var pageTotal;  //总页数
      //后台获取的GPS数据
      var dataObj = getBDPoints(vid, startTime, endTime, pageIndex);
      var totalCount = dataObj.totalCount;
      if (totalCount != 0) {
        //清除轨迹
        map.clearOverlays();
        //显示上一页,下一页
        $('#previous ').show();
        $('#next').show();
        //设为不可以
        previous.disabled = false;
        next.disabled = false;

        pageTotal = Math.ceil(totalCount / 100);

        drawPoints(dataObj.data, points);
        playBtn.disabled = false;
        //上一页
        $("#previous").click(function () {
          if (pageIndex == 1) {
            alert("前面没有了");
            pageIndex = 1;
          } else {
            pageIndex--;
            gotoPage(vid, startTime, endTime, pageIndex);
          }
        })

        //下一页
        $("#next").click(function () {
          if (pageIndex == pageTotal) {
            alert("后面没有了");
            pageIndex = pageTotal;
          } else {
            pageIndex++;
            gotoPage(vid, startTime, endTime, pageIndex);
          }
        });

      } else {
        //隐藏上一页,下一页
        $('#previous ').hide();
        $('#next').hide();
        alert("该条件下没有数据!");
      }

    } else {
      return false;
    }
    
  })
  
  //轨迹回放
  $('#play').click(function () {
    overlayBtn.disabled = true;
    playBtn.disabled = true;
    trackPlay();
  });

  //轨迹清除
  $('#clear').click(function () {
    map.clearOverlays();
  });

  //轨迹报表
  $('#trackReport').click(function () {
    var startTime = $('#beginTime').val();
    var endTime = $('#endTime').val();
    //验证时间
    var validate = validateTime();
    if (validate) {
      //时间正确
      //获取轨迹报表记录
      getPage(vid, startTime, endTime);
      var $modal = $('#modal');
      $modal.modal({ 'closeViaDimmer': false });
      $modal.modal('open');
    } else {
      //时间错误
      return false;
    }
  });


})

//获取转换为百度坐标的点
function getBDPoints(vid, startTime, endTime, pageIndex) {
  var dataVar = {
    content: {  //功能数据字段
      vid: vid, //车辆编号
      startTime: startTime, //开始时间
      endTime: endTime, //结束时间
      rowCount: 100, //每页记录数
      pageIndex: pageIndex //分页索引
    }
  };
  var dataObj = {};
  $.ajax({
    async: false,
    url: hostUrl + "/actions/GetGPSData.aspx",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(dataVar),
    success: function (data) {
        dataObj.totalCount = data.totalCount;
        dataObj.data = data.data;
    }
  });
  return dataObj;
}

//百度地图画点
function drawPoints(data, points) {
  for (var i = 0, len = data.length; i < len; i++) {
    points.push(new BMap.Point(data[i].lon, data[i].lat));
  }

  //画面移动到起点和终点的中间
  centerPoint = new BMap.Point(
      (points[0].lng + points[points.length - 1].lng) / 2,
      (points[0].lat + points[points.length - 1].lat) / 2);
  map.panTo(centerPoint);
  //连接所有点
  map.addOverlay(new BMap.Polyline(points, {
    strokeColor: "#0e90d2",
    strokeWeight: 3,
    strokeOpacity: 1
  }));

  //显示小车子
  label = null;
  label = new BMap.Label("" + license, {
    offset: new BMap.Size(-20, -20)
  });
  car = new BMap.Marker(points[0]);
  car.setLabel(label);
  //显示起点,终点marker
  var firstP = new BMap.Marker(points[0]);
  var endP = new BMap.Marker(points[points.length - 1]);
  var label_1 = new BMap.Label("起点", {
    offset: new BMap.Size(25, 5)
  });
  var label_2 = new BMap.Label("终点", {
    offset: new BMap.Size(25, 5)
  });
  firstP.setLabel(label_1);
  endP.setLabel(label_2);
  map.addOverlay(car);
  map.addOverlay(firstP);
  map.addOverlay(endP);
}

//轨迹回放
function trackPlay() {
  
  var point = points[index];
  if (index > 0) {
    map.addOverlay(new BMap.Polyline([points[index - 1], point],
      { strokeColor: "black", strokeWeight: 2, strokeOpacity: 1 }));
  }
  car.setPosition(point);
  index++;
    //map.panTo(point); //画面跟随点移动
  if (index < points.length) {
    timer = window.setTimeout("trackPlay(" + index + ")", 500);
  } else {
    overlayBtn.disabled = false;
    playBtn.disabled = false;
    //map.panTo(point);
    //初始化index;
    index = 0;
  }
}

//转到页面
function gotoPage(vid, startTime, endTime, pageIndex) {
  //清除轨迹
  map.clearOverlays();
  playBtn.disabled = false;
  //清空point[];
  points.length = 0;
  var dataObj = getBDPoints(vid, startTime, endTime, pageIndex);
  drawPoints(dataObj.data, points);
  
}

//校验时间
function validateTime() {
  var startTime = $('#beginTime').val();
  var endTime = $('#endTime').val();
  var nowTime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
  //3天的毫秒数
  var threeDays = 1000 * 3600 * 24 * 3;
  //时间格式转换 "yyyy-MM-dd hh:mm:ss" -> "yyyy/MM/dd hh:mm:ss"
  var st = startTime.replace(/-/g, "/");
  var et = endTime.replace(/-/g, "/");
  //起止时间差,毫秒数
  var difference = (new Date(et)).getTime() - (new Date(st)).getTime();
  if (difference < 0 || nowTime < endTime) {
    alert("请输入正确的起止时间");
    return false;
  } else if (difference > threeDays) {
    alert("起止时间必须在三天之内,且开始时间在三个月以内!");
    return false;
  } else {
    return true;
  }

}

//获取轨迹报表记录
function getPage(vid, startTime, endTime) {
  pageNum = 1;  //页面索引
  var rowCount = 10; //每页显示几条
  var pageIndex = pageNum;
  //获取数据
  var obj = getCarHistoricalTrack(vid, startTime, endTime, rowCount, pageIndex);
  var totalCount = obj.totalCount; // 总记录数
  var pageTotal = Math.ceil(totalCount / rowCount); // 总页数
  if (totalCount != 0) {
    //显示分页
    $('#pagination').show();

    $("#nextPage").click(function () {
      if (pageNum == pageTotal) {
        alert("后面没有了");
        pageNum = pageTotal;
      } else {
        pageNum++;
        gotoReportPage(vid, startTime, endTime, rowCount, pageNum);
      }
    });
    $("#previousPage").click(function () {
      if (pageNum == 1) {
        alert("前面没有了");
        pageNum = 1;
      } else {
        pageNum--;
        gotoReportPage(vid, startTime, endTime, rowCount, pageNum);
      }
    });
    $("#firstPage").click(function () {
      pageNum = 1;
      gotoReportPage(vid, startTime, endTime, rowCount, pageNum);
    });
    $("#endPage").click(function () {
      pageNum = pageTotal;
      gotoReportPage(vid, startTime, endTime, rowCount, pageNum);
    });

    //加载第一页数据
    $(".currentPage").text(pageNum);
    $(".pageCount").text(pageTotal);
    var data = obj.data;
    //显示数据
    var license = GLOBAL.car_map.get(vid);
    showData(license, rowCount, data);
   //-----the end
  } else {
    //隐藏分页
    $('#pagination').hide();
    //当前条件下无记录
    $('#title').empty();
    var license = GLOBAL.car_map.get(vid);
    $('#title').append(license + "--历史轨迹");
    $('#content').empty();
    $('#content').append('<div class="li-tag">当前条件下无记录</div>')
  }
}

//轨迹报表跳转页面
function gotoReportPage(vid, startTime, endTime, rowCount, pageNum) {
  $(".currentPage").text(pageNum);
  getJSONData(vid, startTime, endTime, rowCount, pageNum);
}

//轨迹报表数据加载
function getJSONData(vid, startTime, endTime, rowCount, pageNum) {
  var obj = getCarHistoricalTrack(vid, startTime, endTime, rowCount, pageNum);
  var totalCount = obj.totalCount; // 总记录数
  var pageTotal = Math.ceil(totalCount / rowCount); // 总页数
  
  var license = GLOBAL.car_map.get(vid);
  $(".pageCount").text(pageTotal);
  //显示数据
  showData(license, rowCount, obj.data);
}

//显示数据
function showData(license, rowCount, data) {
  //设置标题
  $('#title').empty();
  $('#title').append(license + "--历史轨迹");
  //设置内容
  var $div = $('#content');
  $div.empty();
  var size = data.length;
  for (var i = 0; i < rowCount; i++) {
    if (i == size) {
      break;
    }
    $div.append('<div class="li-tag"></div>');
  }
  var dataRoot = new Array();
  dataRoot = data;
  for (var j = 0; j < rowCount; j++) {
    if (j == size) {
      break;
    }
    var status = (dataRoot[j].alarmType == '0' ? "" : GLOBAL.alarm_map.get(dataRoot[j].alarmType));

    $(".li-tag").eq(j).append("上报时间:" + dataRoot[j].gpsTime + "<br/>")
        .append("位置:" + dataRoot[j].position + "<br/>")
        .append("速度:" + dataRoot[j].speed + "<br/>")
        .append("状态:" + status + "<br/>")
        .append("行驶里程:" + dataRoot[j].runMile + "<br/>")
        .append("停留(分钟):" + dataRoot[j].stayTime + "<br/>")
        .append("未上报(分钟):" + dataRoot[j].noReportTime + "<br/>")
  }

}