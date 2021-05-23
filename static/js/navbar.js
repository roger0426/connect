$(document).ready(function(){
  
  $("#feedback").mouseenter(function() {
    $("#feedback-hover").show();
  });
  $('#feedback').mouseleave(function() {
    $("#feedback-hover").hide();
  });
  
  $("#alert").mouseenter(function() {
    if( $('#notificationboard').css('display') == 'none' ) {
      $("#alert-hover").show();
    }
  });
  $('#alert').mouseleave(function() {
    $("#alert-hover").hide();
  });
  
  $("#message").mouseenter(function() {
    $("#message-hover").show();
  });
  $('#message').mouseleave(function() {
    $("#message-hover").hide();
  });
  
  $("#aboutus").mouseenter(function() {
    $("#aboutus-hover").show();
  });
  $('#aboutus').mouseleave(function() {
    $("#aboutus-hover").hide();
  });
  
  $("#logout").mouseenter(function() {
    $("#logout-hover").show();
  });
  $('#logout').mouseleave(function() {
    $("#logout-hover").hide();
  });
  
  
    
  $('#alert').click(function(){
    if ( $('#notificationboard').css('display') == 'block') {
      console.log("關閉通知");
      $("#alert").css({opacity: 1});
      $('#clickfilter').hide();
      $("#notificationboard").animate({height: 0}, 500, function() {
        
        $("#notificationboard").hide();
      });
    } else {
      $("#alert-hover").hide();
      console.log("打開通知");
      $("#alert").css({opacity: 0.6})
      $("#notificationboard").show();
      $('#clickfilter').show();
      //$('#notificationboard').css({"display": 'flex'});
      
      $("#notificationboard").animate({height: '45vh'}, 500, function() {
      });
    }
  });
  
  $('#clickfilter').click(function() {
    if ( $('#notificationboard').css('display') == 'block') {
      console.log("關閉通知");
      $("#alert").css({opacity: 1});
      $('#clickfilter').hide();
      $("#notificationboard").animate({height: 0}, 500, function() {
        $("#notificationboard").hide();
      });
    }
  });

})
