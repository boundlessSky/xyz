
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
  var vid = getUrlParam('vid');
  //carId--carLicense map
  var car_map = GLOBAL.car_map;

  var license = car_map.get(vid);

  var vids = [];
  vids.push(vid);
  var car_actual_arr = getCarActualInfo(vids, interval); //length == 1

  var gpsTime = car_actual_arr[0].gpsTime;
  var speed = car_actual_arr[0].speed;
  var lon = car_actual_arr[0].lon;
  var lat = car_actual_arr[0].lat;
  var direction = parseInt(car_actual_arr[0].direction);

  var str = "车牌:" + license + "<br/>速度:" + speed + "<br/>时间:" + gpsTime;

  var map = new BMap.Map("container");          // 创建地图实例  

  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());
  map.enableScrollWheelZoom(true);

  var gpsPoint = new BMap.Point(lon, lat);  // 创建点坐标

  var marker;
  var label;
  //坐标转换完之后的回调函数
  translateCallback = function (point) {
    if (marker == undefined) {
      map.centerAndZoom(point, 16);   // 初始化地图，设置中心点坐标和地图级别
      var iconImg = createIcon(direction);
      marker = new BMap.Marker(point, { icon: iconImg });
      label = new window.BMap.Label(str, { offset: new window.BMap.Size(25, -10) });
      marker.setLabel(label);
      map.addOverlay(marker);
    } else {//update point
      var iconImg = createIcon(direction);
      marker.setPosition(point, { icon: iconImg });
      label.setContent(str);
    }
  }

  BMap.Convertor.translate(gpsPoint, 0, translateCallback);     //真实经纬度转成百度坐标    

  //自动刷新位置

  updatePosition = function () {
    car_actual_arr = getCarActualInfo(vids, interval); //length == 1

    gpsTime = car_actual_arr[0].gpsTime;
    speed = car_actual_arr[0].speed;
    lon = car_actual_arr[0].lon;
    lat = car_actual_arr[0].lat;
    direction = parseInt(car_actual_arr[0].direction);

    str = "车牌:" + license + "<br/>速度:" + speed + "<br/>时间:" + gpsTime;
    gpsPoint = new BMap.Point(lon, lat);
    BMap.Convertor.translate(gpsPoint, 0, translateCallback);     //真实经纬度转成百度坐标    
  }

  setInterval(updatePosition, 1000 * interval);//1000 * interval

});