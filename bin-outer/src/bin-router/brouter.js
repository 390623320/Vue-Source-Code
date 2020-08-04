//路由入口
//插件 install 减少了对Vue的引入从而减少了插件的大小
let Vue; 
class brouter {
    static install(_Vue){
        Vue = _Vue;
        Vue.mixin({
            beforeCreate(){
                if(this.$options.router){//Vue实例存在router时生效
                    Vue.prototype.$brouter = this.$options.router; //挂载brouter到Vue实例上
                    this.$options.router._init();//路由入口
                }
            }
        })
    };
    constructor(options){
        this.$options = options;
        this.routerMap = {};
        this.app = new Vue({ //利用Vue响应式机制 处理路由变化 - 监听更变图层
            data:{
                route:""
            }
        })
        
    } 
    // 1、监听hashchange事件
    _init(){//启动路由
        this.bindEvent();//绑定hash事件
        this._initRouterMap();//初始化路由表
        this._initComponent();//初始化路由组件
    };
    bindEvent(){
        window.addEventListener("hashchange",this.onHashChange.bind(this),false)
        window.addEventListener("load",this.initHashChange.bind(this),false);
    }
    getHash(){
        return window.location.hash.slice(1) || "/"
    };
    onHashChange(e){
        // 监听路由变化
        const { from,to } = this.getPath(e);
        if(this.routerMap[this.getHash()].beforeEnter){
            this.routerMap[this.getHash()].beforeEnter(from,to,()=>{
                this.app.route = this.getHash(); //next
            });//路由守卫
        }else{
            this.app.route = this.getHash(); //通知VM实例订阅内容更新视图           
        }
    }
    initHashChange(){
        // 初始化路由
        this.app.route = window.location.hash.slice(1) || "/";
        this.routerMap[this.app.route].beforeEnter(); //路由守卫
    }
    // 2、路由表处理
    _initRouterMap(){
        this.$options.routes.forEach(item=>{
            this.routerMap[item.path] = item;
        })
    }
    // 3、初始化router-view、router-link
    _initComponent(){
        let _this = this;
        Vue.component("router-view",{
            render:function(h){
                return h(_this.routerMap[_this.app.route].component)
            }
        })
        Vue.component('router-link', {
            render: function (createElement) {
              return createElement(                  
                'a',   // 标签名称
                {
                    attrs:{
                        href : "#" + this.to 
                    }
                },
                [this.$slots.default] // 子节点数组
              )
            },
            props: {
                to:{
                    type:String,
                    required:true
                }
            }
          })
    }
    // 4、生命周期 路由守卫
    getPath(e){//获取跳转前后的路由信息
        let { newURL = "",oldURL = "" } = e;
        return {from:oldURL.split("#")[1],to:newURL.split("#")[1]};
    }
    //编程式路由
    push = (path)=>{
        window.location.href = "#" + path;
    }
}

export default brouter;