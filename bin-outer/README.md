# Vue-Router 源码解析
## hash路由
    1、通过插件的形式获取Vue；
    2、通过mixin全局混合-beforeCreate中进行hashchange处理；
    3、通过hashchange监听-进行路由操作；
    4、处理路由表-路由数据转化为对象；
    5、通过Vue响应式机制触发视图层变换；
    6、封装Router-view、router-link（全局注册组件方式-render替代template）
    7、路由守卫、声明周期；
    8、封装编程式路由；
    总结：vue-router通过监听hashchange来通知Vue的订阅内容进行页面的动态更新；
## 插件Vue.use(plugin,arguments)
plugin：函数/对象；{Object | Function} plugin
函数:直接执行；
对象：必须存在install函数；
### plugin(Vue,args)
传入Vue减小插件的体积