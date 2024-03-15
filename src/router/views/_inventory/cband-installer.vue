<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/finance-report.json"
import { mapActions } from "vuex";
import Loader from '../../../components/widgets/loader.vue'
import formatter from "../../../mixins/formatter";
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
        Layout,
		Loader
		// Pagination
    },
    data() {
        return {
            title: "Report",
			data: [],
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
			review:{
				application_type: '',
				business_name: '',
				contact_person: '',
				installation: '',
				marketing_in_charge: '',
				reference_no: '',
				business_address:'',
				contact_number: '',
				tech_in_charge: '',
				item:[],
				customer_id:null,
				picture_of_site:null,
				physical_form:null,
				customer_id_thumbnail:null,
				picture_of_site_thumbnail:null,
				physical_form_thumbnail:null,
			},
			pages:[true,false,false],
			pagesReturn:[true,false,false],
			loading:false,
			review_modal:false,
			attachment_customer_id: null,
			attachment_picture_of_site: null,
			attachment_physical_form: null,
        };
    },
	methods:{
		...mapActions("inventory", {
			getList: "getCbandList",
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
			if(this.filterData.start_date){
				pl['start_date'] = this.filterData.start_date;
			}
			if(this.filterData.end_date){
				pl['end_date'] = this.filterData.end_date;
			}
			this.loading = true;
			const data = await this.getList(pl);
			this.loading = false;
			this.data.list = data.data;
		},
		getReview(data){
			this.review.application_type = data.application_type
			this.review.business_name = data.business_name
			this.review.contact_person = data.contact_person
			this.review.installation = data.cband.date_of_installation
			this.review.marketing_in_charge = data.encoder.full_name
			this.review.reference_no = data.id
			this.review.business_address = data.business_address
			this.review.contact_number = data.contact_number
			this.review.tech_in_charge = data.cband.installed_by
			this.review.item = data.cband.item
			this.review.customer_id = data.cband.customer_id_image
			this.review.picture_of_site = data.cband.site_image
			this.review.physical_form = data.cband.physical_image
			this.review.customer_id_thumbnail = data.cband.thumbnail_customer_id_image
			this.review.picture_of_site_thumbnail = data.cband.thumbnail_site_image
			this.review.physical_form_thumbnail = data.cband.thumbnail_physical_image
			// console.log(this.review)
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
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;C-BAND INVENTORY</h5>
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
											<input class="form-control" v-model="filterData.search" @input="initList(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>DATE OF SERVICE</th>
											<th>REFERENCE</th>
											<th>APPLICATION TYPE</th>
											<th>BUSINESS NAME</th>
											<th>USER ACCOUNT NAME</th>
											<th>STATUS</th>
											<th>REMARKS</th>
											<th>PROVIDER</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{`${dateOnly(data.cband.request_date)} ${timeOnly(data.cband.request_date)}`}}</td>
											<td>{{data.id}}</td>
											<td>{{data.application_type}}</td>
											<td>{{data.business_name}}</td>
											<td>{{data.encoder.full_name}}</td>
											<td>
												<span v-if="data.cband?.status == 0" >
													<strong>NEW</strong>
												</span>
												<span v-else-if="data.cband?.status == 1">
													<strong>APPROVED</strong>
												</span>
												<span v-else-if="data.cband?.status == 2" >
													<strong>SCHEDULED</strong>
												</span>
												<span v-else-if="data.cband?.status == 3" >
													<strong>FOR CHECKING</strong>
												</span>
												<span v-else-if="data.cband?.status == 4" >
													<strong>DENIED</strong>
												</span>
												<span v-else-if="data.cband?.status == 5" >
													<strong>RETURNED</strong>
												</span>
												<span v-else-if="data.cband?.status == 6" >
													<strong>UPDATED</strong>
												</span>
												<span v-else-if="data.cband?.status == 7" >
													<strong>PENDING</strong>
												</span>
											</td>
											<td>{{data.cband?.details}}</td>
											<td>{{data.cband?.provider.user_lvl_name}}</td>
											<td class="text-center">
												<b-button @click="getReview(data),review_modal = true" variant="primary" size="sm">REVIEW</b-button>
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
			
			<b-modal centered v-model="review_modal" title="C-BAND REPORT" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12">
					<div class="row p-4" style="font-size: 17px;">
						<div class="col-6">
							<label class="col-6 fw-bolder">Application Type :</label>
							<span class="col-6">{{ this.review.application_type ? this.review.application_type: ' ' }}</span>
							<label class="col-6 fw-bolder">Business Name</label>
							<span class="col-6">{{ this.review.business_name ? this.review.business_name: ' ' }}</span>
							<label class="col-6 fw-bolder">Contact Person</label>
							<span class="col-6">{{ this.review.contact_person ? this.review.contact_person: ' ' }}</span>
							<label class="col-6 fw-bolder">Date of Delivery/installation</label>
							<span class="col-6">{{ this.review.installation ? this.review.installation: ' ' }}</span>
							<label class="col-6 fw-bolder">Marketing in charge</label>
							<span class="col-6">{{ this.review.marketing_in_charge ? this.review.marketing_in_charge: ' ' }}</span>
						</div>
						<div class="col-6">
							<label class="col-6 fw-bolder">Reference Number :</label>
							<span class="col-6">{{ this.review.reference_no ? this.review.reference_no: ' ' }}</span>
							<label class="col-6 fw-bolder">Business Address</label>
							<span class="col-6">{{ this.review.business_address ? this.review.business_address: ' ' }}</span>
							<label class="col-6 fw-bolder">Contact Number</label>
							<span class="col-6">{{ this.review.contact_number ? this.review.contact_number: ' ' }}</span>
							<label class="col-6 fw-bolder">Tech in charge</label>
							<span class="col-6">{{ this.review.tech_in_charge ? this.review.tech_in_charge: ' ' }}</span>
						</div>
					</div>
					<div >
						<h5 class="text-center fw-bold mt-4" style="font-size: 25px;">DELIVERED ITEMS FOR BILLING</h5>
						<table class="table table-responsive custom-style">
							<thead class="bg-light">
								<tr>
									<th>Item</th>
									<th>Unit Cost</th>
									<th>Quantity</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="data,index in this.data.list" :key="index">
									<td>{{data.cband?.item_name}}</td>
									<td>{{data.cband?.brand}}</td>
									<td>{{data.cband?.specs}}</td>
									<td>{{data.cband?.serial_number}}</td>
								</tr>
								<tr>
									<td style="border:none"></td>
									<td style="border:none"></td>
									<td>GRAND TOTAL</td>
									<td>0</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div >
						<h5 class="text-center fw-bold" style="font-size: 25px;">COMPANY PURCHASE</h5>
						<table class="table table-responsive custom-style">
							<thead class="bg-light">
								<tr>
									<th>Item</th>
									<th>Brand</th>
									<th>Specs</th>
									<th>Serial Number</th>
								</tr>
							</thead>
							<tbody>
								<tr >
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td style="border:none"></td>
									<td style="border:none"></td>
									<td>GRAND TOTAL</td>
									<td>0</td>
								</tr>
							</tbody>
						</table>
					</div>
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
					<div class="text-end mt-4">
						<button class="btn btn-light">PRINT</button>
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
