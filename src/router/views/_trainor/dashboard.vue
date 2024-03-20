<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/account-history.json"
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
            title: "Dashboard",
			data_queue: [],
			data_scheduled: [],
			data_pending: [],
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
				show_entries_queue: 50,
				show_entries_scheduled: 50,
				show_entries_pending: 50,
				search_queue:'',
				search_scheduled:'',
				search_pending:'',
			},
			review_queue_data:[],
			review_scheduled_data:[],
			review_pending_data:[],
			review_queue:false,
			review_scheduled:false,
			review_pending:false,
			pending_remarks_modal:false,
			update_details_modal:false,
			loading:false,
			pages:[true,false,false],
			pagesReturn:[true,false,false],
			pl_save:{
				accomodation_image: '',
				accomodation_image_file_name:'',
				trainer_in_charge: [],
				training_schedule_start: '',
				training_schedule_end: '',
				training_extend_date: '',
			},
			pl_scheduled:{
				contact_number: '',
				role: '',
				remarks:'',
				other_details:'',
				trainees: [],
			},
			pl_pending:{
				contact_number: '',
				role: '',
				remarks:'',
				other_details:'',
				trainees: [],
			},
			add_trainees:{
				full_name: '',
				contact_number: '',
				role: '',
			},
			application_id: '',
        };
    },
	methods:{
		...mapActions("trainor", {
			getQueue: "getQueueList",
			getScheduled: "getScheduledList",
			getPending: "getPendingList",
			saveSched: "saveSchedule",
			returnQueue: "returnQueueSchedule",
			updatePendingQueue: "pendingQueueSchedule",
			updateCompleteQueue: "completeSchedule",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		async initQueue(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_queue,
				order: "desc",
			};
			if(this.filterData.search_queue){
				pl['search'] = this.filterData.search_queue;
			}
			this.loading = true;
			const data = await this.getQueue(pl);
			this.loading = false;
			this.data_queue.list = data.data;
		},
		async initScheduled(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_queue,
				order: "desc",
			};
			if(this.filterData.search_queue){
				pl['search'] = this.filterData.search_queue;
			}
			this.loading = true;
			const data = await this.getScheduled(pl);
			this.loading = false;
			this.data_scheduled.list = data.data;
		},
		async initPending(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_queue,
				order: "desc",
			};
			if(this.filterData.search_queue){
				pl['search'] = this.filterData.search_queue;
			}
			this.loading = true;
			const data = await this.getPending(pl);
			this.loading = false;
			this.data_pending.list = data.data;
		},
		getDataQueue(data){
			this.review_queue_data = data
			this.application_id = data.application_id
		},
		getDataScheduled(data){
			this.review_scheduled_data = data
			this.application_id = data.application_id
		},
		getDataPending(data){
			this.review_pending_data = data
			this.application_id = data.application_id
		},
		handleFileUpload(event) {
			// Accessing the selected file
			this.pl_save.accomodation_image = event.target.files[0];
			// Updating the fileName
			this.pl_save.accomodation_image_file_name = this.pl_save.accomodation_image ? this.pl_save.accomodation_image_file_name : '';
		},
		async saveQueue(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			fd.append("accomodation_image", this.pl_save.accomodation_image);
			fd.append("trainer_in_charge", this.pl_save.trainer_in_charge);
			fd.append("training_schedule_start", this.pl_save.training_schedule_start);
			fd.append("training_schedule_end", this.pl_save.training_schedule_end);
			fd.append("training_extend_date", this.pl_save.training_extend_date);
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to save this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.saveSched(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Save Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.review_queue = false;
					this.initQueue(1);
					this.initScheduled(1);
					this.initPending(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to save schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async returnSave(){
			var pl ={
				application_id: this.application_id,
				returned_remarks: this.pl_save.remarks
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to return this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.returnQueue(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Return Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.return_queue = false;
					this.initQueue(1);
					this.initScheduled(1);
					this.initPending(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to return schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		addScheduledTrainees(){
			const add_trainees = {
				full_name: this.add_trainees.full_name,
				contact_number: this.add_trainees.contact_number,
				role: this.add_trainees.role
			}
			this.pl_scheduled.trainees.push(add_trainees);
		},

		async pendingScheduled(){
			var pl ={
				application_id: this.application_id,
				pending_remarks: this.pl_scheduled.pending_remarks,
				trainees: this.pl_scheduled.trainees,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to update this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updatePendingQueue(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Updating Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.pending_remarks_modal = false;
					this.initQueue(1);
					this.initScheduled(1);
					this.initPending(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to update schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async completeSchedule(){
			var pl ={
				application_id: this.application_id,
				other_details: this.pl_scheduled.other_details,
				trainees: this.pl_scheduled.trainees,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to complete this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updateCompleteQueue(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Complete Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.review_scheduled = false;
					this.initQueue(1);
					this.initScheduled(1);
					this.initPending(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to complete schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		addPendingTrainees(){
			const add_trainees = {
				full_name: this.add_trainees.full_name,
				contact_number: this.add_trainees.contact_number,
				role: this.add_trainees.role
			}
			this.pl_pending.trainees.push(add_trainees);
		},
		async lastPendingScheduled(){
			var pl ={
				application_id: this.application_id,
				pending_remarks: this.pl_pending.pending_remarks,
				trainees: this.pl_pending.trainees,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to update this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updatePendingQueue(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Updating Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.pending_remarks_modal = false;
					this.initQueue(1);
					this.initScheduled(1);
					this.initPending(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to update schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async completePendingSchedule(){
			var pl ={
				application_id: this.application_id,
				other_details: this.review_pending_data.other_details,
				trainees: this.pl_scheduled.trainees,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to complete this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updateCompleteQueue(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Complete Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.review_pending = false;
					this.initQueue(1);
					this.initScheduled(1);
					this.initPending(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to complete schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
	},
    mounted() {
		this.initQueue(1)
		this.initScheduled(1)
		this.initPending(1)
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;REQUEST SCHEDULE</h5>
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
												<select class="mx-2 form-control" v-model="this.filterData.show_entries_queue" @change="initQueue(1)">
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
											<input class="form-control" v-model="this.filterData.search_queue" @input="initQueue(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>Date Request</th>
											<th>Reference Number</th>
											<th>Application Type</th>
											<th>Business Name</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data,index in this.data_queue.list" :key="index">
											<td>{{`${dateOnly(data.request_date)} ${timeOnly(data.request_date)}`}}</td>
											<td>{{data.application?.id}}</td>
											<td>{{data.application?.application_type}}</td>
											<td>{{data.application?.business_name}}</td>
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
												<button class="btn btn-info btn-sm" @click="getDataQueue(data),review_queue = true">Review</button>
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
		<div class="row">
			<div class="col-12">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;SCHEDULED</h5>
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
												<select class="mx-2 form-control" v-model="this.filterData.show_entries_scheduled" @change="initScheduled(1)">
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
											<input class="form-control" v-model="this.filterData.search_scheduled" @input="initScheduled(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>Date Schedule</th>
											<th>Reference Number</th>
											<th>Application Type</th>
											<th>Business Name</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data,index in this.data_scheduled.list" :key="index">
											<td>{{`${dateOnly(data.request_date)} ${timeOnly(data.request_date)}`}}</td>
											<td>{{data.application?.id}}</td>
											<td>{{data.application?.application_type}}</td>
											<td>{{data.application?.business_name}}</td>
											<td class="text-center">
												<button class="btn btn-info btn-sm" @click="getDataScheduled(data),review_scheduled = true">Review</button>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="d-flex">
									<span style="width:90%">Showing 1 to 20 of 120 entries</span>
									<div class="d-flex pagination">
										<button :class="`${this.pagesReturn[0] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePageReturn(1)">1</button>
										<button :class="`${this.pagesReturn[1] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePageReturn(2)">2</button>
										<button :class="`${this.pagesReturn[2] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePageReturn(3)">3</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <Pagination/> -->
		</div>
		<div class="row">
			<div class="col-12">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;PENDING / RETURN REQUEST FROM KIOSK</h5>
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
												<select class="mx-2 form-control" v-model="this.filterData.show_entries_pending" @change="initPending(1)">
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
											<input class="form-control" v-model="this.filterData.search_pending" @input="initPending(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>Date Request</th>
											<th>Reference Number</th>
											<th>Application Type</th>
											<th>Business Name</th>
											<th>Remarks</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data,index in this.data_pending.list" :key="index">
											<td>{{`${dateOnly(data.request_date)} ${timeOnly(data.request_date)}`}}</td>
											<td>{{data.application?.id}}</td>
											<td>{{data.application?.application_type}}</td>
											<td>{{data.application?.business_name}}</td>
											<td>{{data.pending_remarks}}</td>
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
												<button class="btn btn-info btn-sm" @click="getDataPending(data),review_pending = true">Review</button>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="d-flex">
									<span style="width:90%">Showing 1 to 20 of 120 entries</span>
									<div class="d-flex pagination">
										<button :class="`${this.pagesReturn[0] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePageReturn(1)">1</button>
										<button :class="`${this.pagesReturn[1] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePageReturn(2)">2</button>
										<button :class="`${this.pagesReturn[2] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePageReturn(3)">3</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- MODALS -->
			<b-modal centered v-model="review_queue" title="SET SCHEDULE TRAINING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.review_queue_data.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.review_queue_data.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.review_queue_data.application?.contact_person}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.review_queue_data.application?.contact_number}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of Trainee:</label>
										<span class="col-6">{{this.review_queue_data.number_of_trainees}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference NUmber:</label>
										<span class="col-6">{{this.review_queue_data.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.review_queue_data.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Guarantor:</label>
										<span class="col-6">{{this.review_queue_data.application?.guarantor}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Request Date:</label>
										<span class="col-6">{{this.review_queue_data.request_date}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Internet Speed:</label>
										<span class="col-6">{{this.review_queue_data.internet_speed}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.review_queue_data.details"  disabled></textarea>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Accomodation</label>
								<input class="form-control" type="file" ref="fileInput" @change="handleFileUpload"/>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Trainer in Charge</label>
								<select class="form-control mb-3" v-model="pl_save.trainer_in_charge">
									<option></option>
								</select>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Training Schedule</label>
								<div class="row" style="font-size: 15px;">
									<div class="col-4"><label>FROM</label><input class="form-control" type="date" v-model="pl_save.training_schedule_start"/></div>
									<div class="col-4"><label>TO</label><input class="form-control" type="date" v-model="pl_save.training_schedule_end"/></div>
									<div class="col-4"><label>Training Extend/Support</label><input class="form-control" type="date" v-model="pl_save.training_extend_date"/></div>
								</div>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="saveQueue()">SAVE</b-button>
							<b-button class="mx-1" variant="danger" @click="review_queue = false,return_queue = true">RETURN</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="return_queue" title="These remarks will return to Sales Marketing" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.pl_save.remarks"></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="returnSave()">SAVE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="review_scheduled" title="SCHEDULE TRAINING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.review_scheduled_data.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.review_scheduled_data.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.review_scheduled_data.application?.contact_person}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.review_scheduled_data.application?.contact_number}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of Trainee:</label>
										<span class="col-6">{{this.review_scheduled_data.number_of_trainees}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Training in Charge:</label>
										<span class="col-6">{{}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference NUmber:</label>
										<span class="col-6">{{this.review_scheduled_data.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.review_scheduled_data.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Guarantor:</label>
										<span class="col-6">{{this.review_scheduled_data.application?.guarantor}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Internet Speed:</label>
										<span class="col-6">{{this.review_scheduled_data.internet_speed}}</span>
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
									<div class="col-4"><label>FROM</label><input class="form-control" type="date" v-model="this.review_scheduled_data.training_schedule_start" disabled/></div>
									<div class="col-4"><label>TO</label><input class="form-control" type="date" v-model="this.review_scheduled_data.training_schedule_end" disabled/></div>
									<div class="col-4"><label>Training Extend/Support</label><input class="form-control" type="date" v-model="this.review_scheduled_data.training_extend_date" disabled/></div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<div class="card p-3">
								<div class="row">
									<div class="col-4">
										<label class="fw-bolder">Full Name:</label>
										<input placeholder="Enter Full Name" class="form-control" v-model="add_trainees.full_name"/>
									</div>
									<div class="col-4">
										<label class="fw-bolder">Contact Number:</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="add_trainees.contact_number"/>
										</div>
									</div>
									<div class="col-3">
										<label class="fw-bolder">Role:</label>
										<select class="form-control" v-model="add_trainees.role">
											<option>Teller</option>
											<option>Cashier</option>
											<option>Teller/Cashier</option>
											<option>Operator</option>
											<option>Supervisor</option>
										</select>
									</div>
									<div class="col-1">
										<button class="btn btn-dark" style="margin-top: 37px;" @click="addScheduledTrainees()">ADD</button>
									</div>
								</div>
								<div class="mt-4" style="font-size: 15px;">
									<table class="table table-responsive custom-style">
										<thead>
											<tr class="bg-light">
												<th style="width: 30% !important">Full Name</th>
												<th style="width: 30% !important">Contact Number</th>
												<th style="width: 30% !important">Role</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="data,index in this.pl_scheduled.trainees" :key="index">
												<td style="width: 30% !important">{{data.full_name}}</td>
												<td style="width: 30% !important">{{data.contact_number}}</td>
												<td style="width: 30% !important">{{data.role}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Other Details</label>
								<textarea class="form-control" rows="5" v-model="this.pl_scheduled.other_details" ></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="pending_remarks_modal = true, review_scheduled = false">PENDING</b-button>
							<b-button class="mx-1" variant="danger" @click="review_queue = false, completeSchedule()">COMPLETE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="pending_remarks_modal" title="PENDING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.pl_scheduled.pending_remarks"></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="pendingScheduled()">SAVE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="review_pending" title="SCHEDULED TRAINING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.review_pending_data.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.review_pending_data.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.review_pending_data.application?.contact_person}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.review_pending_data.application?.contact_number}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of Trainee:</label>
										<span class="col-6">{{this.review_pending_data.number_of_trainees}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Training in Charge:</label>
										<span class="col-6">{{}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference NUmber:</label>
										<span class="col-6">{{this.review_pending_data.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.review_pending_data.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Guarantor:</label>
										<span class="col-6">{{this.review_pending_data.application?.guarantor}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Internet Speed:</label>
										<span class="col-6">{{this.review_pending_data.internet_speed}}</span>
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
									<div class="col-4"><label>FROM</label><input class="form-control" type="date" v-model="this.review_pending_data.training_schedule_start" disabled/></div>
									<div class="col-4"><label>TO</label><input class="form-control" type="date" v-model="this.review_pending_data.training_schedule_end" disabled/></div>
									<div class="col-4"><label>Training Extend/Support</label><input class="form-control" type="date" v-model="this.review_pending_data.training_extend_date" disabled/></div>
								</div>
							</div>
						</div>
						<hr>
						<div class="col-12 mb-4" >
							<div class="card p-3">
								<div class="row">
									<div class="col-4">
										<label class="fw-bolder">Full Name:</label>
										<input placeholder="Enter Full Name" class="form-control" v-model="add_trainees.full_name"/>
									</div>
									<div class="col-4">
										<label class="fw-bolder">Contact Number:</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="add_trainees.contact_number"/>
										</div>
									</div>
									<div class="col-3">
										<label class="fw-bolder">Role:</label>
										<select class="form-control" v-model="add_trainees.role">
											<option>Teller</option>
											<option>Cashier</option>
											<option>Teller/Cashier</option>
											<option>Operator</option>
											<option>Supervisor</option>
										</select>
									</div>
									<div class="col-1">
										<button class="btn btn-dark" style="margin-top: 37px;" @click="addPendingTrainees()">ADD</button>
									</div>
								</div>
								<div class="mt-4" style="font-size: 15px;">
									<table class="table table-responsive custom-style">
										<thead>
											<tr class="bg-light">
												<th style="width: 30% !important">Full Name</th>
												<th style="width: 30% !important">Contact Number</th>
												<th style="width: 30% !important">Role</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="data,index in this.pl_pending.trainees" :key="index">
												<td style="width: 30% !important">{{data.full_name}}</td>
												<td style="width: 30% !important">{{data.contact_number}}</td>
												<td style="width: 30% !important">{{data.role}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Other Details</label>
								<textarea class="form-control" rows="5" v-model="this.review_pending_data.other_details" ></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="update_details_modal = true, review_pending = false">UPDATE</b-button>
							<b-button class="mx-1" variant="danger" @click="completePendingSchedule()">COMPLETE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="update_details_modal" title="PENDING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Please provide details</label>
								<textarea class="form-control" rows="5" v-model="this.pl_pending.pending_remarks"></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="lastPendingScheduled()">SAVE</b-button>
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
