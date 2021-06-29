$(document).ready(function(){
//  $('.tags').mouseenter(function() {
//    $(this).parent().css({'background-color': 'rgba(255, 207, 191, 0.6)'});
//    $(this).parent().find('.normaltag').css({'color': 'rgba(255, 207, 191, 0.6)'});
//    $(this).parent().find('.deletetag').css({'display': 'block'});
//  });
//  $('.tags').mouseleave(function() {
//    $(this).parent().css({'background-color': 'rgba(255, 207, 191)'});
//    $(this).parent().find('.normaltag').css({'color': 'black'});
//    $(this).parent().find('.deletetag').css({'display': 'none'});
//  });
  
  $('.personality-style').mouseenter(function() {
    $(this).css({'cursor': 'pointer'})
    $(this).css({'background-color': 'rgba(249, 213, 103, 0.6)'});
    $(this).find('.normaltag').css({'color': 'rgba(249, 213, 103, 0.6)'});
    $(this).find('.deletetag').css({'display': 'block'});
  });
  $('.personality-style').mouseleave(function() {
    $(this).css({'background-color': 'rgba(249, 213, 103)'});
    $(this).find('.normaltag').css({'color': 'black'});
    $(this).find('.deletetag').css({'display': 'none'});
  });

  $('.skill-style').mouseenter(function() {
    $(this).css({'cursor': 'pointer'})
    $(this).css({'background-color': 'rgba(159, 228, 212, 0.6)'});
    $(this).find('.normaltag').css({'color': 'rgba(159, 228, 212, 0.6)'});
    $(this).find('.deletetag').css({'display': 'block'});
  });
  $('.skill-style').mouseleave(function() {
    $(this).css({'background-color': 'rgba(159, 228, 212)'});
    $(this).find('.normaltag').css({'color': 'black'});
    $(this).find('.deletetag').css({'display': 'none'});
  });

  $('.interest-style').mouseenter(function() {
    $(this).css({'cursor': 'pointer'})
    $(this).css({'background-color': 'rgba(255, 207, 191, 0.6)'});
    $(this).find('.normaltag').css({'color': 'rgba(255, 207, 191, 0.6)'});
    $(this).find('.deletetag').css({'display': 'block'});
  });
  $('.interest-style').mouseleave(function() {
    $(this).css({'background-color': 'rgba(255, 207, 191)'});
    $(this).find('.normaltag').css({'color': 'black'});
    $(this).find('.deletetag').css({'display': 'none'});
  });
  
  let intervalId = window.setInterval(function(){ // check every 0.5 seconds
    if($('#user-image').val() != "") {
      $('#editpicfilter').hide();
      $('#fileselectedfilter').show();
    }
    else {
      $('#editpicfilter').show();
      $('#fileselectedfilter').hide();
    }
  }, 2000);

  // image preprocessor
  const MIME_TYPE = "image/jpeg";
  const QUALITY = 0.2;

  const input = document.getElementById("user-image");
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
          let new_img = new File([blob], "userpic.jpeg")
          let container = new DataTransfer();
          container.items.add(new_img);
          let fileInputElement = document.getElementById('user-image');
          fileInputElement.files = container.files;
        },
        MIME_TYPE,
        QUALITY
      );
      canvas.setAttribute("id", "user-img");
      if ($("img#user-img").length > 0) {
        $("img#user-img").replaceWith(canvas);
      } else {
        $("canvas#user-img").replaceWith(canvas);
      }
      
    };
  };
})

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

function tag_edit_handler(URL, CSRF, text, tag_type) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  console.log(text)
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'text': text,
      'type': tag_type
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('[Success] Successfully add new tag ' + text);
        $('.' + tag_type + '-input').before(
          "<div class='tag-style " + tag_type + "-style'><p class='tags normaltag'>" + text + "</p><p class='tags deletetag'>刪除</p></div>"
        );
        $('.' + tag_type + '-input').val("")
      } else {
        $('.' + tag_type + '-input').val("")
        console.log("[Error] " + data.error_message);
        if(data.error_message === 'Duplicate Tag'){
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: '名稱重複了喔～',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  })
}

function tag_delete_handler(URL, CSRF, text) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  console.log(text);
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'text': text,
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('[Success] Successfully delete tag ' + text);
      } else {
        console.log("[Error] " + data.error_message);
      }
    }
  })
}
