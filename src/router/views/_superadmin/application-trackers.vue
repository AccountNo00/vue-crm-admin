<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/application-tracker.json"
// import jsonData2 from "@/assets/json/application-tracker-table.json"
import Loader from '../../../components/widgets/loader.vue'
import formatter from "../../../mixins/formatter";
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
    },
    components: {
        Layout,
		Loader,
		// Pagination
    },
	mixins: [formatter],
    data() {
        return {
            title: "Dashboard",
			data: [],
			data_logs: [],
			application_id:null,
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
				show_entries: 50,
				search:'',
			},
			pages:[true,false,false],
			clicked: false,
        };
    },
	methods:{
		...mapActions("general", {
			getList: "applicationTrackerList",
			getLogs: "applicationTrackerLogs",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		clickFn(row){
			var vm = this;
			if(vm.clicked == false){
				vm.clicked = true;
			}
			this.application_id = row.person.application_id;
			this.initLogs(1);
		},
		async initLogs(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries,
				order: "desc",
			};
			if(this.filterData.search){
				pl['search'] = this.filterData.search;
			}
			if(this.application_id){
				pl['application_id'] = this.application_id;
			}
			this.loading = true;
			const data = await this.getLogs(pl);
			this.loading = false;
			this.data_logs = data.data;
		},
		async initList(p) {
			var pl = {
				page: p,
				limit:50,
				order: "desc",
			};
			if(this.filterData.search){
				pl['search'] = this.filterData.search;
			}
			this.loading = true;
			const data = await this.getList(pl);
			this.loading = false;
			this.data = data.data;
		},
	},
    mounted() {
		this.initList(1);
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
			<div class="col-12">
				<div class="col-12">
					<div class="p-2 mb-0 custom-danger">
						<div class="row">
							<div class="col-6">
								<h5 class="m-2 text-white text-start">APPLICATION TRACKER</h5>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<div class="row">
									<div class="col-6 p-2" style="border:1px solid rgba(128, 128, 128, 0.137)">
										<div>
											<b-tabs content-class="mt-3" >
												<b-tab title="OCBS" active>
													<div class="row">
														<div class="col-12 mb-4 ">
															<div class="col-4 d-flex  mx-2"  style="float:right !important;">
																<label class="mt-2 mx-2">SEARCH: </label>
																<input class="form-control" v-model="this.filterData.search" @input="initList(1)"/>
															</div>
														</div>
														<div class="col-12">
															<div class="p-2">
																<table class="p-4" style="border:2px solid rgba(128, 128, 128, 0.137);width:100%;" >
																	<thead>
																		<tr style="height:20px; border-bottom:solid 1px black">
																			<th></th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="row,index in this.data" :key="index">
																			<td @click="clickFn(row)" v-if="row.application_type == 'OCBS'" class="p-2" style="border-bottom:2px solid rgba(128, 128, 128, 0.137);width:100%;">
																				<div class="card p-2">
																					<div class="col-12 d-flex">
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Reference number: <strong>{{row.id}}</strong></h4>
																							<h6>Business Name: <strong>{{row.business_name}}</strong></h6>
																							<h6>Guarantor: <strong>{{row.person.guarantor_full_name}}</strong></h6>
																						</div>
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Status: 
																								<strong>
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
																								</strong>
																							</h4>
																							<h6>Business Address: <strong>{{row.business_address}}</strong></h6>
																							<h6>Contact Person: <strong>{{row.person.contact_full_name}}</strong></h6>
																						</div>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
														<div class="d-flex px-4">
															<span style="width:90%">Showing 1 to 5 of 5 entries</span>
															<div class="d-flex pagination">
																<button :class="`${this.pages[0] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(1)">1</button>
																<button :class="`${this.pages[1] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(2)">2</button>
																<button :class="`${this.pages[2] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(3)">3</button>
															</div>
														</div>
													</div>
												</b-tab>
												<b-tab title="ARENA">
													<div class="row">
														<div class="col-12 mb-4 ">
															<div class="col-4 d-flex  mx-2"  style="float:right !important;">
																<label class="mt-2 mx-2">SEARCH: </label>
																<input class="form-control" v-model="this.filterData.search" @input="initList(1)"/>
															</div>
														</div>
														<div class="col-12">
															<div class="p-2">
																<table class="p-4" style="border:2px solid rgba(128, 128, 128, 0.137);width:100%;" >
																	<thead>
																		<tr style="height:20px; border-bottom:solid 1px black">
																			<th></th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="row in data" :key="row" >
																			<td @click="clickFn(row)" v-if="row.application_type == 'ARENA'" class="p-2" style="border-bottom:2px solid rgba(128, 128, 128, 0.137);width:100%;">
																				<div class="card p-2">
																					<div class="col-12 d-flex">
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Reference number: <strong>{{row.id}}</strong></h4>
																							<h6>Business Name: <strong>{{row.business_name}}</strong></h6>
																							<h6>Guarantor: <strong>{{row.person.guarantor_full_name}}</strong></h6>
																						</div>
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Status: 
																								<strong>
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
																								</strong>
																							</h4>
																							<h6>Business Address: <strong>{{row.business_address}}</strong></h6>
																							<h6>Contact Person: <strong>{{row.person.contact_full_name}}</strong></h6>
																						</div>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
														<div class="d-flex px-4">
															<span style="width:90%">Showing 1 to 5 of 5 entries</span>
															<div class="d-flex pagination">
																<button :class="`${this.pages[0] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(1)">1</button>
																<button :class="`${this.pages[1] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(2)">2</button>
																<button :class="`${this.pages[2] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(3)">3</button>
															</div>
														</div>
													</div>
												</b-tab>
											</b-tabs>
										</div>
									</div>
									<div class="col-6">
										<div class="p-2 mb-0 custom-danger">
											<div class="row">
												<div class="col-6">
													<h5 class="m-2 text-white text-start">TRACKER</h5>
												</div>
											</div>
										</div>
										<div class="col-12">
											<div class="card">
												<div class="card-body">
													<div class="text-center col-12">
														<span>Sample title</span>
													</div>
													<div class="px-3 mt-2 mb-0">
														<div class="row">
															<div class="col-6 px-4 mt-2" style="float:right !important;">
																<div class="d-flex">
																	<div class="d-flex">
																		<label class="mt-2" style="width:200px;"><strong>Show entries:</strong></label>
																		<select class="mx-2 form-control" v-model="filterData.show_entries" @change="initLogs(1)">
																			<option value="10">10</option>
																			<option value="25">25</option>
																			<option value="50">50</option>
																			<option value="0">All</option>
																		</select>
																	</div>
																</div>
															</div>
															<div class="col-6 px-4 mt-2" style="float:right !important;">
																<div class="d-flex">
																	<label class="m-2"><strong>SEARCH:</strong></label>
																	<input class="form-control" v-model="this.filterData.search" @input="initLogs(1)"/>
																</div>
															</div>
														</div>
													</div>
													<div class="col-12 mt-4">
														<table class="table">
															<thead>
																<tr style="background-color: rgb(237, 237, 237); border-bottom:2px solid black;">
																	<th>Date/Time</th>
																	<th>Department</th>
																	<th>Action by</th>
																	<th>Action</th>
																</tr>
															</thead>
															<tbody v-if="clicked">
																<tr v-for="data in this.data_logs" :key="data">
																	<td>{{`${dateOnly(data.created_at)} ${timeOnly(data.created_at)}`}}</td>
																	<!-- <td>{{data.created_at}}</td> -->
																	<td>{{data.encoder.third_party.user_lvl_name}}</td>
																	<td>{{data.encoder.full_name}}</td>
																	<td>{{data.action}}</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
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
tr:hover{
	background: rgba(128, 128, 128, 0.103);
}
.pagination > button{
	border:none;
	padding:5px 15px;
	margin-right: 5px;
}
.custom-danger {
    background: rgb(181, 15, 1);
}
</style>
