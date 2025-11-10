




let archive = [];
let btnstats = document.querySelectorAll('.sidebar__btn')
let screen = document.querySelectorAll(".screen");


//the function of switching between screens//

function switch_screen(key) {
    const targetone = key.dataset.screen
    screen.forEach(ev => {
        ev.classList.remove("is-visible")
        if (ev.dataset.screen === targetone) {
            ev.classList.add("is-visible")
        }
        btnstats.forEach(btn => {
            btn.classList.remove("is-active")
        })
        key.classList.add("is-active")
    });
}


//Add an event for adding the events//

const form = document.querySelector(".form")
const tableBody = document.querySelector(".table__body")

// make data stores on localstorage //

const events = JSON.parse(localStorage.getItem('events')) || [];
let nextId = events.length ? events[events.length - 1].id + 1 : 1;

function TableShow() {

    tableBody.innerHTML = '';
    events.forEach(ev => {
        const tr = document.createElement('tr')
        tr.className = 'table__row'
        tr.dataset.evenId = ev.id;
        tr.innerHTML = `
                        <td>${ev.id}</td>
                        <td>${ev.title}</td>
                        <td>${ev.seat}</td>
                        <td>${ev.price}$</td>
                        <td><img src="${ev.image}" alt="event pic" style="width:60px; height:auto; object-fit:cover;"></td>
                        <td><span class="badge" id="eventVariant">3</span></td>
                        <td>
                            <button class="btn btn--small" data-action="details"
                                data-event-id="${ev.id}">Details</button>
                            <button class="btn btn--small"data-action="edit"
                                data-event-id="${ev.id}">Edit</button>
                            <button class="btn btn--danger btn--small" data-action="archive"
                                data-event-id="${ev.id}">Delete</button>
                        </td>
                                    `;

        tableBody.appendChild(tr)
    })
}
TableShow();

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('commed')
    const evenTittle = document.querySelector('#event-title').value.trim()
    const eventImage = document.querySelector('#event-image').value.trim()
    const eventDescription = document.querySelector('#event-description').value.trim()
    const eventSeats = document.querySelector('#event-seats').value.trim()
    const eventPrice = document.querySelector('#event-price').value.trim()
    const NewEvent =
    {
        id: nextId,
        title: evenTittle,
        image: eventImage,
        description: eventDescription,
        seat: eventSeats,
        price: eventPrice
    }

    events.push(NewEvent);
    localStorage.setItem('events', JSON.stringify(events))
    TableShow()
    nextId++
    form.reset()
});



function ToArchive() {
    
}












