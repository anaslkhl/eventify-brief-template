let events = [];
let archive = [];
let btnstats = document.querySelectorAll('.sidebar__btn')
let screen = document.querySelectorAll(".screen");

let form = document.getElementsByClassName("form")[0]

console.log(form);


function switch_screen (key) {
    const targetone = key.dataset.screen
    screen.forEach(ev => {
        ev.classList.remove("is-visible")
        if (ev.dataset.screen === targetone){
            ev.classList.add("is-visible")
        }
        btnstats.forEach(btn => {
            btn.classList.remove("is-active")
        })
        key.classList.add("is-active")
    });
}

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    inputsvalue()
    
})

function inputsvalue() {

const eventTittle = document.getElementById("event-title")
const eventImage = document.getElementById("event-image")
const eventDescription = document.getElementById("event-description")
const eventSeats = document.getElementById("event-seats")
const eventPrice = document.getElementById("event-price")

const eventTittlev = eventTittle.value
const eventImagev = eventImage.value
const eventDescriptionv = eventDescription.value
const eventSeatsv = eventSeats.value
const eventPricev = eventPrice.value

events.push({eventTittlev, eventImagev, eventSeatsv, eventPricev, eventDescriptionv})
form.reset()
}






