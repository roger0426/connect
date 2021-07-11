$(document).ready(function(){
  $('.button').mouseenter(function() {
    if( this.id == 'alert' && $('#notificationboard').css('display') == 'block' ) {
      //$("#alert-hover").show();
    } else {
      $(this).parent().find('.hover').show();
    }
  });
  $('.button').mouseleave(function() {
    $(this).parent().find('.hover').hide();
  });
  
  $("#gotop").mouseenter(function() {
    $("#gotop").css({opacity: 0.65});
  });
  $('#gotop').mouseleave(function() {
    $("#gotop").css({opacity: 1});
  });
  
  $("#gotop").click(function(){
    jQuery("html,body").animate({
        scrollTop:0
    },1000);
  });
  $(window).scroll(function() {
    if ( $(this).scrollTop() > 50){
      $('#gotop').fadeIn("fast");
    } else {
      $('#gotop').stop().fadeOut("fast");
    }
  });  
  
    
  $('.alert').click(function(){
    if ( $('#notificationboard').css('display') == 'block') {
      console.log("關閉通知");
      $(".alert").css({opacity: 1});
//      $('#clickfilter').hide();
      
      
      //pwa
      if($(window).width() < 480) {
        $("#notificationboard").hide();
      }else{
        //desktop
        $("#notificationboard").animate({height: 0}, 500, function() {
          $("#notificationboard").hide();
        });
      }
      
    } else {
      $("#alert-hover").hide();
      $(".alert").css({opacity: 0.6})
      $("#notificationboard").show();
//      $('#clickfilter').show();
//      $('#notificationboard').css({"display": 'flex'});
      
      
      //pwa
      if($(window).width() < 480) {
        $("#notificationboard").css({'height': 'calc(100% - 3.5rem - 4.2rem + -2vh)', 'border': 'none', 'border-radius': 0, 'top': '3.2rem'})
        $("#notices").css({height: 'calc(100% - 2.5rem)'})
      }else{
        //desktop
        $("#notificationboard").animate({height: '45vh'}, 500, function() {
        });
      }
      
    }
  });
  
  $(window).click(function() {
//    console.log($('#notificationboard').css('display'))
    if($('#notificationboard').css('display') === 'block') {
      console.log("關閉通知");
      $(".alert").css({opacity: 1});
      
      if($(window).width() < 480) {
        $("#notificationboard").hide();
      }else{
        $("#notificationboard").animate({height: 0}, 500, function() {
          $("#notificationboard").hide();
        });
      }
      
    }
  });
  
  $('.alert, #notificationboard').click(function(event){
    event.stopPropagation();
  });

  $("#message").click(function() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '功能開發中',
      text: "可以之後再回來看看喔~",
      showConfirmButton: false,
      timer: 1500,
    })
  })

  
//  $('#title, #profile, #aboutus, #home, #aboutus, #profile').on("click", function() {
//    $("#loading").show()
//    $("#loading").animate({'opacity': 1}, 200, function() {
//    })
//  })
  
  
//  //app responsive
//  $('#selecticon').click(function(){
//    if ($('#feedback').css('display') === "none"){
//      $('#navbar').css({'border-radius': '0 0 0.5rem 0.5rem'});
//      $("#navbar").animate({'padding-bottom': '5rem'}, 150, function() {
//      });
//      $("#container").animate({'padding-top': '4.5rem'}, 150, function() {
//        $('#feedback, .alert, #message, #aboutus').css({'display': "block"});
//      });
//      $("#profilepanel").animate({'padding-top': '4.5rem'}, 150, function() {
//        $('#feedback, .alert, #message, #aboutus').css({'display': "block"});
//      });
//      $("#group-img").animate({'top': '7.5rem'}, 150, function() {
//        $('#feedback, .alert, #message, #aboutus').css({'display': "block"});
//      });
//      $("#img-cards").animate({'top': '20rem'}, 150, function() {
//      });
//    } else {
//      $('#navbar').css({'border-radius': '0'});
//      $('#feedback, .alert, #message, #aboutus').css({'display': "none"});
//      $("#navbar").animate({'padding-bottom': '0'}, 150, function() {
//      });
//      $("#container").animate({'padding-top': '0'}, 150, function() {
//      });
//      $("#profilepanel").animate({'padding-top': '0'}, 150, function() {
//      });
//      $("#group-img").animate({'top': '2rem'}, 150, function() {
//      });
//      $("#img-cards").animate({'top': '14rem'}, 150, function() {
//      });
//    }
//  })
})

var pStart = {x: 0, y:0};
var pStop = {x:0, y:0};

function swipeStart(e) {
  if (typeof e['targetTouches'] !== "undefined"){
      var touch = e.targetTouches[0];
      pStart.x = touch.screenX;
      pStart.y = touch.screenY;
  } else {
      pStart.x = e.screenX;
      pStart.y = e.screenY;
  }
}

function swipeEnd(e){
  if (typeof e['changedTouches'] !== "undefined"){
      var touch = e.changedTouches[0];
      pStop.x = touch.screenX;
      pStop.y = touch.screenY;
  } else {
      pStop.x = e.screenX;
      pStop.y = e.screenY;
  }

  swipeCheck();
}

function swipeCheck(){
  var changeY = pStart.y - pStop.y;
  var changeX = pStart.x - pStop.x;
  if (isPullDown(changeY, changeX) ) {
    if($(window).width() < 480){
      console.log('pull down reloading');
      $('#container').css('margin-top', "5rem");
      location.reload();
    }else{}
  }
}

function isPullDown(dY, dX) {
  // methods of checking slope, length, direction of line created by swipe action 
  return dY < 0 && (
      (Math.abs(dX) <= 80 && Math.abs(dY) >= 100)  //300
      || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 25)   //60
  );
}

document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);