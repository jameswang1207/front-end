import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './components/App.vue'
import NewsView from './components/NewsView.vue'
import ItemView from './components/ItemView.vue'
import UserView from './components/UserView.vue'

// install router
Vue.use(Router)

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)
//创建一个路由器实例,创建实例时可以传入配置参数进行定制

var router = new Router({hashbang:false})

//每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
//创建的组件构造函数，也可以是一个组件选项对象。
router.map({
  '/news/:page': {
    component: NewsView
  },
  '/user/:id': {
    component: UserView
  },
  '/item/:id': {
    component: ItemView
  }
})

//我们可以利用这个特性在全局的钩子函数中进行身份验证
router.beforeEach(function () {
  // console.log(transition);

  //scrollTo() 方法可把内容滚动到指定的坐标。
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/news/1'
})

//路由器需要一个根组件
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
