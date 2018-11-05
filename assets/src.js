const THUMB_PATH = "assets/img/thumbs/";
const FULL_PATH = "assets/img/full/";
let artData = [];
let artIndex;
let colorEnabled = true;

$(document).ready(function() {
  exitFullscreen();
  const gallery = $("#gallery");

  jQuery.getJSON("assets/art.json", function(data) {
    artData = data;
    for (let i = 0; i < data.length; i++) {
      gallery.append(generateThumb(i));
    }
  });
});

function generateThumb(index) {
  const element = artData[index];
  const thumb = $(`
    <div class="art-thumb-container">
      <div
        id="thumb-${index}"
        class="art-thumb"
        onClick="enterFullscreen(${index})"
        style="
          background-image: url(${THUMB_PATH + element.filename});
          background-color: ${element.color};
        ">
      </div>
    </div>
  `);
  return thumb;
}

function enterFullscreen(index) {
  const element = artData[index];
  const overlay = $("#overlay");
  const color = colorEnabled ? element.color : "#888";

  overlay.html(`
    <div
      class="fullscreen-icon"
      id="exit"
      onClick="exitFullscreen()">
      <i class="fas fa-times-circle fa-2x"></i>
    </div>
    <div
      class="fullscreen-icon"
      id="previous"
      onClick="enterFullscreen(${index == 0 ? 29 : index - 1})">
      <i class="fas fa-arrow-left fa-2x"></i>
    </div>
    <div
      class="fullscreen-icon"
      id="next"
      onClick="enterFullscreen(${index === 29 ? 0 : index + 1})">
      <i class="fas fa-arrow-right fa-2x"></i>
    </div>
    <div id="art-container" class="content">
      <img src="${FULL_PATH + element.filename}"/>
      <div class="description">
        <h1>${element.character}</h1>
        <h2>${element.series}</h2>
        <hr>
        <h2>Day ${index + 1} - ${element.prompt}</h2>
      </div>
    </div>
  `);
  overlay.css("background-color", color);

  const art = $("#art-container");
  art.hide();
  overlay.slideDown(200, function() {
    art.fadeIn(200);
  });
  artIndex = index;
}

function exitFullscreen() {
  const overlay = $("#overlay");
  const art = $("#art-container");
  art.fadeOut(200, function() {
    overlay.slideUp(200);
  });
}

function toggleColors() {
  const toggle = $("#toggle");
  colorEnabled = !colorEnabled;

  for (let i = 0; i < artData.length; i++) {
    const thumb = $("#thumb-" + i);
    const color = colorEnabled ? artData[i].color : "#ddd";
    // thumb.stop().animate({ backgroundColor: color }, 300);
    thumb.css("background-color", color);
  }
}
