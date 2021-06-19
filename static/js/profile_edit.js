$(document).ready(function(){
//  $('.tags').mouseenter(function() {
//    $(this).parent().css({'background-color': 'rgba(255, 207, 191, 0.6)'});
//    $(this).parent().find('.normaltag').css({'color': 'rgba(255, 207, 191, 0.6)'});
//    $(this).parent().find('.deletetag').css({'display': 'block'});
//  });
//  $('.tags').mouseleave(function() {
//    $(this).parent().css({'background-color': 'rgba(255, 207, 191)'});
//    $(this).parent().find('.normaltag').css({'color': 'black'});
//    $(this).parent().find('.deletetag').css({'display': 'none'});
//  });
  
  $('.tag-style').mouseenter(function() {
    $(this).css({'cursor': 'pointer'})
    $(this).css({'background-color': 'rgba(255, 207, 191, 0.6)'});
    $(this).find('.normaltag').css({'color': 'rgba(255, 207, 191, 0.6)'});
    $(this).find('.deletetag').css({'display': 'block'});
  });
  $('.tag-style').mouseleave(function() {
    $(this).css({'background-color': 'rgba(255, 207, 191)'});
    $(this).find('.normaltag').css({'color': 'black'});
    $(this).find('.deletetag').css({'display': 'none'});
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
  
})

function tag_edit_handler(URL, CSRF, text, tag_type) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  console.log(text)
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'text': text,
      'type': tag_type
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('[Success] Successfully add new tag ' + text);
        $('.' + tag_type + '-input').before(
          "<div class='tag-style'><pz class='tags normaltag'>" + text + "</pz><p class='tags deletetag'>刪除</p></div>"
        );
        $('.' + tag_type + '-input').val("")
      } else {
        $('.' + tag_type + '-input').val("")
        console.log("[Error] " + data.error_message);
      }
    }
  })
}

function tag_delete_handler(URL, CSRF, text) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  console.log(text);
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'text': text,
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('[Success] Successfully delete tag ' + text);
      } else {
        console.log("[Error] " + data.error_message);
      }
    }
  })
}
