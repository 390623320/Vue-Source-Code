import Vue from "vue"
import brouter from "./bin-router/brouter"
import Home from "./views/Home"
import About from "./views/About"
Vue.use(brouter);
const router = new brouter({
    routes:[
        {
            path:"/",
            component:Home
        },
        {
            path:"/about",
            component:About,
            beforeEnter: (to, from, next) => { //路由守卫
                console.log("to, from",to, from) 
                next();
            }
        }
    ]
});
export default router;