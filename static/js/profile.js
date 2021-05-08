$(document).ready(function(){
  $('#tab-navbar :nth-child(1)')
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

  $('#tab-navbar :nth-child(2)')
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
  
  $('#tab-navbar :nth-child(3)')
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
  
  $('#tab-navbar :nth-child(4)')
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
  
  $('#tab-navbar :nth-child(5)')
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
  
})
