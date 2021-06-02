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
      $("#eventcreatewindow").animate({opacity: 1}, 200);
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
    //console.log("click event exit");
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  
  $("#exitbtn2, #filter1").click(function() {
    //console.log("click event exit");
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
      $("#eventwindow" + " #event-detail").html(data.detail);
      
      $("#eventwindow" + " #eventoperate" + " #organizer-link").attr('href', "/profile/" + data.host_id);
      $("#eventwindow" + " #eventoperate" + " #organizer-pic").attr('src', data.host_pic);
      
      $("#member").html("");
      
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


/*
  畫關係force directed graph
 ------------------------------------------------------
 */


//var width = window.innerWidth * 0.7
//    height = window.innerHeight * 0.5;
//
//var links = [
//             {source: 'A', target: 'B'},
////             {source: 'B', target: 'C'},
//             {source: 'C', target: 'A'},
////             {source: 'D', target: 'A'},
//             {source: 'A', target: 'D'},
//             {source: 'C', target: 'H'},
//             {source: 'A', target: 'E'},
//             {source: 'A', target: 'G'},
//
//             ];
//
//var nodes = {};
//
////parse links to nodes
//links.forEach(function(link) {
//  link.source = nodes[link.source] ||
//      (nodes[link.source] = {name: link.source});
//  link.target = nodes[link.target] ||
//      (nodes[link.target] = {name: link.target});
//});
//
////var canvas = document.getElementById("relation_graph")
//////    .attr('width', width)
//////    .attr('height', height);
////const relation_graph = canvas.getContext('2d');
//
//var svg = d3.select('#board').append('svg')
//    .attr('id', 'relation_graph')
//    .attr('position', 'fixed')
////    .attr('width', width)
////    .attr('height', height)
//    .attr('width', '100%');
//
//var force = d3.layout.force()
//    .size([width, height])
//    .nodes(d3.values(nodes))
//    .links(links)
//    .on("tick", tick)
//    .charge(-1500)
//    .gravity(0.15)
//    .friction(0.8)
//    .linkDistance(100)
//    .start();
//
//var link = svg.selectAll('.link')
//    .data(links)
//    .enter().append('line')
//    .attr('class', 'link');
//
//var node = svg.selectAll('node')
//    .data(force.nodes())
//    .enter().append('circle')
//    .attr('class', 'node')
//    .attr('r', width * 0.01);
//
//function tick(e) {
//  node.attr('cx', function(d) { return d.x; })
//      .attr('cy', function(d) { return d.y; })
//      .call(force.drag);
//
//  link.attr('x1', function(d) { return d.source.x; })
//      .attr('y1', function(d) { return d.source.y; })
//      .attr('x2', function(d) { return d.target.x; })
//      .attr('y2', function(d) { return d.target.y; })
//}

/*
  畫背景飄移force directed graph
  -----------------------------------------------------
*/
var c = document.getElementById('world');
var ctx = c.getContext('2d');
//var w = window.innerWidth;
//var h = window.innerHeight;
var w = window.screen.width;
var h = window.screen.height;
//var w = $('window').width();
//var h = $('window').height();

var m = {
  x : 0,
  y : 0
};
var cdist = 300; //connect distance //100
var p = [] , cnt = 70;    //cnt: 點數量

window.onmousedown = function(e) {
  if(e.button == 0) {
    p.push(new Particle(m.x , m.y));
  }
  
}


window.onmousemove = function(e) {
  m.x = e.clientX || e.pageX || 0;
  m.y = e.clientY || e.pageY || 0;
}
c.width = w;
c.height = h;

function drawBG(clr) {
  ctx.fillStyle = clr
ctx.fillRect(0,0,w,h);
}



function drawText(txt , x , y , size , types , color) {
  ctx.font = size + "px" + " anton";
  ctx.textAlign = "center";
  ctx.lineWidth = 1;
  if(types == "stroke") {
    ctx.strokeStyle = color;
    ctx.strokeText(txt , x, y);
  } else if(types = "fill") {
    ctx.fillStyle = color;
    ctx.fillText(txt , x, y);
  }
  
  
}

function removeParticle(p , i) {
  window.onkeydown = function(e) {
    if(e.keyCode == 32) {
      p.splice(i , 1);
    }
  }
}



//random color generator...........
// function randomColor() {
//   var r = Math.floor(Math.random() * 255);
//   var g = Math.floor(Math.random() * 255);
//   var b = Math.floor(Math.random() * 255);
  
//   return "rgb(" + r + ',' + g + ',' + b + ")";
// }

for(var i = 0; i < cnt; i++) {
  p.push(new Particle());
}

function Particle(x , y) {
  this.x = x || Math.random() * w;
  this.y = y || Math.random() * h;
  this.vx = (Math.random() - 0.5) * 0.6;
  this.vy = (Math.random() - 0.5) * 0.6;
  this.rad = 0.8;
  this.color = "#fff"
  
  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;

      if(this.x > w + this.rad) {
        this.x = 0 - this.rad;
      } else if(this.x < 0 - this.rad) {
        this.x = w + this.rad;
      }
    
    if(this.y > h + this.rad) {
        this.y = 0 - this.rad;
      } else if(this.y < 0 - this.rad) {
        this.x = h + this.rad;
      }
  }
  this.show = function() {
    ctx.beginPath();
    ctx.arc(this.x , this.y , this.rad , 0 , Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

}

function connectDots(p1 , p2) {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  
  if(dist <= cdist) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,1)";
    //"rgba(200,201,250,1)";
    ctx.lineWidth = 0.1; //0.07
    ctx.moveTo(p1.x , p1.y);
    ctx.lineTo(p2.x , p2.y);
    ctx.stroke();
    ctx.closePath();
  }
}

loop();


function loop() {
  window.requestAnimationFrame(loop);
  drawBG("#FFF6ED");
  //drawText("Made With ♥ & Javascript" , w / 2 , h / 2 , 65 , "stroke" , "#fff");
  //drawText("By suzan",w / 2 + 250 , h / 2 + 40 , 20 , "fill", "#fff")
  for(var i = 0; i < p.length; i++) {
    p[i].show();
    p[i].move();
    removeParticle(p , 1);
    
    
    connectDots(p[i],m);
    for(var j = 0; j < p.length; j++) {
      connectDots(p[i],p[j]);
    }
  }
}
