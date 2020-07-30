function brouter(){
    
}

const globalObj = {
    install:(Vue,kk)=>{
        Vue.mixin({
            created: function () {
              var myOption = this.$options.myOption
              if (myOption) {
                console.log(myOption,"heiehi")
                console.log("this.$options",this.$options)
              }
            }
          })
    }
}

export {brouter,globalObj};