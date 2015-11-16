$(function() {
	//获取url参数
	var carIds = getUrlParam('carIds');
	var carId_arr = (carIds.substr(0,carIds.length-1)).split(',');
	var startTime = getUrlParam('startTime');
	var endTime = getUrlParam('endTime');
	//获取里程统计数据
	var arr = getMileage(carId_arr, startTime, endTime);
	var length = arr.length;
	//拼接html文本
	var $div = $("#json-list");
	$div.empty();
	if (length == 0) {
	  $div.append('<div class="div-tag">该时间段内没有数据!</div>');
	} else {
	  for (var i = 0; i < length; i++) {
	    $div.append('<div class="div-tag"></div>');
	  }

	  for (var j = 0; j < length; j++) {
	    $(".div-tag").eq(j).append("车牌号码:" + GLOBAL.car_map.get(arr[j].vid) + "<br/>")
      .append("总里程:" + arr[j].runMile + "公里<br/>");
	  }
	}
})
