<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/application-tracker.json"
import jsonData2 from "@/assets/json/application-tracker-table.json"
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
		// Pagination
    },
    data() {
        return {
            title: "Dashboard",
			data: jsonData,
			data_2: jsonData2,
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
			clicked: false,
        };
    },
	methods:{
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		clickFn(){
			var vm = this;
			if(vm.clicked == false){
				vm.clicked = true;
			}
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
    <Layout>
        <PageHeader :title="title" :items="items" />
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
																<input class="form-control"/>
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
																		<tr v-for="row in data" :key="row">
																			<td @click="clickFn()" v-if="row.is_arena ==0" class="p-2" style="border-bottom:2px solid rgba(128, 128, 128, 0.137);width:100%;">
																				<div class="card p-2">
																					<div class="col-12 d-flex">
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Reference number: <strong>{{row.ref_no}}</strong></h4>
																							<h6>Business Name: <strong>{{row.business_name}}</strong></h6>
																							<h6>Guarantor: <strong>{{row.guarantor}}</strong></h6>
																						</div>
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Status: <strong>{{row.status}}</strong></h4>
																							<h6>Business Address: <strong>{{row.business_address}}</strong></h6>
																							<h6>Contact Person: <strong>{{row.contact_person}}</strong></h6>
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
																<input class="form-control"/>
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
																			<td @click="clickFn()" v-if="row.is_arena ==1" class="p-2" style="border-bottom:2px solid rgba(128, 128, 128, 0.137);width:100%;">
																				<div class="card p-2">
																					<div class="col-12 d-flex">
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Reference number: <strong>{{row.ref_no}}</strong></h4>
																							<h6>Business Name: <strong>{{row.business_name}}</strong></h6>
																							<h6>Guarantor: <strong>{{row.guarantor}}</strong></h6>
																						</div>
																						<div class="col-6" style="display:flex; flex-direction:column;">
																							<h4>Status: <strong>{{row.status}}</strong></h4>
																							<h6>Business Address: <strong>{{row.business_address}}</strong></h6>
																							<h6>Contact Person: <strong>{{row.contact_person}}</strong></h6>
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
																		<select class="mx-2 form-control">
																			<option value="10">10</option>
																			<option value="25">25</option>
																			<option value="50">50</option>
																			<option value="-1">All</option>
																		</select>
																	</div>
																</div>
															</div>
															<div class="col-6 px-4 mt-2" style="float:right !important;">
																<div class="d-flex">
																	<label class="m-2"><strong>SEARCH:</strong></label>
																	<input class="form-control"/>
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
																<tr v-for="data in data_2" :key="data">
																	<td>{{data.date}}</td>
																	<td>{{data.department}}</td>
																	<td>{{data.action_by}}</td>
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
