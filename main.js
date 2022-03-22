// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入网络请求的包
import {
  $http
} from '@escook/request-miniprogram'

// 1. 导入 store 的实例对象
import store from './store/store.js'

// 将按需导入的 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'
// 展示 loading 效果
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中'
  })
  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}
// 隐藏loading效果 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装的展示消息提示的方法
// title duration可以在调用时传参，如果传参了，以传参的为准
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  // 2. 将 store 挂载到 Vue 实例上
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
