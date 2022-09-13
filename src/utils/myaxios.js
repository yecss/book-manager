import axios from "axios"
axios.get('/data.json').then((resp)=>{console.log(resp.data)}).catch((err)=>{console.log("请求失败")})