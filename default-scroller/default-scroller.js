import directories from "./mock_data.js";

const createdRow = (item) => {
  const row = document.createElement('div')
  row.setAttribute("class", "row");

  const keys = Object.keys(item)
  for (const key of keys) {
    const dom = document.createElement('div')
    dom.setAttribute("class", key);
    dom.innerHTML = item[key] ?? ''
    row.appendChild(dom)
  }

  return row
}
// list
const listEl = document.getElementById('list')

const render = (renderData) => {
  const fragment = document.createDocumentFragment();

  for (const data of renderData) {
    const row = createdRow(data)
    fragment.appendChild(row)
  }

  listEl.appendChild(fragment);
}

// INIT ********************************************************************
render(directories)
// INIT ********************************************************************