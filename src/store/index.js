import { defineStore } from "pinia";

export default defineStore('main',{
	state:()=>{
		return{
			type:"",
			showtime:1000,
			animation_duration_time:"1s",
			loader_show_time:100
		}
	}
})