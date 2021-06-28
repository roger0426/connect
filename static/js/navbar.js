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
        $("#notificationboard").css({'height': 'calc(100% - 3.5rem - 4.2rem + -2vh)', 'border': 'none', 'border-radius': 0})
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

  
  $('#title, #profile, #aboutus, #home, #aboutus, #profile').on("click", function() {
    $("#loading").show()
    $("#loading").animate({'opacity': 1}, 200, function() {
    })
  })
  
  
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
