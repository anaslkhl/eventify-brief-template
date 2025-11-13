let btnstats = document.querySelectorAll(".sidebar__btn");
let screen = document.querySelectorAll(".screen");

// the function of switching between screens //

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
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
let statTotalEvent = JSON.parse(localStorage.getItem("statTotalEvent"));
let statTotalSeats = JSON.parse(localStorage.getItem("statTotalSeats"));
let statTotalPrice = JSON.parse(localStorage.getItem("statTotalPrice"));
// let variantev = JSON.parse(localStorage.getItem("variantev")) || {};

// This event for fill the form of events details //

form.addEventListener("submit", (e) => {
  // console.log("hdbjdh");
  e.preventDefault();

  const evenTittle = document.querySelector("#event-title").value.trim();
  const eventImage = document.querySelector("#event-image").value.trim();
  const eventDescription = document
    .querySelector("#event-description")
    .value.trim();
  const eventSeats = document.querySelector("#event-seats").value.trim();
  const eventPrice = document.querySelector("#event-price").value.trim();
  let variantname = document.querySelector(".variant-row__name").value.trim();
  let variantqty = document.querySelector(".variant-row__qty").value.trim();
  let variantvalue = document.querySelector(".variant-row__value").value.trim();
  let variantev = {};
  if (variantname && variantqty && variantvalue) {
    variantev = {
      name: variantname,
      qty: variantqty,
      value: variantvalue,
    };
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

  events.push(NewEvent);
  // events.push(newvariants)
  localStorage.setItem("events", JSON.stringify(events));
  nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
  // localStorage.setItem("variantev", JSON.stringify(variantev));
  form.reset();
  ShowInfo();
  TableShow();
});

// This is the variants button to add a variant //

const variantbtn = document.querySelector("#btn-add-variant");
variantbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const variantsection = document.querySelector(".variant-row");
  variantsection.style.display = "flex";
  // console.log("ljgjg");
});

//-- This function to show the stats informations (total events & price & seats) --//

ShowInfo();
function ShowInfo() {
  let statTotalPrice = document.querySelector("#stat-total-price");
  let statTotalSeats = document.querySelector("#stat-total-seats");
  let statTotalEvent = document.querySelector("#stat-total-events");
  let totalprice = JSON.parse(localStorage.getItem("totalprice"));
  let totalSeats = JSON.parse(localStorage.getItem("totalSeats"));
  let totalEvents = JSON.parse(localStorage.getItem("totalEvents"));
  let events = JSON.parse(localStorage.getItem("events"));
  let somePrice = 0;
  let someSeats = 0;
  let someEvents = 0;
  for (let i = 0; i < events.length; i++) {
    somePrice += Number(events[i].price);
    someSeats += Number(events[i].seat);
    someEvents++;
  }
  statTotalPrice.innerHTML = somePrice + "$";
  statTotalSeats.innerHTML = someSeats;
  statTotalEvent.innerHTML = someEvents;
  // console.log(somePrice);
  localStorage.setItem("totalprice", JSON.stringify(totalprice));
  localStorage.setItem("statTotalSeats", JSON.stringify(statTotalSeats));
  localStorage.setItem("statTotalEvent", JSON.stringify(statTotalEvent));
}

// This function for show the events list //

function TableShow() {
  let events = JSON.parse(localStorage.getItem("events"));
  tableBody.innerHTML = "";
  events = Array.isArray(events) ? events : [];
  events.forEach((ev) => {
    const tr = document.createElement("tr");
    tr.className = "table__row";

    tr.innerHTML = `
      <td>${ev.id}</td>
      <td class="table_title">${ev.title}</td>
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
    localStorage.setItem("events", JSON.stringify(events));
    tableBody.appendChild(tr);
    eventSearch();
  });
}

const table_show = document.querySelector("#table_show");
table_show.addEventListener("click", TableShow);
const table_archive = document.querySelector("#table_archive");
table_archive.addEventListener("click", Show_Archive);

var ee;

// This function for searching about an event //

function eventSearch() {
  let table__row = document.querySelectorAll(".table__row");
  let searchEvents = document.querySelector("#search-events");

  searchEvents.addEventListener("input", (e) => {
    let query = e.target.value.toLowerCase();
    table__row.forEach((li) => {
      // Compare with the text of each list item
      const table_title = li.querySelector(".table_title");
      if (table_title.textContent.toLowerCase().includes(query)) {
        li.style.display = "table-row"; // show it
      } else {
        li.style.display = "none"; // hide it
      }
    });
  });
}

let sortEvents = document.querySelector("#sort-events");
sortEvents.addEventListener("change", (e) => sortby());
function sortby() {
  switch (sortEvents.value) {
    case "price-desc":
      sortingEvents();
      break;
    case "price-asc":
      LowToHigh();
      break;
    case "seats-asc":
      LowToHighseats();
      break;
    case "price-asc":
      LowToHigh();
      break;
  }
  console.log("comee");
}

// A function to sort an array //

function sortingEvents() {
  let events = JSON.parse(localStorage.getItem("events"));
  for (let i = 0; i < events.length - 1; i++) {
    for (let x = 0; x < events.length - i - 1; x++) {
      if (events[x].price < events[x + 1].price) {
        let temp = events[x + 1];
        events[x + 1] = events[x];
        events[x] = temp;
      }
    }
  }
  localStorage.setItem("events", JSON.stringify(events));
  TableShow();
}

function LowToHigh() {
  let events = JSON.parse(localStorage.getItem("events"));
  console.log("lh");
  for (let i = 0; i < events.length - 1; i++) {
    for (let x = 0; x < events.length - i - 1; x++) {
      if (events[x].price > events[x + 1].price) {
        let temp = events[x + 1];
        events[x + 1] = events[x];
        events[x] = temp;
      }
    }
  }
  localStorage.setItem("events", JSON.stringify(events));
  TableShow();
}

function LowToHighseats() {
    let events = JSON.parse(localStorage.getItem("events"));
    console.log("lh");
    for (let i = 0; i < events.length - 1; i++) {
      for (let x = 0; x < events.length - i - 1; x++) {
        if (events[x].seat > events[x + 1].seat) {
          let temp = events[x + 1];
          events[x + 1] = events[x];
          events[x] = temp;
        }
        console.log("come in")
      }
    }
    localStorage.setItem("events", JSON.stringify(events));
    TableShow();
  }
// let archive = JSON.parse(localStorage.getItem("archive")) || [];
// git restore --source old-branch  //
// let archivetable = document.querySelector(".archive .table__body");
// let archive = JSON.parse(localStorage.getItem("archive")) || [];

// This function for show the archive list //

function Show_Archive() {
  // archive.JSON.parse.localStorage.setItem("archive")
  let archive = JSON.parse(localStorage.getItem("archive"));
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

// Function for delete an event from the events list when clicking on delete butto //

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
  TableShow();
  Show_Archive();
}

//Function for restoring the events from archive list to event list whenn clicking on restore button //

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
  TableShow();
  Show_Archive();
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

//This function for showing the variants when click on details button //

function ShowVariants(ky) {
  // let variantev = JSON.parse(localStorage.getItem("variantev"));
  let events = JSON.parse(localStorage.getItem("events"));

  let variant_row = document.querySelector("#event-modal");
  let modalBody = document.querySelector("#modal-body");
  let eventId = Number(ky.dataset.eventId);
  let variantindex = Number(ky.dataset.variantIndex);
  let event = events.find((ev) => ev.id === eventId);
  if (!event) {
    return;
  }
  let variant = event.variants;

  console.log("come");
  if (!variant) {
    console.error("Event not found!");
  }

  modalBody.innerHTML = `
  <div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Name : ${variant.name}</li>
      <li class="list-group-item">Number Of Seats : ${variant.qty}</li>
      <li class="list-group-item">Value : ${variant.value}</li>
    </ul>
  </div>
  `;

  console.log("i commed");
  // console.log(variantev);
  variant_row.classList.remove("is-hidden");
  // localStorage.setItem("variantev", JSON.stringify(variantev));
}
let variant_row = document.querySelector("#event-modal");
let modal__close = document.querySelector(".modal__close");

modal__close.addEventListener("click", () => {
  variant_row.classList.add("is-hidden");
});
