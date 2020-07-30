# Vue-Router 源码解析

## 插件Vue.use(plugin,arguments)
plugin：函数/对象；{Object | Function} plugin
函数:直接执行；
对象：必须存在install函数；
### plugin(Vue,args)