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

//Add an event for adding the events//

const form = document.querySelector(".form");
const tableBody = document.querySelector(".table__body");

// make data stores on localstorage //

const events = JSON.parse(localStorage.getItem("events")) || [];
let nextId = events.length ? events[events.length - 1].id + 1 : 1;

// const variants = JSON.parse(localStorage.getItem('variants'))

form.addEventListener("submit", (e) => {
  // console.log("hdbjdh");
  e.preventDefault();
  const variantname = document.querySelector(".variant-row__name").value;
  const variantqty = document.querySelector(".variant-row__qty").value;
  const variantvalue = document.querySelector(".variant-row__value").value;

  const evenTittle = document.querySelector("#event-title").value.trim();
  const eventImage = document.querySelector("#event-image").value.trim();
  const eventDescription = document.querySelector("#event-description").value.trim();
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
  console.log(NewEvent)

  events.push(NewEvent);
  // events.push(newvariants)
  localStorage.setItem("events", JSON.stringify(events));
  nextId++;
  form.reset();
  TableShow();
});
const variantbtn = document.querySelector("#btn-add-variant");
variantbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const variantsection = document.querySelector(".variant-row");
  variantsection.style.display = "flex";
  // console.log("ljgjg");
});

function TableShow() {
  tableBody.innerHTML = "";
  console.log(events.variants)
  events.forEach((ev) => {
    const tr = document.createElement("tr");
    tr.className = "table__row";
    tr.dataset.evenId = ev.id;
    tr.innerHTML = `
            <td>${ev.id}</td>
            <td>${ev.title}</td>
            <td>${ev.seat}</td>
            <td>${ev.price}$</td>
            <td><span class="badge" id="eventVariant">3</span></td>
            <td>
                <button class="btn btn--small" data-action="details"
                data-event-id="${ev.id}">Details</button>
                <button class="btn btn--small"data-action="edit"
                data-event-id="${ev.id}">Edit</button>
                <button class="btn btn--danger btn--small" data-action="archive"
                data-event-id="${ev.id}" onclick="deleteevent(this)">Delete</button>
                </td>
                            `;
                            
    ee = ev.id;
    // console.log(ee)
    tableBody.appendChild(tr);
  });
}

//  <td>
//             <li class="variant__list">
//             <ul>${ev.variants.name}</ul>
//             <ul>${ev.variants.qty}</ul>
//             <ul>${ev.variants.value}</ul>
//             </li></td>

TableShow()
var ee;


function Show_Archive() {
  archive.forEach((ev) => {
    const archive_t = document.createElement("tr");
    archive_t.innerHTML = `
    <tr class="table__row" data-event-id="1">
                                        <td>${events.id}</td>
                                        <td>${keey.title}</td>
                                        <td>${keey.seat}</td>
                                        <td>${keey.price}</td>
                                        <td>
                                            <button class="btn btn--small" data-action="restore" data-event-id="1">Restore</button>
                                        </td>
                                    </tr>
    `;

    archivetable.appendChild(archive_t);
  });
}


const archivetable = document.querySelector(".archive table__body");
const archive = JSON.parse(localStorage.getItem("archive")) || [];

// function to_archive(keey){
//     for(let i = 0;i < events.length;i++){
//         archive[i] = events[i]
//     }
// }

function deleteevent(key) {
  // console.log(key)
  const keey = key.dataset.eventId;
  console.log(keey);
  // key.parentElement.parentElement.remove();


  // to_archive(keey)
  // console.log(events[keey - 1]);
  let x = keey - 1;
  let newarr = events.filter((ev)=> ev.id !== x)
  
  // archive.push()

  // events[x] = "";
  // let o = x;
  // for (let i = x + 1; i < events.length; i++) {
  //   let tmp = events[i];
  //   events[i] = events[o];
  //   events[o] = tmp;
  //   o++;
  // }
  // Show_Archive()
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
// }
