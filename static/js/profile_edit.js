function tag_edit_handler(URL, CSRF, text, tag_type) {
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
      'type': tag_type
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('[Success] Successfully add new tag ' + text);
        $('.' + tag_type + '-input').before(
          "<div class='tag-style'><p class='tags'>" + text + "</p></div>"
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