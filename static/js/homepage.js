$(document).ready(function(){
  $("#gotop").click(function(){
    jQuery("html,body").animate({
        scrollTop:0
    },1000);
  });
  $(window).scroll(function() {
    if ( $(this).scrollTop() > 300){
        $('#gotop').fadeIn("fast");
    } else {
        $('#gotop').stop().fadeOut("fast");
    }
  });

  var toggle = true;
  $("#mark").click(function() {
    if (toggle) {
      $("img").attr("src", "./橘色的書籤")
      toggle = false;
    } else {
      $("img").attr("src", "./白色的書籤")
      toggle = true;
    }
  });


  $("#title").click(function() {
    console.log("click title");
    $("#eventwindow").show();
    $('#eventwindow').css({"opacity": 1});
    //$("#sent").toggle();
  });
  
  

  $("#applybutton").click(function() {
    console.log("click apply");
    //$("#sent").show();
    $('#sent').css({"z-index": 1});
    $("#sent").animate({opacity: 1}, 500, function() {
      
    })
  });
  
  $("#sent").click(function() {
    console.log("click sent");
    $("#sent").css({opacity: 0, "z-index": -1});
  });
  
  $("#exitbutton").click(function() {
    console.log("click event exit");
    $("#eventwindow").animate({opacity: 0}, 200, function() {
      $("#eventwindow").hide();
    })
  });
  
  //按window外，關閉event window
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

})
