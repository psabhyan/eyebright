$(document).ready(function() {

  var display_video = function(){
    $('#iiif-video').empty();
    $.ajax({
      url: $('input#iiif-video-input')[0].value,
      cache: true,
      method: 'GET',
      success: function(data) {
        var video = document.createElement('video');
        video.controls = true;
        video.poster = data.poster['@id'];
        // console.log(data);
        data.sources.forEach(function(source){
          // console.log(source);
          if (video.canPlayType(source.format).length > 0) {
            video.src = source['@id'];
          }
        });
        $('#iiif-video').append(video);
      }
    });
  }

  $('button#iiif-video-button').on('click', function () {
    display_video();
  });

  $('.info-json').on('click', function(event){
    $('input#iiif-video-input')[0].value = this.href;
    display_video();
    event.preventDefault();
  });

});
