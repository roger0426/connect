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
      $('body').css({'overflow': 'hidden'});
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

function join_event_handler(URL, CSRF, event_id) {
  if ($("#reason").val() != "") {
    ability_str = "";
    $('input:checkbox.requirement-tag').each(function () {
      ability_str += $(this).val() + ",";
    });
    console.log(ability_str);
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
}
