const inputEl = document.querySelector("input");
const queryEl = document.querySelector("#query");
const errorEl = document.querySelector(".not-found");
const id = document.querySelector("#id");
const code = document.querySelector("#code");
const loc = document.querySelector("#loc");
const type = document.querySelector("#type");
const dist = document.querySelector("#dist");
const btn = document.querySelector("button");
const spinner = document.querySelector(".spin");

inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    findRecord();
  }
});
btn.addEventListener("click", findRecord);

function findRecord() {
  if (inputEl.value.length > 3) {
    errorEl.parentElement.classList.add("d-none");
    spinnerActive();
    setTimeout(searchRec(inputEl.value), 1000);
  } else {
    errorEl.parentElement.classList.remove("d-none");
    errorEl.parentElement.classList.remove("alert-danger");
    errorEl.parentElement.classList.add("alert-info");
    queryEl.parentElement.parentElement.classList.add("d-none");
    errorEl.innerText = "Enter minimum 4 characters!! ex: TN74.";
  }
}

async function getJson() {
  const response = await fetch("./assests/json/data.json");
  spinnerActive();
  return await response.json();
}

const searchRec = async (value) => {
  const jsonData = await getJson();

  const filterVal = jsonData.find(
    (record) => record.code === value.toUpperCase()

    // Better search with arrow function
  );

  if (!filterVal) {
    errorEl.parentElement.classList.remove("d-none");
    errorEl.parentElement.classList.add("alert-danger");
    errorEl.innerText = "Result not found !Try another RTO code.";
    queryEl.parentElement.parentElement.classList.add("d-none");
  } else {
    errorEl.parentElement.classList.add("d-none");
    queryEl.parentElement.parentElement.classList.remove("d-none");
    queryEl.innerText = inputEl.value;
    id.innerText = filterVal.id;
    code.innerText = filterVal.code;
    loc.innerText = filterVal.location;
    type.innerText = filterVal.type;
    dist.innerText = filterVal.district;
  }
};

function spinnerActive() {
  let hidden = spinner.classList.contains("d-none");
  if (hidden) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}
