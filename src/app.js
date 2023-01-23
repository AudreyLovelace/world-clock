let main = document.querySelector("main");
let firstTwoLocation = ["Asia/Tokyo", "Europe/Paris"];
let select = document.querySelector("select");

function updateTime(clock) {
  let place = clock.attributes.place.value;
  //   console.log("a", place);
  let city = place.replace("_", " ").split("/")[1];
  let time = moment().tz(place);
  let p = time.format("MMMM Do YYYY");
  let h1 = time.format("h:mm:ss");
  let h3 = time.format("A");
  clock.innerHTML = `<div class="left">
            <h3>${city}</h3>
            <p>${p}</p>
          </div>
          <div class="right">
            <h1>${h1}</h1>
            <h3>${h3}</h3>
          </div>`;
}

function generateClock(place = "aaaa") {
  let city = place.replace("_", " ").split("/")[1];
  let time = moment().tz(place);

  let p = time.format("MMMM Do YYYY");
  let h1 = time.format("h:mm:ss");
  let h3 = time.format("A");
  let clock = document.createElement("div");
  clock.classList.add("clock");
  clock.setAttribute("place", place);
  clock.innerHTML = `<div class="left">
            <h3>${city}</h3>
            <p>${p}</p>
          </div>
          <div class="right">
            <h1>${h1}</h1>
            <h3>${h3}</h3>
          </div>`;
  return clock;
}

function allCity() {
  main.innerHTML = "";
  main.appendChild(generateClock(firstTwoLocation[0]));
  main.appendChild(generateClock(firstTwoLocation[1]));
  select.selectedIndex = 0;
}
allCity();

function selectOption(event) {
  // console.log(event.target.selectedIndex);
  // console.log(event.target.value);
  let place = event.target.value;
  if (place === "current") {
    place = moment.tz.guess();
  }
  // console.log(place);
  if (place) {
    main.innerHTML = "";
    main.appendChild(generateClock(place));
    let initialCity = document.createElement("div");
    initialCity.innerHTML = "<a>All cities</a>";
    main.appendChild(initialCity);
    initialCity.addEventListener("click", allCity);
  }
}
// console.log(clocks[1].attributes);
setInterval(() => {
  let clocks = document.querySelectorAll(".clock");
  clocks.forEach((clock) => {
    updateTime(clock);
  });
}, 1000);

select.addEventListener("change", selectOption);
// console.log(select);
