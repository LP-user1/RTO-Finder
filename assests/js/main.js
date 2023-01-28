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
const alertSec = document.getElementById("alert-sec");
const tableEl = document.querySelector(".t-data");
const cYear = document.getElementById("currentYear");

const year = new Date().getFullYear();
cYear.innerText = year;

inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    findSeperateRecord();
  }
});
btn.addEventListener("click", findSeperateRecord);

function findSeperateRecord() {
  if (inputEl.value.length > 3) {
    spinnerActive();
    searchRec(inputEl.value);
  } else if (inputEl.value.length === 2) {
    spinnerActive();
    searchRec(inputEl.value);
  } else {
    alertMsg("INFO ", "info", "Enter 2 or 4 characters | Ex: TN or TN74");
  }
}

async function getJson() {
  const response = await fetch("./assests/json/data.json");
  return await response.json();
}

const searchRec = async (value) => {
  const jsonData = await getJson();

  if (inputEl.value.length == 2) {
    const filterVal = jsonData.filter((record) => {
      return record.code.slice(0, 2) === value.toUpperCase();
    });

    const filterExecution = () => {
      spinnerActive();
      if (filterVal == "") {
        alertMsg(
          "Not Found ",
          "danger",
          `Your search for <span class="fw-bold">${inputEl.value.toUpperCase()}</span> is not available. Enter correct code`
        );
      } else {
        queryEl.parentElement.parentElement.classList.remove("d-none");
        document.querySelector(".singleData").classList.add("d-none");
        document.querySelector(".allData").classList.remove("d-none");
        queryEl.innerText = inputEl.value;
        tableEl.innerHTML = " ";
        for (i = 0; i < filterVal.length; i++) {
          const tableVal = document.createElement("tr");
          tableVal.innerHTML += `
              <td>${filterVal[i].state}</td>
              <td>${filterVal[i].code}</td>
              <td>${filterVal[i].location}</td>`;
          tableEl.appendChild(tableVal);
        }
      }
    };
    filterExecution();
  } else {
    const findVal = jsonData.find(
      (record) => record.code === value.toUpperCase()
    );

    spinnerActive();
    if (!findVal) {
      alertMsg(
        "Not Found ",
        "danger",
        `Your search for <span class="fw-bold">${inputEl.value.toUpperCase()}</span> is not available. Enter correct code`
      );
    } else {
      queryEl.parentElement.parentElement.classList.remove("d-none");
      document.querySelector(".allData").classList.add("d-none");
      document.querySelector(".singleData").classList.remove("d-none");
      queryEl.innerText = inputEl.value;
      id.innerText = findVal.id;
      code.innerText = findVal.code;
      loc.innerText = findVal.location;
      type.innerText = findVal.type;
      dist.innerText = findVal.district;
    }
  }
};

function spinnerActive() {
  let hidden = spinner.classList.contains("d-none");
  if (hidden) {
    spinner.classList.remove("d-none");
    queryEl.parentElement.parentElement.classList.add("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}
// Alert function ( Manually trigger the function )
const alertMsg = (title, type, message) => {
  // creating new Element
  const alertEl = document.createElement("div");

  alertEl.innerHTML = `
  <div
    class="alert alert-${type} alert-dismissible fade show"
    role="alert">
    <strong>${title}</strong> ${message}.
    <button
      type="button"
      class="btn-close shadow-none"
      data-bs-dismiss="alert"
      aria-label="Close"></button>
  </div>`;

  alertSec.appendChild(alertEl);
};
