const THUMB_PATH = "assets/img/thumbs/";
const FULL_PATH = "assets/img/full/";
const GRAY = "gray";
const LIGHT_GRAY = "#ddd";
const BLUE = "#38c";
const ANIM_MS = 300;

let $gallery;
let $overlay;
let $toggle;
let $fullscreenContent;
let $artImage;
let $artCharacter;
let $artSeries;
let $artPrompt;

let artData = [];
let artIndex = 0;
let colorEnabled = true;

document.body.addEventListener("keydown", function(e) {
  if ($fullscreenContent.is(":visible")) {
    switch (e.keyCode) {
      case 27:
        exitFullscreen();
        break;
      case 39:
        nextEntry();
        break;
      case 37:
        previousEntry();
        break;
    }
  }
});

$(document).on("mobileinit", function() {
  jQuery.mobile.autoInitializePage = false;
});

$(document).ready(function() {
  $gallery = $("#gallery");
  $overlay = $("#overlay");
  $toggle = $("#toggle");
  $fullscreenContent = $("#overlay .content");
  $artImage = $("#art-image");
  $artCharacter = $("#art-character");
  $artSeries = $("#art-series");
  $artPrompt = $("#art-prompt");

  $fullscreenContent.on("swipeleft", nextEntry);
  $fullscreenContent.on("swiperight", previousEntry);

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
    <div class="art-container thumb">
      <div class="art-padding">
        <img
          id="thumb-${index}"
          onClick="enterFullscreen(${index})"
          src="${THUMB_PATH + element.filename}"
          style="background-color: ${element.color};">
        </img>
      </div>
    </div>
  `);
  return thumb;
}

function enterFullscreen(index) {
  $fullscreenContent.hide();

  const element = artData[index];
  const color = colorEnabled ? element.color : GRAY;

  $artCharacter.html(element.character);
  $artSeries.html(element.series);
  $artPrompt.html("Day " + (index + 1) + " - " + element.prompt);
  $overlay.css("background-color", color);

  $overlay.slideDown(ANIM_MS, function() {
    $artImage.attr("src", FULL_PATH + element.filename);
    $artImage.on("load", function() {
      $fullscreenContent.fadeIn(ANIM_MS);
    });
  });

  artIndex = index;
}

function exitFullscreen() {
  $fullscreenContent.fadeOut(ANIM_MS, function() {
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
  $toggle.css("background-color", colorEnabled ? LIGHT_GRAY : BLUE);

  for (let i = 0; i < artData.length; i++) {
    const $thumb = $("#thumb-" + i);
    const color = colorEnabled ? artData[i].color : "transparent";
    $thumb.css("background-color", color);
  }
}
