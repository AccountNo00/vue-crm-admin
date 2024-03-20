<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/finance-report.json"
import { mapActions } from "vuex";
import Loader from '../../../components/widgets/loader.vue'
import formatter from "../../../mixins/formatter";
import Swal from "sweetalert2";
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
			data_trainees: [],
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
			review_data:[],
			application_id: '',
			pl:{
				trainees: [],
			},
			add_trainees:{
				full_name: '',
				contact_number: '',
				role: '',
			},
			pl_edit_trainee:{
				id: '',
				full_name: '',
				contact_number: '',
				role: '',
			},
			loading:false,
			review_modal:false,
			edit: false,
			edit_id: '',
			edit_trainee: false,
			pages:[true,false,false],
			pagesReturn:[true,false,false],
        };
    },
	methods:{
		...mapActions("trainor", {
			getList: "getReports",
			traineeList: "traineesList",
			addTrainee: "traineeAdd",
			updateTrainee: "traineeUpdate",
			deleteTrainee: "traineeDelete",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		getData(data){
			this.review_data = data
			this.application_id = data.application_id
		},
		async createTrainee(){
			const pl = {
				application_id: this.application_id,
				full_name: this.add_trainees.full_name,
				contact_number: this.add_trainees.contact_number,
				role: this.add_trainees.role
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to add new Trainee?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.addTrainee(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Trainee Successfully added`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.initTrainees(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to add new Trainee.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async getEdit(data){
			this.edit_id = data.id
			this.pl_edit_trainee.id = data.id; 
			this.pl_edit_trainee.full_name = data.full_name; 
			this.pl_edit_trainee.contact_number = data.contact_number; 
			this.pl_edit_trainee.role = data.role; 
		},
		async removeTrainee(data){
			const pl = {
				id: data.id,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to remove this Trainee?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.deleteTrainee(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Trainee Successfully Removed`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.initTrainees(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to remove this Trainee.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async editTrainee(data){
			const pl = {
				id: data.id
			}
			if(this.pl_edit_trainee.full_name){
				pl['full_name'] = this.pl_edit_trainee.full_name
			}
			if(this.pl_edit_trainee.contact_number){
				pl['contact_number'] = this.pl_edit_trainee.contact_number
			}
			if(this.pl_edit_trainee.role){
				pl['role'] = this.pl_edit_trainee.role
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to update this Trainee?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updateTrainee(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Trainee updating Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.edit_trainee = false;
					this.initTrainees(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to update this Trainee.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
					this.edit_trainee = false;
					this.initTrainees(1);
				}
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
			const data = await this.getList(pl);
			this.loading = false;
			this.data.list = data.data;
		},
		async initTrainees() {
			var pl = {
				application_id : this.application_id
			};
			this.loading = true;
			const data = await this.traineeList(pl);
			this.loading = false;
			this.data_trainees.list = data.data;
		},
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;TRAINING REPORT</h5>
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
											<input class="form-control" v-model="this.filterData.search" @input="initList(1)"/>
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
											<th>SALES COORDINATOR</th>
											<th>STATUS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{`${dateOnly(data.request_date)} ${timeOnly(data.request_date)}`}}</td>
											<td>{{data.application_id}}</td>
											<td>{{data.application?.application_type}}</td>
											<td>{{data.application.business_name }}</td>
											<td>{{data.application.encoder.full_name }}</td>
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
												<b-button @click="getData(data),initTrainees(),review_modal = true" variant="primary" size="sm">REVIEW</b-button>
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
			<b-modal centered v-model="review_modal" title="SCHEDULED TRAINING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
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
										<span class="col-6">{{this.review_data.contact_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.review_data.contact_number}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of Trainee:</label>
										<span class="col-6">{{this.review_data.number_of_trainees}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Training Admin:</label>
										<span class="col-6">{{this.review_data.encoder?.full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Training in Charge:</label>
										<span class="col-6">{{this.review_data.trainer?.full_name}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference NUmber:</label>
										<span class="col-6">{{this.review_data.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.review_data.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Guarantor:</label>
										<span class="col-6">{{this.review_data.guarantor_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Internet Speed:</label>
										<span class="col-6">{{this.review_data.internet_speed + 'mbps'}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Accomodation:</label>
										<span class="col-6">{{}}</span>
									</div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mt-4 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Training Schedule</label>
								<div class="row" style="font-size: 15px;">
									<div class="col-4"><label>FROM</label><input class="form-control" type="date" v-model="this.review_data.training_schedule_start" disabled/></div>
									<div class="col-4"><label>TO</label><input class="form-control" type="date" v-model="this.review_data.training_schedule_end" disabled/></div>
									<div class="col-4"><label>Training Extend/Support</label><input class="form-control" type="date" v-model="this.review_data.training_extend_date" disabled/></div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<div class="card p-3">
								<div class="row">
									<div class="col-4">
										<label class="fw-bolder">Full Name:</label>
										<input placeholder="Enter Full Name" class="form-control" v-model="add_trainees.full_name" :disabled="!edit"/>
									</div>
									<div class="col-4">
										<label class="fw-bolder">Contact Number:</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="add_trainees.contact_number" :disabled="!edit"/>
										</div>
									</div>
									<div class="col-3">
										<label class="fw-bolder">Role:</label>
										<select class="form-control" v-model="add_trainees.role" :disabled="!edit">
											<option>Teller</option>
											<option>Cashier</option>
											<option>Teller/Cashier</option>
											<option>Operator</option>
											<option>Supervisor</option>
										</select>
									</div>
									<div class="col-1">
										<button class="btn btn-dark" style="margin-top: 37px;" @click="createTrainee()" :hidden="!edit">ADD</button>
									</div>
								</div>
								<div class="mt-4" style="font-size: 15px;">
									<table class="table table-responsive custom-style">
										<thead>
											<tr class="bg-light">
												<th >Full Name</th>
												<th >Contact Number</th>
												<th >Role</th>
												<th style="width: 20%;" v-if="edit">Action</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="data,index in this.data_trainees.list" :key="index">
												<td >
													<span v-if="data.id == this.edit_id && edit_trainee" class="fw-bolder mx-2">FROM:</span>
													<span >{{data.full_name}}</span>
													<div class="d-flex mt-1">
														<span v-if="data.id == this.edit_id && edit_trainee" class="fw-bolder m-2" style="padding-right: 18px;">To:</span>
														<input v-if="data.id == this.edit_id && edit_trainee" class="form-control" v-model="pl_edit_trainee.full_name" />
													</div>
												</td>
												<td >
													<span v-if="data.id == this.edit_id && edit_trainee" class="fw-bolder mx-2">FROM:</span>
													<span >{{data.contact_number}}</span>
													<div class="d-flex mt-1">
														<span v-if="data.id == this.edit_id && edit_trainee" class="fw-bolder m-2" style="padding-right: 18px;">To:</span>
														<input v-if="data.id == this.edit_id && edit_trainee" class="form-control" v-model="pl_edit_trainee.contact_number" />
													</div>
												</td>
												<td >
													<span v-if="data.id == this.edit_id && edit_trainee" class="fw-bolder mx-2">FROM:</span>
													<span >{{data.role}}</span>
													<div class="d-flex mt-1">
														<span v-if="data.id == this.edit_id && edit_trainee" class="fw-bolder m-2" style="padding-right: 18px;">To:</span>
														<select v-if="data.id == this.edit_id && edit_trainee" class="form-control" v-model="pl_edit_trainee.role">
															<option>Teller</option>
															<option>Cashier</option>
															<option>Teller/Cashier</option>
															<option>Operator</option>
															<option>Supervisor</option>
														</select>
													</div>
												</td>
												<td style="width: 20%;" v-if="edit" class="text-center">
													<button class="mx-1 btn btn-warning btn-sm" v-if="edit_trainee == false" @click="getEdit(data),edit_trainee = true">Edit</button>
													<button class="mx-1 btn btn-danger btn-sm" v-if="edit_trainee == false" @click="removeTrainee(data)">Delete</button>
													<button class="mx-1 btn btn-success btn-sm" v-if="data.id == this.edit_id && edit_trainee" @click="editTrainee(data)">Update</button>
													<button class="mx-1 btn btn-light btn-sm" v-if="data.id == this.edit_id && edit_trainee" @click="edit_trainee = false">Cancel</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Other Details</label>
								<textarea class="form-control" rows="5" v-model="this.review_data.other_details" disabled></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="warning" v-if="edit == false" @click="edit = true">EDIT</b-button>
							<b-button class="mx-1" variant="danger" v-if="edit == true" @click="edit = false">CANCEL</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<!-- <Pagination/> -->
		</div>
    </Layout>
</template>
<style scoped>
.contact-label{
	background: rgb(233, 236, 239);
	border-radius: 5px 0 0 5px;
	width:60px;
	margin:0;
	margin-right: -5px;
	padding:8px;
	border: 1px solid rgb(194, 194, 194);
	align-items: center;
	text-align: center;
}
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
