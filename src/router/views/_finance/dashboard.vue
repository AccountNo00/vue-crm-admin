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
			review_queue:false,
			review_returned:false,
			approve_modal: false,
			return_modal:false,
			data: [],
			data_returned:[],
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
			view:{
				image:'',
				reference_no: '',
				business_name: '',
				business_address: '',
				island_group: '',
				region: '',
				province: '',
				owner_full_name: '',
				owner_contact_number: '',
				owner_email: '',
				owner_is_pep: '',
				guarantor_full_name: '',
				guarantor_contact_number: '',
				guarantor_email: '',
				guarantor_is_pep: '',
				operator_full_name: '',
				operator_contact_number: '',
				operator_email: '',
				operator_is_pep: '',
				contact_full_name: '',
				contact_contact_number: '',
				contact_email: '',
				contact_is_pep: '',
				remarks: '',
			},
			filterData:{
				start_date:'',
				end_date:'',
				show_entries_queue: 50,
				show_entries_returned: 50,
				search_queue:'',
				search_returned:'',
			},
			approve_queue:{
				application_id: '',
				remarks: '',
				verifier_name: '',
			},
			return_queue:{
				application_id: '',
				remarks: '',
			},
			pages:[true,false,false],
			pagesReturn:[true,false,false],
            attachment: null,
        };
    },
	methods:{
		...mapActions("finance", {
			getQueueList: "queueList",
			getQueueReturnedList: "queueReturnedList",
			putQueue: "approveQueue",
			putQueueReturn: "returnQueue",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
        displayAttachment(e) {
            var vm = this;
            var files = e.target.files;
            if (FileReader && files && files.length) {
                vm.view.image = files[0];
                // img thumbnail
                var fr = new FileReader();
                fr.onload = function () {
                    vm.attachment = fr.result;
                    // console.log(vm.attachment);
                };
                fr.readAsDataURL(files[0]);
            }
        },
		async initQueueList(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_queue,
				order: "desc",
			};
			if(this.filterData.search_queue){
				pl['search'] = this.filterData.search_queue;
			}
			this.loading = true;
			const data = await this.getQueueList(pl);
			this.loading = false;
			this.data.list = data.data.data;
		},
		async initReturnedList(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_returned,
				order: "desc",
			};
			if(this.filterData.search_returned){
				pl['search'] = this.filterData.search_returned;
			}
			this.loading = true;
			const data = await this.getQueueReturnedList(pl);
			this.loading = false;
			this.data_returned.list = data.data.data;
		},
		getView(data){
			this.approve_queue.application_id = data.id
			this.return_queue.application_id = data.id
			this.view.reference_no = data.person.application_id
			this.view.business_name = data.business_name
			this.view.business_address = data.business_address
			this.view.island_group = data.location.island_grp
			this.view.region = data.location.region
			this.view.province = data.location.province
			this.view.owner_full_name = data.person.owner_full_name
			this.view.owner_contact_number = data.person.owner_contact_number
			this.view.owner_email = data.person.owner_email
			this.view.owner_is_pep = data.person.owner_is_pep
			this.view.guarantor_full_name = data.person.guarantor_full_name
			this.view.guarantor_contact_number = data.person.guarantor_contact_number
			this.view.guarantor_email = data.person.guarantor_email
			this.view.guarantor_is_pep = data.person.guarantor_is_pep
			this.view.operator_full_name = data.person.operator_full_name
			this.view.operator_contact_number = data.person.operator_contact_number
			this.view.operator_email = data.person.operator_email
			this.view.operator_is_pep = data.person.operator_is_pep
			this.view.contact_full_name = data.person.contact_full_name
			this.view.contact_contact_number = data.person.contact_contact_number
			this.view.contact_email = data.person.contact_email
			this.view.contact_is_pep = data.person.contact_is_pep
			this.view.remarks = data.remarks
		},
		async saveQueue(){
			var pl = {
				application_id: this.approve_queue.application_id,
				remarks: this.approve_queue.remarks,
				verifier_name: this.approve_queue.verifier_name,
			};
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to save this?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.putQueue(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Successfuly Saved`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.approve_modal = false;
					this.return_modal = false;
					this.initQueueList(1);
					this.initReturnedList(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to save this application.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async returnQueue(){
			var pl = {
				application_id: this.return_queue.application_id,
				returned_remarks: this.return_queue.remarks,
			};
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to return this?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.putQueueReturn(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Successfuly Returned`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.approve_modal = false;
					this.return_modal = false;
					this.initQueueList(1);
					this.initReturnedList(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to return this application.`,
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
		this.initQueueList(1);
		this.initReturnedList(1);
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;QUEUE</h5>
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
												<select class="mx-2 form-control" v-model="filterData.show_entries_queue" @change="initQueueList(1)">
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
											<input class="form-control" v-model="filterData.search_queue" @input="initQueueList(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>Reference Number</th>
											<th>Application Type</th>
											<th>Business Name</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data,index in this.data.list" :key="index">
											<td>{{ data.id }}</td>
											<td>{{ data.application_type}}</td>
											<td>{{ data.business_name}}</td>
											<td class="text-center"><button class="btn btn-info btn-sm" @click="getView(data),review_queue = true">Review</button></td>
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;RETURN/UPDATED QUEUE</h5>
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
												<select class="mx-2 form-control" v-model="filterData.search_returned" @input="initReturnedList(1)">
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
											<input class="form-control" v-model="filterData.search_returned" @input="initReturnedList(1)"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light">
										<tr>
											<th>Reference Number</th>
											<th>Return date/time</th>
											<th>Application type</th>
											<th>Business Name</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="data,index in this.data_returned.list" :key="index">
											<td>{{ data.id }}</td>
											<td>{{`${dateOnly(data.updated_at)} ${timeOnly(data.updated_at)}`}}</td>
											<td>{{data.application_type}}</td>
											<td>{{data.business_name}}</td>
											<td>
												<span v-if="data.finance_status == 0" >
													<strong>NEW</strong>
												</span>
												<span v-else-if="data.finance_status == 1">
													<strong>APPROVED</strong>
												</span>
												<span v-else-if="data.finance_status == 2" >
													<strong>SCHEDULED</strong>
												</span>
												<span v-else-if="data.finance_status == 3" >
													<strong>FOR CHECKING</strong>
												</span>
												<span v-else-if="data.finance_status == 4" >
													<strong>DENIED</strong>
												</span>
												<span v-else-if="data.finance_status == 5" >
													<strong>RETURNED</strong>
												</span>
												<span v-else-if="data.finance_status == 6" >
													<strong>UPDATED</strong>
												</span>
												<span v-else-if="data.finance_status == 7" >
													<strong>PENDING</strong>
												</span>
											</td>
											<td class="text-center"><button class="btn btn-info btn-sm" @click="getView(data),review_returned = true">Review</button></td>
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
			<b-modal centered v-model="review_queue" title="FINANCE" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2">
					<div class="card-body">
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Attachment Receipt *</label>
									<div>
										<img :src="attachment ? attachment: require('@/assets/images/no-image.png')" style="width: 100px; height: 100px;"/>
									</div>   
								</div>
								<div class="col-4">

								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Reference Number</label>
									<p class="mt-3">{{this.view.reference_no}}</p>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-6">
									<label style="font-weight: bolder;">Business Name *</label>
									<input class="form-control" v-model="view.business_name" disabled/>
								</div>
								<div class="col-6">
									<label style="font-weight: bolder;">Business Address *</label>
									<input class="form-control" v-model="view.business_address" disabled/>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Island GRP *</label>
									<input class="form-control" v-model="view.island_group" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Region</label>
									<input class="form-control" v-model="view.region" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Province</label>
									<input class="form-control" v-model="view.province" disabled/>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Owner Full name</label>
									<input class="form-control"  v-model="view.owner_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Owner Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control" v-model="view.owner_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email" v-model="view.owner_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.owner_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Guarantor Full name</label>
									<input class="form-control"  v-model="view.guarantor_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Guarantor Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control"  v-model="view.guarantor_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email"  v-model="view.guarantor_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.guarantor_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Operator Full name</label>
									<input class="form-control"  v-model="view.operator_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Operator Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control"  v-model="view.operator_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email" v-model="view.operator_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.operator_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Contact Person Full name</label>
									<input class="form-control" v-model="view.contact_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Contact Person Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control" v-model="view.contact_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email"  v-model="view.contact_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.contact_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks (please indicate IATF Protocol)</label>
								<textarea class="form-control" rows="5" v-model="view.remarks" disabled></textarea>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12 p-2 bg-dark text-white w-100 text-center">
								<span style="font-size: 20px;">BANK DETAILS</span>
							</div>
							<table class="table table-responsive ">
								<thead class="bg-light">
									<tr>
										<th>Bank Priority</th>
										<th>Bank Name & Branch</th>
										<th>Account Name</th>
										<th>Account Number</th>
										<th>Account Type</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data,index in this.data.list" :key="index">
										<td>{{data.bank.bank_owner_role}}</td>
										<td>{{data.bank.bank_name}}</td>
										<td>{{data.bank.account_name}}</td>
										<td>{{data.bank.account_account_number}}</td>
										<td>{{data.bank.account_type}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="secondary" >PRINT</b-button>
							<b-button class="mx-1" variant="info" @click="review_queue = false,approve_modal = true">APPROVE</b-button>
							<b-button class="mx-1" variant="danger" @click="review_queue = false,return_modal = true">RETURN</b-button>
						</div>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="approve_modal" title="VERIFICATION" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="md">
				<div class="col-12 mb-4">
					<div class="col-12">
						<label style="font-weight: bolder;">Deposit Verifiy By *</label>
						<input class="form-control" v-model="approve_queue.verifier_name" />
					</div>
					<div class="col-12">
						<label style="font-weight: bolder;">Remarks</label>
						<textarea class="form-control" rows="5" v-model="approve_queue.remarks" ></textarea>
					</div>
				</div>
				<div class="text-end">
					<button class="btn btn-info" @click="saveQueue()">Save</button>
				</div>
			</b-modal>
			<b-modal centered v-model="return_modal" title="These remarks will return to Sales Marketing" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="md">
				<div class="col-12 mb-4">
					<div class="col-12">
						<label style="font-weight: bolder;">Remarks</label>
						<textarea class="form-control" rows="5" v-model="return_queue.remarks" ></textarea>
					</div>
				</div>
				<div class="text-end">
					<button class="btn btn-info" @click="returnQueue()">Save</button>
				</div>
			</b-modal>
			<b-modal centered v-model="review_returned" title="FINANCE" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="xl">
				<div class="col-12 mt-2">
					<div class="card-body">
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Attachment Receipt *</label>
									<div>
										<img :src="attachment ? attachment: require('@/assets/images/no-image.png')" style="width: 100px; height: 100px;"/>
									</div>   
								</div>
								<div class="col-4">

								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Reference Number</label>
									<p class="mt-3">{{this.view.reference_no}}</p>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-6">
									<label style="font-weight: bolder;">Business Name *</label>
									<input class="form-control" v-model="view.business_name" disabled/>
								</div>
								<div class="col-6">
									<label style="font-weight: bolder;">Business Address *</label>
									<input class="form-control" v-model="view.business_address" disabled/>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Island GRP *</label>
									<input class="form-control" v-model="view.island_group" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Region</label>
									<input class="form-control" v-model="view.region" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Province</label>
									<input class="form-control" v-model="view.province" disabled/>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Owner Full name</label>
									<input class="form-control"  v-model="view.owner_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Owner Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control" v-model="view.owner_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email" v-model="view.owner_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.owner_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Guarantor Full name</label>
									<input class="form-control"  v-model="view.guarantor_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Guarantor Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control"  v-model="view.guarantor_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email"  v-model="view.guarantor_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.guarantor_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Operator Full name</label>
									<input class="form-control"  v-model="view.operator_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Operator Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control"  v-model="view.operator_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email" v-model="view.operator_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.operator_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="row">
								<div class="col-4">
									<label style="font-weight: bolder;">Contact Person Full name</label>
									<input class="form-control" v-model="view.contact_full_name" disabled/>
								</div>
								<div class="col-4">
									<label style="font-weight: bolder;">Contact Person Contact Number</label>
									<div class="d-flex">
										<h6 class="contact-label">+63</h6>
										<input class="form-control" v-model="view.contact_contact_number" disabled/>
									</div>
								</div>
								<div class="col-3">
									<label style="font-weight: bolder;">Email</label>
									<input class="form-control" type="email"  v-model="view.contact_email" disabled/>
								</div>
								<div class="col-1">
									<label style="font-weight: bolder;">PEP</label>
									<select class="form-control" v-model="view.contact_is_pep" disabled>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks (please indicate IATF Protocol)</label>
								<textarea class="form-control" rows="5" v-model="view.remarks" disabled></textarea>
							</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12 p-2 bg-dark text-white w-100 text-center">
								<span style="font-size: 20px;">BANK DETAILS</span>
							</div>
							<table class="table table-responsive ">
								<thead class="bg-light">
									<tr>
										<th>Bank Priority</th>
										<th>Bank Name & Branch</th>
										<th>Account Name</th>
										<th>Account Number</th>
										<th>Account Type</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="data,index in this.data_returned.list" :key="index">
										<td>{{data.bank.bank_owner_role}}</td>
										<td>{{data.bank.bank_name}}</td>
										<td>{{data.bank.account_name}}</td>
										<td>{{data.bank.account_account_number}}</td>
										<td>{{data.bank.account_type}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="secondary" >PRINT</b-button>
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
</style>
