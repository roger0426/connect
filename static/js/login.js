$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  //$("#alert").parent().hide();
  
  //$("#message").parent().hide();
  
  $('#sign-up')
  .on('click touch', function(){ 
    $('#login-panel').hide();
    $('#sign-up-panel').show();
    console.log('here');
  })

  $('#login') 
  .on('click touch', function(){ 
    $('#login-panel').show();
    $('#sign-up-panel').hide();
  })

  $('#login-btn')
  .on('click touch', function(){
    $('#white-bubble1').animate({width: '2000%', height: '2000%'}, 1000);
    $('#white-bubble1').css('position', 'relative');
    $('#white-bubble1').css('z-index', 1000);
  })

  $('#sign-up-btn')
  .on('click touch', function(){
    console.log($('#terms').is(':checked'))
    if (!($('#terms').is(':checked'))) {
      alert('Please check your have accepted the terms.');
    }
    if (!($('#sign-pwd').val() === $('#double-pwd').val())) {
      alert('Please check your have typed correct password twice');
    }
  })
  
})

// check password validaty dynamically
$('#double-pwd').keyup(function(){
  if ($('#double-pwd').val().length > 0) {
    if ($('#sign-pwd').val() === $('#double-pwd').val()) {
      $('.err-msg').hide();
      $('#sign-up-btn').prop('disabled', false);
    } else {
      $('.err-msg').show();
      $('#sign-up-btn').prop('disabled', true);
      $('.err-msg').text("喔不，你的密碼好像打錯了！");
    }
  }
  if (!($('#terms').is(':checked')) ||
      $('#double-pwd').val().length == 0 ||
      $('#email').val().length == 0 ||
      $('#sid').val().length == 0) {
    $('#sign-up-btn').prop('disabled', true);

  } else {
    $('#sign-up-btn').prop('disabled', false);
  }
  console.log("test double-pw")
})





/*
  OK THATS IT. JUST PLAY WITH IT----
  -------------------------
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
var cdist = 150; //connect distance //100
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
    if(e.keyCode == 32) { //32
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
var p = [] , cnt = 200;

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
    ctx.strokeStyle = "#3AEDC2";
    //"#FAAD95";
    //"rgba(200,201,250,1)";
    ctx.lineWidth = 0.15; //0.07
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
    removeParticle(p , 1); //1
    
    
    connectDots(p[i],m);
    for(var j = 0; j < p.length; j++) {
      connectDots(p[i],p[j]);
    }
  }
}
