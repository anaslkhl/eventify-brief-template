let btnstats = document.querySelectorAll(".sidebar__btn");
let screen = document.querySelectorAll(".screen");

//the function of switching between screens//

function switch_screen(key) {
  const targetone = key.dataset.screen;
  screen.forEach((ev) => {
    ev.classList.remove("is-visible");
    if (ev.dataset.screen === targetone) {
      ev.classList.add("is-visible");
    }
    btnstats.forEach((btn) => {
      btn.classList.remove("is-active");
    });
    key.classList.add("is-active");
  });
}


// const table_show = document.querySelector("#table_show");
// table_show.addEventListener('click', TableShow())
//Add an event for adding the events//

const form = document.querySelector(".form");
let tableBody = document.querySelector(".table__body");

// make data stores on localstorage //

let events = JSON.parse(localStorage.getItem("events")) || [];
let archive = JSON.parse(localStorage.getItem("archive")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1
let statTotalEvent = JSON.parse(localStorage.getItem("statTotalEvent"))
let statTotalSeats = JSON.parse(localStorage.getItem("statTotalSeats"))
let statTotalPrice = JSON.parse(localStorage.getItem("statTotalPrice"))
// let currentId = 1;
// console.log(currentId, "currentId")
// if (currentId != nextId){
//   nextId = currentId
// }

// const variants = JSON.parse(localStorage.getItem('variants'))

form.addEventListener("submit", (e) => {
  // console.log("hdbjdh");
  e.preventDefault();
  let variantname = document.querySelector(".variant-row__name").value;
  let variantqty = document.querySelector(".variant-row__qty").value;
  let variantvalue = document.querySelector(".variant-row__value").value;

  const evenTittle = document.querySelector("#event-title").value.trim();
  const eventImage = document.querySelector("#event-image").value.trim();
  const eventDescription = document
    .querySelector("#event-description")
    .value.trim();
  const eventSeats = document.querySelector("#event-seats").value.trim();
  const eventPrice = document.querySelector("#event-price").value.trim();
  let variantev = {};

  if (variantname && variantqty && variantvalue) {
    console.log(variantname);
    variantev.name = variantname;
    console.log(variantev.name);
    variantev.qty = variantqty;
    variantev.value = variantvalue;
  }
  // localStorage.removeItem('events')
  // TableShow();

  const NewEvent = {
    id: nextId,
    title: evenTittle,
    image: eventImage,
    description: eventDescription,
    seat: eventSeats,
    price: eventPrice,
    variants: variantev,
  };
  console.log(NewEvent);

  events.push(NewEvent);
  // events.push(newvariants)
  localStorage.setItem("events", JSON.stringify(events));
  nextId++;
  localStorage.setItem("nextId", nextId);

  form.reset();
  ShowInfo()
  TableShow();
});

const variantbtn = document.querySelector("#btn-add-variant");
variantbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const variantsection = document.querySelector(".variant-row");
  variantsection.style.display = "flex";
  // console.log("ljgjg");
});
ShowInfo();
function ShowInfo (){
  let statTotalPrice = document.querySelector("#stat-total-price")
  let statTotalSeats = document.querySelector("#stat-total-seats")
  let statTotalEvent = document.querySelector("#stat-total-events")
  let totalprice = JSON.parse(localStorage.getItem("totalprice"))
  let totalSeats = JSON.parse(localStorage.getItem("totalSeats"))
  let totalEvents = JSON.parse(localStorage.getItem("totalEvents"))
  let events = JSON.parse(localStorage.getItem("events"))
  let somePrice = 0;
  let someSeats = 0
  let someEvents = 0
  for (let i = 0;i < events.length; i++){
    somePrice += Number(events[i].price)
    someSeats += Number(events[i].seat)
    someEvents++
  }
  statTotalPrice.innerHTML = somePrice;
  statTotalSeats.innerHTML = someSeats;
  statTotalEvent.innerHTML = someEvents;
  console.log(somePrice)
  localStorage.setItem(("totalprice"), JSON.stringify(totalprice))
  localStorage.setItem(("statTotalSeats"), JSON.stringify(statTotalSeats))
  localStorage.setItem(("statTotalEvent"), JSON.stringify(statTotalEvent))
}

function TableShow() {
  let events = JSON.parse(localStorage.getItem("events"))
  tableBody.innerHTML = "";
  events = Array.isArray(events) ? events : [];
  events.forEach((ev) => {
    const tr = document.createElement("tr");
    tr.className = "table__row";

    tr.innerHTML = `
      <td>${ev.id}</td>
      <td>${ev.title}</td>
      <td>${ev.seat}</td>
      <td>${ev.price}$</td>
      <td><span class="badge">${
        ev.variants && ev.variants.name ? 1 : 0
      }</span></td>
      <td>
        <button class="btn btn--small" data-action="details" data-event-id="${
          ev.id
        }" onclick="ShowVariants(this)">Details</button>
        <button class="btn btn--small" data-action="edit" data-event-id="${
          ev.id
        }">Edit</button>
        <button class="btn btn--danger btn--small" data-action="archive" data-event-id="${
          ev.id
        }" onclick="deleteevent(this)">Delete</button>
      </td>
    `;
    localStorage.setItem(("events"), JSON.stringify(events))
    tableBody.appendChild(tr);
  });
}

const table_show = document.querySelector("#table_show");
table_show.addEventListener("click", TableShow);
const table_archive = document.querySelector("#table_archive")
table_archive.addEventListener('click', Show_Archive)

var ee;

// let archive = JSON.parse(localStorage.getItem("archive")) || [];
// git restore --source old-branch  //
// let archivetable = document.querySelector(".archive .table__body");
// let archive = JSON.parse(localStorage.getItem("archive")) || [];
function Show_Archive() {
  // archive.JSON.parse.localStorage.setItem("archive")
  let archive = JSON.parse(localStorage.getItem("archive"))
  const archivetable = document.querySelector(".table__body2");
  console.log(archivetable);
  archivetable.innerHTML = "";

  archive.forEach((ev) => {
    const row = document.createElement("tr");
    row.className = "table__row";
    row.innerHTML = `
                                        <td>${ev.id}</td>
                                        <td>${ev.title}</td>
                                        <td>${ev.seat}</td>
                                        <td>${ev.price + "$"}</td>
                                        <td>
                                        <button class="btn btn--small" data-action="restore" data-event-id="${
                                          ev.id
                                        }" onclick="RestoreEvents(this)">Restore</button>
                                        </td>
    `;

    // console.log(archive, "archive after");
    // console.log(archive_t, "tarchive");
    console.log(ev.id, "real id");
    localStorage.setItem("archive", JSON.stringify(archive));
    archivetable.appendChild(row);
  });
}

// function to_archive(keey){
//     for(let i = 0;i < events.length;i++){
//         archive[i] = events[i]
//     }
// }

function deleteevent(key) {
  const keey = Number(key.dataset.eventId);
  let archive = JSON.parse(localStorage.getItem("archive"));
  let events = JSON.parse(localStorage.getItem("events"));
  archive = Array.isArray(archive) ? archive : [];

  // let nextId = events.length ? events[events.length - 1].id + 1 : 1;
  console.log(nextId, "id");

  // console.log(archive);
  let newarch = events.filter((ev) => ev.id === keey);
  if (newarch.length > 0) {
    archive.push(newarch[0]);
  }
  console.log(newarch, "new arch");
  events = events.filter((ev) => ev.id != keey);
  console.log(keey);

  localStorage.setItem("archive", JSON.stringify(archive));
  localStorage.setItem("events", JSON.stringify(events));
  // localStorage.setItem("nextId", nextId);
  Show_Archive();
  TableShow()
  // nextId++

  // events[x] = "";
  // let o = x;
  // for (let i = x + 1; i < events.length; i++) {
  //   let tmp = events[i];
  //   events[i] = events[o];
  //   events[o] = tmp;
  //   o++;
  // }
}

function RestoreEvents(n) {
  let events = JSON.parse(localStorage.getItem("events"));
  let archive = JSON.parse(localStorage.getItem("archive"));
  const target = Number(n.dataset.eventId);
  let restored = archive.filter((n) => n.id === target);
  archive = archive.filter((ev) => ev.id !== target);

  if (restored.length > 0) {
    events.push(restored[0]);
  }
  localStorage.setItem("archive", JSON.stringify(archive));
  localStorage.setItem("events", JSON.stringify(events));
  TableShow()
  Show_Archive()
}

// let tab = [
//     "akldna", "asjbd", "sajl"
// ]

// const password = "Hello123";
// const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
// if (strongPassword.test(password)){
//     console.log("success");
// }
// else{
//     console.log("error")
//show variants table //

const variant_row = document.querySelector("#event-modal");
// const btnshowvariants = document.querySelector()

function ShowVariants(ky) {
  console.log("i commed")
  let detailId = Number(ky.dataset.eventId)
  console.log("variants");
  variant_row.classList.remove = "is-hidden";
}




