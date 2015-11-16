<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="GPSWeixin.Views.Login" %>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>车圣导航</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="alternate icon" type="image/png" href="../Content/frame/assets/i/favicon.png">
    <link rel="stylesheet" href="../Content/frame/assets/css/amazeui.min.css" />
    <style>
      .am-header-default {
          /* background-color: #0e90d2; */
          background: url("../Content/img/header_bg.png");
          background-position: 20px 0px;
      }
    </style>
    <script src="../Scripts/jquery-1.7.1.min.js"></script>
    <script src="../Scripts/jQuery.md5.js"></script>
    <script type="text/javascript">
        var hostUrl = '<%="http://"+Request.Url.Host+ (Request.Url.Port==80?"":":"+Request.Url.Port) %>';
        //客户的website采用了虚拟路径
        //var hostUrl = '<%=Session["HostUrl"] %>';
        var currentView = '<%=Session["currentView"] %>';
        var currentUrl = hostUrl + "/Views/" + currentView;
        var carGroupUrl = hostUrl + "/Views/" + "CarGroup.aspx";
        var UserId = '<%=Session["UserId"] %>';
    </script>
    <script type="text/javascript">
        function login() {
            //32bit md5
            var pwd32 = $.md5(($("#password").val().trim()));
            //16bit md5
            var pwd = pwd32.substr(8, 16);
            console.log("pwd");
            console.log(pwd);
            var param = {
                code: "1",
                content: {
                    username: $("#user").val().trim(),
                    password: pwd
                }
            };
            $.ajax({
                url: hostUrl + "/ApiHandler.aspx",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(param),
                success: function (result) {
                    if (result["commResponse"] && result["commResponse"]["result"] && result["content"] && result["content"]["result"]
                        && result["commResponse"]["result"] == 1 && result["content"]["result"] == 1) {
                        if (currentView && currentView != "")
                            window.location.href = currentUrl;
                        else
                            window.location.href = carGroupUrl;
                    }
                    else
                        alert("请输入正确的用户名和密码");
                },
                error: function () {
                    alert("请检查网络连接");
                }
            });
        }
    </script>
</head>
<body id="body1">
<%--
    <header data-am-widget="header" class="am-header am-header-default">
        <h1 class="am-header-title">车圣导航</h1>
    </header>
--%>
    <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
        <br />
        <form method="post" class="am-form">
            <label for="user">用户名:</label>
            <input type="text" name="user" id="user" value="">
            <br>
            <label for="password">密码:</label>
            <input type="password" name="password" id="password" value="">
            <br>

            <div class="am-cf">
                <input type="button" name="" value="登 录" class="am-btn am-btn-primary am-btn-block am-radius" onclick="login()">
            </div>
        </form>

    </div>
   <%-- <label>UserId:</label>
    <label><%=Session["UserId"] %> </label>--%>
</body>
</html>
