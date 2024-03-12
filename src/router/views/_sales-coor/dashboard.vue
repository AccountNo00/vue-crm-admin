<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import Loader from '../../../components/widgets/loader.vue'
import { mapActions } from "vuex";
// import jsonData from "@/assets/json/salescoor-tb-dashboard.json"
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
        Layout,
		Loader,
		// Pagination
    },
    data() {
        return {
            title: "Dashboard",
			data: [],
			loading:false,
			stats_data:{
				arena:
					{
						fit:[],
					},
				ocbs:
					{
						fit:[],
					}
				,
			},
			filterData:{
				start_date:'',
				end_date:'',
				show_entries: 50,
				search:'',
			},
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
		...mapActions("salesCoor", {
			getList: "dashboardList",
			getStats: "dashboardStats",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		async initStats() {
			this.loading = true;
			const data = await this.getStats();
			this.loading = false;
			this.stats_data.arena = data.arena
			this.stats_data.ocbs = data.ocbs
			this.stats_data.arena.fit = data.arena.fit
			this.stats_data.ocbs.fit = data.ocbs.fit
		},
		async initList(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries,
				// sort: "created_at",
				order: "desc",
			};
			if(this.filterData.start_date){
				pl['start_date'] = this.filterData.start_date;
			}
			if(this.filterData.end_date){
				pl['end_date'] = this.filterData.end_date;
			}
			if(this.filterData.search){
				pl['search'] = this.filterData.search;
			}
			this.loading = true;
			const data = await this.getList(pl);
			this.loading = false;
			this.data.list = data.data.data;
		},
	},
    mounted() {
		this.initList(1);
		this.initStats();
        // setTimeout(() => {
        //   this.showModal = true;
        // }, 1500);
    },
};
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
		<Loader v-if="loading == true"/>
		<div class="row">
			<div class="d-flex">
				<div class="col-3 p-2">
					<div class="custom-danger custom-card">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">{{this.stats_data.arena.activated_count + this.stats_data.ocbs.activated_count}}
								</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">ACTIVATED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>{{this.stats_data.ocbs.activated_count}}</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>{{this.stats_data.arena.activated_count}}</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-9 p-2">
					<div class="custom-success custom-card">
						<div class="d-flex">
							<div class="col-5">
								<div class="d-flex">
									<div class="p-4 mt-4" >
										<b class="p-3 text-white" style="font-size:30px;">{{this.stats_data.arena.fit.fit_count + this.stats_data.ocbs.fit.fit_count}}</b>
									</div>
									<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
										<h4 class="text-white text-center">FIT</h4>
										<span class="text-white font-size-16 mb-1">OCBS: <strong>{{this.stats_data.ocbs.fit.fit_count}}</strong></span>
										<span class="progress-bar mt-1 mb-1"></span>
										<span class="text-white font-size-16">ARENA: <strong>{{this.stats_data.arena.fit.fit_count}}</strong></span>
									</div>
								</div>
							</div>
							<div class="col-3">
								<div class="mt-3">
									<h4 class="text-center text-white" style="display:flex;flex-direction: column;width:100%;">OCBS</h4>
									<div class="d-flex">
										<div class="col-6" style="display:flex;flex-direction: column;">
											<span class=" text-white font-size-16 mb-1">PC : <strong>{{this.stats_data.ocbs.fit.pc}}</strong></span>
											<span class=" text-white font-size-16 mb-1">CBAND : <strong>{{this.stats_data.ocbs.fit.cband}}</strong></span>
											<span class=" text-white font-size-16 mb-1">TRAINING : <strong>{{this.stats_data.ocbs.fit.training}}</strong></span>
										</div>
										<div class="col-6">
											<span class=" text-white font-size-16 mb-1"># of PC : <strong>{{this.stats_data.ocbs.fit.number_of_pc}}</strong></span>
										</div>
									</div>
								</div>
							</div>
							<div class="col-4">
								<div class="mt-3">
									<h4 class="text-center text-white" style="display:flex;flex-direction: column;width:100%;">ARENA</h4>
									<div class="d-flex">
										<div class="col-6" style="display:flex;flex-direction: column;">
											<span class=" text-white font-size-16 mb-1">PC : <strong>{{this.stats_data.arena.fit.pc}}</strong></span>
											<span class=" text-white font-size-16 mb-1">CBAND : <strong>{{this.stats_data.arena.fit.cband}}</strong></span>
											<span class=" text-white font-size-16 mb-1">TRAINING : <strong>{{this.stats_data.arena.fit.training}}</strong></span>
										</div>
										<div class="col-6">
											<span class=" text-white font-size-16 mb-1"># of PC : <strong>{{this.stats_data.arena.fit.number_of_pc}}</strong></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex">
				<div class="col-3 p-2">
					<div class="custom-cyan custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">{{this.stats_data.arena.lead_count + this.stats_data.ocbs.lead_count}}</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">LEADS</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>{{this.stats_data.ocbs.lead_count}}</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>{{this.stats_data.arena.lead_count}}</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-3 p-2">
					<div class="custom-red custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">{{this.stats_data.arena.denied_count + this.stats_data.ocbs.denied_count}}</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">DENIED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>{{this.stats_data.ocbs.denied_count}}</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>{{this.stats_data.arena.denied_count}}</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-3 p-2">
					<div class="bg-dark custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">{{this.stats_data.arena.closed_count + this.stats_data.ocbs.closed_count}}</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">CLOSED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>{{this.stats_data.ocbs.closed_count}}</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>{{this.stats_data.arena.closed_count}}</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-3 p-2">
					<div class="custom-warning custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">{{this.stats_data.arena.cancelled_count + this.stats_data.ocbs.cancelled_count}}</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">CANCELLED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>{{this.stats_data.ocbs.cancelled_count}}</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>{{this.stats_data.arena.cancelled_count}}</strong></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="row">
			<div class="col-12 px-4 mt-2">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class="mt-2  text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;SUMMARY</h5>
								</div>
								<div class="col-6 d-flex">
									<label class="m-2 text-white">FROM</label>
									<input type="date" class="form-control" v-model="filterData.start_date"/>
									<label class="m-2 text-white">TO</label>
									<input type="date" class="form-control" v-model="filterData.end_date"/>
									<b-button variant="dark" class="mx-2" @click="initList(1)">Enter</b-button>
								</div>
							</div>
						</div>
						<div class="col-12">
							<div class="px-3 mt-2 mb-0">
								<div class="row">
									<div class="col-10 px-4 mt-2" style="float:right !important;">
										<div class="d-flex">
											<div class="d-flex">
												<label class="mt-2" style="width:200px;"><strong>Show entries:</strong></label>
												<select class="mx-2 form-control" v-model="filterData.show_entries" @change="initList(1)">
													<option value="10">10</option>
													<option value="25">25</option>
													<option value="50">50</option>
													<option value="0">All</option>
												</select>
											</div>
											<b-button variant="success mx-1">PRINT</b-button>
											<b-button variant="success mx-1">EXCEL</b-button>
											<b-button variant="success mx-1">PDF</b-button>
										</div>
									</div>
									<div class="col-2 px-4 mt-2" style="float:right !important;">
										<div class="d-flex">
											<label class="m-2"><strong>SEARCH:</strong></label>
											<input class="form-control" v-model="this.filterData.search" @input="initList(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light text-center">
										<tr>
											<th>REGION</th>
											<th>PROVINCE</th>
											<th>ACTIVATED</th>
											<th>FIT</th>
											<th>LEAD</th>
											<th>DENIED</th>
											<th>CANCELLED</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in this.data.list" :key="index">
											<td>{{row.region}}</td>
											<td>{{row.province}}</td>
											<td>{{row.activated_count}}</td>
											<td>{{row.fit_count}}</td>
											<td>{{row.lead_count}}</td>
											<td>{{row.denied_count}}</td>
											<td>{{row.cancelled_count}}</td>
										</tr>
										<tr>
											<td></td>
											<td><strong>TOTAL:</strong></td>
											<td><strong>32</strong></td>
											<td><strong>2</strong></td>
											<td><strong>3</strong></td>
											<td><strong>6</strong></td>
											<td><strong>0</strong></td>
										</tr>
									</tbody>
								</table>
								<div class="d-flex">
									<span style="width:90%">Showing 1 to 20 of 120 entries</span>
									<div class="d-flex pagination">
										<button :class="`${this.pages[0] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(1)">1</button>
										<button :class="`${this.pages[1] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(2)">2</button>
										<button :class="`${this.pages[2] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(3)">3</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <Pagination/> -->
		</div>
    </Layout>
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
