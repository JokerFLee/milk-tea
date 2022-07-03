//创建路由器

import {createRouter, createWebHashHistory} from "vue-router"

import mainp from "../components/mainp.vue"
import blogp from "../components/blogp.vue"


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
		}
	]

})