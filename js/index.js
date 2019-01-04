window.addEventListener('DOMContentLoaded',function(){
// 等待页面所有资源已加载完成

// 获取 dom 元素
  var headerLisNodes = document.querySelectorAll('.nav li')
  var arrowNode = document.querySelector('.arrow')
  var headerDownNodes = document.querySelectorAll('.down')
  var contentUlNode = document.querySelector('.content-main')
  var contentNode = document.querySelector('.content')

  var contentHeight = contentNode.offsetHeight
  var nowIndex = 0

  // 处理头部区域
  headerHandle()
  function headerHandle(){

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

  // 处理内容区域
  contentHandle()
  function contentHandle(){

    // 滚轮事件
    document.onmousewheel = wheel
    document.addEventListener('DOMMouseScroll', wheel)
    function wheel(event) {
      event = event || window.event;
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
      //禁止默认行为
      event.preventDefault && event.preventDefault();
      return false;
    }

  }

})