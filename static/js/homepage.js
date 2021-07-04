$(document).ready(function(){
  $("#loading").animate({'opacity': 0}, 300, function() {
    $("#loading").hide()
  })
  
  $(window).on('beforeunload', function () {
      // user has triggered a navigation, show the loading animation
    $('#loading').show();
  });
  
  
  $('body').keyup(function(){
    if(($('#eventwindow').css('display') == 'none') 
        && ($('#eventcreatewindow').css('display') == 'none')
        && ($('#comment-window').css('display') == 'none')){
      var search = $('.search-insert')
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
    let ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {
        // Chrome
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
      } else {
        // Safari
        $("#id_event_date")
        .attr('type', 'text')
        .attr('placeholder', '活動日期 (yyyy-mm-dd)');

        $("#id_due_date")
        .attr('type', 'text')
        .attr('placeholder', '報名截止 (yyyy-mm-dd)');
      }
    }
    

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
    //$("#sent").show();
    $('#sent').css({"z-index": 1});
    $("#sent").animate({opacity: 1}, 500, function() {
      
    })
  });
  
  $("#sent").click(function() {
    $("#sent").css({opacity: 0, "z-index": -1});
  });
  
  
  $("#exitbtn2, #filter1").click(function() {
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventcreatewindow").animate({opacity: 0}, 400, function() {
      $('input[type=text]').val('');
      $('textarea').val('');
      $('#id_image').val('');
      $('canvas').remove();
      //$("#eventcreatewindow").css({'content-visibility': 'hidden'});
      $("#eventcreatewindow").hide();
    })
    $("#comment-window").animate({opacity: 0}, 400, function() {
      $('input[type=text]').val('');
      //$("#comment-window").css({'content-visibility': 'hidden'});
      $("#comment-window").hide();
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });

  // image preprocessor
  const MIME_TYPE = "image/jpeg";
  const QUALITY = 0.2;

  const input = document.getElementById("id_image");
  input.onchange = function (ev) {
    const file = ev.target.files[0]; // get the file
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      // Handle the failure properly
      console.log("Cannot load image");
    };
    img.onload = function () {
      URL.revokeObjectURL(this.src);
      const [startX, startY, width] = calculateStart(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = width;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, startX, startY, width, width, 0, 0, width, width);
      canvas.toBlob(
        (blob) => {
          // Handle the compressed image. es. upload or save in local state
          let new_img = new File([blob], "eventpic.jpeg")
          let container = new DataTransfer();
          container.items.add(new_img);
          let fileInputElement = document.getElementById('id_image');
          fileInputElement.files = container.files;
        },
        MIME_TYPE,
        QUALITY
      );
      if ($("canvas").length == 0) {
        $("#buttons").before(canvas);
      } else {
        $("canvas").replaceWith(canvas);
      }
      
    };
  };

  function calculateStart(width, height) {
    if (width > height) {
      let startX = Math.round((width / 2) - (height / 2));
      return [startX, 0, height];
    } else if (width < height) {
      let startY = Math.round((height / 2) - (width / 2));
      return [0, startY, width];
    } else {
      return [0, 0, width];
    }
  }
  

  $("#submit-btn").click(function() {
    let all_pass = 1;

    // check all necessary input field is entered
    if ($("#id_title").val().trim().length == 0) {
      $("#id_title").css("border", "0.1rem solid red");
      all_pass = 0;
    }
    if ($("#id_detail").val().trim().length == 0) {
      $("#id_detail").css("border", "0.1rem solid red");
      all_pass = 0;
    }
    if ($("#id_event_date").val().length != 10) {
      $("#id_event_date").css("border", "0.1rem solid red");
      all_pass = 0;
    }
    if ($("#id_due_date").val().length != 10) {
      $("#id_due_date").css("border", "0.1rem solid red");
      all_pass = 0;
    }
    if ($("#id_people_limit").val().trim().length == 0) {
      $("#id_people_limit").css("border", "0.1rem solid red");
      all_pass = 0;
    }
    let requirement_str = "";
    // stringify requiremnt str
    if ($(".requirement-tag").length > 0) {
      $(".requirement-tag").each(function() {

        requirement_str += $(this).val() + ",";
      })
    }
    requirement_str = requirement_str.substring(0, requirement_str.length-1)
    $("#id_requirements_str").val(requirement_str);

    let date_regex = /^(2[0-1][0-9][0-9])-(([0][1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|([3][0-1]))$/g
    if ($("#id_event_date").val().match(date_regex).length != 1) {
      $("#id_event_date").css("border", "0.1rem solid red");
      all_pass = 0;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '日期格式錯誤',
        text: "請再確認活動日期格式",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if ($("#id_due_date").val().match(date_regex).length != 1) { 
      $("#id_due_date").css("border", "0.1rem solid red");
      all_pass = 0;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '日期格式錯誤',
        text: "請再確認報名截止日期格式",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // check event date after due date
    const event_date_obj = new Date($("#id_event_date").val());
    const due_date_obj = new Date($("#id_due_date").val());
    let delta = event_date_obj - due_date_obj;
    if (delta < 0) {
      all_pass = 0;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '日期格式錯誤',
        text: "請確認活動日期在報名截止日期之後",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
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
      });
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
