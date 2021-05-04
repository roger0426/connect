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
  })


  $("#title").click(function() {
    console.log("click title");
    $("#eventwindow").toggle();
    $("#sent").toggle();
  })

  $("#applybutton").click(function() {
    console.log("click apply");
    //$("#sent").show();
    $('#sent').css({"z-index": 1});
    $("#sent").animate({opacity: 1}, 500, function() {
    })
  })
  
  $("#sent").click(function() {
    console.log("click sent");
    $("#sent").css({opacity: 0, "z-index": -1});
  })

})
