function like_handler(URL, CSRF, event_id, img_url) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      event_id: event_id, 
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == '200') {
        console.log('success')
        if (data.add) {
          let str = "<a herf='{% url 'profile' request.user.userextend.pk %}'>\
          <img class='member interested' src= " + img_url + "></a>";
          console.log(str);
          $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
          $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
          $('#member').append(str);
        } else if (data.remove) {
          let user_selector = "#member a img[src='" + img_url + "']";
          console.log(user_selector)
          $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
          $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
          $(user_selector).remove();
        }
      } else {
        console.log("Error: ajax error");
      }
    }
  })
}