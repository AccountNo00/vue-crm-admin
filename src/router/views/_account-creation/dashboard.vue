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
			account:[],
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
				reference_number: '',
				sales_marketing: '',
				business_name: '',
				business_address: '',
				contact_number: '',
				contact_person: '',
				guarantor: '',
				owner: '',
				province: '',
				business_permit: '',
				code_name: '',
				domain: '',
			},
			pl:{
				code_name:'',
				domain:'',
				remarks:'',
			},
			account_id: null,
			pages:[true,false,false],
			pagesReturn:[true,false,false],
			loading:false,
			review_modal:false,
			return_modal:false,
        };
    },
	methods:{
		...mapActions("accountCreation", {
			getDashboardList: "getList",
			getAccounts: "getAccount",
			createAccounts: "createAccount",
			returnAccounts: "returnAccount",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
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
			const data = await this.getDashboardList(pl);
			this.loading = false;
			this.data.list = data.data;
		},
		async createAcc() {
			var pl = {
				code_name: this.pl.code_name,
				application_id:this.account_id,
				domain:this.pl.domain,
			};
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to create?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.createAccounts(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Creation Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
						timer:1000,
					});
					this.initList(1);
					this.review_modal = false;
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to create new account.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async returnAcc() {
			var pl = {
				returned_remarks: this.pl.remarks,
				application_id:this.account_id,
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
				const success = await this.returnAccounts(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Returning Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
						timer:1000,
					});
					this.initList(1);
					this.return_modal = false;
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to return this account.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async getAccountList() {
			var pl = {
				application_id: this.account_id,
			};
			const data = await this.getAccounts(pl);
			this.account.list = data.data;
		},
		getData(data){
			this.account_id = data.id
			this.review.application_type = data.application_type
			this.review.reference_number = data.id
			this.review.sales_marketing = data.encoder.full_name
			this.review.business_name = data.business_name
			this.review.business_address = data.business_address
			this.review.contact_number = data.person.contact_contact_number
			this.review.contact_person = data.person.contact_full_name
			this.review.guarantor = data.person.guarantor_full_name
			this.review.owner = data.person.owner_full_name
			this.review.province = data.location.province
			this.review.business_permit = data.requirement.business_permit
			// this.review.code_name = data.
			// this.review.domain = data.
			// this.review.account.full_name = data.account_created.full_name
			// this.review.account.contact_number = data.account_created.contact_number
			// this.review.account.role = data.account_created.role
			// this.review.account.username = data.account_created.username
			// this.review.account.password = data.account_created.password
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;ACCOUNT CREATION</h5>
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
											<th>NO</th>
											<th>REQUESTED DATE</th>
											<th>REFERENCE NUMBER</th>
											<th>APPLICATION TYPE</th>
											<th>BUSINESS NAME</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{index + 1}}</td>
											<td>{{`${dateOnly(data.account_creation_request_date)} ${timeOnly(data.account_creation_request_date)}`}}</td>
											<td>{{data.id}}</td>
											<td>{{data.application_type}}</td>
											<td>{{data.business_name}}</td>
											<td class="text-center">
												<button class="btn btn-info btn-sm" @click="getData(data),getAccountList(),review_modal = true">REVIEW</button>
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
					<div class="row p-4" style="font-size: 20px;">
						<div class="row col-12">
							<div class="d-flex col-4">
								<label class="fw-bolder">Application Type:</label>
								<span class="mx-4">{{this.review.application_type}}</span>	
							</div>
							<div class="d-flex col-4">
								<label class="fw-bolder">Reference Number:</label>
								<span class="mx-4">{{this.review.reference_number}}</span>
							</div>
							<div class="d-flex col-4">
								<label class="fw-bolder">Sales Marketing:</label>
								<span class="mx-4">{{this.review.sales_marketing}}</span>
							</div>
						</div>
						<hr class=" mt-4"/>
						<div class="row">
							<div class="col-6 ">
								<label class="col-6 fw-bolder">Business Name:</label>
								<span class="col-6 mx-4">{{this.review.business_name}}</span>	
								<label class="col-6 fw-bolder">Business Address:</label>
								<span class="col-6 mx-4">{{this.review.business_address}}</span>	
								<label class="col-6 fw-bolder">Contact Number:</label>
								<span class="col-6 mx-4">{{this.review.contact_number}}</span>	
								<label class="col-6 fw-bolder">Contact Person:</label>
								<span class="col-6 mx-4">{{this.review.contact_person}}</span>	
								<label class="col-6 fw-bolder">Guarantor:</label>
								<span class="col-6 mx-4">{{this.review.guarantor}}</span>	
							</div>
							<div class="col-6">
								<label class="col-6 fw-bolder">Owner:</label>
								<span class="col-6 mx-4">{{this.review.owner}}</span>
								<label class="col-6 fw-bolder">Province:</label>
								<span class="col-6 mx-4">{{this.review.province}}</span>	
								<label class="col-6 fw-bolder">Business Permit:</label>
								<span class="col-6 mx-4">{{this.review.business_permit}}</span>	
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-6 ">
								<label>CODE NAME *</label>
								<input class="form-control" placeholder="Code Name" v-model="pl.code_name"/>
							</div>
							<div class="col-6 ">
								<label>Domain *</label>
								<select class="form-control" v-model="pl.domain">
									<option>Select Domain</option>
									<option>https://wpclive.test</option>
									<option>https://wpclive.test</option>
								</select>
							</div>

						</div>
					</div>
					<div style="font-size:15px;">
						<table class="table table-responsive custom-style">
							<thead class="bg-light">
								<tr>
									<th>Full Name</th>
									<th>Contact Number</th>
									<th>Role</th>
									<th>Username</th>
									<th style="width: 30% !important;">Password</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="data,index in this.account.list" :key="index">
									<td>{{data.full_name}}</td>
									<td>{{data.contact_number}}</td>
									<td>{{data.role}}</td>
									<td>{{data.username}}</td>
									<td class="text-break" style="width: 30% !important;">{{data.password}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="text-end mt-4">
						<button class="btn btn-info" @click="createAcc()">Complete</button>
						<button class="btn btn-danger mx-2" @click="review_modal = false,return_modal = true">Return</button>
					</div>
				</div>
			</b-modal>
			<b-modal centered v-model="return_modal" title="These remarks will return to Training" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="md">
				<div class="col-12" style="font-size: 20px;">
					<div class="">
						<label>Remarks</label>
						<textarea placeholder="Enter remarks" class="form-control" v-model="pl.remarks"></textarea>
					</div>
					<div class="text-end mt-4">
						<button class="btn btn-info" @click="returnAcc()">Save</button>
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
