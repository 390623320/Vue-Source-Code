//路由入口
let Vue;
class brouter {
    static install(_Vue){
        Vue = _Vue;
        Vue.mixin({
            beforeCreate(){
                if(this.$options.router){//Vue实例存在router时生效
                    this.$options.router._init();//路由入口
                }
            }
        })
    };
    constructor(options){
        this.$options = options;
        this.routerMap = {};
        this.app = new Vue({ //利用Vue数据响应式机制来为路由切换做处理
            data:{

            }
        })
    }
    // 1、监听hashchange事件
    _init(){//启动路由
        this.bindEvent();//绑定hash事件
        this._initRouterMap();//初始化路由表
        console.log("=====",this.routerMap)
        this._initComponent();//初始化路由组件
    };
    bindEvent(){
        window.addEventListener("hashchange",this.onHashChange.bind(this),false)
    }
    onHashChange(){
        console.log("启动路由")
    }
    // 2、路由表处理
    _initRouterMap(){
        this.$options.routes.forEach(item=>{
            this.routerMap[item.path] = item;
        })
    }
    // 3、初始化router-view、router-link
    _initComponent(){
        Vue.component("router-view",{
            render:h=>{
                return h(this.routerMap['/'].component)
            }
        })
    }
    // 4、生命周期路由守卫
}

export default brouter;