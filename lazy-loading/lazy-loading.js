const fetchData = async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/9');
    const data = await response.json();
    return data?.message;
  } catch (e) {
    console.error(e);
  };
};

const createdDom = (link) => {
  const box = document.createElement('div');
  box.setAttribute("class", "box");

  const img = document.createElement('img');
  img.setAttribute("src", link);
  box.appendChild(img);

  return box;
};

const containerEl = document.getElementById('container');
const render = (renderData) => {
  const fragment = document.createDocumentFragment();

  for (const data of renderData) {
    const box = createdDom(data);
    fragment.appendChild(box);
  };

  containerEl.appendChild(fragment);
};


// Intersection Observer ****************************************************
const targetEl = document.getElementById('observeTarget');
let intersectionObserver = new IntersectionObserver(async (entries) => {
  // intersectionRatio: target 元素可見的比例
  // <=0 代表不可見，1 代表可見
  if (entries[0].intersectionRatio <= 0) { return };

  let renderData = [];
  renderData = await fetchData();
  render(renderData);
});

// start observing
intersectionObserver.observe(targetEl);
// Intersection Observer ****************************************************
