const THUMB_PATH = "assets/img/thumbs/";
let artData = [];
let fullscreen = false;

$(document).ready(function() {
  hideFullScreen();
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
  <div id="art-thumb" onClick="onThumbClick(${index})">
    <img src="${THUMB_PATH + element.filename}"/>
  </div>
`);
  // thumb.css("background-color", element.color);
  return thumb;
}

function onThumbClick(index) {
  const element = artData[index];
  const overlay = $("#overlay");
  // overlay.css("background-color", element.color);
  overlay.html(`
  <div class="content">
    <img src="${THUMB_PATH + element.filename}"/>
    <h1>${element.character}</h1>
    <h2>${element.series}</h2>
    <h3>Day ${index + 1} - ${element.prompt}</h3>
  </div>
`);
  overlay.show();
  fullscreen = true;
}

function hideFullScreen() {
  $("#overlay").hide();
}
