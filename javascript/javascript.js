$(document).ready(function(){
    buildMap();
  });
  
  var sw = document.body.clientWidth,
      bp = 550,
      $map = $('.map');
  var static = "https://maps.google.com/maps/api/staticmap?center=55.7402023,12.5341835&zoom=13&markers=55.7402023,12.5341835&size=640x320&sensor=true";
  var embed = '<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d62212.499702312874!2d77.60495593988337!3d12.953847609921773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bae1411981a2c5f%3A0xa3310d419f51d692!2sCalypso%20Events%20Management%2C%20Krishna%20Reddy%20Layout%2C%20Amarjyoti%20Layout%2C%20Domlur%2C%20Bengaluru%2C%20Karnataka!3m2!1d12.9537967!2d77.63997189999999!5e0!3m2!1sen!2sin!4v1640279958641!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';

  function buildMap() {
    if(sw>bp) { //If Large Screen
        if($('.map-container').length < 1) { //If map doesn't already exist
          buildEmbed();
        }
    } else {
        if($('.static-img').length < 1) { //If static image doesn't exist
          buildStatic();
        }
    }
  };
  
  function buildEmbed() { //Build iframe view
      $('<div class="map-container"/>').html(embed).prependTo($map);
  };
    
  function buildStatic() { //Build static map
     var mapLink = $('.map-link').attr('href'),
         $img = $('<img class="static-img" />').attr('src',static);
     $('<a/>').attr('href',mapLink).html($img).prependTo($map); 
  }
  
  $(window).resize(function() {
    sw = document.body.clientWidth;
    buildMap();
    google.maps.event.trigger(map, "resize");
  });

  let observedElements = document.querySelectorAll(
    ".monkey,.monkey-text,.description"
  );
  
  const options = {threshold: 0.2};
  
  const inViewCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opac");
      } 
      // else {
      //   entry.target.classList.remove("opac");
      // }
    });
  };
  let observer = new IntersectionObserver(inViewCallback, options);
  
  observedElements.forEach((element) => {
    let dataDelay = element.getAttribute("data-delay");
    element.style.transitionDelay = dataDelay + "ms";
    observer.observe(element);
  });