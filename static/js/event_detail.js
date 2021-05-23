function like_handler(URL, CSRF, event_id) {
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
        let img_url = data.user_img_url;
        let hostname = $(location).attr('hostname');

        if (data.add) {
          let profile_url = hostname + '/profile/' + data.user_id
          let str = "<a herf='" + profile_url + "'>\
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
        console.log("[Error]: like ajax error");
      }
    }
  })
}

function message_handler(URL, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'text': $("input.eventmsg-insert").val()
    },
    dataType: 'json',
    success: function(data) {
      if($(".eventmsg #eventmsg-right #eventmsg-righttop p#event-date").text() == '目前沒有留言喔～') {
        $("#eventmsg-board").empty();
      }
      let str = "<div class='eventmsg'> <a> <img class='sender' src='" + data.author_img_url +
          "'></img></a><div id='eventmsg-right'><div id='eventmsg-righttop'><a id='eventmsg-sendername'>" + 
          data.author_name + "</a><p id='event-date'>" + data.msg_date + "</p></div><div id='eventmsg-rightbottom'>" +
          "<p id='eventmsgtext'>" + $("input.eventmsg-insert").val() + "</p></div></div>";
      console.log(str);
      $("#eventmsg-board").prepend(str);
      $("input.eventmsg-insert").val("");
    }
  })
}