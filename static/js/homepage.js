$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  $('#phoneerrormsg').click(function(){
    $('#phoneerrormsg').hide();
  });
  
  
  $("#gotop").mouseenter(function() {
    $("#gotop").css({opacity: 0.65});
  });
  $('#gotop').mouseleave(function() {
    $("#gotop").css({opacity: 1});
  });
  
  $("#gotop").click(function(){
    jQuery("html,body").animate({
        scrollTop:0
    },1000);
  });
  $(window).scroll(function() {
    if ( $(this).scrollTop() > 50){
      $('#gotop').fadeIn("fast");
    } else {
      $('#gotop').stop().fadeOut("fast");
    }
  });


  $("#insertbox").click(function() {
    console.log("click createevent");
    //$("#eventwindow").show();
    //$("#eventwindow").animate({opacity: 1}, 400);
    
    
    $('input[type=text]').val('');
    $('textarea').val('');
    $('#id_image').val('');
    
    $("#filter1").show();
    $("#filter1").animate({opacity: 1}, 200, function() {
      if ($("#eventcreatewindow").css('display') == 'none') {
        $("#eventcreatewindow").show();
      }
      else {
        $("#eventcreatewindow").css({'content-visibility': 'visible'});
      }
      $("#eventcreatewindow").animate({opacity: 1}, 400);
    })
    //$("#sent").toggle();
  });
  
  
  $("#applybutton").click(function() {
    console.log("click apply");
    //$("#sent").show();
    $('#sent').css({"z-index": 1});
    $("#sent").animate({opacity: 1}, 500, function() {
      
    })
  });
  
  $("#sent").click(function() {
    console.log("click sent");
    $("#sent").css({opacity: 0, "z-index": -1});
  });
  
  $("#exitbtn1, #filter1").click(function() {
    console.log("click event exit");
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  
  $("#exitbtn2, #filter1").click(function() {
    console.log("click event exit");
    $("#eventcreatewindow").animate({opacity: 0}, 400, function() {
      $('input[type=text]').val('');
      $('textarea').val('');
      $('#id_image').val('');
      $("#eventcreatewindow").css({'content-visibility': 'hidden'});
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });

  $("#submit-btn").click(function() {
    console.log("click event submit");
    console.log($("#id_title").val().length)
    duplicate('post');
    if ($("#id_title").val().length > 0 && $("#id_detail").val().length > 0) {
      
      $("#eventcreatewindow").animate({opacity: 0}, 400, function() {
        $("#eventcreatewindow").hide();
      })
      $("#filter1").animate({opacity: 0}, 400, function() {
        $("#filter1").hide();
      })
      alert("活動已創建！");
    } else {
      alert("活動未創建，請輸入必要欄位");
    }
  })

  
  let searchParams = window.location.href
  if (searchParams.includes('event')) {
    console.log('here')
    //$('#eventwindow').show();
    $('#eventwindow').css({'display': 'flex'});
  }

  let intervalId = window.setInterval(function(){ // check every 0.5 seconds
    $('#insertbar').toggle();
  }, 450);



  
  //按window外，關閉event window
  /* Mark 1 的原理：
  判断点击事件发生在区域外的条件是：
  1. 点击事件的对象不是目标区域本身
  2. 事件对象同时也不是目标区域的子元素
  */
  /*
  $(document).click(function(e){
    var _con = $('#eventwindow');   // 设置目标区域
    if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
      // 功能代码
      console.log("click !eventwindow");
      $("#sent").css({opacity: 0, "z-index": -1});
      $("#eventwindow").hide();
      $("#sent").hide();
    }
  });
  */
  
});

function event_handler(URL, id, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {
      'event-id': id,
    },
    dataType: 'json',
    success: function(data) {
      
      console.log("ajax success----------");
      console.log(data)
      console.log("title:", data.title);
      console.log("subtitle:", data.subtitle);
      console.log("host:", data.host);
      console.log("image:", data.image);
      console.log("likes", data.likes);
      console.log("participants:", data.particitants);
      console.log("host:", data.host_id);
      console.log("host-pic:", data.host_pic);
      
      if(data.image != null) {
        $("#eventwindow" + " #eventpic" + " img").attr('src', data.image);
        $("#eventwindow" + " #eventpic" + " img").show();
        $("#eventwindow" + " #eventpic" + " p").hide();
      }
      else {
        $("#eventwindow" + " #eventpic" + " img").hide();
        $("#eventwindow" + " #eventpic" + " p").show();
      }
      $("#eventwindow" + " #event-title").html(data.title);
      $("#eventwindow" + " #event-subtitle").html(data.subtitle);
      $("#eventwindow" + " #description" + " #event-date").html("活動日期<br />" + data.event_date);
      $("#eventwindow" + " #event-detail").html(data.detail);
      
      $("#eventwindow" + " #eventoperate" + " #organizer-link").attr('href', "/profile/" + data.host_id);
      $("#eventwindow" + " #eventoperate" + " #organizer-pic").attr('src', data.host_pic);
      
      $("#member").html("");
      
      if(data.likes != undefined) {
        data.likes.forEach(function(item, i) {
          console.log(item.full_name);
          
          let str = "<a href=\"/profile/" + item.id + "\"><img class=\"member interested\" src=\"" + item.img + "\"></img></a>";
          
          $("#eventoperate #member").prepend(str);
        });
      };
      if(data.particitants != undefined) {
        data.particitants.forEach(function(item, i) {
          console.log(item.full_name);
          
          let str = "<a href=\"/profile/" + item.id + "\"><img class=\"member participant\" src=\"" + item.img + "\"></img></a>";
          
          $("#eventoperate #member").prepend(str);
        });
      };
    },
    
    complete: function(data) {
      $("#eventwindow").css({'display': 'flex'});
      $("#filter1").show();
//      $("#eventwindow").css({'opacity': 1});
      $("#eventwindow").animate({'opacity': 1}, 200);
      $("#filter1").animate({'opacity': 1}, 200);
      
      
    },
    
    error: function(data) {
      console.log("ajax error");
    }
  })
};


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
      if (data.status == 200) {
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
//      let str = "<div class='eventmsg'> <a> <img class='sender' src='" + data.author_img_url +
//          "'></img></a><div id='eventmsg-right'><div id='eventmsg-righttop'><a id='eventmsg-sendername'>" +
//          data.author_name + "</a><p id='event-date'>" + data.msg_date + "</p></div><div id='eventmsg-rightbottom'>" +
//          "<p id='eventmsgtext'>" + $("input.eventmsg-insert").val() + "</p></div></div>";
//      console.log(str);
      
      
      var clone_id = duplicate_multi('eventmsg');
      console.log(clone_id);
      //$('#' + clone_id).css({'background-color': 'red'});
      $('#' + clone_id + " img").attr('src', data.author_img_url);
      $('#' + clone_id + ' #eventmsg-sendername').html(data.author_name);
      $('#' + clone_id + ' #event-date').html(data.msg_date);
      $('#' + clone_id + " #eventmsgtext").html($("input.eventmsg-insert").val());
      console.log($("input.eventmsg-insert").val());
      
      
      //$("#eventmsg-board").prepend(str);
      
      $("input.eventmsg-insert").val("");
    }
  })
}

var i = 0;
function duplicate_multi(duplicateID) {
  console.log("duplicate eventpost");
  var original = document.getElementById(duplicateID);
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = duplicateID + '_new' + ++i;
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.insertBefore(clone, original.parentNode.firstChild);
  return clone.id
}


function duplicate(duplicateID) {
  console.log("duplicate eventpost");
  var original = document.getElementById(duplicateID);
  var clone = original.cloneNode(true); // "deep" clone
  clone_id = duplicateID;
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.insertBefore(clone, original.parentNode.firstChild);
  //$("eventpost").parent.prepend();
};
