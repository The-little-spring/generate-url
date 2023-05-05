const baseUrl = "https://website.ir";

//input tenplates
const paramTemplate = '<input class="q-input" placeholder="Param" />';
const queryTemplate =
  '<input class="q-input" placeholder="Query" /><input class="q-input" placeholder="Query Value" />';

//Get DOM elements
const paramsContainer = document.getElementById("params-container");
const queriesContainer = document.getElementById("queries-container");
const paramBoxes = paramsContainer.querySelectorAll(".keyValue-box input");
const queryBoxes = queriesContainer.querySelectorAll(".keyValue-box input");

//Add new param box
const addNewParam = (event) => {
  const lastParam = paramsContainer.lastElementChild;
  const lastParamInput = lastParam.querySelector(".q-input");
  event.preventDefault();
  if (lastParamInput.value !== "") {
    const newParamElement = document.createElement("div");
    newParamElement.classList.add("keyValue-box");
    newParamElement.innerHTML = paramTemplate;
    paramsContainer.appendChild(newParamElement);
  } else return;
};

//Add new query box
const addNewQuery = (event) => {
  const lastQuery = queriesContainer.lastElementChild;
  const lastQueryKey = lastQuery.querySelector(".q-input");
  event.preventDefault();
  if (lastQueryKey.value != "") {
    const newQueryElement = document.createElement("div");
    newQueryElement.classList.add("keyValue-box");
    newQueryElement.innerHTML = queryTemplate;
    queriesContainer.appendChild(newQueryElement);
  } else return;
};

//Generate clicked
const generateClicked = () => {
  const paramValues = getParamInputs();
  const queryValues = getQueryInputs();
  const paramString = generateParamString(paramValues);
  const queryString = generateQueryString(queryValues);
  generateURL(paramString, queryString);
};

//Get param Inputs
const getParamInputs = () => {
  const values = [];
  let totalParamBoxes =
    paramsContainer.querySelectorAll(".keyValue-box").length;
  for (let i = 0; i < totalParamBoxes; i++) {
    const box = paramsContainer.querySelectorAll(".keyValue-box input")[i];
    const value = box.value.trim();
    if (value !== "") {
      values.push(value);
    }
  }
  return values;
};

//Get query inputs
const getQueryInputs = () => {
  const values = {};
  queryBoxes.forEach((box, index) => {
    const value = box.value.trim();
    if (value !== "") {
      if (index % 2 === 0) {
        const key = value;
        const nextBox = queryBoxes[index + 1];
        const nextValue = nextBox.value.trim();
        if (nextValue !== "") {
          values[key] = nextValue;
        }
      }
    }
  });
  console.log(values);
  return values;
};

//Generate param strings
const generateParamString = (paramValues) => {
  if (paramValues.length > 0) {
    return paramValues.join("/");
  }
  return "";
};

//Generate query string
const generateQueryString = (queryValues) => {
  const keys = Object.keys(queryValues);
  if (keys.length > 0) {
    const parts = [];
    keys.forEach((key) => {
      const value = queryValues[key];
      parts.push(`${key}=${value}`);
    });
    return "?" + parts.join("&");
  }
  return "";
};

//Generate URL with query and param inputs
const generateURL = (paramString, queryString) => {
  const url = `${baseUrl}/${paramString}${queryString}`;
  renderUrl(url);
};

//Display generated URL
const renderUrl = (url) => {
  const urlContainer = document.getElementById("url-container");
  urlContainer.innerHTML = `<p>${url}</p>`;
};

//All the buttons
document.getElementById("param-submit").addEventListener("click", addNewParam);
document.getElementById("query-submit").addEventListener("click", addNewQuery);
document.getElementById("generate").addEventListener("click", generateClicked);
