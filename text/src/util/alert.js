import Vue from "vue"
var vm=new Vue();
//成功的弹窗
export const successAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:'success'
    });
}
//警告的
export const warningAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:'marning'
    });
}

//错误的
export const errorAlert=(msg)=>{
    vn.$message.error({msg});
}