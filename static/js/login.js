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

  $('#login-btn')
  .on('click touch', function(){
    $('#white-bubble1').animate({width: '1000%', height: '1000%'}, 500);
    $('#white-bubble1').css('position', 'relative');
    $('#white-bubble1').css('z-index', 1000);
  })

  $('#sign-up-btn')
  .on('click touch', function(){
    console.log($('#terms').is(':checked'))
    if (!($('#terms').is(':checked'))) {
      alert('Please check your have accepted the terms.');
    }
    if (!($('#sign-pwd').val() === $('#double-pwd').val())) {
      alert('Please check your have typed correct password twice');
    }
  })
  
})

// check password validaty dynamically
let intervalId = window.setInterval(function(){ // check every 1.5 seconds
  if ($('#double-pwd').val().length > 0) {
    if ($('#sign-pwd').val() === $('#double-pwd').val()) {
      $('#err-msg').hide();
    } else {
      $('#err-msg').show();
      $('#err-msg').text("喔不，你的密碼好像打錯了！");
    }
  }
}, 1500);