var grid = jQuery('.grid-box').isotope({
  // options
  itemSelector: '.grid-item',
   percentPosition: true,
   layoutMode: 'fitRows',
   masonry: {
     columnWidth: '.grid-item'
   }
});

var filterFns = {};
jQuery('.filters-button-group').on( 'click', 'li', function() {
  var filterValue = jQuery( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  grid.isotope({ filter: filterValue });
  jQuery('.filters-button-group li').removeClass('active');
  jQuery(this).addClass('active');
});


jQuery('.video-icon').click(function(){
  var frame = document.getElementById("ifrm");
  if(frame){
    frame.parentNode.removeChild(frame);
  }
  jQuery('.tile-box-video').removeClass('playing_video');
  jQuery(this).parent().parent().parent().addClass('playing_video');
  var m_id = jQuery(this).attr("data-id");
  var video_url  = '';

    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm'); // assign an id
    ifrm.setAttribute('frameborder', 0);
    ifrm.setAttribute('allowfullscreen', 1);
    ifrm.setAttribute('allow', 'autoplay');


    jQuery(this).parent().parent().parent().find('.player-box').append(ifrm);

  // Make a request for a user with a given ID
  var embed_url = drupalSettings.path.baseUrl + '/media/' +m_id+ '/edit?_format=json';
  axios.get(embed_url)
  .then(function (response) {
    video_url = response.data.field_media_oembed_video[0].value;
    video_url = video_url.replace("watch?v=", "embed/");
    // assign url
    ifrm.setAttribute('src', video_url+"?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1");
  })
  .catch(function (error) {
    console.log(error);
  });



});

//Remove Video iframe
jQuery('.stop-video').click(function(){
  jQuery(this).parent().parent().removeClass('playing_video');
  var frame = document.getElementById("ifrm");
  frame.parentNode.removeChild(frame);
});
