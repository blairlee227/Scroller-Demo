# 前端長列表的處理與優化

一般遇到大量資料時，通常會用列表來呈現，當筆數很多時，可以用分頁來切換，
但也有些情境無法使用分頁，那當資料筆數過多，就可能會造成畫面的卡頓或其他效能瓶頸。

實測看看一次渲染一萬筆通訊錄在畫面上(如下圖)

可以看到頁面上產生 17,065 個 DOM 節點，
渲染時間花了 43ms，若資料量更大，就會需要更成的渲染時間。
<div align="center">
  <img width="1197" alt="image" src="https://user-images.githubusercontent.com/31032281/159959515-7a19ff6f-ae6a-4317-8ee5-feb479041beb.png">
</div>

這次主要會介紹兩種方法來實現長列表的優化，分別為 “Lazy Loading” 以及 “Virtual Scroller”。

## Lazy Loading
Lazy Loading 只會先載入部分資料，滾到底部後，再繼續載入更多的資料，讓使用者一進入網頁就能快速看到網頁內容，大幅提升頁面載入速度。
這樣的概念跟分頁其實有點類似，但載入更多資料時，舊的資料依然會存在畫面上。

### ✨ 實現方法
- 方法 1: 監聽 onScroll 事件，看高度的變化等，再去計算、處理。
- 方法 2: **[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)**
  
  Intersection Observer API 只需要 new 一個 `IntersectionObserver` constructor，裡面放一個 callback，或是帶入一些設定的參數，最後要設定觀察對象，告訴 observer 要監聽哪個目標元素。
  ```
  var intersectionObserver = new IntersectionObserver((entries) => {
    // intersectionRatio: target 元素可見的比例
    // <=0 代表不可見，1 代表可見
    if (entries[0].intersectionRatio <= 0) return;

    fetchData()
  });
  
  // start observing
  intersectionObserver.observe(document.querySelector('#targetElement'));
  ```
  <div align="center">
    <img width="484" alt="image" src="https://user-images.githubusercontent.com/31032281/159961739-1214ee5c-1383-4d4b-a497-9d4461a32afc.png">
  </div>

### 實作
請參考 **[Lazy Loading](https://github.com/blairlee227/Scroller-Demo/tree/master/lazy-loading)**

### 優點
只先載入部分資料，大幅提升頁面載入速度。

### 缺點
資料量大時還是會出現大量的 DOM，載越多越不順暢。

## Virtual Scroller
Virtual Scroller 虛擬滾動，原理是只渲染可視範圍內的內容，所以又有人稱它為「局部渲染列表」。

因為只渲染局部範圍，除了跟 Lazy Loading 一樣可大幅降低頁面載入的速度外，還能控制頁面上的 DOM 節點數量，避免當頁面上的 DOM 過多時，造成的一些效能瓶頸。

// TODO: Virtual Scroller
