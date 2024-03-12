<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/ocbs-list.json"
import Loader from '../../../components/widgets/loader.vue'
import { mapActions } from "vuex";
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
		loading:false,
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
			filterData:{
				start_date:'',
				end_date:'',
				show_entries: 50,
				search:'',
			},
			loading:false,
			pages:[true,false,false],
			pagesReturn:[true,false,false],
        };
    },
	methods:{
		...mapActions("salesCoor", {
			getList: "getArenaList",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		view(row){
			this.$router.push({path:`/arena-list-view/${row.id}`})
		},
		async initList(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries,
				sort: "created_at",
				order: "desc",
			};
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
        // setTimeout(() => {
        //   this.showModal = true;
        // }, 1500);
		this.initList(1);
    },
};
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
		<Loader v-if="loading == true"/>
        <div class="row">
			<div class="col-12 px-4 mt-2">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-12">
									<h5 class="mt-2  text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;ARENA</h5>
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
												<select class="mx-2 form-control" v-model="this.filterData.show_entries" @change="initList(1)">
													<option value="10">10</option>
													<option value="25">25</option>
													<option value="50">50</option>
													<option value="0">All</option>
												</select>
											</div>
											<b-button variant="success mx-1">EXCEL</b-button>
											<b-button variant="success mx-1">PDF</b-button>
											<span class="bg-secondary text-white p-2 mx-5" style="border-radius: 3px;">
												0 Return Queue
											</span>
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
											<th>SALES COORDINATOR</th>
											<th>BUSINESS NAME</th>
											<th>ADDRESS</th>
											<th>REGION</th>
											<th>PROVINCE</th>
											<th>OWNER</th>
											<th>GUARANTOR</th>
											<th>STATUS</th>
											<th>FINANCE STATUS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in this.data.list" :key="index">
											<td>{{row.region}}</td>
											<td>{{ row.sales_coordinator_name }}</td>
											<td>{{ row.business_name }}</td>
											<td>{{ row.business_address }}</td>
											<td>{{ row.region }}</td>
											<td>{{ row.province }}</td>
											<td>{{ row.owner }}</td>
											<td>{{ row.guarantor }}</td>
											<td>
												<span v-if="row.status == 0" style="color:#84bbf5;">
												<strong>LEADS</strong>
												</span>
												<span v-else-if="row.status == 1" style="color:#967705;">
													<strong>FIT</strong>
												</span>
												<span v-else-if="row.status == 2" style="color:green;">
													<strong>ACTIVATED</strong>
												</span>
												<span v-else-if="row.status == 3" style="color:#d17166;">
													<strong>CANCELLED</strong>
												</span>
												<span v-else-if="row.status == 4" style="color:#6c757d;">
													<strong>CLOSED</strong>
												</span>
												<span v-else-if="row.status == 5" style="color:#6c757d;">
													<strong>DENIED</strong>
												</span>
												<span v-else-if="row.status == 6" style="color:#6c757d;">
													<strong>PENDING</strong>
												</span>
											</td>
											<td>
												<span v-if="row.finance_status == 0" >
													<strong>NEW</strong>
												</span>
												<span v-else-if="row.finance_status == 1">
													<strong>APPROVED</strong>
												</span>
												<span v-else-if="row.finance_status == 2" >
													<strong>SCHEDULED</strong>
												</span>
												<span v-else-if="row.finance_status == 3" >
													<strong>FOR CHECKING</strong>
												</span>
												<span v-else-if="row.finance_status == 4" >
													<strong>DENIED</strong>
												</span>
												<span v-else-if="row.finance_status == 5" >
													<strong>RETURNED</strong>
												</span>
												<span v-else-if="row.finance_status == 6" >
													<strong>UPDATED</strong>
												</span>
												<span v-else-if="row.finance_status == 7" >
													<strong>PENDING</strong>
												</span>
											</td>
											<td>
												<b-button @click="view(row)" variant="primary" size="sm">REVIEW</b-button>
											</td>
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
