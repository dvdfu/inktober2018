const THUMB_PATH = "assets/img/thumbs/";
const FULL_PATH = "assets/img/full/";
let artData = [];
let artIndex;

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
  overlay.css("background-color", element.color);
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
    <div class="content">
      <img src="${FULL_PATH + element.filename}"/>
      <div class="description">
        <h1>${element.character}</h1>
        <h2>${element.series}</h2>
        <hr>
        <h2>Day ${index + 1} - ${element.prompt}</h2>
      </div>
    </div>
  `);
  overlay.show();
  artIndex = index;
}

function exitFullscreen() {
  $("#overlay").hide();
}
