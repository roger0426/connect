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
    $('input[type=text]').val('');
    $('textarea').val('');
    $('#id_image').val('');

    // change "date" filed from text field to date filed
    $("#id_event_date")
      .attr("onfocus", "(this.type='date')")
      .attr("onfocusout", "(this.type='text')")
    $("#id_due_date")
      .attr("onfocus", "(this.type='date')")
      .attr("onfocusout", "(this.type='text')")
    
    $('body').css({'overflow': 'hidden'});
    
    $("#filter1").show();
    $("#filter1").animate({opacity: 1}, 200, function() {
//      if ($("#eventcreatewindow").css('display') == 'none') {
      $("#eventcreatewindow").show();
//      }
//      else {
//        $("#eventcreatewindow").css({'content-visibility': 'visible'});
//      }
      $("#eventcreatewindow").animate({opacity: 1}, 200);
    })
    //$("#sent").toggle();
  });

  if($("#need-comment-flag").text() == "True") {
    $("#filter1").show();
    $("#filter1").animate({opacity: 1}, 200, function() {
//      if ($("#comment-window").css('display') == 'none') {
      $("#comment-window").show();
//      }
//      else {
//        $("#comment-window").css({'content-visibility': 'visible'});
//      }
      $("#comment-window").animate({opacity: 1}, 200);
    })
  }
  
  
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
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  
  $("#exitbtn2, #filter1").click(function() {
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventcreatewindow").animate({opacity: 0}, 400, function() {
      $('input[type=text]').val('');
      $('textarea').val('');
      $('#id_image').val('');
      //$("#eventcreatewindow").css({'content-visibility': 'hidden'});
      $("#eventcreatewindow").hide();
    })
    $("#comment-window").animate({opacity: 0}, 400, function() {
      $('input[type=text]').val('');
      //$("#comment-window").css({'content-visibility': 'hidden'});
      $("#comment-window").hide();
      console.log('hide window')
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  
  $("#exitbtn3, #filter1").click(function() {
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventjoinwindow").animate({height: 0, opacity: 1}, 400, function() {
      $("#eventjoinwindow").hide();
    })
  });
  
  $(".eventjoin-btn").click(function() {
    console.log("click event join");
    $("#eventjoinwindow").show();
//    $("#eventjoinwindow").css({opacity: 1})
    $("#eventjoinwindow").animate({'height': '75%', opacity: 1}, 400, function() {
    })
//    $("#eventjoinwindow").animate({opacity: 1}, 100, function() {
//    })
  })

  $("#submit-btn").click(function() {
    console.log("click event submit");
    let all_pass = 1;

    // check all necessary input field is entered
    if ($("#id_title").val().trim().length == 0) {
      all_pass = 0;
      $("#id_title").css("border", "0.1rem solid red");
    }
    if ($("#id_detail").val().trim().length == 0) {
      all_pass = 0;
      $("#id_detail").css("border", "0.1rem solid red");
    }
    if ($("#id_event_date").val().trim().length == 0) {
      all_pass = 0;
      $("#id_event_date").css("border", "0.1rem solid red");
    }
    if ($("#id_due_date").val().trim().length == 0) {
      all_pass = 0;
      $("#id_due_date").css("border", "0.1rem solid red");
    }
    if ($("#id_people_limit").val().trim().length == 0) {
      all_pass = 0;
      $("#id_people_limit").css("border", "0.1rem solid red");
    }
    
    if (all_pass == 1) {
      // alert messsage
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '活動已創建',
        text: "正在跳轉回主頁面",
        showConfirmButton: false,
      })
      setTimeout(function(){
        $("#eventcreatewindow").animate({opacity: 0}, 400, function() {
          $("#eventcreatewindow").hide();
        })
        $("#filter1").animate({opacity: 0}, 400, function() {
          $("#filter1").hide();
        })
        $('#createevent').submit();
      }, 1000);
      
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '喔喔，有東西沒填到喔',
        text: "請再確認一次",
        showConfirmButton: false,
        timer: 1500,
      })
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

  
  
//  //每次click都ajax去更新每個eventpost的參與數、愛心數
//  $(window).click(function() {
//    homepage_update(URL, )
//  }

  
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

function isValid() {
  let isValid = true;
  $("#comment-window input[type=text]").each(function() {
    let element = $(this);
    if (element.val() == "") {
      isValid = false;
    }
  });
  return isValid;
}


function rate_event_handler(URL, event_id, CSRF) {
  if (isValid()) {
    // all comments are written
    let data = {};
    data[$("#first-comment label").text()] = $("#first-comment input[type=text]").val()
    $('#comment-window .comment-div label').each(function () {
      var element = $(this);
      if (element.text() != "") {
        data[element.text()] = (element.siblings("input[type=text]").val());
      }
    });
    data['event_id'] = (event_id);

    $.ajaxSetup({
      data: {
        csrfmiddlewaretoken: CSRF
      }
    });
    $.ajax({
      type: "POST",
      url: URL,
      data: data,
      dataType: 'json',
      success: function(data) {
        if (data.status == 200) {
          console.log("comment successfully")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已成功評論',
            text: "再去看看其他活動吧~",
            showConfirmButton: false,
            timer: 1500,
          })
          $("#filter1").hide();
          $("#comment-window").hide();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '喔不出錯了',
            text: data.error_message,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      }
    })
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '喔喔，有東西沒填到喔',
      text: "請再確認一次",
      showConfirmButton: false,
      timer: 2000,
    })
  }
}

function event_handler(URL, user_id, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {},
    dataType: 'json',
    success: function(data) {
      
//      console.log("ajax success----------");
//      console.log("title:", data.title);
//      console.log("subtitle:", data.subtitle);
//      console.log("host:", data.host);
//      console.log("image:", data.image);
//      console.log("likes", data.likes);
//      console.log("participants:", data.particitants);
//      console.log("host:", data.host_id);
//      console.log("host-pic:", data.host_pic);
      
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
      $("#eventwindow" + " #description" + " #due-date").html("報名截止<br />" + data.due_date);
      $("#eventwindow" + " #event-detail").html(data.detail);
      
      $("#eventwindow" + " #eventoperate" + " #organizer-link").attr('href', "/profile/" + data.host_id);
      $("#eventwindow" + " #eventoperate" + " #organizer-pic").attr('src', data.host_pic);
      
      $("#member").html("");
      $("#eventmsg-board").html("<div id=\"eventmsg\" style=\"display: none\" class=\"eventmsg\"><a><img class=\"sender\"></a><div id=\"eventmsg-right\"><div id=\"eventmsg-righttop\"><a id=\"eventmsg-sendername\"></a><p id=\"event-date\"></p></div><div id=\"eventmsg-rightbottom\"><p id=\"eventmsgtext\"></p></div></div></div>");
      
      
      if(data.comments != undefined) {
        data.comments.forEach(function(item, i) {
          var clone_id = duplicate_multi('eventmsg');
          $('#' + clone_id).show();
          //$('#' + clone_id + " img").attr('src', data.author_img_url);
          $('#' + clone_id + ' #eventmsg-sendername').html(item.author_id); //???
          $('#' + clone_id + ' #event-date').html(item.date);
          $('#' + clone_id + " #eventmsgtext").html(item.text);
        });
      };
      
      $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
      $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
      if(data.likes != undefined) {
        data.likes.forEach(function(item, i) {
          if(item.id == user_id) {
            $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
            $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
          }
          let str = "<a href=\"/profile/" + item.id + "\"><img class=\"member interested\" src=\"https://res.cloudinary.com/connect-universe/image/upload/v1/" + item.img + "\"></img></a>";
          
          $("#eventoperate #member").prepend(str);
        });
      };
      if(data.particitants != undefined) {
        data.particitants.forEach(function(item, i) {
          console.log(item.full_name);
          
          let str = "<a href=\"/profile/" + item.id + "\"><img class=\"member participant\" src=\"https://res.cloudinary.com/connect-universe/image/upload/v1/" + item.img + "\"></img></a>";
          
          $("#eventoperate #member").prepend(str);
        });
      };
    },
    complete: function(data) {
      //lock background
      $('body').css({'overflow': 'hidden'});
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


function like_handler(URL, event_id, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
//      event_id: event_id,
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
          //console.log(str);
          $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
          $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
          $('#' + event_id + " #likeicon").attr("src", "/static/file/like-y.png");
          $('#member').append(str);

        } else if (data.remove) {
          let user_selector = "#member a img[src='" + img_url + "']";
          //console.log(user_selector)
          $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
          $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
          $('#' + event_id + " #likeicon").attr("src", "/static/file/like-grey.png");
          $(user_selector).remove();
        }
      } else {
        console.log("[Error]: like ajax error");
      }
    }
  })
}

function message_handler(URL, event_id, CSRF) {
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
      
      var clone_id = duplicate_multi('eventmsg');
      console.log(clone_id);
      $('#' + clone_id + " img").attr('src', data.author_img_url);
      $('#' + clone_id + ' #eventmsg-sendername').html(data.author_name);
      $('#' + clone_id + ' #event-date').html(data.msg_date);
      $('#' + clone_id + " #eventmsgtext").html($("input.eventmsg-insert").val());
      console.log($("input.eventmsg-insert").val());
      $('#' + clone_id).show();
      $("input.eventmsg-insert").val("");
    }
  })
}

 var i = 0;
 function duplicate_multi(duplicateID) {
   var original = document.getElementById(duplicateID);
   var clone = original.cloneNode(true); // "deep" clone
   clone.id = duplicateID + '_new' + ++i;
   // or clone.id = ""; if the divs don't need an ID
   original.parentNode.insertBefore(clone, original.parentNode.firstChild);
   return clone.id
 }


 function duplicate(duplicateID) {
   var original = document.getElementById(duplicateID);
   var clone = original.cloneNode(true); // "deep" clone
   clone_id = duplicateID;
   // or clone.id = ""; if the divs don't need an ID
   original.parentNode.insertBefore(clone, original.parentNode.firstChild);
   //$("eventpost").parent.prepend();
 };

