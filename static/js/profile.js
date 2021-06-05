$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  $('#phoneerrormsg').click(function(){
    $('#phoneerrormsg').hide();
  });
  
  
//  $(".normaltag").mouseenter(function() {
//    if($(this).parent().find('.deletetag').css({'display': 'none'}).length == 0) {
//      $(this).parent().css({'background-color': '#FFAD94'});
//    }
//  });
//  $('.normaltag').mouseleave(function() {
//    if($(this).parent().find('.deletetag').css({'display': 'none'}).length == 0) {
//      $(this).parent().css({'background-color': '#FFCFBF'});
//    }
//  });
  
  $(".normaltag").click(function() {
    if($(this).parent().find('.tag-commend').css("display") == "none") {
      $(this).parent().find('.tag-commend').css({'display': 'flex'});
      $(".normaltag").not(this).parent().find('.tag-commend').css({'display': 'none'});
    }
    else {
      $(this).parent().find('.tag-commend').css({'display': 'none'});
    }
  });
  
  $(window).click(function() {
    var i = 0
    $('.tag-commend').each(function(c) {
//      console.log($(this).css('display'));
      if($(this).css('display') === 'flex') {
        $('.tag-commend').each(function(c) {
          $(this).css('display', 'none');
        })
        return;
      }
    })
  });
  
  $('.normaltag').click(function(event){
    event.stopPropagation();
  });
  
  $("#user-name").click(function() {
    console.log("open graph")
    $("#graph").toggle()
  })
  
  $('#friends-avatar a').mouseenter(function() {
    $(this).find('.friend-info').css({'display': 'flex'});
  });
  $('#friends-avatar a').mouseleave(function() {
    $(this).find('.friend-info').css({'display': 'none'});
  });
  
  $("#tab-navbar :nth-child(1),#tag1").on('click touch', function(){
    console.log("1");
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(1)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(1))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(2),#tag2").on('click touch', function(){
    console.log("2");
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(2)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(2))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(3),#tag3").on('click touch', function(){
    console.log("3");
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').show();
    $('#indextag :nth-child(3)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(3))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(4),#tag4").on('click touch', function(){
    console.log("4");
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(4)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(4))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(5),#tag5").on('click touch', function(){
    console.log("5");
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(5)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(5))').css('background-color','white')
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
    $("#filter1").animate({opacity: 0}, 400, function() {
      $("#filter1").hide();
    })
  });
  
  $("#sendbutton").click(function() {
    console.log("sendbutton has been click.")
    $ajaxSetup({
      data: {
        csrfmiddlewaretoken: CSRF
      }
    });
    $.ajax({
      url: URL,
      type: "post",
      data: {
        'text': $.trim($(".comment-insert").val())
      },
      dataType: 'json',
    }),(data)=>{
        $('cmttext').html(data)
        console.log("comment success: "+ data);
      }
  });

})

function friend_request_handler(URL, CSRF, request_user_id) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'user_id': request_user_id
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("friend request sent successfully");
      } else {
        console.log(data.error_message);
      }
    }
  })
}

function friend_reply_handler(URL, CSRF, request_user_id, reply_status) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'user_id': request_user_id,
      'reply': reply_status
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("friend reply successfully");
        location.reload();
      } else {
        console.log(data.error_message);
      }
    }
  })
}

function friend_remove_handler(URL, CSRF, request_user_id) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'user_id': request_user_id,
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("friend remove successfully");
        location.reload();
      } else {
        console.log(data.error_message);
      }
    }
  })
}

function send_comment_handler(URL, CSRF, event_id, text, rate, element, comment_count) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'event_id': event_id,
      'text': text,
      'rate': rate
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("comment sent successfully");
        let str = "\
        <div class='comment'>\
          <a href='/profile/" + data.user_id + "'>\
            <img id='participant-img' src='" + data.user_img +"'>\
          </a>\
          <div class='comment-right'>\
            <a href='/profile/" + data.user_id + "'>" + data.user_name + "</a>\
            <p id='participant-comment'>" + data.text + "</p>\
            <p id='participant-rate'>" + data.rate + "/10★</p>\
          </div>\
        </div>";
        if (comment_count == '0') {
          console.log('here')
          $(element).empty();
        }
        $(element).append(str);
        $("input.comment-text").val("");
        $("input.comment-rate").val("");
        
        $(element).siblings(".info").children(".rate").text(data.post_avg_rate + "/10★")
      } else {
        console.log(data.error_message);
      }
    }
  })
}

//另一個版本

var map=[
	{
		name:"臺北市",
    category: "fixed"
	},
	
	{
		name:"新北市",
    category: "unfixed"
	},
	
	{
		name:"桃園市",
    category: "unfixed"
	},
	
	{
		name:"臺中市",
    category: "unfixed"
	},
	
	{
		name:"臺南市",
    category: "unfixed"
	},
	
	{
		name:"高雄市",
    category: "unfixed"
	},
	
	{
		name:"基隆市",
    category: "unfixed"
	},

  {
		name:"花蓮市",
    category: "unfixed"
	},
         
  {
		name:"臺南市",
    category: "unfixed"
	},
	
	{
		name:"高雄市",
    category: "unfixed"
	},
	
	{
		name:"基隆市",
    category: "unfixed"
	},

  {
		name:"花蓮市",
    category: "unfixed"
	},
	
];
var links=[
	{
		source:0,
	 	target:1
	},
	{
		source:0,
	 	target:6
	},
	{
		source:0,
	 	target:2
	},
	{
		source:1,
	 	target:6
	},
	{
		source:0,
	 	target:7
	},
	{
		source:0,
	 	target:4
	},
	{
		source:0,
	 	target:5
	},
	{
		source:3,
	 	target:7
	},
	{
		source:0,
	 	target:8
	},
	{
		source:1,
	 	target:9
	},
	{
		source:0,
	 	target:10
	},
	{
		source:0,
	 	target:11
	},
];


var width = window.innerWidth * 0.6
    height = window.innerHeight * 0.5;
    //width = $('#profilepanel').width
var svg = d3.select('#graph').append('svg')
    .attr('id', 'relation-graph')
    .attr('position', 'fixed')
    .attr('width', width)
    .attr('height', height);

//const forceX = d3.forceX(width / 2).strength(0.1) //橫向壓縮力
//const forceY = d3.forceY(height / 2).strength(0.1)
const forceX = d3.forceX(width / 2).strength(0.2) //橫向壓縮力
const forceY = d3.forceY(height / 2).strength(0.3)

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody())
    .force('x', forceX)
    .force('y', forceY);

simulation
	.nodes(map)
	.on("tick", ticked);

simulation.force("link")
	.links(links)
	.distance(70)
  .strength(0.85);

simulation.force("charge")
	.strength(-1300)

//map[0].attr('id', 'firstnode');


var link = svg.append("g")
	.attr("class", "links")
	.selectAll("line")
	.data(links)
	.enter().append("line")
	.attr("stroke-width", 0.5)
	.attr("stroke","black");

var node = svg.append("g")
	.attr("class", "nodes")
	.selectAll("circle")
	.data(map)
	.enter().append("circle")
	.attr("r", function(d){
    if (d.category == 'fixed') {
      return 10
    } else {
      return 4
    };
  })
	.attr("fill", '#AAA')
	.attr('stroke', function(d){
    if (d.category == 'fixed') {
      return 'red'
    } else {
      return 'white'
    };
  })
	.attr('stroke-width',1)
  .attr('cursor', function(d){
    if (d.category == 'fixed') {
      return 'grab'
    } else {
      return 'pointer'
    };
  })
	.call(d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended));

var text = svg.selectAll("text")
     .data(map)
     .enter()
     .append("text")
     .style("fill", "black")
     .style("font-size", 15)
     .attr("dx", 10)//12
     .attr("dy", 0)//5
     .text(function(d){
        return d.name;
     });


function ticked() {
link
	.attr("x1", function(d) { return d.source.x; })
	.attr("y1", function(d) { return d.source.y; })
	.attr("x2", function(d) { return d.target.x; })
	.attr("y2", function(d) { return d.target.y; });

node
	.attr("cx", function(d) { return d.x; })
	.attr("cy", function(d) { return d.y; })

text
	.attr("x", function(d) { return d.x;})
	.attr("y", function(d) { return d.y;});
};

function dragstarted(d) {
if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(0);
//  d.fx = null;
//  d.fy = null;
  if (d.category == 'fixed') {
  //    d.category = 'fixed';
    //d3.select(this).classed("fixed", true);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  else
  {
  //    d.category = 'unfixed';
    //d3.select(this).classed("fixed", false);
    d.fx = null;
    d.fy = null;
  }
}

