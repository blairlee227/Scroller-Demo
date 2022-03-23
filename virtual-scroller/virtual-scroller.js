import directories from "./mock_data.js";

// 每一行最小的高度
let minRowHeight = 30

// background
const backgroundEl = document.getElementById('background');
backgroundEl.style.height = directories.length * minRowHeight + 'px'

// list
const listEl = document.getElementById('list')

// viewport
const viewportEl = document.getElementById('viewport')

// 找到第一個累加高度 > scrollTop 的 index
const findIndexOverHeight = (listCount, scrollTop) => {
  let currentHeight = 0
  for (let i = 0; i < listCount; i++) {
    currentHeight += minRowHeight

    if (currentHeight > scrollTop) {
      return i
    }
  }

  return list.length - 1
}

const getRenderData = () => {
  // viewport 的高度
  const viewportHeight = viewportEl.clientHeight
  // 最多可放幾行
  const maxRowCount = Math.ceil(viewportHeight / minRowHeight)
  // 滾動距離
  const currentScrollTop = viewportEl.scrollTop;
  // startIndex
  const startIndex = findIndexOverHeight(directories.length, currentScrollTop) ?? 0
  // endIndex
  const endIndex = startIndex + maxRowCount 
  // 要顯示在 viewport 中的資料
  const listDataForRender = directories.slice(startIndex, endIndex)

  return {
    listDataForRender,
    currentScrollTop
  }
}

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

const render = (renderData, scrollTop) => {
  const fragment = document.createDocumentFragment();

  for (const data of renderData) {
    const row = createdRow(data)
    fragment.appendChild(row)
  }

  listEl.innerHTML = ""
  listEl.appendChild(fragment);

  listEl.style.transform = `translateY(${scrollTop}px)`
}

viewportEl.addEventListener('scroll', () => {
  const { listDataForRender, currentScrollTop } = getRenderData()
  render(listDataForRender, currentScrollTop)
}, false)

// INIT ********************************************************************
const { listDataForRender, currentScrollTop } = getRenderData()
render(listDataForRender, currentScrollTop)
// INIT ********************************************************************

