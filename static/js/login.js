$(document).ready(function(){
  console.log('in');
  $('#sign-up')
  .on('click touch', function(){ 
    $('#login-panel').hide();
    $('#sign-up-panel').show();
    console.log('here');
  })

  $('#login') 
  .on('click touch', function(){ 
    $('#login-panel').show();
    $('#sign-up-panel').hide();
  })

})