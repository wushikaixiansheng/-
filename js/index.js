// 等待页面所有资源已加载完成
window.addEventListener('DOMContentLoaded',function(){

  // 处理头部
  headerHandle()
  function headerHandle(){

    // 获取 dom 元素
    var headerLisNodes = document.querySelectorAll('.nav li')
    var arrowNode = document.querySelector('.arrow')
    var headerDownNodes = document.querySelectorAll('.down')

    // 初始化时小箭头在第一个 li 下面
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px'
    headerDownNodes[0].style.width = '100%'

    for (var i = 0; i < headerLisNodes.length; i++) {
      headerLisNodes[i].index = i
      headerLisNodes[i].onclick = function () {
        // 默认所有 width 为 0
        for (var j = 0; j < headerDownNodes.length; j++) {
          headerDownNodes[j].style.width = ''
        }
        // 设置当前 width 为 100%
        headerDownNodes[this.index].style.width = '100%'
        // 设置小箭头在当前点击的 li 下面
        arrowNode.style.left = this.getBoundingClientRect().left + this.offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px'
      }
    }

  }



})