$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  
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
    $('#white-bubble1').animate({width: '2000%', height: '2000%'}, 1000);
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
let intervalId = window.setInterval(function(){ // check every 0.5 seconds
  if ($('#double-pwd').val().length > 0) {
    if ($('#sign-pwd').val() === $('#double-pwd').val()) {
      $('#err-msg').hide();
      $('#sign-up-btn').prop('disabled', false);
    } else {
      $('#err-msg').show();
      $('#sign-up-btn').prop('disabled', true);
      $('#err-msg').text("喔不，你的密碼好像打錯了！");
    }
  }
  if (!($('#terms').is(':checked')) ||
      $('#double-pwd').val().length == 0 ||
      $('#email').val().length == 0 ||
      $('#sid').val().length == 0) {
    $('#sign-up-btn').prop('disabled', true);

  } else {
    $('#sign-up-btn').prop('disabled', false);
  }
  

}, 500);




