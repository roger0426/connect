$(document).ready(function(){

  $("#exitbtn1, #filter1").click(function() {
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#eventjoinwindow").animate({opacity: 0}, 400, function() {
      reset_event_window();
      $("#eventjoinwindow").hide();
      $("#eventjoinwindow").css({height: 0})
    })
    $("#eventcontrol").animate({opacity: 0}, 400, function() {
      $("#eventcontrol").hide();
      $("#eventcontrol").css({height: 0})
    })
    $("#eventlikes-window").animate({opacity: 0}, 400, function() {
      $("#eventlikes-window").hide();
      $("#eventlikes-window").css({height: 0})
    })
    $("#eventpart-window").animate({opacity: 0}, 400, function() {
      $("#eventpart-window").hide();
      $("#eventpart-window").css({height: 0})
    })
    
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  
  $("#exitbtn3, #exitbtn4, #exitbtn5, #exitbtn6").click(function() {
    // console.log("click event exit");
    //$('body').css({'overflow': 'auto'});
    $(".eventsubwindow").animate({height: 0, opacity: 0}, 400, function() {
      $(".eventsubwindow").hide();
    })
  });
  
  $('body').keyup(function(){
    if($('#eventwindow').css('display') == 'none'){
      console.log('insert')
      var search = document.getElementById('search-insert')
      search.focus();
    }
  })
});

//eventwindow likes & participants hover name
$(document).on("mouseenter", ".member", function() {
  console.log("in");
  $(this).siblings('.member-hover').show();
});
$(document).on("mouseleave", ".member", function() {
  $(this).siblings('.member-hover').hide();
});

$(document).on('click', ".eventjoin-btn", function() {
  //console.log("click event join");
  $("#eventjoinwindow").show();
  $("#eventjoinwindow").animate({'height': '75%', opacity: 1}, 400, function() {
  })
})

$(document).on('click', "#likepage-btn", function() {
  //console.log("click event join");
  $("#eventlikes-window").show();
  $("#eventlikes-window").animate({'height': '75%', opacity: 1}, 400, function() {
  })
})

$(document).on('click', "#partpage-btn", function() {
  //console.log("click event join");
  $("#eventpart-window").show();
  $("#eventpart-window").animate({'height': '75%', opacity: 1}, 400, function() {
  })
})

$(document).on('click', ".eventedit-btn", function() {
  //console.log("click event join");
  $("#eventcontrol").show();
  $("#eventcontrol").animate({'height': '75%', opacity: 1}, 400, function() {
//    $('.comment-operate-region input[type=text]').hide()
//    $('.comment-operate-region .eventmsg-btn').hide()
  })
})

function reset_event_window() {
  // restore to the beginning status of event window
  $("#event-title").replaceWith(
    "<div id='event-title'></div>"
  );
  $("#event-subtitle").replaceWith(
    "<div id='event-subtitle'></div>"
  );
  $("#event-detail").replaceWith(
    "<div id='event-detail'></div>"
  )
  $("#edit-confirm-btn").replaceWith(
    "<input type='button' class='eventedit-btn' value='控制中心'>"
  );
  $("#edit-cancel-btn").remove();
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
      
      // console.log("ajax success----------");
      // console.log(data)
      // console.log("title:", data.title);
      // console.log("subtitle:", data.subtitle);
      // console.log("host:", data.host);
      // console.log("image:", data.image);
      // console.log("likes", data.likes);
      // console.log("participants:", data.particitants);
      // console.log("host:", data.host_id);
      // console.log("host-pic:", data.host_pic);
      
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
      $('#event-require').html('');
      if(data.requirements != undefined) {
        data.requirements.forEach(function(item, i) {
          if(item != "") {
            $("#eventwindow" + " #event-require").append("<div id='requiretag'>" + item + "</div>");
          }
        });
      };
      $("#eventwindow" + " #description" + " #event-date").html("活動日期<br />" + data.event_date);
      $("#eventwindow" + " #description" + " #due-date").html("報名截止<br />" + data.due_date);
      let url_detail = data.detail.replaceAll(
          /(\s+)((http[s]?:\/\/)?([^\/\s]+\/)(.*))/g,
          (string, g1, g2, g3, g4, g5) => {
            return g1 + "<a href='" + g2 + "'\
                style='color: blue; margin:0' target='_blank' \
                rel='noopener noreferrer'>" + g2 + "</a>"
          }
      )
      let br_detail = url_detail.replaceAll("\n", "<br> ");

      $("#eventwindow" + " #event-detail").html(br_detail);
      
      $("#eventwindow" + " #eventoperate" + " #organizer-link").attr('href', "/profile/" + data.host_id);
      $("#eventwindow" + " #eventoperate" + " #organizer-pic").attr('src', data.host_pic);
      $("#eventwindow" + " #eventoperate" + " .member-hover").text(data.host_name);
      
      $("#member").html(
        "<div id='like-m'></div>\
          <div id='part-m'></div>");
      $("#eventmsg-board").html(
        "<div id='eventmsg' style='display: none' class='eventmsg'>\
          <a><img class='sender'></a>\
          <div id='eventmsg-right'>\
            <div id='eventmsg-righttop'>\
              <a id='eventmsg-sendername'></a>\
              <p id='event-date'></p>\
            </div>\
            <div id='eventmsg-rightbottom'>\
              <p id='eventmsgtext'></p>\
            </div>\
          </div>\
        </div>");

      if(data.comments != undefined) {
        data.comments.forEach(function(item, i) {
          var clone_id = duplicate_multi('eventmsg');
          $('#' + clone_id).show();
          // get_user_ajax
          $.ajax({
            type: 'post',
            url: "/get_user_detail/",
            data: {
              'user_id': item.author_id,
              'need_detail': false
            },
            dataType: 'json',
            success: function(data) {
              if (data.status == 200) {
                user_name = data.user_name;
                user_img_url = data.user_img_url;
                $('#' + clone_id + ' #eventmsg-sendername').html(data.user_name);
                $('#' + clone_id + " a").attr('href', '/profile/' + item.author_id);
                $('#' + clone_id + " img").attr('src', data.user_img_url);
                $('#' + clone_id + ' #event-date').html(item.date);
                $('#' + clone_id + " #eventmsgtext").html(item.text);
              } else {
                console.log('[Error] get user ' + item.author_id + " error");
              }
            }
          });
        });
      };
      
      $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
      $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
      $("#eventoperate #member #like-m").append("<p id=\"lt\">按讚</p>");
      
      var n = 0;
      if(data.likes != undefined) {
        data.likes.forEach(function(item, i) {
          if(i < 2){
            if(item.id == user_id) {
              $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
              $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
            }
            let str = "<a href='/profile/" + item.id + "'>\
                        <img class='member interested' \
                        src='https://res.cloudinary.com/connect-universe/image/upload/v1/" +
                        item.img + "'>\
                        <p class='member-hover'>" + item.full_name + "</p>\
                      </a>";
            $("#eventoperate #member #like-m").append(str);
            n = 0;
          }else{
            n = i - 1;
          }
        });
      };
      $("#eventoperate #member #like-m").append("<p id=\"likepage-btn\"class=\"member member-btn\">+" + n + "</p>");
      
      n = 0;
      $("#eventoperate #member #part-m").append("<p id=\"mt\">成員</p>");
        console.log(data.particitants)
      if(data.particitants != undefined) {
        data.particitants.forEach(function(item, i) {
          if(i < 2){
            let str = "<a href='/profile/" + item.id + "'>\
                        <img class='member participant' \
                        src='https://res.cloudinary.com/connect-universe/image/upload/v1/" +
                        item.img + "'>\
                        <p class='member-hover'>" + item.full_name + "</p>\
                      </a>";
            
            $("#eventoperate #member #part-m").append(str);
            n = 0;
          }else{
            n = i - 1;
          }
        });
      };
      $("#eventoperate #member #part-m").append("<p id=\"partpage-btn\"class=\"member member-btn\">+" + n + "</p>");

      // join window
      if (user_id == data.host_id) {
        $(".eventjoin-btn").hide();
        $(".eventedit-btn").show();
      } else {
        $(".eventjoin-btn").show();
        $(".eventedit-btn").hide();
      }
      switch (data.join_status) {
        case 1:
          $(".eventjoin-btn").attr("value", "審核中");
          $(".eventjoin-btn").attr("disabled", true);
          break;
        case 2:
          $(".eventjoin-btn").attr("value", "退出活動");
          $(".eventjoin-btn").attr("disabled", false);
          break;
        case 3:
        case 4:
          $(".eventjoin-btn").attr("value", "無法加入");
          $(".eventjoin-btn").attr("disabled", false);
          break;
        default:
          $(".eventjoin-btn").attr("value", "申請加入");
          $(".eventjoin-btn").attr("disabled", false);
          break;
      }

      $("#requirement-tags").empty();
      data.requirements.forEach(function(requirement) {
        if (requirement != "") {
          $("#requirement-tags").append(
            "<p class='requirement-tag' style='background-color: rgb(189, 189, 189)'>" + requirement + "</p>"
          );
        }
      });
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

$(document).on("click", "p.requirement-tag", function() {
  if ($(this).css("background-color") == "rgb(189, 189, 189)") {
    $(this).css("background-color", "rgb(255, 173, 148)")
  } else {
    $(this).css("background-color", "rgb(189, 189, 189)")
  }
})

function edit_event_transition() {
  $("#event-title").replaceWith(
    "<input type='text' id='event-title' value='" + $("#event-title").text() +"'>"
  );
  $("#event-subtitle").replaceWith(
    "<input type='text' id='event-subtitle' value='" + $("#event-subtitle").text() +"'>"
  );
  $("#event-detail").replaceWith(
    "<textarea id='event-detail'>" + $("#event-detail").text()
  );
  // $("#eventwindow-bg").replaceWith(
  //   "<input type='file' name='image' alt='image' id='eventwindow-bg'>"
  // );
  $(".eventedit-btn").replaceWith(
    "<input type='button' id='edit-confirm-btn' value='確認'>\
    <input type='button' id='edit-cancel-btn' value='取消'>"
  );
  $('body').css({'overflow': 'auto'});
  $(".eventsubwindow").animate({height: 0, opacity: 1}, 400, function() {
    $(".eventsubwindow").hide();
  });
}

function edit_event_handler(URL, CSRF, event_id) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {
      'event_id': event_id,
      'title': $("#event-title").val(),
      'subtitle': $("#event-subtitle").val(),
      'detail': $("#event-detail").val()
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("modify event successfully");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已修改活動',
          text: "正在跳轉回主頁面",
          showConfirmButton: false,
        })
        setTimeout(function(){
          location.reload();
        }, 1000);
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
  });
}

function delete_event_handler(URL, CSRF, event_id) {
  Swal.fire({
    title: '你確定嗎？',
    text: "刪除後將不可恢復",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '刪掉他',
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        data: {
          csrfmiddlewaretoken: CSRF
        }
      });
      $.ajax({
        type: "POST",
        url: URL,
        data: {
          'event_id': event_id,
        },
        dataType: 'json',
        success: function(data) {
          if (data.status == 200) {
            console.log("delete event successfully");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '已刪除活動',
              text: "正在跳轉回主頁面",
              showConfirmButton: false,
            })
            setTimeout(function(){
              location.reload();
            }, 1000);
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
      });
    }
  })
}

function end_event_handler(URL, CSRF, event_id) {
  Swal.fire({
    title: '你確定嗎？',
    text: "這將會結束活動",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '結束活動',
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        data: {
          csrfmiddlewaretoken: CSRF
        }
      });
      $.ajax({
        type: "POST",
        url: URL,
        data: {
          'event_id': event_id,
        },
        dataType: 'json',
        success: function(data) {
          if (data.status == 200) {
            console.log("end event successfully");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '已結束活動',
              text: "期待你下次的活動~",
              showConfirmButton: false,
              timer: 1500
            });
            $("a#" + event_id + " .posttop").css('background-color', '#E0E0E0');
            $("#eventcontrol").animate({height: 0, opacity: 0}, 400, function() {
              $("#eventcontrol").hide();
            })
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
      });
    }
  })
}

function like_handler(URL, event_id, CSRF) {
  if ($('#likebutton button').attr("src") == "/static/file/like-bg-y.png") {
    $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
    $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
  } else {
    $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
    $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
  }

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
        let like_sum = parseInt($('#' + event_id + ' #likesnum').text());
        if (data.add) {
          let profile_url = '/profile/' + data.user_id
          let str = "<a herf='" + profile_url + "'>\
          <img class='member interested' src= " + img_url + "></a>";
          //console.log(str);
          $('#' + event_id + " #likeicon").attr("src", "/static/file/like-y.png");
          $('#member').append(str);
          $('#' + event_id + ' #likesnum').text(like_sum + 1);
        } else if (data.remove) {
          let user_selector = "#member a img[src='" + img_url + "']";
          //console.log(user_selector)
          $('#' + event_id + " #likeicon").attr("src", "/static/file/like-grey.png");
          $(user_selector).remove();
          $('#' + event_id + ' #likesnum').text(like_sum - 1);
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

function join_event_handler(URL, CSRF, event_id) {
  if ($("#reason").val() != "") {
    $('.eventjoinbtn').hide();
    $('.loadingbtn').show();
    ability_str = "";
    $('p.requirement-tag').each(function () {
      if ($(this).css("background-color") == "rgb(255, 173, 148)") {
        ability_str += $(this).text() + ",";
      }
    });
    ability_str = ability_str.substring(0,ability_str.length-1);
    $.ajaxSetup({
      data: {
        csrfmiddlewaretoken: CSRF
      }
    });
    let timerInterval
    Swal.fire({
      title: '申請處理中',
      html: '請稍等......',
//      timer: 2000,
      timerProgressBar: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    $.ajax({
      type: "POST",
      url: URL,
      data: {
        'event_id': event_id,
        'ability': ability_str,
        'reason': $("#reason").val()
      },
      dataType: 'json',
      success: function(data) {
        if (data.status == 200) {
          console.log("join request sent successfully");
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已成功送出申請',
            text: "再去看看其他活動吧~",
            showConfirmButton: false,
            timer: 1500,
          })
          $('body').css({'overflow': 'auto'});
          $("#eventjoinwindow").animate({height: 0, opacity: 1}, 400, function() {
            $("#eventjoinwindow").hide();
          });
          $(".eventjoin-btn").attr("value", "審核中");
          $(".eventjoin-btn").attr("disabled", true);
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
    });
  }
  else{
    $('#reason').css({"border": "solid 2px red"});
  }
}


function get_apply_handler(URL, CSRF, event_id) {
  $("#member-control-list").empty();
  $("#member-control-list").html(
    "<div id='member-profile' style='display: none' class='member-profile'><a>\
      <div id='member-profile-left'><img>\
        <div id='member-detail'>\
          <p id='m-name'>姓名</p>\
          <p id='m-grade'>校系年級</p>\
        </div>\
      </div></a>\
      <div id='member-profile-right'>\
        <p id='m-ability'>具備能力：</p>\
        <p id='m-reason'>加入理由：</p>\
        <p id='m-status'>已加入</p>\
        <div class='reply-btns'>\
          <input type='button' class='accept-btn member-btn' value='接受申請'>\
          <input type='button' class='reject-btn member-btn' value='拒絕'>\
        </div>\
      </div>\
    </div>"
  );
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {
      'event_id': event_id,
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("applies get successfully");
        if (data.applications.length == 0) {
          $("#no-apply").show();
        } else {
          $("#no-apply").hide();
          data.applications.forEach(function(application) {
            let clone_id = duplicate_multi("member-profile");
            $("#" + clone_id).show();
            $("#" + clone_id).addClass("apply" + application.id)
            $.ajax({
              type: 'post',
              url: "/get_user_detail/",
              data: {
                'user_id': application.applicant_id,
                'need_detail': true
              },
              dataType: 'json',
              success: function(data) {
                if (data.status == 200) {
                  applicant_name = data.user_name;
                  applicant_img_url = data.user_img_url;
                  $('#' + clone_id + ' a #member-profile-left #member-detail p#m-name').html(data.user_name);
                  $('#' + clone_id + " a").attr('href', 'profile/' + application.applicant_id);
                  $('#' + clone_id + " a #member-profile-left img").attr('src', data.user_img_url);
                  $('#' + clone_id + ' a #member-profile-left #member-detail p#m-grade').html(data.user_department + data.user_grade);
                  $('#' + clone_id + " #member-profile-right p#m-ability").html("具備能力： " + application.abilities);
                  $('#' + clone_id + " #member-profile-right p#m-reason").html("加入理由： " + application.reason);
                  
                  switch (application.status) {
                    case 1: 
                      $('#' + clone_id + " #member-profile-right p#m-status").html("當前狀態： 未核准");
                      break;
                    case 2: 
                      $('#' + clone_id + " #member-profile-right p#m-status").html("當前狀態： 已加入");
                      $('#' + clone_id + " #member-profile-right .reply-btns").hide();
                      break;
                    case 3:
                      $('#' + clone_id + " #member-profile-right p#m-status").html("當前狀態： 已拒絕");
                      $('#' + clone_id + " #member-profile-right .reply-btns").hide();
                      break;
                  }
                } else {
                  console.log('[Error] get user ' + applicant.author_id + " error");
                }
              }
            });
          })
        }
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
  });
}

function reply_apply_handler(URL, CSRF, element_id, is_accepted) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {
      'application': element_id,
      'is_accepted': is_accepted
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("reply application successfully");
        if (data.accepted) {
          // accepted
          console.log()
          $(".apply" + data.application_id + " #member-profile-right .reply-btns").hide();
          $(".apply" + data.application_id + " #member-profile-right #m-status").text('當前狀態： 已加入');
          let origin_participant_num = parseInt(
            $('#' + data.event_id + ' #commentnum').text());
          $('#' + data.event_id + ' #commentnum').text(origin_participant_num + 1);
        } else {
          // rejected
          $(".apply" + data.application_id + " #member-profile-right .reply-btns").hide();
          $(".apply" + data.application_id + " #member-profile-right #m-status").text('當前狀態： 已拒絕');
        }
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
  });
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


//function duplicate(duplicateID) {
//  var original = document.getElementById(duplicateID);
//  var clone = original.cloneNode(true); // "deep" clone
//  clone_id = duplicateID;
//  // or clone.id = ""; if the divs don't need an ID
//  original.parentNode.insertBefore(clone, original.parentNode.firstChild);
//  //$("eventpost").parent.prepend();
//};
