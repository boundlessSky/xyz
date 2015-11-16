
var data_info = [];
var points = [];
var BM_points = [];
var directions = [];
var initialized = false;

$(function () {
  //获取刷新间隔
  var interval;
  $.ajax({
    async: false,
    url: hostUrl + "/actions/GetRealtimeAlarm.aspx",
    type: "POST",
    dataType: "json",
    success: function (data) {
      interval = data.interval;
    }
  });

  //获取url参数
  var carIds = getUrlParam('carIds');
  var carId_arr = carIds.substr(0, carIds.length - 1).split(',');
  var car_actual_arr = getCarActualInfo(carId_arr, interval);
  //车辆 vid与vLicense 映射关系
  var car_map = GLOBAL.car_map;

  for (var i = 0, len = car_actual_arr.length; i < len; i++) {
    var info = new Object();
    var carId = car_actual_arr[i].vid;
    var license = car_map.get(carId);
    var lon = car_actual_arr[i].lon;
    var lat = car_actual_arr[i].lat;
    var speed = car_actual_arr[i].speed;
    var time = car_actual_arr[i].gpsTime;
    var text = "车牌:" + license + "<br/>速度:" + speed + "<br/>时间:" + time;
    info.lon = lon;
    info.lat = lat;
    info.text = text;
    data_info.push(info);
    points.push(new BMap.Point(lon, lat));
    directions.push(parseInt(car_actual_arr[i].direction));
  }

  callback = function (xyResults) {
    map.clearOverlays();  //清除覆盖物
    BM_points.length = 0;
    var xyResult = null;
    for (var i = 0, len = xyResults.length; i < len; i++) {
      xyResult = xyResults[i];
      if (xyResult.error != 0) { continue; }//出错就直接返回;
      data_info[i].lon = xyResult.x;
      data_info[i].lat = xyResult.y;
      var point = new BMap.Point(data_info[i].lon, data_info[i].lat);
      BM_points.push(point);
      var iconImg = createIcon(directions[i]);
      var marker = new BMap.Marker(point, { icon: iconImg });
      var content = data_info[i].text;
      var label = new window.BMap.Label(content, { offset: new window.BMap.Size(25, -10) });
      marker.setLabel(label);
      map.addOverlay(marker);               // 将标注添加到地图中
      addClickHandler(content, marker);
    }
    if (!initialized) {
      initialized = true;
      map.setViewport(BM_points); //设置视野
    }
  }

  map = new BMap.Map("container");
  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());
  map.enableScrollWheelZoom(true);
  map.centerAndZoom(new BMap.Point(data_info[0].lon, data_info[0].lat), 13);
  BMap.Convertor.transMore(points, 0, callback);  //参数0，表示是从GPS到百度坐标

  var opts = {
    width: 0,     // 信息窗口宽度
    height: 0,     // 信息窗口高度
    title: "", // 信息窗口标题
    enableMessage: false//设置允许信息窗发送短息
  };

  function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
      openInfo(content, e)
    }
		);
  }

  function openInfo(content, e) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point); //开启信息窗口
  }

  //自动刷新位置信息
  updatePosition = function () {
    car_actual_arr.length = 0;
    car_actual_arr = getCarActualInfo(carId_arr, interval);

    data_info.length = 0; //清空数组
    points.length = 0;
    directions.length = 0;
    for (var i = 0, len = car_actual_arr.length; i < len; i++) {
      var info = new Object();
      var carId = car_actual_arr[i].vid;
      var license = car_map.get(carId);
      var lon = car_actual_arr[i].lon;
      var lat = car_actual_arr[i].lat;
      var speed = car_actual_arr[i].speed;
      var time = car_actual_arr[i].gpsTime;
      var text = "车牌:" + license + "<br/>速度:" + speed + "<br/>时间:" + time;
      info.lon = lon;
      info.lat = lat;
      info.text = text;
      data_info.push(info);
      points.push(new BMap.Point(lon, lat));
      directions.push(parseInt(car_actual_arr[i].direction));
    }

    BMap.Convertor.transMore(points, 0, callback);

  }

  //定时刷新任务
  setInterval(updatePosition, 1000 * interval);//1000 * interval

})
