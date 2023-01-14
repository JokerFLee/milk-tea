import { defineStore } from "pinia";

export default defineStore('main',{
	state:()=>{
		return{
			type:"",
			showtime:2000,
			animation_duration_time:"2s",
			loader_show_time:100,
			ouid:"",
			show_router:"true",
			
		}
	}
})