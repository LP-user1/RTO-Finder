const cYear = document.getElementById("currentYear");
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
const queryTrim = document.getElementById("queryTrim");
const totalCount = document.getElementById("totalCount");
const badgeBtn = document.getElementById("badgeBtn");
const listCount = document.querySelector(".count");

const year = new Date().getFullYear();
cYear.innerText = year;

if (badgeBtn) {
  badgeBtn.addEventListener("click", () => {
    inputEl.value = inputEl.value.slice(0, 2);
    findRecord();
  });
}

inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    findRecord();
  }
});
btn.addEventListener("click", findRecord);

function findRecord() {
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
        showHideBadgeBtn();
        alertSec.innerHTML = " ";
        tableEl.innerHTML = " ";
        listCount.innerText = filterVal.length;
        for (i = 0; i < filterVal.length; i++) {
          const tableVal = document.createElement("tr");
          tableVal.title = `${filterVal[i].location}`;
          tableVal.dataset.code = `${filterVal[i].code}`;
          tableVal.innerHTML += `
              <td>${filterVal[i].state}</td>
              <td>${filterVal[i].code}</td>
              <td>${filterVal[i].location}</td>`;
          tableEl.appendChild(tableVal);
        }
        tableEl.childNodes.forEach((el) => {
          el.addEventListener("click", (e) => {
            const RTOCode = e.target.parentElement.dataset.code;
            inputEl.value = RTOCode;
            findRecord();
          });
        });
      }
    };
    filterExecution();
  } else {
    let count;
    count = jsonData.filter((record) => {
      return record.code.slice(0, 2) === value.toUpperCase().slice(0, 2);
    });
    if (count.length >= 100) {
      totalCount.innerText = "99+";
    } else if (count.length >= 90) {
      totalCount.innerText = "89+";
    } else if (count.length >= 60) {
      totalCount.innerText = "59+";
    } else if (count.length >= 50) {
      totalCount.innerText = "49+";
    } else if (count.length >= 20) {
      totalCount.innerText = "19+";
    } else {
      totalCount.innerText = "10+";
    }

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
      alertSec.innerHTML = " ";
      showHideBadgeBtn();
      totalCount.parentElement.title =
        "All list for " + inputEl.value.toUpperCase().slice(0, 2);
      queryEl.innerText = inputEl.value;
      id.innerText = findVal.id;
      code.innerText = findVal.code;
      code.parentElement.title = "code: " + findVal.code;
      loc.innerText = findVal.location;
      loc.parentElement.title = "location: " + findVal.location;
      type.innerText = findVal.type;
      type.parentElement.title = "type: " + findVal.type;
      dist.innerText = findVal.district;
      dist.parentElement.title = "district: " + findVal.district;
    }
  }
};

function showHideBadgeBtn() {
  if (inputEl.value.length > 3) {
    listCount.parentElement.classList.add("d-none");
    queryTrim.parentElement.classList.remove("d-none");
    queryTrim.innerText = inputEl.value.slice(0, 2);
  } else {
    listCount.parentElement.classList.remove("d-none");
    queryTrim.parentElement.classList.add("d-none");
  }
}

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
  alertSec.innerHTML = " ";
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
