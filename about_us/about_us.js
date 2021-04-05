//computer -> 'hover' or 'mouseenter, mouselesve'

//touchscreen -> 'single touch'

$(document).ready(function(){

  $('.card')
  .on('mouseenter', function(){ // mouse enter
    $('.card-detail', this).animate({height: '100%'});
    $('.card-bg', this).animate({height: '100%', opacity: 0.5});
    $('.personal-name', this).animate({'padding-bottom': '2%'});
    $('.card-detail div', this).show(); // show hidden details
  })

  .on('mouseleave', function(){ // mouse release
    $('.card-detail', this).animate({height: '28%'});
    $('.card-bg', this).animate({height: '28%', opacity: 0.95});
    $('.personal-name', this).animate({'padding-bottom': 0});
    $('.card-detail div', this).hide(); // hide details
  })
})