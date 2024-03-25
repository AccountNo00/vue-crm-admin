<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/finance-report.json"
import { mapActions } from "vuex";
import Loader from '../../../components/widgets/loader.vue'
import formatter from "../../../mixins/formatter";
// import Swal from "sweetalert2";
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
	mixins: [formatter],
    components: {
        Layout,Loader
		// Pagination
    },
    data() {
        return {
            title: "Report",
			data: [],
			data_item:[],
			review_data:[],
            items: [
                {
                    text: "Reports",
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
			application_id:'',
			review_modal:false,
			loading:false,
			pages:[true,false,false],
			pagesReturn:[true,false,false],
			attachment_customer_id: null,
			attachment_picture_of_site: null,
			attachment_physical_form: null,
			review:[],
        };
    },
	methods:{
		...mapActions("sim", {
			getReportList: "reportList",
			getItemList: "itemList",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
        displayAttachment(e) {
            var vm = this;
            var files = e.target.files;
            if (FileReader && files && files.length) {
                vm.review.customer_id_thumbnail = files[0];
                // img thumbnail
                var fr = new FileReader();
                fr.onload = function () {
                    vm.attachment_customer_id = fr.result;
                    // console.log(vm.attachment);
                };
                fr.readAsDataURL(files[0]);
            }
			var files_2 = e.target.files_2;
            if (FileReader && files_2 && files_2.length) {
                vm.review.picture_of_site_thumbnail = files_2[0];
                // img thumbnail
                var fr2 = new FileReader();
                fr2.onload = function () {
                    vm.attachment_picture_of_site = fr2.result;
                    // console.log(vm.attachment);
                };
                fr2.readAsDataURL(files_2[0]);
            }
			var files_3 = e.target.files_3;
            if (FileReader && files_3 && files_3.length) {
                vm.review.physical_form_thumbnail = files_3[0];
                // img thumbnail
                var fr3 = new FileReader();
                fr3.onload = function () {
                    vm.attachment_physical_form = fr3.result;
                    // console.log(vm.attachment);
                };
                fr3.readAsDataURL(files_3[0]);
            }
        },
		async initList(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries,
				order: "desc",
			};
			if(this.filterData.search){
				pl['search'] = this.filterData.search;
			}
			this.loading = true;
			const data = await this.getReportList(pl);
			this.loading = false;
			this.data.list = data.data;
		},
		async initItemList() {
			var pl = {
				application_id: this.application_id,
			};
			this.loading = true;
			const data = await this.getItemList(pl);
			this.loading = false;
			this.data_item.list = data.data;
			if(data.status == 200 || data.status == 'success'){
				this.data_item.list = data.data;
			}else if(data.status == 404){
				this.data_item.list = null;
			}
		},
		getData(data){
			this.review_data = data;
			this.application_id = data.application_id;
			console.log(data)
		}
	},
    mounted() {
		this.initList(1)
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
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;PC REPORT</h5>
								</div>
								<!-- <div class="col-6 d-flex">
									<label class="m-2 text-white">FROM</label>
									<input type="date" class="form-control"/>
									<label class="m-2 text-white">TO</label>
									<input type="date" class="form-control"/>
									<b-button variant="dark" class="mx-2">Enter</b-button>
								</div> -->
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
													<option value="-1">All</option>
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
											<input class="form-control" v-model="this.filterData.search_queue" @input="initList(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>DATE REQUEST</th>
											<th>REFERENCE</th>
											<th>APPLICATION TYPE</th>
											<th>BUSINESS NAME</th>
											<th>USER ACCOUNT NAME</th>
											<th>STATUS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{data.requested_date}}</td>
											<td>{{data.application_id}}</td>
											<td>{{data.application_type}}</td>
											<td>{{data.application?.business_name}}</td>
											<td>{{data.application.encoder?.full_name}}</td>
											<td>
												<span v-if="data.status == 0" >
													<strong>NEW</strong>
												</span>
												<span v-else-if="data.status == 1">
													<strong>APPROVED</strong>
												</span>
												<span v-else-if="data.status == 2" >
													<strong>SCHEDULED</strong>
												</span>
												<span v-else-if="data.status == 3" >
													<strong>FOR CHECKING</strong>
												</span>
												<span v-else-if="data.status == 4" >
													<strong>DENIED</strong>
												</span>
												<span v-else-if="data.status == 5" >
													<strong>RETURNED</strong>
												</span>
												<span v-else-if="data.status == 6" >
													<strong>UPDATED</strong>
												</span>
												<span v-else-if="data.status == 7" >
													<strong>PENDING</strong>
												</span>
											</td>
											<td class="text-center">
												<b-button @click="getData(data),initItemList(),review_modal = true" variant="primary" size="sm">REVIEW</b-button>
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
			<!-- MODALS -->
			<b-modal centered v-model="review_modal" title="PC REPORT" title-class="text-black font-26 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="col-4 mb-4">
								<label class="fw-bolder">Schedule Date:</label>
								<input class="form-control" v-model="this.review_data.date_of_service" disabled>
							</div>
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.review_data.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.review_data.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.review_data.application?.person.contact_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of PC Requested:</label>
										<span class="col-6">{{this.review_data.requested_pc_count}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Permit :</label>
										<span class="col-6">{{this.review_data.application?.requirement.business_permit}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Marketing in charge:</label>
										<span class="col-6">{{this.review_data.application?.encoder.full_name}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference Number:</label>
										<span class="col-6">{{this.review_data.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.review_data.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.review_data.application?.person.contact_contact_number}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Photo of PC Area:</label>
										<span class="col-6"></span>
									</div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-6">
									<div class="d-flex">
										<label class="col-6 fw-bolder">Date of Service:</label>
										<input class="form-control" v-model="this.review_data.date_of_service" disabled/>
									</div>
								</div>
								<div class="col-6">
									<div class="d-flex">
										<label class="col-6 fw-bolder">Installed/Serviced By:</label>
										<input class="form-control" v-model="this.review_data.installed_by" disabled/>
									</div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">POINT A LOCATION:</label>
										<input class="form-control" v-model="this.review_data.point_a_location" disabled/>
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">KILOMETERS:</label>
										<input class="form-control" v-model="this.review_data.kilometers" disabled/>
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">TRANSPORTATION FEE:</label>
										<input class="form-control" v-model="this.review_data.transpo_fee" disabled/>
									</div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<table class="table table-responsive custom-style">
								<thead class="bg-light">
									<tr>
										<th>ITEM</th>
										<th>BRAND</th>
										<th>SPECS</th>
										<th>SERIAL NUMBER</th>
										<th>OWNED</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data,index in this.data_item.list" :key="index">
										<td>{{data.item_name}}</td>
										<td>{{data.brand}}</td>
										<td>{{data.specs}}</td>
										<td>{{data.serial_number}}</td>
										<td>{{data.ownership}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<hr>
						<div class="row">
							<div class="row col-4 ">
								<label class="text-center" style="font-size: 20px;">CUSTOMER ID UPLOADED</label>
								<img class="mx-auto" :src="attachment_customer_id ? attachment_customer_id: require('@/assets/images/no-image.png')" style="width: 100px; height: 100px;"/>
							</div>
							<div class="row col-4 ">
								<label class="text-center" style="font-size: 20px;">PICTURE OF SITE UPLOADED</label>
								<img class="mx-auto" :src="attachment_picture_of_site ? attachment_picture_of_site: require('@/assets/images/no-image.png')" style="width: 100px; height: 100px;"/>
							</div>
							<div class="row col-4 ">
								<label class="text-center" style="font-size: 20px;">PHYSICAL FORM UPLOADED</label>
								<img class="mx-auto" :src="attachment_physical_form ? attachment_physical_form: require('@/assets/images/no-image.png')" style="width: 100px; height: 100px;"/>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-6">
									<div class="d-flex">
										<label class="col-6 fw-bolder">Internet Provider :</label>
										<input class="form-control" v-model="this.review_data.isp" disabled/>
									</div>
								</div>
								<div class="col-6">
									<div class="d-flex">
										<label class="col-6 fw-bolder">Internet Speed Test :</label>
										<input class="form-control" v-model="this.review_data.internet_speed" disabled/>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<!-- <label style="font-weight: bolder;">Other Details</label>
								<textarea class="form-control" rows="5"  disabled></textarea> -->
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="light">PRINT</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<!-- <Pagination/> -->
		</div>
    </Layout>
</template>
<style scoped>
.pagination > button{
	border:none;
	padding:5px 15px;
	margin-right: 5px;
}
.custom-danger {
    background: rgb(181, 15, 1);
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
