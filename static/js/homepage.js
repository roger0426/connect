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
      console.log("title:", data.title);
      console.log("subtitle:", data.subtitle);
      console.log("image:", data.image);
      
    },
    error: function(data) {
      console.log("ajax error");
    }
  })
};

function duplicate(duplicateID) {
  console.log("duplicate eventpost");
  var original = document.getElementById(duplicateID);
  var clone = original.cloneNode(true); // "deep" clone
  clone_id = duplicateID;
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.insertBefore(clone, original.parentNode.firstChild);
  //$("eventpost").parent.prepend();
};
