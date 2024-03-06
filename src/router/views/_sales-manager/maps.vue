<script>
import navBar from "../../../../src/components/nav-bar.vue";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/ocbs-list.json"
// import Pagination from "../../../components/pagination.vue"
/**
 * Dashboard Component
 */
export default {
    page: {
        title: "Dashboard",
        meta: [
            {
                name: "description",
                content: appConfig.description,
            },
        ],
    },
    components: {
		navBar,
		// Pagination
    },
    data() {
        return {
            title: "Dashboard",
			data: jsonData,
            items: [
                {
                    text: "Dashboards",
                    href: "/",
                },
                {
                    text: "Default",
                    active: true,
                },
            ],
			pages:[true,false,false],
			pagesReturn:[true,false,false],
        };
    },
	methods:{
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		back(){
			this.$router.push({path:`/sales-manager/dashboard`})
		}
	},
    mounted() {
        // setTimeout(() => {
        //   this.showModal = true;
        // }, 1500);
    },
};
</script>

<template>
	<navBar></navBar>
        <div class="row" style="margin-top: 80px;">
			<div class="col-12 px-4 mt-2">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-12 row">
									<h5 class="col-11 mt-2 text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;MAPS</h5>
									<button class="col-1 btn btn-light" @click="back()">Back</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <Pagination/> -->
		</div>
</template>
<style scoped>
.custom-warning{
	background:#ffc107;
}
.custom-red{
	background: #dc3545;
}
.custom-cyan{
	background: #17a2b8;
}
.custom-success{
	background: #28a745;
}
.custom-danger{
    background: rgb(181, 15, 1);
}
.custom-card{
	height:140px;
	border-radius: 5px;
}
.custom-card-sm{
	height:130px;
	border-radius: 5px;
}
.progress-bar{
	border-bottom: 2px solid white;
}

.pagination > button{
	border:none;
	padding:5px 15px;
	margin-right: 5px;
}
.custom-style{
	border: 2px solid rgb(239, 242, 247);
}
.custom-style tr{
	padding:4px;
}
.custom-style td{
	padding:10px;
	border: 2px solid rgb(239, 242, 247);
	margin:0;
}
.custom-style tr:hover{
	background: rgba(255, 233, 230, 0.213);
}
</style>
