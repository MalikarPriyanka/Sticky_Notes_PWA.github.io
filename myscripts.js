/*........register service worker........*/
if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("service-worker.js");
}
/*...................*/
var itemList = document.getElementById("note");

itemList.addEventListener("click", removeItem);

let count = Number(window.localStorage.getItem("count"));
if (!count) {
  window.localStorage.setItem("count", "0");
}

console.log(count);

/*.........make note............*/
let makeNote = (noteTitle,notContent) => {
  if (count > 0) {
    document.getElementById("no-notes-found").className = "hidden";
  }

  var li = document.createElement("li");
  var a = document.createElement("a");
  var h2 = document.createElement("h2");
  var p = document.createElement("p");
  var ul = document.getElementById("note");

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  let deleteText = document.createTextNode("X");
  let h2TN = document.createTextNode(noteTitle);
  let pTN = document.createTextNode(notContent);

  h2.appendChild(h2TN);
  p.appendChild(pTN);
  deleteButton.appendChild(deleteText);

  a.appendChild(h2);
  a.appendChild(deleteButton);
  a.appendChild(p);
  a.setAttribute("href", "#");

  li.appendChild(a);
  ul.appendChild(li);
};

let makeNoteFromInput = (e) => {
  e.preventDefault();
  var noteTitle = document.getElementById("note-title-input").value;
  var notContent = document.getElementById("note-content-input").value;

  document.getElementById("note-title-input").value = "";
  document.getElementById("note-content-input").value = "";
  /*........alert.........*/
  console.log("yes");
  if (!noteTitle || !notContent) {
    alert("Both Title and content of the note must be provided");
    return;
  }
  /*...............*/
    
  count += 1;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle = noteTitle + " + 1";
  }
  /*......store note at local storege.........*/
  window.localStorage.setItem(noteTitle,notContent);

  makeNote(noteTitle,notContent);
  /*...................*/    
};

/*........delete note......*/
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    console.log(e);
    if (
      confirm(
        'Are you sure to delete the "' +
          e.target.previousElementSibling.innerText +
          '" note?'
      )
    ) 
    {
      var li = e.target.parentElement.parentElement;

      itemList.removeChild(li);
      count -= 1;
      window.localStorage.setItem("count", count);
      window.localStorage.removeItem(e.target.previousElementSibling.innerText);
      if (count < 1) {
        document.getElementById("no-notes-found").className = "";
      }
    }
  }
}
/*........................*/

/*.........access note...............*/
for (i = 0; i < count + 1; i++) {
  console.log(window.localStorage.key(i));
  let noteTitle = window.localStorage.key(i);
  let notContent = window.localStorage.getItem(noteTitle);
  if (noteTitle !== "count" && noteTitle) {
    makeNote(noteTitle, notContent);
  }
}

/*.............................*/


/*for clock*/
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

 function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();
/*.........*/


document
  .getElementById("inputForm")
  .addEventListener("submit", makeNoteFromInput, false);