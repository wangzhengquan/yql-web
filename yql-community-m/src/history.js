/* eslint no-console: 0 */

import { browserHistory } from 'react-router'
// import { hashHistory } from 'react-router'
// var browserHistory = hashHistory
const PATHS_LENGTH = -1
let paths = browserHistory.paths = browserHistory.paths || []

//防止测试环境加载两次的问题
if(!browserHistory.unlisten){

  browserHistory.unlisten = browserHistory.listen(location => {
    let pathname = location.pathname
    if(pathname.charAt(0) !== '/'){
      pathname = '/'.concat(pathname)
    }

    let len = paths.length

    //isBack标记是否时回退到上一页，还是进入到新一页，以显示不同的动画效果
    browserHistory.isBack = (len > 1 && pathname === paths[len-2])
    if(browserHistory.isBack) {
      paths.pop()
    } else if (len === 0 || paths[len-1] !== pathname){
      if(PATHS_LENGTH === -1 || len < PATHS_LENGTH){
        //不限制历史记录长度
         paths.push(pathname)
      }
      else{
        //超出限制历史记录长度
        for(let i = 0; i < len - 1; i++){
          paths[i] = paths[i+1]
        }
        paths[len - 1] = pathname
      }
    }
     
    //canback标记是否显示navbar的回退按钮
    browserHistory.canBack = (paths.length > 1)
  })


  window.addEventListener('popstate', function () {

    browserHistory.isBack = true
    
  })
}

export default browserHistory