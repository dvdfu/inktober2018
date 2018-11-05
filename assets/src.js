const THUMB_PATH = "assets/img/thumbs/";
const FULL_PATH = "assets/img/full/";
const GRAY = "gray";
const LIGHT_GRAY = "#ddd";
const ANIM_MS = 300;

let $gallery;
let $overlay;
let $toggle;
let $artContainer;
let $artImage;
let $artCharacter;
let $artSeries;
let $artPrompt;

let artData = [];
let artIndex = 0;
let colorEnabled = true;

$(document).ready(function() {
  $gallery = $("#gallery");
  $overlay = $("#overlay");
  $toggle = $("#toggle");
  $artContainer = $("#art-container");
  $artImage = $("#art-image");
  $artCharacter = $("#art-character");
  $artSeries = $("#art-series");
  $artPrompt = $("#art-prompt");

  jQuery.getJSON("assets/art.json", function(data) {
    artData = data;
    for (let i = 0; i < data.length; i++) {
      $gallery.append(generateThumb(i));
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
  $artContainer.hide();

  const element = artData[index];
  const color = colorEnabled ? element.color : GRAY;

  $artCharacter.html(element.character);
  $artSeries.html(element.series);
  $artPrompt.html("Day " + (index + 1) + " - " + element.prompt);
  $overlay.css("background-color", color);

  $overlay.slideDown(ANIM_MS, function() {
    $artImage.attr("src", FULL_PATH + element.filename);
    $artImage.on("load", function() {
      $artContainer.fadeIn(ANIM_MS);
    });
  });

  artIndex = index;
}

function exitFullscreen() {
  $artContainer.fadeOut(ANIM_MS, function() {
    $overlay.slideUp(ANIM_MS);
  });
}

function nextEntry() {
  enterFullscreen(artIndex === 29 ? 0 : artIndex + 1);
}

function previousEntry() {
  enterFullscreen(artIndex === 0 ? 29 : artIndex - 1);
}

function toggleColor() {
  colorEnabled = !colorEnabled;
  $toggle.css("background-color", colorEnabled ? LIGHT_GRAY : GRAY);

  for (let i = 0; i < artData.length; i++) {
    const $thumb = $("#thumb-" + i);
    const color = colorEnabled ? artData[i].color : "transparent";
    $thumb.css("background-color", color);
  }
}
