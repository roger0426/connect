$(document).ready(function(){
  $('#tab-navbar :nth-child(1)')
  .on('click touch', function(){ 
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(1)').css({opacity: 1})
    $('#indextag :nth-child(2)').css({opacity: 0.2})
    $('#indextag :nth-child(3)').css({opacity: 0.2})
    $('#indextag :nth-child(4)').css({opacity: 0.2})
    $('#indextag :nth-child(5)').css({opacity: 0.2})
  });

  $('#tab-navbar :nth-child(2)')
  .on('click touch', function(){ 
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(2)').css({opacity: 1})
    $('#indextag :nth-child(1)').css({opacity: 0.2})
    $('#indextag :nth-child(3)').css({opacity: 0.2})
    $('#indextag :nth-child(4)').css({opacity: 0.2})
    $('#indextag :nth-child(5)').css({opacity: 0.2})
  });
  
  $('#tab-navbar :nth-child(3)')
  .on('click touch', function(){ 
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').show();
    $('#indextag :nth-child(3)').css({opacity: 1})
    $('#indextag :nth-child(1)').css({opacity: 0.2})
    $('#indextag :nth-child(2)').css({opacity: 0.2})
    $('#indextag :nth-child(4)').css({opacity: 0.2})
    $('#indextag :nth-child(5)').css({opacity: 0.2})
  });
  
  $('#tab-navbar :nth-child(4)')
  .on('click touch', function(){
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(4)').css({opacity: 1})
    $('#indextag :nth-child(1)').css({opacity: 0.2})
    $('#indextag :nth-child(2)').css({opacity: 0.2})
    $('#indextag :nth-child(3)').css({opacity: 0.2})
    $('#indextag :nth-child(5)').css({opacity: 0.2})
  });
  
  $('#tab-navbar :nth-child(5)')
  .on('click touch', function(){
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(5)').css({opacity: 1})
    $('#indextag :nth-child(1)').css({opacity: 0.2})
    $('#indextag :nth-child(2)').css({opacity: 0.2})
    $('#indextag :nth-child(3)').css({opacity: 0.2})
    $('#indextag :nth-child(4)').css({opacity: 0.2})
  });
  
})
