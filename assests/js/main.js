const inputEl = document.querySelector('input');
const queryEl = document.querySelector('#query');
const errorEl = document.querySelector('.not-found');
const id = document.querySelector('#id');
const code = document.querySelector('#code');
const loc = document.querySelector('#loc');
const type = document.querySelector('#type');
const dist = document.querySelector('#dist');
const btn = document.querySelector('button');

inputEl.addEventListener('keyup',(e)=>{
  if (e.key === "Enter"){
    if (inputEl.value.length > 3){
      errorEl.parentElement.classList.add('d-none');
      searchRec(inputEl.value);
    }
    else{
      errorEl.parentElement.classList.remove('d-none');
      errorEl.parentElement.classList.remove('alert-danger');
      errorEl.parentElement.classList.add('alert-info');
      queryEl.parentElement.parentElement.classList.add('d-none');
      errorEl.innerText = "Enter minimum 4 characters!! ex: TN74.";
    }
  }
});
btn.addEventListener('click',()=>{
  if (inputEl.value.length > 3){
    errorEl.parentElement.classList.add('d-none');
    searchRec(inputEl.value);
  }
  else{
    errorEl.parentElement.classList.remove('d-none');
    errorEl.parentElement.classList.remove('alert-danger');
    errorEl.parentElement.classList.add('alert-info');
    queryEl.parentElement.parentElement.classList.add('d-none');
    errorEl.innerText = "Enter minimum 4 characters!! ex: TN74.";
  }
});

async function getJson(){
  const response = await fetch('./assests/json/data.json');
  return await response.json();
}

const  searchRec = async (value)=>{

  const jsonData = await getJson();

  const filterVal = jsonData.find((record)=>{
    return record.code === value || value.toUpperCase().startsWith(record.code);
  });
  console.log(filterVal);
  if (!filterVal){
    errorEl.parentElement.classList.remove('d-none');
    errorEl.parentElement.classList.add('alert-danger');
    errorEl.innerText = "Result not found !Try another RTO code.";
    queryEl.parentElement.parentElement.classList.add('d-none');
  }else{
    errorEl.parentElement.classList.add('d-none');
    queryEl.parentElement.parentElement.classList.remove('d-none');
    queryEl.innerText = inputEl.value;
    id.innerText = filterVal.id;
    code.innerText = filterVal.code;
    loc.innerText = filterVal.location;
    type.innerText = filterVal.type;
    dist.innerText = filterVal.district
  }
}