// 等待页面所有资源已加载完成
window.addEventListener('DOMContentLoaded',function(){

  // 获取 dom 元素
  var headerLisNodes = document.querySelectorAll('.nav li')
  var arrowNode = document.querySelector('.arrow')
  var headerDownNodes = document.querySelectorAll('.down')
  var contentUlNode = document.querySelector('.content-main')
  var contentNode = document.querySelector('.content')

  var contentHeight = contentNode.offsetHeight
  var nowIndex = 0
  var wheelTimer = null

  // 处理头部区域
  headerHandle()
  function headerHandle() {

    // 初始化时小箭头在第一个 li 下面
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px'
    headerDownNodes[0].style.width = '100%'

    for (var i = 0; i < headerLisNodes.length; i++) {
      headerLisNodes[i].index = i
      headerLisNodes[i].onclick = function () {
        // 同步更新 nowIndex 的值，否则点击后再滚动就会出 bug
        nowIndex = this.index
        move(nowIndex)
      }
    }

  }

  // 公共 move 函数
  function move(nowIndex) {
    // 默认所有 width 为 0
    for (var j = 0; j < headerDownNodes.length; j++) {
      headerDownNodes[j].style.width = ''
    }
    // 设置当前 width 为 100%
    headerDownNodes[nowIndex].style.width = '100%'
    // 设置小箭头在当前点击的 li 下面
    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px'
    // 让内容区滚动
    contentUlNode.style.top = - nowIndex * contentHeight + 'px'
  }

  move(3)

  // 处理内容区域
  contentHandle()
  function contentHandle() {

    // 滚轮事件
    document.onmousewheel = wheel
    document.addEventListener('DOMMouseScroll', wheel)
    function wheel(event) {
      event = event || window.event;
      // 函数防抖：让规定时间内调用的函数，只有最后一次生效
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () {
        var flag = '';
        if (event.wheelDelta) {
          //ie/chrome
          if (event.wheelDelta > 0) {
            flag = 'up';
          } else {
            flag = 'down'
          }
        } else if (event.detail) {
          //firefox
          if (event.detail < 0) {
            flag = 'up';
          } else {
            flag = 'down'
          }
        }
        switch (flag) {
          case 'up' :
            if (nowIndex > 0) {
              nowIndex--
              move(nowIndex)
            }
            break;
          case 'down' :
            if (nowIndex < 4) {
              nowIndex++
              move(nowIndex)
            }
            break;
        }
      },200)
      //禁止默认行为
      event.preventDefault && event.preventDefault();
      return false;
    }

  }

  // 浏览器调整窗口大小事件
  window.onresize = function () {
    // 修正小箭头的位置
    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px'
    // 修正 ul 的位置
    contentUlNode.style.top = - nowIndex * contentHeight + 'px'
  }

  // 第一屏
  firstViewHandle()
  function firstViewHandle() {

    // 获取 dom 元素
    var homeCarouselNodes = document.querySelectorAll('.home-carousel li')
    var homePointNodes = document.querySelectorAll('.home-point li')
    var homeNode = document.querySelector('.home')

    var lastIndex = 0
    var nowIndex = 0
    var lastTime = 0
    var nowTime = Date.now()
    var timer = null

    for (var i = 0; i < homePointNodes.length; i++) {
      homePointNodes[i].index = i
      homePointNodes[i].onclick = function () {
        // 函数节流：让规定时间内调用的函数，只有第一次生效
        // 如果点击的时间间隔小于2秒则不生效
        if (nowTime - lastTime <= 2000) return
        // 同步上一次的点击时间
        lastTime = nowTime
        // 同步 nowIndex 的值
        nowIndex = this.index
        // 如果点击当前小圆点，则不发生任何动画
        if (nowIndex === lastIndex) return
        // 判断
        if (nowIndex > lastIndex) {
          // 点击右边，则右边添加 right-show，左边添加 left-hide
          homeCarouselNodes[nowIndex].className = 'common-title right-show'
          homeCarouselNodes[lastIndex].className = 'common-title left-hide'
        } else {
          // 点击左边，则左边添加 left-show，右边添加 right-hide
          homeCarouselNodes[nowIndex].className = 'common-title left-show'
          homeCarouselNodes[lastIndex].className = 'common-title right-hide'
        }
        // 设置小圆点状态
        homePointNodes[lastIndex].className = ''
        this.className = 'active'
        // 同步上一次的值
        lastIndex = nowIndex
      }
    }
    // 鼠标移入关闭定时器
    homeNode.onmouseenter = function () {
      clearInterval(timer)
    }
    // 鼠标移出开启定时器
    homeNode.onmouseleave = autoPlay
    // 自动轮播
    autoPlay()
    function autoPlay() {
      clearInterval(timer)
      timer = setInterval(function () {
        nowIndex++
        if (nowIndex >= homePointNodes.length) nowIndex = 0
        // 自动轮播就是不断地点击右边的小圆点
        homeCarouselNodes[nowIndex].className = 'common-title right-show'
        homeCarouselNodes[lastIndex].className = 'common-title left-hide'
        // 设置小圆点状态
        homePointNodes[lastIndex].className = ''
        homePointNodes[nowIndex].className = 'active'
        // 同步上一次的值
        lastIndex = nowIndex
      }, 3000)
    }

  }

})