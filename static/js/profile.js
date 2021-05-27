$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  $('#phoneerrormsg').click(function(){
    $('#phoneerrormsg').hide();
  });
  
  
  $(".normaltag").mouseenter(function() {
    if($(this).parent().find('.deletetag').css({'display': 'none'}).length == 0) {
      $(this).parent().css({'background-color': '#FFAD94'});
    }
  });
  $('.normaltag').mouseleave(function() {
    if($(this).parent().find('.deletetag').css({'display': 'none'}).length == 0) {
      $(this).parent().css({'background-color': '#FFCFBF'});
    }
  });
  
  $(".normaltag").click(function() {
    if($(this).parent().find('.tag-commend').css("display") == "none") {
      $(this).parent().find('.tag-commend').css({'display': 'flex'});
      $(".normaltag").not(this).parent().find('.tag-commend').css({'display': 'none'});
    }
    else {
      $(this).parent().find('.tag-commend').css({'display': 'none'});
    }
  });
  
  $("#tab-navbar :nth-child(1),#tag1").on('click touch', function(){
    console.log("1");
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(1)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(1))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(2),#tag2").on('click touch', function(){
    console.log("2");
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(2)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(2))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(3),#tag3").on('click touch', function(){
    console.log("3");
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').show();
    $('#indextag :nth-child(3)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(3))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(4),#tag4").on('click touch', function(){
    console.log("4");
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(4)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(4))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(5),#tag5").on('click touch', function(){
    console.log("5");
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(5)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(5))').css('background-color','white')
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
  
  $("#exitbtn1, #filter1").click(function() {
    console.log("click event exit");
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#filter1").animate({opacity: 0}, 400, function() {
      $("#filter1").hide();
    })
  });
  
  let intervalId = window.setInterval(function(){ // check every 0.5 seconds
    if($('#user-image').val() != "") {
      $('#editpicfilter').hide();
      $('#fileselectedfilter').show();
    }
    else {
      $('#editpicfilter').show();
      $('#fileselectedfilter').hide();
    }
  }, 2000);
  
  $
  
  
})
