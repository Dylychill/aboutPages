/**
 *Dylan McKone
 *10/10/19
 *TA: Hudson Gilmore
 * This is the index.js script for Creative Project 3 adding onto my portfolio website
 * that I started in CP1. It will allow for user interaction to affect the behavior of the page.
 * CP3 accounts for fetching API to display...
 */
"use strict";
(function() {
  window.addEventListener("load", init);
  const GALLERY = ["images/PacWave_BTS_01.jpg", "images/PacWave_16.jpg",
  "images/PacificWave_17.jpg", "images/PacificWave_18.jpg",
  "images/UWDaily_190920_SectionB_01.jpg", "images/UWDaily_190922_01.jpg",
  "images/UWDaily_190930_01.jpg", "images/UWGameDaily_190925_01.jpg",
  "images/UWGameDaily_190925_04.jpg", "images/UWGameDaily_190925_08.jpg"];
  const GALLERY_ALT = [
  "Cover of The Pacific Wave Magzine showing a photo of a girl's face.",
  "Page 16 of Pacific Wave showing 1st half of article on natural deodorants.",
  "Page 17 of Pacific Wave showing 2nd half of article on natural deodorants.",
  "Page 18 of Pacific Wave showing article on farmer's markets.",
  "Cover of The Daily newspaper showing headline article Henry Art Museum's event",
  "Cover of The Daily newspaper showing headline article Youth Climate Change March",
  "Cover of The Daily newspaper showing protestors waving flags for Hong Kong",
  "Cover of The Game Daily newspaper showing headline article on football player Eason",
  "Page 4 of Game Daily showing 1st half of feature article on Jacob Eason.",
  "Page 8 of The Game Daily newspaper showing 2 articles: Battle Royal and Top 25"
  ];
  let i = 0;

  /**
   * Runs after page loads and prepares all event handlers to user interaction.
   */
  function init() {
    document.getElementById("next").addEventListener("click", next);
    document.getElementById("previous").addEventListener("click", previous);
    document.getElementById("secret").addEventListener("click", secret);
    document.getElementById("color").addEventListener("click", changeColor);

  }

  /**
   *Changes pictures to the next one in the gallery
   */
  function next() {
    i++;
    if (i === GALLERY.length) {
      i = 0;
    }
    let currentImg = document.getElementById("image");
    currentImg.src = GALLERY[i];
    currentImg.alt = GALLERY_ALT[i];
  }

  /**
   * Goes to previous image from the gallery
   */
  function previous() {
    if (i === 0) {
      i = GALLERY.length - 1;
    } else {
      i--;
    }
    let currentImg = document.getElementById("image");
    currentImg.src = GALLERY[i];
    currentImg.alt = GALLERY_ALT[i];
  }

  /**
   * Changes the color of the whole page on user click
   */
  function changeColor() {
    document.body.classList.toggle("purple");
    document.querySelector("header").classList.toggle("blue");
  }

  /**
   * User select button that creates new images and makes text visible.
   */
  function secret() {
    document.querySelector("#secret .hidden").classList.remove("hidden");
    let sec = document.querySelector("#secret");
    sec.classList.remove("p");
    let newImg = document.createElement("img");
    newImg.classList.add("img");
    newImg.src = "images/happy.jpg";
    newImg.alt = "A colorful artist rendition of 2 people dancing while smiling.";
    sec.appendChild(newImg);
    let source = document.createElement("p");
    source.textContent = "https://www.nytimes.com/guides/well/how-to-be-happy";
    source.classList.add("citation");
    sec.appendChild(source);
  }
})();
