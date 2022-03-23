import directories from "./mock_data.js";

// 每行高度
let rowHeight = 50;

// background
const backgroundEl = document.getElementById('background');
backgroundEl.style.height = directories.length * rowHeight + 'px';

// list
const listEl = document.getElementById('list');

// viewport
const viewportEl = document.getElementById('viewport');

// startIndex = 第一個累加高度 > scrollTop 的 index
const findStartIndex = (listCount, scrollTop) => {
  let heightSum = 0;
  for (let index = 0; index < listCount; index++) {
    heightSum += rowHeight;

    if (heightSum > scrollTop) {
      return index;
    };
  };
};

const getRenderData = () => {
  // viewport 高度
  const viewportHeight = viewportEl.clientHeight;
  // viewport 最多可放的行數
  const maxRowCount = Math.ceil(viewportHeight / rowHeight);
  // 滾動距離
  const distance = viewportEl.scrollTop;
  // startIndex
  const startIndex = findStartIndex(directories.length, distance);
  // endIndex
  const endIndex = startIndex + maxRowCount;
  // 要顯示在 viewport 中的資料
  const listDataForRender = directories.slice(startIndex, endIndex);

  return {
    listDataForRender,
    distance
  };
};

const createdRow = (item) => {
  const row = document.createElement('div');
  row.setAttribute("class", "row");

  const keys = Object.keys(item);
  for (const key of keys) {
    const dom = document.createElement('div');
    dom.setAttribute("class", key);
    dom.innerHTML = item[key] ?? '';
    row.appendChild(dom);
  };

  return row;
};

const render = (renderData, scrollTop) => {
  // 使用 DocumentFragment 可以降低頁面 reflow 的次數
  const fragment = document.createDocumentFragment();

  for (const data of renderData) {
    const row = createdRow(data);
    fragment.appendChild(row);
  };

  listEl.innerHTML = "";
  listEl.appendChild(fragment);

  // 透過 translateY 位移
  listEl.style.transform = `translateY(${scrollTop}px)`;
};

viewportEl.addEventListener('scroll', () => {
  const { listDataForRender, distance } = getRenderData()
  render(listDataForRender, distance)
}, false)

// INIT ********************************************************************
const { listDataForRender, distance } = getRenderData()
render(listDataForRender, distance)
// INIT ********************************************************************

