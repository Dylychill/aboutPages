/**
 *Dylan McKone
 *10/30/19
 *TA: Hudson Gilmore
 * This is the index.js script for Creative Project 3 adding onto my portfolio website
 * that I started in CP1. It will allow for user interaction to affect the behavior of the page.
 * CP3 accounts for fetching API to display news headlines based on user input search term.
 */
"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Runs after page loads and prepares all event handlers to user interaction.
   */
  function init() {
    id("color").addEventListener("click", changeColor);
    id("searchButton").addEventListener("click", fetchTheData);
  }

  /**
   * Calls for data from API
   */
  function fetchTheData() {
    let baseURL = "https://newsapi.org/v2/top-headlines";
    deleteOld();
    let search = "?q=" + id("search").value;
    id("searchTerm").textContent = id("search").value;
    let apiKey = "&apiKey=c1c6c8286a5449b7a7fcc01deb46437c";
    fetch(baseURL + search + apiKey)
      .then(checkStatus)
      .then(response => response.json()) // if json
      .then(processResponse)
      .catch(handleError);
  }

  /**
   * Deletes all articles from previous search when starting a new one
   */
  function deleteOld() {
    let all = qsa(".newsPiece");
    for (let i = 0; i < all.length; i++) {
      all[i].remove();
    }
    if (qs(".errorMessage")) {
      qs(".errorMessage").remove();
    }
    id("resultNum").textContent = "";
  }

  /**
   * Takes successful response data from fetch and does something with it
   * @param {responce} data within the response object returned by the fetch
   */
  function processResponse(data) {
    id("resultNum").textContent = data.articles.length; // Note: data.totalResults is unreliable
    for (let i = 0; i < data.articles.length; i++) {
      let newThing = gen("div");
      newThing.classList.add("newsPiece");
      let boxLeft = gen("section");
      newThing.appendChild(boxLeft);
      let title = gen("h4");
      title.textContent = data.articles[i].title;
      boxLeft.appendChild(title);
      let author = gen("p");
      author.textContent = data.articles[i].author;
      boxLeft.appendChild(author);
      let description = gen("p");
      description.textContent = data.articles[i].description;
      boxLeft.appendChild(description);
      let pubAt = gen("p");
      pubAt.textContent = data.articles[i].publishedAt;
      boxLeft.appendChild(pubAt);
      let url = gen("A");
      url.setAttribute("href", data.articles[i].url);
      let text = document.createTextNode(data.articles[i].url);
      url.appendChild(text);
      boxLeft.appendChild(url);
      let img = gen("img");
      img.src = data.articles[i].urlToImage;
      newThing.appendChild(img);
      qs("main").appendChild(newThing);
    }
  }

  /**
   * Acts when an error is thrown by displaying a message to user
   * @param {responce} err response object returned by the fetch
   */
  function handleError(err) {
    let message = gen("p");
    message.textContent = err;
    message.classList.add("errorMessage");
    id("searchBar").appendChild(message);
  }

  /**
   * Checks that the fetch returned something usable, will throw an error if there's a problem
   * always after fetch and before processing the data
   * @param {responce} response object returned by the fetch
   * @return {response} response object that was handed in
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Changes the color of the whole page on user click
   */
  function changeColor() {
    document.body.classList.toggle("purple");
    document.querySelector("header").classList.toggle("blue");
  }

  /**
   * Helper Function for using id
   * @param {string} idName of the thing you want
   * @return {object} the object you want
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Helper Function for getting first instance of a selector
   * @param {string} selector of the thing you want
   * @return {object} the object you want
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Helper Function for getting first instance of a selector
   * @param {string} selector of the things you want
   * @return {array} the object you want
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Helper Function for creating a new element of given type
   * @param {string} elType of the thing you want
   * @return {object} the newly created object
   */
  function gen(elType) {
    return document.createElement(elType);
  }

})();
