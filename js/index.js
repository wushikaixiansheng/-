// 等待页面所有资源已加载完成
window.addEventListener('DOMContentLoaded',function(){

  // 获取 dom 元素
  var headerLisNodes = document.querySelectorAll('.nav li')
  var arrowNode = document.querySelector('.arrow')
  var headerDownNodes = document.querySelectorAll('.down')
  var contentUlNode = document.querySelector('.content-main')
  var contentNode = document.querySelector('.content')
  var navBarNodes = document.querySelectorAll('.nav-bar li')
  var musicNode = document.querySelector('.music')
  var musicIconNode = document.querySelector('.music-icon')

  var contentHeight = contentNode.offsetHeight
  var nowIndex = 0
  var lastIndex = 0
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
    // for (var j = 0; j < headerDownNodes.length; j++) {
    //   headerDownNodes[j].style.width = ''
    //   navBarNodes[lastIndex].className = ''
    // }
    // 默认所有 width 为 0
    headerDownNodes[lastIndex].style.width = ''
    // 侧边导航
    navBarNodes[lastIndex].className = ''
    // 设置当前 width 为 100%
    headerDownNodes[nowIndex].style.width = '100%'
    // 设置小箭头在当前点击的 li 下面
    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px'
    // 让内容区滚动
    contentUlNode.style.top = - nowIndex * contentHeight + 'px'
    // 侧边导航
    navBarNodes[nowIndex].className = 'active'
    // 同步更新
    lastIndex = nowIndex
  }

  // move(4)

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

  // 第五屏
  lastViewHandle()
  function lastViewHandle() {

    // 获取 dom 元素
    var teamUlNode = document.querySelector('.team-person')
    var teamLiNodes = document.querySelectorAll('.team-person li')

    var width = teamLiNodes[0].offsetWidth
    var height = teamLiNodes[0].offsetHeight
    var canvas = null
    var createCircleTimer = null
    var paintingTimer = null

    for (var i = 0; i < teamLiNodes.length; i++) {
      teamLiNodes[i].index = i
      teamLiNodes[i].onmouseenter = function () {
        // 改变透明度
        for (var j = 0; j < teamLiNodes.length; j++) {
          teamLiNodes[j].style.opacity = 0.5
        }
        this.style.opacity = 1
        if (!canvas) {
          // 创建画布
          canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          canvas.className = 'canvas'
          // 产生气泡运动
          bubble(canvas)
          teamUlNode.appendChild(canvas)
        }
        // 不管添不添加 canvas，都需要改变 left 值
        canvas.style.left = this.index * width + 'px'
      }
    }
    teamUlNode.onmouseleave = function () {
      for (var j = 0; j < teamLiNodes.length; j++) {
        teamLiNodes[j].style.opacity = 1
      }
      // 清除画布
      canvas.remove()
      canvas = null
      // 清除定时器
      clearInterval(createCircleTimer)
      clearInterval(paintingTimer)
    }
    // 气泡函数
    function bubble(canvas) {
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        var width = canvas.width
        var height = canvas.height
        var arr = []
        // 生成圆
        createCircleTimer = setInterval(function () {
          var r = Math.round(Math.random() * 255)
          var g = Math.round(Math.random() * 255)
          var b = Math.round(Math.random() * 255)
          var c_r = Math.round(Math.random() * 8 + 2)
          var s = Math.round(Math.random() * 50 + 20)
          var y = height + c_r
          var x = Math.round(Math.random() * width)
          arr.push({
            r: r,
            g: g,
            b: b,
            c_r: c_r,
            x: x,
            y: y,
            deg: 0,
            s: s
          })
        }, 50)
        // 画圆
        paintingTimer = setInterval(function () {
          // 清除上一次的画布
          ctx.clearRect(0, 0, width, height)
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i]
            // 角度递增
            item.deg+=6
            // 得到弧度的值
            var rad = item.deg * Math.PI / 180
            // x 轴和 y 轴的坐标
            var x = item.x + Math.sin(rad) * item.s
            var y = item.y - rad * item.s
            // 删除已经跑出画布的圆
            if (y <= -item.c_r) {
              arr.splice(i, 1)
              continue
            }
            ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')'
            ctx.beginPath()
            ctx.arc(x, y, item.c_r, 0, 2 * Math.PI)
            ctx.fill()
          }
        }, 1000 / 60)
      }
    }

  }

  // 侧边导航
  for (var i = 0; i < navBarNodes.length; i++) {
    navBarNodes[i].index = i
    navBarNodes[i].onclick = function () {
      nowIndex = this.index
      move(nowIndex)
    }
  }

  // 音乐播放
  musicIconNode.onclick = function () {
    if (musicNode.paused) {
      // 进入判断则证明当前音乐是暂停状态，然后设置点击播放
      musicNode.play()
      this.style.backgroundImage = 'url("./img/musicon.gif")'
    } else {
      // 否则点击暂停
      musicNode.pause()
      this.style.backgroundImage = 'url("./img/musicoff.gif")'
    }
  }

})