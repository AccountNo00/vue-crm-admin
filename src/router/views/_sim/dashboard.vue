<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/account-history.json"
import { mapActions,mapGetters } from "vuex";
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
        Layout,Loader
		// Pagination
    },
    data() {
        return {
            title: "Dashboard",
			data_request: [],
			data_scheduled: [],
			data_checking: [],
			data_request_view:[],
			data_scheduled_view:[],
			data_checking_view:[],
			pl_request:{
				remarks:'',
				requested_date:'',
			},
			pl_scheduled:{
				remarks: '',
			},
			pl_checking:{
				password: '',
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
			filterData:{
				start_date:'',
				end_date:'',
				show_entries_request: 50,
				show_entries_scheduled: 50,
				show_entries_checking: 50,
				search_request:'',
				search_scheduled:'',
				search_checking:'',
			},
			transportation_fee:0,
			loading:false,
			pages:[true,false,false],
			pagesReturn:[true,false,false],
			application_id:'',
			request_modal:false,
			request_remarks_modal:false,
			scheduled_modal:false,
			checking_modal:false,
        };
    },
	computed:{
		...mapGetters("auth", {
			profile: "profile",
		}),
	},
	methods:{
		...mapActions("sim", {
			getRequest: "requestList",
			getScheduled: "scheduledList",
			getChecking: "checkingList",
			requestSave: "requestScheduleSave",
			requestSubmit: "requestScheduleSubmit",
			updateCheck: "updateChecking",
			completeCheck: "completeChecking",
		}),
		transportationComputation(){
			var kilometers = 2800;
			var multiplier = 50;
			if(this.data_scheduled_view.kilometers){
				this.transportation_fee = (multiplier * this.data_scheduled_view.kilometers) + kilometers
			}
		},
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		async initRequest(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_request,
				order: "desc",
			};
			if(this.filterData.search_request){
				pl['search'] = this.filterData.search_request;
			}
			this.loading = true;
			const data = await this.getRequest(pl);
			this.loading = false;
			this.data_request.list = data.data;
		},
		async initScheduled(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_scheduled,
				order: "desc",
			};
			if(this.filterData.search_scheduled){
				pl['search'] = this.filterData.search_scheduled;
			}
			this.loading = true;
			const data = await this.getScheduled(pl);
			this.loading = false;
			this.data_scheduled.list = data.data;
		},
		async initChecking(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_checking,
				order: "desc",
			};
			if(this.filterData.search_checking){
				pl['search'] = this.filterData.search_checking;
			}
			this.loading = true;
			const data = await this.getChecking(pl);
			this.loading = false;
			this.data_checking.list = data.data;
		},
		getData(data){
			this.application_id = data.application_id
			this.data_request_view = data;
		},
		getDataScheduled(data){
			this.application_id = data.application_id
			this.data_scheduled_view = data;
		},
		getDataChecking(data){
			this.application_id = data.application_id
			this.data_checking_view = data;
		},
		async saveRequest(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			fd.append("requested_date", this.pl_request.requested_date);
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
				const success = await this.requestSave(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Save Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.request_modal = false;
					this.initRequest(1);
					this.initScheduled(1);
					this.initChecking(1);
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
		async returnRequest(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			fd.append("returned_remarks", this.pl_request.remarks);
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to Return this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.requestReturn(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Return Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.request_remarks_modal = false;
					this.initRequest(1);
					this.initScheduled(1);
					this.initChecking(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to Return Schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async updateScheduled(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			if(this.data_scheduled_view.date_of_service){
				fd.append("date_of_service", this.data_scheduled_view.date_of_service)
			}
			if(this.data_scheduled_view.installed_by){
				fd.append("installed_by", this.data_scheduled_view.installed_by)
			}
			if(this.data_scheduled_view.point_a_location){
				fd.append("point_a_location", this.data_scheduled_view.point_a_location)
			}
			if(this.data_scheduled_view.kilometers){
				fd.append("kilometers", this.data_scheduled_view.kilometers)
			}
			// if(this.data_scheduled_view.customer_id_image){
			// 	fd.append("customer_id_image", this.data_scheduled_view.customer_id_image)
			// }
			// if(this.data_scheduled_view.site_image){
			// 	fd.append("site_image", this.data_scheduled_view.site_image)
			// }
			// if(this.data_scheduled_view.physical_image){
			// 	fd.append("physical_image", this.data_scheduled_view.physical_image)
			// }
			if(this.data_scheduled_view.isp){
				fd.append("isp", this.data_scheduled_view.isp)
			}
			if(this.data_scheduled_view.internet_speed){
				fd.append("internet_speed", this.data_scheduled_view.internet_speed)
			}
			if(this.data_scheduled_view.installed_pc_count){
				fd.append("installed_pc_count", this.data_scheduled_view.installed_pc_count)
			}
			if(this.data_scheduled_view.for_checking_remarks){
				fd.append("for_checking_remarks", this.data_scheduled_view.for_checking_remarks)
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to Update this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.requestSave(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Update Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.scheduled_modal = false;
					this.initRequest(1);
					this.initScheduled(1);
					this.initChecking(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to Update this Schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async submitScheduled(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			if(this.data_scheduled_view.date_of_service){
				fd.append("date_of_service", this.data_scheduled_view.date_of_service)
			}
			if(this.data_scheduled_view.installed_by){
				fd.append("installed_by", this.data_scheduled_view.installed_by)
			}
			if(this.data_scheduled_view.point_a_location){
				fd.append("point_a_location", this.data_scheduled_view.point_a_location)
			}
			if(this.data_scheduled_view.kilometers){
				fd.append("kilometers", this.data_scheduled_view.kilometers)
			}
			// if(this.data_scheduled_view.customer_id_image){
			// 	fd.append("customer_id_image", this.data_scheduled_view.customer_id_image)
			// }
			// if(this.data_scheduled_view.site_image){
			// 	fd.append("site_image", this.data_scheduled_view.site_image)
			// }
			// if(this.data_scheduled_view.physical_image){
			// 	fd.append("physical_image", this.data_scheduled_view.physical_image)
			// }
			if(this.data_scheduled_view.isp){
				fd.append("isp", this.data_scheduled_view.isp)
			}
			if(this.data_scheduled_view.internet_speed){
				fd.append("internet_speed", this.data_scheduled_view.internet_speed)
			}
			if(this.data_scheduled_view.installed_pc_count){
				fd.append("installed_pc_count", this.data_scheduled_view.installed_pc_count)
			}
			if(this.pl_scheduled.remarks){
				fd.append("for_checking_remarks", this.pl_scheduled.remarks)
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to Submit this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.requestSubmit(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Submit Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.scheduled_remarks_modal = false;
					this.initRequest(1);
					this.initScheduled(1);
					this.initChecking(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to Submit this Schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async updateChecking(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			if(this.data_checking_view.date_of_service){
				fd.append("date_of_service", this.data_checking_view.date_of_service)
			}
			if(this.data_checking_view.installed_by){
				fd.append("installed_by", this.data_checking_view.installed_by)
			}
			if(this.data_checking_view.point_a_location){
				fd.append("point_a_location", this.data_checking_view.point_a_location)
			}
			if(this.data_checking_view.kilometers){
				fd.append("kilometers", this.data_checking_view.kilometers)
			}
			// if(this.data_checking_view.customer_id_image){
			// 	fd.append("customer_id_image", this.data_checking_view.customer_id_image)
			// }
			// if(this.data_checking_view.site_image){
			// 	fd.append("site_image", this.data_checking_view.site_image)
			// }
			// if(this.data_checking_view.physical_image){
			// 	fd.append("physical_image", this.data_checking_view.physical_image)
			// }
			if(this.data_checking_view.isp){
				fd.append("isp", this.data_checking_view.isp)
			}
			if(this.data_checking_view.internet_speed){
				fd.append("internet_speed", this.data_checking_view.internet_speed)
			}
			if(this.data_checking_view.installed_pc_count){
				fd.append("installed_pc_count", this.data_checking_view.installed_pc_count)
			}
			// if(this.data_checking_view.for_checking_remarks){
			// 	fd.append("for_checking_remarks", this.data_checking_view.for_checking_remarks)
			// }
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to Update this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updateCheck(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Update Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.checking_modal = false;
					this.initRequest(1);
					this.initScheduled(1);
					this.initChecking(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to Update this Schedule.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async completeChecking(){
			let fd = new FormData();
			fd.append("application_id", this.application_id);
			if(this.data_checking_view.date_of_service){
				fd.append("date_of_service", this.data_checking_view.date_of_service)
			}
			if(this.data_checking_view.installed_by){
				fd.append("installed_by", this.data_checking_view.installed_by)
			}
			if(this.data_checking_view.point_a_location){
				fd.append("point_a_location", this.data_checking_view.point_a_location)
			}
			if(this.data_checking_view.kilometers){
				fd.append("kilometers", this.data_checking_view.kilometers)
			}
			// if(this.data_checking_view.customer_id_image){
			// 	fd.append("customer_id_image", this.data_checking_view.customer_id_image)
			// }
			// if(this.data_checking_view.site_image){
			// 	fd.append("site_image", this.data_checking_view.site_image)
			// }
			// if(this.data_checking_view.physical_image){
			// 	fd.append("physical_image", this.data_checking_view.physical_image)
			// }
			if(this.data_checking_view.isp){
				fd.append("isp", this.data_checking_view.isp)
			}
			if(this.data_checking_view.internet_speed){
				fd.append("internet_speed", this.data_checking_view.internet_speed)
			}
			if(this.data_checking_view.installed_pc_count){
				fd.append("installed_pc_count", this.data_checking_view.installed_pc_count)
			}
			if(this.pl_scheduled.remarks){
				fd.append("for_checking_remarks", this.pl_scheduled.remarks)
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to Submit this schedule?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.completeCheck(fd);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Submit Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.checking_modal = false;
					this.password_modal = false;
					this.initRequest(1);
					this.initScheduled(1);
					this.initChecking(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to Submit this Schedule.`,
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
		this.initRequest(1);
		this.initScheduled(1);
		this.initChecking(1);
        // setTimeout(() => {
        //   this.showModal = true;
        // }, 1500);
		alert(this.profile.password)
    },
};
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
		<Loader v-if="loading == true"/>
		<div>
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
													<select class="mx-2 form-control" v-model="this.filterData.show_entries_request" @change="initRequest(1)">
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
												<input class="form-control" v-model="this.filterData.search_request" @input="initRequest(1)"/>
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
											<tr v-for="data,index in this.data_request.list" :key="index">
												<td>{{data.requested_date}}</td>
												<td>{{data.application_id}}</td>
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
													<button class="btn btn-info" @click="getData(data),request_modal = true">Review</button>
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
												<th>Date Scheduled</th>
												<th>Reference Number</th>
												<th>Application Type</th>
												<th>Business Name</th>
												<th>Remarks</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="data,index in this.data_scheduled.list" :key="index">
												<td>{{data.requested_date}}</td>
												<td>{{data.application_id}}</td>
												<td>{{data.application?.application_type}}</td>
												<td>{{data.application?.business_name}}</td>
												<td>{{data.details}}</td>
												<td class="text-center">
													<button class="btn btn-info" @click="getDataScheduled(data),scheduled_modal = true">Review</button>
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
			</div>
			<div class="row">
				<div class="col-12">
					<div class="col-12">
						<div class="card">
							<div class="p-2 mb-0 custom-danger">
								<div class="row">
									<div class="col-6">
										<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;FOR CHECKING</h5>
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
													<select class="mx-2 form-control" v-model="this.filterData.show_entries_checking" @change="initChecking(1)">
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
												<input class="form-control" v-model="this.filterData.search_checking" @input="initChecking(1)"/>
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
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="data,index in this.data_checking.list" :key="index">
												<td>{{data.requested_date}}</td>
												<td>{{data.application_id}}</td>
												<td>{{data.application?.application_type}}</td>
												<td>{{data.application?.business_name}}</td>
												<td>{{data.for_checking_remarks}}</td>
												<td class="text-center">
													<button class="btn btn-info" @click="getDataChecking(data),checking_modal = true">Review</button>
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
			</div>
			<!-- MODALS -->
			<b-modal centered v-model="request_modal" title="SET SCHEDULE" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.data_request_view.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.data_request_view.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.data_request_view.application?.person.contact_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.data_request_view.application?.person.contact_contact_number}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Permit:</label>
										<span class="col-6"></span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference Number:</label>
										<span class="col-6">{{this.data_request_view.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.data_request_view.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Guarantor:</label>
										<span class="col-6">{{this.data_request_view.application?.person.guarantor_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of PC Requested: </label>
										<span class="col-6">{{this.data_request_view.requested_pc_count}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Photo of PC Area:</label>
										<span class="col-6"></span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.data_request_view.details"  disabled></textarea>
							</div>
						</div>
						<hr>
						<div class="col-8 mb-2">
							<div class="d-flex">
								<label class="col-6 fw-bolder">Request Date for PC installation :</label>
								<input class="form-control" type="date" v-model="pl_request.requested_date"/>
							</div>
						</div>
						<hr>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="saveRequest()">SAVE</b-button>
							<b-button class="mx-1" variant="danger" @click="request_modal = false,request_remarks_modal = true">RETURN</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="request_remarks_modal" title="These remarks will return to Sales Marketing" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.pl_request.remarks"></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="returnRequest()">SAVE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="scheduled_modal" title="SCHEDULE" title-class="text-black font-26 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="col-4 mb-4">
								<label class="fw-bolder">Schedule Date:</label>
								<input class="form-control" v-model="this.data_scheduled_view.date_of_service" disabled>
							</div>
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.data_scheduled_view.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.data_scheduled_view.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.data_scheduled_view.application?.person.contact_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of PC Requested:</label>
										<span class="col-6">{{this.data_scheduled_view.requested_pc_count}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Permit :</label>
										<span class="col-6">{{this.data_scheduled_view.application?.requirement.business_permit}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Marketing in charge:</label>
										<span class="col-6">{{this.data_scheduled_view.application?.encoder.full_name}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference Number:</label>
										<span class="col-6">{{this.data_scheduled_view.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.data_scheduled_view.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.data_scheduled_view.application?.person.contact_contact_number}}</span>
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
										<input class="form-control" type="date" v-model="this.data_scheduled_view.date_of_service" />
									</div>
								</div>
								<div class="col-6">
									<div class="d-flex">
										<label class="col-6 fw-bolder">Installed/Serviced By:</label>
										<input class="form-control" v-model="this.data_scheduled_view.installed_by" />
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
										<input class="form-control" v-model="this.data_scheduled_view.point_a_location" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">KILOMETERS:</label>
										<input class="form-control" @input="transportationComputation" v-model="this.data_scheduled_view.kilometers" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">TRANSPORTATION FEE:</label>
										<input class="form-control" v-model="transportation_fee" disabled/>
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
									<!-- <tr v-for="data,index in this.data_item.list" :key="index">
										<td>{{data.item_name}}</td>
										<td>{{data.brand}}</td>
										<td>{{data.specs}}</td>
										<td>{{data.serial_number}}</td>
										<td>{{data.ownership}}</td>
									</tr> -->
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
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">Internet Provider :</label>
										<input class="form-control" v-model="this.data_scheduled_view.isp" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">Internet Speed Test :</label>
										<input class="form-control" v-model="this.data_scheduled_view.internet_speed" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">PC Installed :</label>
										<input class="form-control" v-model="this.data_scheduled_view.installed_pc_count" />
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
							<b-button class="mx-1" variant="info" @click="updateScheduled()">Update</b-button>
							<b-button class="mx-1" variant="success" @click="scheduled_modal = false ,scheduled_remarks_modal = true">Submit</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="scheduled_remarks_modal" title="FOR CHECKING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.pl_scheduled.remarks"></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="submitScheduled()">SAVE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="checking_modal" title="SCHEDULE" title-class="text-black font-26 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="card-body" >
						<div class="col-12 mb-4" >
							<div class="col-4 mb-4">
								<label class="fw-bolder">Schedule Date:</label>
								<input class="form-control" v-model="this.data_checking_view.date_of_service" disabled>
							</div>
							<div class="row">
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Application Type:</label>
										<span class="col-6">{{this.data_checking_view.application?.application_type}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Name:</label>
										<span class="col-6">{{this.data_checking_view.application?.business_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Person:</label>
										<span class="col-6">{{this.data_checking_view.application?.person.contact_full_name}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Number of PC Requested:</label>
										<span class="col-6">{{this.data_checking_view.requested_pc_count}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Permit :</label>
										<span class="col-6">{{this.data_checking_view.application?.requirement.business_permit}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Marketing in charge:</label>
										<span class="col-6">{{this.data_checking_view.application?.encoder.full_name}}</span>
									</div>
								</div>
								<div class="col-6">
									<div>
										<label class="col-6 fw-bolder">Reference Number:</label>
										<span class="col-6">{{this.data_checking_view.application_id}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Business Address:</label>
										<span class="col-6">{{this.data_checking_view.application?.business_address}}</span>
									</div>
									<div>
										<label class="col-6 fw-bolder">Contact Number:</label>
										<span class="col-6">{{this.data_checking_view.application?.person.contact_contact_number}}</span>
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
										<input class="form-control" type="date" v-model="this.data_checking_view.date_of_service" />
									</div>
								</div>
								<div class="col-6">
									<div class="d-flex">
										<label class="col-6 fw-bolder">Installed/Serviced By:</label>
										<input class="form-control" v-model="this.data_checking_view.installed_by" />
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
										<input class="form-control" v-model="this.data_checking_view.point_a_location" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">KILOMETERS:</label>
										<input class="form-control" @input="transportationComputation" v-model="this.data_checking_view.kilometers" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">TRANSPORTATION FEE:</label>
										<input class="form-control" v-model="transportation_fee" disabled/>
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
									<!-- <tr v-for="data,index in this.data_item.list" :key="index">
										<td>{{data.item_name}}</td>
										<td>{{data.brand}}</td>
										<td>{{data.specs}}</td>
										<td>{{data.serial_number}}</td>
										<td>{{data.ownership}}</td>
									</tr> -->
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
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">Internet Provider :</label>
										<input class="form-control" v-model="this.data_checking_view.isp" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">Internet Speed Test :</label>
										<input class="form-control" v-model="this.data_checking_view.internet_speed" />
									</div>
								</div>
								<div class="col-4">
									<div class="">
										<label class="fw-bolder">PC Installed :</label>
										<input class="form-control" v-model="this.data_checking_view.installed_pc_count" />
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
							<b-button class="mx-1" variant="info" @click="updateChecking()">Update</b-button>
							<b-button class="mx-1" variant="success" @click="checking_modal = false ,password_modal = true">Submit</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="password_modal" title="Enter your password" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="md">
				<div class="col-12 mt-2" style="font-size: 20px;">
					<div class="col-12 mb-3">
						<input class="form-control" type="password" v-model="this.pl_checking.password"/>
					</div>
					<div class="text-end">
						<b-button class="mx-1" variant="info" @click="completeChecking()">SAVE</b-button>
					</div>
				</div>
			</b-modal>
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
