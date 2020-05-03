"use strict";

const ul = document.getElementById("status");
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const settings = {
  option1: false,
  option2: false,
}
// Open & setup Websocket
const settingsSocket = new WebSocket(
  "ws://localhost:8080/settings/" + 2
);
settingsSocket.onopen = function () {
  console.log("Websocket opened at /settings/" + 2);
};
settingsSocket.onclose = function () {
  console.log("Websocket closed");
};

// Set function to update DOM on message
settingsSocket.onmessage = function (event) {
  console.log(event.data);
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(event.data));
  ul.appendChild(li);
};

if (checkbox)
  checkbox.forEach(function (cb) {
    cb.addEventListener('change', function (e) {
      // debugger
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log(xhr.response);
        }
      };

      settings[e.target.id] = e.target.checked;
      xhr.open("POST", "/settings/" + 2, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onerror = function (error) {
        console.error(error);
      };
      xhr.send(JSON.stringify(settings));
    })
  });

