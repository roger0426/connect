$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  
  $("#tab-navbar :nth-child(1),#tag1")
  .on('click touch', function(){ 
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(1)').css('background-color','#FFE4DC')
    $('#indextag :nth-child(2)').css('background-color','white')
    $('#indextag :nth-child(3)').css('background-color','white')
    $('#indextag :nth-child(4)').css('background-color','white')
    $('#indextag :nth-child(5)').css('background-color','white')
  });

  $('#tab-navbar :nth-child(2),#tag2')
  .on('click touch', function(){ 
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(2)').css('background-color','#FFE4DC')
    $('#indextag :nth-child(1)').css('background-color','white')
    $('#indextag :nth-child(3)').css('background-color','white')
    $('#indextag :nth-child(4)').css('background-color','white')
    $('#indextag :nth-child(5)').css('background-color','white')
  });
  
  $('#tab-navbar :nth-child(3),#tag3')
  .on('click touch', function(){ 
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').show();
    $('#indextag :nth-child(3)').css('background-color','#FFE4DC')
    $('#indextag :nth-child(1)').css('background-color','white')
    $('#indextag :nth-child(2)').css('background-color','white')
    $('#indextag :nth-child(4)').css('background-color','white')
    $('#indextag :nth-child(5)').css('background-color','white')
  });
  
  $('#tab-navbar :nth-child(4), #tag4')
  .on('click touch', function(){
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(4)').css('background-color','#FFE4DC')
    $('#indextag :nth-child(1)').css('background-color','white')
    $('#indextag :nth-child(2)').css('background-color','white')
    $('#indextag :nth-child(3)').css('background-color','white')
    $('#indextag :nth-child(5)').css('background-color','white')
  });
  
  $('#tab-navbar :nth-child(5), #tag5')
  .on('click touch', function(){
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(5)').css('background-color','#FFE4DC')
    $('#indextag :nth-child(1)').css('background-color','white')
    $('#indextag :nth-child(2)').css('background-color','white')
    $('#indextag :nth-child(3)').css('background-color','white')
    $('#indextag :nth-child(4)').css('background-color','white')
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
  
})
