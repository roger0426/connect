"use strict";

$(document).ready(function () {
  $("#gotop").click(function () {
    jQuery("html,body").animate({
      scrollTop: 0
    }, 1000);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#gotop').fadeIn("fast");
    } else {
      $('#gotop').stop().fadeOut("fast");
    }
  });
  var toggle = true;
  $("#mark").click(function () {
    if (toggle) {
      $("img").attr("src", "./橘色的書籤");
      toggle = false;
    } else {
      $("img").attr("src", "./白色的書籤");
      toggle = true;
    }
  });
  $("#title").click(function () {
    console.log("click title");
    $("#eventwindow").show();
    $("#eventwindow").animate({
      opacity: 1
    }, 400);
    $("#eventcreatewindow").show();
    $("#eventcreatewindow").animate({
      opacity: 1
    }, 400);
    $("#filter1").show();
    $("#filter1").animate({
      opacity: 1
    }, 400, function () {}); //$("#sent").toggle();
  });
  $("#applybutton").click(function () {
    console.log("click apply"); //$("#sent").show();

    $('#sent').css({
      "z-index": 1
    });
    $("#sent").animate({
      opacity: 1
    }, 500, function () {});
  });
  $("#sent").click(function () {
    console.log("click sent");
    $("#sent").css({
      opacity: 0,
      "z-index": -1
    });
  });
  $("#exitbtn1, #filter1").click(function () {
    console.log("click event exit");
    $("#eventwindow").animate({
      opacity: 0
    }, 400, function () {
      $("#eventwindow").hide();
    });
    $("#filter1").animate({
      opacity: 0
    }, 400, function () {
      $("#filter1").hide();
    });
  });
  $("#exitbtn2").click(function () {
    console.log("click event exit");
    $("#eventcreatewindow").animate({
      opacity: 0
    }, 400, function () {
      $("#eventcreatewindow").hide();
    });
    $("#filter1").animate({
      opacity: 0
    }, 400, function () {
      $("#filter1").hide();
    });
  });
  $("#submit-btn").click(function () {
    console.log("click event submit");
    console.log($("#id_title").val().length);

    if ($("#id_title").val().length > 0 && $("#id_detail").val().length > 0) {
      $("#eventcreatewindow").animate({
        opacity: 0
      }, 400, function () {
        $("#eventcreatewindow").hide();
      });
      $("#filter1").animate({
        opacity: 0
      }, 400, function () {
        $("#filter1").hide();
      });
      alert("活動已創建！");
    } else {
      alert("活動未創建，請輸入必要欄位");
    }
  }); //按window外，關閉event window

  /* Mark 1 的原理：
  判断点击事件发生在区域外的条件是：
  1. 点击事件的对象不是目标区域本身
  2. 事件对象同时也不是目标区域的子元素
  */

  /*
  $(document).click(function(e){
    var _con = $('#eventwindow');   // 设置目标区域
    if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
      // 功能代码
      console.log("click !eventwindow");
      $("#sent").css({opacity: 0, "z-index": -1});
      $("#eventwindow").hide();
      $("#sent").hide();
    }
  });
  */
});