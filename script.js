const storage = require("electron-json-storage");
const $ = require("jquery");
const remote = require('electron').remote;

// storage.remove('list', function(error) {
//   if (error) throw error;
// });

function displayList() {
  storage.get("list", (err, object) => {
    console.log(object);
    $("#list").html("<li>looodinggg...</li>");
    if (object) {
      let list = object.list;
      list.sort(function(a, b) {
        return b.timestamp - a.timestamp;
      });
      let string = "";
      for (var i = 0; i < list.length; i++) {
        string += `<li class="collection-item"><div>${
          list[i].text
        }<a onclick ="Delete(${i})" class="secondary-content"><i class="material-icons">close</i></a></div></li>`;
      }
      $("#list").html(string);
    }
  });
}

function createIfNotPresent() {
  storage.has("list", (err, present) => {
    if (!present) {
      let list = [];
      storage.set("list", { list: list }, (err, object) => {
        displayList();
      });
    } else {
      displayList();
    }
  });
}

createIfNotPresent();

$("form").submit(e => {
  e.preventDefault();
  const text = e.target.text.value;
  if (text !== "") {
    storage.get("list", (err, object) => {
      let list = object.list;
      list.push({ text: text, checked: false, timestamp: Date.now() });
      storage.set("list", { list: list }, (err, object) => {
        if (!err) {
          displayList();
          $("#text").val("");
        }
      });
    });
  }
});

function Delete(id) {
  storage.get("list", (err, object) => {
    if (object) {
      let list = object.list;
      list.splice(id, 1);
      storage.set("list", { list: list }, (err, object) => {
        displayList();
      });
    }
  });
}

function Close(){
  var window = remote.getCurrentWindow();
  console.log("works");
  window.close();
}
