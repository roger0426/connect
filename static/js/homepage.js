$(document).ready(function(){
  $("#loading").animate({'opacity': 0}, 500, function() {
    $("#loading").hide()
  })
  
  
  $('body').keyup(function(){
    if(($('#eventwindow').css('display') == 'none') 
        && ($('#eventcreatewindow').css('display') == 'none')
        && ($('#comment-window').css('display') == 'none')){
      console.log('insert')
      var search = document.getElementById('search-insert')
      search.focus();
    }
  });
  
  $('#phoneerrormsg').click(function(){
    $('#phoneerrormsg').hide();
  });

  $(".post-condition").each(function() {
    if ($(this).text() == '0') {
      $(this).parent().css('background-color', '#FFC5B3'); // orange-2
    } else if ($(this).text() == '1') {
      $(this).parent().css('background-color', '#9FE4D4'); // green-2
    }
  });

  $("#insertbox").click(function() {
    //console.log("click createevent");
    $('input[type=text]').val('');
    $('textarea').val('');
    $('#id_image').val('');

    // change "date" filed from text field to date filed
    $("#id_event_date")
    .on("focus", function() {
      $(this).attr('type', 'date');
    })
    .on("focusout", function() {
      $(this).attr('type', 'text');
    })
    $("#id_due_date")
    .on("focus", function() {
      $(this).attr('type', 'date');
    })
    .on("focusout", function() {
      $(this).attr('type', 'text');
    })

    // eventcreate window requirements
    $("#requirements").remove()
    $("#id_requirements_str").before(
      "<div id='requirements'>\
        <p id='requiretitle'>特殊要求</p>\
        <input type='text' id='add-requirement-btn' placeholder='+'>\
      </div>"
    )
    $("#id_requirements_str").hide();

    
    $('body').css({'overflow': 'hidden'});
    
    $("#filter1").show();
    $("#filter1").animate({opacity: 1}, 200, function() {
      $("#eventcreatewindow").show();
      $("#eventcreatewindow").animate({opacity: 1}, 200);
    })
  });

  // eventcreate window add-requirement-btn manipulate
  $(document).on("focus", "#add-requirement-btn", function() {
    $(this).attr("placeholder", "");
    $(this).css("width", "5rem");
  });
  $(document).on("blur", "#add-requirement-btn", function() {
    $(this).attr("placeholder", "+");
    $(this).css("width", "1rem");

    if ($(this).val() != "") {
      // has requirement value
      console.log($(this).val().length)
      $(this).before(
//        "<p class='requirement-tag'>" + $(this).val() + "</p>"
        "<input class='requirement-tag' size='" + ($(this).val().length*1.5 + 2.5 )+ "' value='" + $(this).val() + "'>"
      )
      $(this).val("");
    }
  });
  $(document).on("blur", ".requirement-tag", function() {
    if ($(this).val() == "") {
      $(this).remove();
    }
  })


  if($("#need-comment-flag").text() == "True") {
    $("#filter1").show();
    $("#filter1").animate({opacity: 1}, 200, function() {
      $("#comment-window").show();
      $('body').css({'overflow': 'hidden'});
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
      //console.log('hide window')
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  

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
    let requirement_str = "";
    // stringify requiremnt str
    if ($(".requirement-tag").length > 0) {
      $(".requirement-tag").each(function() {
//        requirement_str += $(this).text() + ",";
        requirement_str += $(this).val() + ",";
      })
    }
    requirement_str = requirement_str.substring(0, requirement_str.length-1)
    $("#id_requirements_str").val(requirement_str);

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
    $('#eventwindow').css({'display': 'flex'});
  }

  let intervalId = window.setInterval(function(){ // check every 0.5 seconds
    $('#insertbar').toggle();
  }, 450);
});

$(window).bind('beforeunload',function(){
//  $('#loading').hide();
});

var len = 10; // 超過50個字以"..."取代
$("#post_detail").each(function(item, i){
    console.log($(this))
    console.log(item)
    console.log(item.text())
    console.log(item.text().length)
//    if($(this).text().length > len){
//
//        $(this).attr("title",$(this).text());
//        var text=$(this).text().substring(0,len-1)+"...";
//        $(this).text(text);
//    }
});


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
          setTimeout(function(){
            $("#filter1").animate({opacity: 0}, 300, function() {
              $("#filter1").hide();
            })
            $("#comment-window").animate({opacity: 0}, 300, function() {
              $("#comment-window").hide();
            })
          }, 1800);
        } else if (data.status == 503) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '您已評價過此活動了',
            text: "正在跳轉...",
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

function sort_event_handler(URL, CSRF) {
  let sort_type = 0;
  switch ($("#sort").val()) {
    case 'newest': 
      sort_type = 0;
      break;
    case 'recent':
      sort_type = 1;
      break;
    case 'most-like':
      sort_type = 2;
      break;
    case 'most-participant':
      sort_type = 3;
      break;
  }

  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {
      'sort_type': sort_type
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('sort type ' + $("#sort").val() + ' sorted');
        let ordered_arr = [];
        data.id_list.forEach(function(id) {
          ordered_arr.push($("#" + id));
        });
        $("#eventboard").empty();
        ordered_arr.forEach(function(element) {
          $("#eventboard").append(element);
        });
        $("#eventboard").append("<div id=\"virtualdiv\"></div><div id=\"virtualdiv\"></div><div id=\"virtualdiv\"></div><div id=\"virtualdiv\"></div>");
      } else {
        console.log(data.error_message);
      }
    },
    complete: function(){
      $("#loading").animate({'opacity': 0}, 500, function() {
      $("#loading").hide()
      })
    }
  });
}
