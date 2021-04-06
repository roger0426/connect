//computer -> 'hover' or 'mouseenter, mouseleave'

//touchscreen -> 'single touch'

$(document).ready(function(){

  $('.card') // card animation
  .on('mouseenter', function(){ // mouse enter
    $('.card-detail', this).stop(true, false).animate({height: '100%'}, 300);
    $('.card-bg', this).stop(true, false).animate({height: '100%', opacity: 0.7}, 300);
    $('.personal-name', this).stop(true, false).animate({'padding-bottom': '2%'}, 300);
    $('.card-detail div', this).show(duration = 300); // show hidden details
  })

  .on('mouseleave', function(){ // mouse release
    $('.card-detail', this).stop(true, false).animate({height: '28%'}, 700);
    $('.card-bg', this).stop(true, false).animate({height: '28%', opacity: 0.85}, 700);
    $('.personal-name', this).stop(true, false).animate({'padding-bottom': 0}, 700);
    $('.card-detail div', this).stop(true, false).hide(duration = 700);
  })

  if (!$('card-bg').is(':animated')) { // prevent unexpected showing details
    $('.card-detail div').hide();
  }
    
  $('.button') // navbar button animation
  .on('mouseenter', function(){
    $(this).css("text-decoration", "underline");
  })
  .on('mouseout', function(){ // mouse release
    $(this).css("text-decoration", "none");
  })
})
