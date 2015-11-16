function getJSONData(pn, vids, alarmIds, startTime, endTime) {
    // alert(pn);
  var obj = getAlarmHistory(vids, alarmIds, startTime, endTime, pn);
    var totalCount = obj.totalCount; // 总记录数
    var pageSize = 5; // 每页显示几条记录
    var pageTotal = Math.ceil(totalCount / pageSize); // 总页数
    var startPage = pageSize * (pn - 1);
    var endPage = startPage + pageSize - 1;
    var $div = $("#json-list");
    $div.empty();
    for (var i = 0; i < pageSize; i++) {
        $div.append('<div class="li-tag"></div>');
    }
    var dataRoot = new Array();
    dataRoot = obj.data;
    var size = dataRoot.length;
    for (var j = 0; j < pageSize; j++) {
      if (j == size) {
        break;
      }
      $(".li-tag").eq(j).append("车牌号码:" + GLOBAL.car_map.get(dataRoot[j].vid) + "<br/>")
					.append("位置:" + dataRoot[j].position + "<br/>")
					.append("状态:" + GLOBAL.alarm_map.get(dataRoot[j].alarmType) + "<br/>")
					.append("报警时间:" + dataRoot[j].gpsTime + "<br/>")
    }

    $(".page-count").text(pageTotal);
}
function getPage(vids, alarmIds, startTime, endTime) {
    pn = 1;
    var obj = getAlarmHistory(vids, alarmIds, startTime, endTime, pn);
    var totalCount = obj.totalCount; // 总记录数
    var pageSize = 5; // 每页显示几条记录
    var pageTotal = Math.ceil(totalCount / pageSize); // 总页数
    if (totalCount != 0) {
      $('#pagination').show();
      $("#next").click(function () {
        if (pn == pageTotal) {
          alert("后面没有了");
          pn = pageTotal;
        } else {
          pn++;
          gotoPage(pn, vids, alarmIds, startTime, endTime);
        }
      });
      $("#previous").click(function () {
        if (pn == 1) {
          alert("前面没有了");
          pn = 1;
        } else {
          pn--;
          gotoPage(pn, vids, alarmIds, startTime, endTime);
        }
      })
      $("#firstPage").click(function () {
        pn = 1;
        gotoPage(pn, vids, alarmIds, startTime, endTime);
      });
      $("#endPage").click(function () {
        pn = pageTotal;
        gotoPage(pn, vids, alarmIds, startTime, endTime);
      });

      $("#firstPage").trigger("click");
    } else {
      //无记录
      $('#pagination').hide();
      var $div = $("#json-list");
      $div.empty();
      $div.append('<div class="li-tag">当前条件下没有报警信息!</div>');
    }
    
}
function gotoPage(pn, vids, alarmIds, startTime, endTime) {
    // alert(pn);
    $(".current-page").text(pn);
    getJSONData(pn, vids, alarmIds, startTime, endTime);
}

function getAlarmHistory(vids, alarmIds, startTime, endTime, pn) {
    var pro_8 = new Protocol(8,  {
      "vid": vids, alarmType: alarmIds, "startTime": startTime,
      "endTime": endTime, "rowCount": 5, "pageIndex": pn
    });
    var data_8 = JSON.stringify(pro_8);
    var alarmHistory_obj = new Object();	//存返回的结果
    $.ajax({
        async: false,
        type: "POST",
        url: hostUrl + "/ApiHandler.aspx",
        data: data_8,
        dataType: 'json',
        success: function (msg) {
          if (msg.commResponse.result == '1') { //成功
            alarmHistory_obj.totalCount = msg.content.totalCount;
            alarmHistory_obj.data = msg.content.data;
          } else if (msg.commResponse.result == '4') {  //无记录
            //do nothing 
            alarmHistory_obj.totalCount = 0;
          }
        }
    });
    return alarmHistory_obj;
}


$(function () {
    //获取url参数
    var carIds = getUrlParam('carIds');
    var carId_arr = (carIds.substr(0, carIds.length - 1)).split(',');
    var startTime = getUrlParam('startTime');
    var endTime = getUrlParam('endTime');
    var alarmIds = getUrlParam('alarmIds');
    var alarmId_arr = (alarmIds.substr(0, alarmIds.length - 1)).split(',');
    getPage(carId_arr, alarmId_arr, startTime, endTime);
})