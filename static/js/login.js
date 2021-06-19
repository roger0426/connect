$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  //$("#alert").parent().hide();
  
  //$("#message").parent().hide();
  
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

$('p#sign-up').on('click', function() {
  // check password validaty dynamically
  let intervalId = window.setInterval(function(){ // check every 0.5 seconds
    if ($("#sign-up-panel").is(":visible")) { // prevent from checking when loggging in
      if (!($('#terms').is(':checked')) ||
          $('#double-pwd').val().length == 0 ||
          $('#email').val().length == 0 ||
          $('#sid').val().length == 0) {
        $('#sign-up-btn').prop('disabled', true);

      } else {
        $('#sign-up-btn').prop('disabled', false);
      }
      console.log("check signup condition")
    }
  }, 500);
})

$('input').keyup(function() {
  if ($('#double-pwd').val().length > 0) {
    if ($('#sign-pwd').val() === $('#double-pwd').val()) {
      $('.err-msg').hide();
      $('#sign-up-btn').prop('disabled', false);
    } else {
      $('.err-msg').show();
      $('#sign-up-btn').prop('disabled', true);
      $('.err-msg').text("喔不，你的密碼好像打錯了！");
//      $('#sign-up-panel').css('height', '77vh');
    }
  }
})

function send_verification_handler(URL, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  let timerInterval
  Swal.fire({
    title: '申請處理中',
    html: '請稍等......',
    timer: 2000,
    timerProgressBar: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'sid': $("#sid").val(),
      'email': $("#email").val()
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("verification email successfully");
        $("#send-check").prop('disabled', true);
        setTimeout(function() {
          $("#send-check").removeAttr("disabled");      
        }, 60000);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '確認信已送出',
          text: "去確認看看吧，如未收到信件請於60秒後重試",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        console.log(data.error_message);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '喔不出錯了',
          text: "請再確認一次 " + data.error_message,
          showConfirmButton: false,
          timer: 2000,
        })
      }
    }
  })
}
