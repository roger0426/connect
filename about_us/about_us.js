//computer -> 'hover' or 'mouseenter, mouselesve'

//touchscreen -> 'single touch'

$(document).ready(function(){

  $('.card')
  .on('mouseenter', function(){ // mouse enter
    $('.card-detail', this).animate({height: '100%'}, 300);
    $('.card-bg', this).animate({height: '100%', opacity: 0.7}, 300);
    $('.personal-name', this).animate({'padding-bottom': '2%'}, 300);
    $('.card-detail div', this).show(); // show hidden details
  })

  .on('mouseleave', function(){ // mouse release
    $('.card-detail', this).animate({height: '28%'}, 700);
    $('.card-bg', this).animate({height: '28%', opacity: 0.85}, 700);
    $('.personal-name', this).animate({'padding-bottom': 0}, 700);
    $('.card-detail div', this).hide();
  })
    
  $('.button')
  .on('mouseenter', function(){
    $(this).css("text-decoration", "underline");
  })
  .on('mouseleave', function(){ // mouse release
    $(this).css("text-decoration", "none");
  })
})
