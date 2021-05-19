$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
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
  
  $('.card') // card animation
  .on('mouseenter', function(){ // mouse enter
    $('.card-detail', this).stop(true, false).animate({height: '100%'}, 400);
    $('.card-bg', this).stop(true, false).animate({height: '100%', opacity: 0.9}, 400);
    $('.personal-name', this).stop(true, false).animate({'padding-bottom': '2%'}, 400);
    $('.card-detail div', this).stop(true, false).show(duration = 400); // show hidden details
  })

  .on('mouseleave', function(){ // mouse release
    $('.card-detail', this).stop(true, false).animate({height: '28%'}, 700);
    $('.card-bg', this).stop(true, false).animate({height: '28%', opacity: 0.85}, 700);
    $('.personal-name', this).stop(true, false).animate({'padding-bottom': 0}, 700);
    $('.card-detail div', this).stop(true, false).hide(duration = 700);
  })

  if (!$('card-bg').is(':animated')) { // prevent unexpected showing details
    $('.card-detail div').hide();
  }
    
  $('.button') // navbar button animation
  .on('mouseenter', function(){
    $(this).css("text-decoration", "underline");
  })
  .on('mouseout', function(){ // mouse release
    $(this).css("text-decoration", "none");
  })
})

