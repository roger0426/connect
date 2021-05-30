$(document).ready(function(){
  
//  $("#feedback").mouseenter(function() {
//    $("#feedback-hover").show();
//  });
//  $('#feedback').mouseleave(function() {
//    $("#feedback-hover").hide();
//  });
//
//  $("#alert").mouseenter(function() {
//    if( $('#notificationboard').css('display') == 'none' ) {
//      $("#alert-hover").show();
//    }
//  });
//  $('#alert').mouseleave(function() {
//    $("#alert-hover").hide();
//  });
//
//  $("#message").mouseenter(function() {
//    $("#message-hover").show();
//  });
//  $('#message').mouseleave(function() {
//    $("#message-hover").hide();
//  });
//
//  $("#aboutus").mouseenter(function() {
//    $("#aboutus-hover").show();
//  });
//  $('#aboutus').mouseleave(function() {
//    $("#aboutus-hover").hide();
//  });
//
//  $("#logout").mouseenter(function() {
//    $("#profile-hover").show();
//  });
//  $('#logout').mouseleave(function() {
//    $("#profile-hover").hide();
//  });
//
//  $("#logout").mouseenter(function() {
//    $("#logout-hover").show();
//  });
//  $('#logout').mouseleave(function() {
//    $("#logout-hover").hide();
//  });
  
  
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
      //$('#notificationboard').css({"display": 'flex'});
      
      $("#notificationboard").animate({height: '45vh'}, 500, function() {
      });
    }
  });
  
  $(window).click(function() {
    console.log($('#notificationboard').css('display'))
    if($('#notificationboard').css('display') === 'block') {
      console.log("關閉通知");
      $("#alert").css({opacity: 1});
//      $('#clickfilter').hide();
      $("#notificationboard").animate({height: 0}, 500, function() {
        $("#notificationboard").hide();
      });
    }
  });
  
  $('#alert').click(function(event){
    event.stopPropagation();
  });

})
