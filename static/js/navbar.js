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
  
    
  $('#alert').click(function(){
    if ( $('#notificationboard').css('display') == 'block') {
      console.log("關閉通知");
      $("#alert").css({opacity: 1});
//      $('#clickfilter').hide();
      $("#notificationboard").animate({height: 0}, 500, function() {
        $("#notificationboard").hide();
      });
    } else {
      $("#alert-hover").hide();
      console.log("打開通知");
      $("#alert").css({opacity: 0.6})
      $("#notificationboard").show();
//      $('#clickfilter').show();
//      $('#notificationboard').css({"display": 'flex'});
      
      $("#notificationboard").animate({height: '45vh'}, 500, function() {
      });
    }
  });
  
  $(window).click(function() {
//    console.log($('#notificationboard').css('display'))
    if($('#notificationboard').css('display') === 'block') {
      console.log("關閉通知");
      $("#alert").css({opacity: 1});
//      $('#clickfilter').hide();
      $("#notificationboard").animate({height: 0}, 500, function() {
        $("#notificationboard").hide();
      });
    }
  });
  
  $('#alert, #notificationboard').click(function(event){
    event.stopPropagation();
  });

  
  $('#title, #profile, #feedback').on("click", function() {
    $("#loading").show()
    $("#loading").animate({'opacity': 1}, 200, function() {
    })
  })
})
