$(document).ready(function(){
  $('#tab-navbar :nth-child(1)')
  .on('click touch', function(){ 
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
  });

  $('#tab-navbar :nth-child(2)')
  .on('click touch', function(){ 
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
  });
  $('#tab-navbar :nth-child(3)')
  .on('click touch', function(){ 
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').show();
  });
  
})
