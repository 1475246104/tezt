import axios from "axios"
import qs from "qs"
//响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次路径："+res.config.url)
    console.log(res)
    return res
;})
const baseUrl="/api"
//菜单添加
export const requestMenuAdd=(params)=>{
    return axios({
        url:baseUrl+"./api/menuadd",
        method:"post",
        data:qs.stringify(params)
    })
} 
//菜单删除
export const requestMenuDelete = params => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//菜单修改
export const requestMenuUpdate = params => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//菜单某一个条数据
export const requestMenuDetail = params => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params
    })
}