//创建路由器

import {createRouter, createWebHashHistory} from "vue-router"

import mainp from "../components/mainp.vue"
import blogp from "../components/blogp.vue"
import loginp from "../components/login.vue"
import newTypeMilkTeep from "../components/newTypeMilkTeep.vue"
import milkTeeManagep from "../components/milkTeeManagep.vue"
import orderMTp from "../components/orderMT.vue"


export default createRouter({
	history:createWebHashHistory(),
	routes:[
		{
			path:"/",
			component:mainp
		},
		{
			path:"/blog",
			component:blogp
		},{
			path:"/login",
			component:loginp
		},{
			path:"/newTypeMilkTee",
			component:newTypeMilkTeep
		},{
			path:"/milkTeeManage",
			component:milkTeeManagep
		},{
			path:"/orderMT",
			component:orderMTp
		}
	]
})