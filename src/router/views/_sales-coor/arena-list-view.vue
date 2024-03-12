<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/salescoor-tb-dashboard.json"
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
			pagesReturn:[true,false,false],
			edit_toggle: false,
			finance_toggle:false,
        };
    },
	methods:{
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		back(){
			this.$router.push({path:"/arena-list"})
		},
		editToggle(){
			var vm = this;
			if(vm.edit_toggle == false){
				vm.edit_toggle = true;
			}else{
				vm.edit_toggle = false;
			}

		},
		financeToggle(){
			var vm = this;
			if(vm.finance_toggle == false){
				vm.finance_toggle = true;
			}else{
				vm.finance_toggle = false;
			}

		},
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
			<div class="col-12 mt-2">
				<div class="p-2 mb-0 custom-danger">
					<div class="row">
						<div class="col-lg-12">
							<h5 class="mt-2  text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;APPLICATION VIEW</h5>
						</div>
					</div>
				</div>
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							<div class="col-12 mb-0">
								<div class="row">
									<div class="col-sm-4">
										<div class="d-flex">
											<h6 class="col-6"><strong>Application Type :</strong></h6>
											<h6 class="col-6">OCBS</h6>
										</div>
										<div class="d-flex">
											<h6 class="col-6"><strong>Reference Number :</strong></h6>
											<h6 class="col-6">OCBS-10002694</h6>
										</div>
										<div class="d-flex">
											<h6 class="col-6"><strong>Sales Coor :</strong></h6>
											<h6 class="col-6">User S Coor 1</h6>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="d-flex">
											<h6 class="col-6"><strong>Date Approved :</strong></h6>
											<h6 class="col-6">Sept 16, 2023</h6>
										</div>
										<div class="d-flex">
											<h6 class="col-6"><strong>Status :</strong></h6>
											<h6 class="col-6">FIT</h6>
										</div>
										<div class="d-flex">
											<h6 class="col-6"><strong>Operation Status :</strong></h6>
											<h6 class="col-6"></h6>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="d-flex">
											<h6 class="col-6"><strong>Request :</strong></h6>
											<h6 class="col-6"></h6>
										</div>
										<div class="d-flex">
											<h6 class="col-6"><strong>Date Operation :</strong></h6>
											<h6 class="col-6">0000-00-00</h6>
										</div>
									</div>
								</div>
							</div>
							<hr style="height:3px; background-color: #343a40;">
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Application Type *</label>
										<select class="form-control" :disabled="!edit_toggle">
											<option>OCBS</option>
											<option>ARENA</option>
										</select>
									</div>
									<div class="col-4">

									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Reference Number</label>
										<p class="mt-3">OCBS-10002695</p>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-6">
										<label style="font-weight: bolder;">Business Name *</label>
										<input :disabled="!edit_toggle" class="form-control" placeholder="Business Name"/>
									</div>
									<div class="col-6">
										<label style="font-weight: bolder;">Business Address *</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="Business Address"/>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Island GRP *</label>
										
										<select class="form-control" :disabled="!edit_toggle">
											<option disabled>Select</option>
											<option>LUZON</option>
											<option>VISAYAS</option>
											<option>MINDANAO</option>
										</select>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Region</label>
										<select class="form-control" :disabled="!edit_toggle">
											<option disabled>Select</option>
										</select>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Province</label>
										<select class="form-control" :disabled="!edit_toggle">
											<option disabled>Select</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-3">
										<label style="font-weight: bolder;">Surveyor *</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="Surveyor"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Date Surveyed</label>
										<input :disabled="!edit_toggle" class="form-control" type="date"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">AREA (in SQM) *</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="(in SQM)"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">GPS (Copy and paste link from google map) *</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="GPS"/>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Owner Full name</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="Owner"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Owner Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input :disabled="!edit_toggle" class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input :disabled="!edit_toggle" class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select :disabled="!edit_toggle" class="form-control">
											<option>YES</option>
											<option>NO</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Guarantor Full name</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="Guarantor"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Guarantor Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input :disabled="!edit_toggle" class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input :disabled="!edit_toggle" class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select :disabled="!edit_toggle" class="form-control">
											<option>YES</option>
											<option>NO</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Operator Full name</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="Operator"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Operator Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input :disabled="!edit_toggle" class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input :disabled="!edit_toggle" class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select :disabled="!edit_toggle" class="form-control">
											<option>YES</option>
											<option>NO</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Contact Person Full name</label>
										<input :disabled="!edit_toggle" class="form-control"  placeholder="Contact Person"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Contact Person Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input :disabled="!edit_toggle" class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input :disabled="!edit_toggle" class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select :disabled="!edit_toggle" class="form-control">
											<option>YES</option>
											<option>NO</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="col-12">
									<label style="font-weight: bolder;">Remarks (please indicate IATF Protocol)</label>
									<textarea :disabled="!edit_toggle" class="form-control" rows="5" placeholder="Enter ..."></textarea>
								</div>
							</div>
							<div class="p-0 mb-0 custom-danger">
								<div class="row">
									<div class="col-12">
										<h5 class="mt-2 text-white text-center"><i class="text-white"></i>&nbsp;&nbsp;Bank Details</h5>
									</div>
								</div>
							</div>
							<div class="card">
								<div class="card-body">
									<div class="col-12">
										<div class="row">
											<h6 class="col-2 mt-1"><strong>Bank Name & Branch</strong></h6>
											<h6 class="col-2 mt-1"><strong>Account Name</strong></h6>
											<h6 class="col-2 mt-1"><strong>Account Number</strong></h6>
											<h6 class="col-2 mt-1"><strong>Account Type</strong></h6>
											<h6 class="col-2 mt-1"><strong>Owner</strong></h6>
											<span class="col-2" >
												<b-button class="m-0" variant="dark" size="sm">Add</b-button>
											</span>
										</div>
									</div>
									<div class="col-12">
										<b-button class="mx-1" v-if="edit_toggle == false" @click="editToggle()" variant="dark" size="md" style="float:right !important;">Edit</b-button>
										<b-button class="mx-1" v-if="edit_toggle == true" @click="save()" variant="warning" size="md" style="float:right !important;">Save</b-button>
										<b-button class="mx-1" v-if="edit_toggle == true" @click="editToggle()" variant="dark" size="md" style="float:right !important;">Cancel</b-button>
									</div>
								</div>
							</div>
							<div class="col-12">
								<div class="row">
									<div class="col-6">
										<div class="p-2 mb-0 custom-danger">
											<div class="row">
												<div class="col-12">
													<h5 class="mt-2 text-white text-start"><i class="bx bxs-report text-white"></i>&nbsp;&nbsp;Logs</h5>
												</div>
											</div>
										</div>
										<div class="card">
											<div class="p-2 mx-2 mt-2">
												<b-button @click="financeToggle()" class="col-12 text-start custom-danger rounded-0 font-size-18 bx bx-credit-card p-3"><strong class="mx-2">FINANCE</strong></b-button>
												<div class="col-12 mb-0 p-3" :hidden="!finance_toggle" style="border:1px solid rgba(128, 128, 128, 0.295);">
													<div class="row">
														<div class="col-6">
															<h6><strong>Date:</strong> Sep 14, 2023</h6>
															<h6><strong>Name:</strong> User Finance</h6>
															<h6><strong>Status:</strong> Approved</h6>
														</div>
														<div class="col-6">
															<h6><strong>Remarks:</strong></h6>
														</div>
													</div>
												</div>
											</div>
											<div class="p-2 mx-2">
												<b-button @click="financeToggle()" class="col-12 text-start custom-danger rounded-0 font-size-18 bx bx-credit-card p-3"><strong class="mx-2">PC SUPPLIER</strong></b-button>
												<div class="col-12 mb-0 p-3" :hidden="!finance_toggle" style="border:1px solid rgba(128, 128, 128, 0.295);">
													<div class="row">
														<div class="col-6">
															<h6><strong>Date:</strong> Sep 14, 2023</h6>
															<h6><strong>Name:</strong> User Finance</h6>
															<h6><strong>Status:</strong> Approved</h6>
														</div>
														<div class="col-6">
															<h6><strong>Remarks:</strong></h6>
														</div>
													</div>
												</div>
											</div>
											<div class="p-2 mx-2">
												<b-button @click="financeToggle()" class="col-12 text-start custom-danger rounded-0 font-size-18 bx bx-credit-card p-3"><strong class="mx-2">C-BAND INSTALLER</strong></b-button>
												<div class="col-12 mb-0 p-3" :hidden="!finance_toggle" style="border:1px solid rgba(128, 128, 128, 0.295);">
													<div class="row">
														<div class="col-6">
															<h6><strong>Date:</strong> Sep 14, 2023</h6>
															<h6><strong>Name:</strong> User Finance</h6>
															<h6><strong>Status:</strong> Approved</h6>
														</div>
														<div class="col-6">
															<h6><strong>Remarks:</strong></h6>
														</div>
													</div>
												</div>
											</div>
											<div class="p-2 mx-2">
												<b-button @click="financeToggle()" class="col-12 text-start custom-danger rounded-0 font-size-18 bx bx-credit-card p-3"><strong class="mx-2">TRAINING</strong></b-button>
												<div class="col-12 mb-0 p-3" :hidden="!finance_toggle" style="border:1px solid rgba(128, 128, 128, 0.295);">
													<div class="row">
														<div class="col-6">
															<h6><strong>Date:</strong> Sep 14, 2023</h6>
															<h6><strong>Name:</strong> User Finance</h6>
															<h6><strong>Status:</strong> Approved</h6>
														</div>
														<div class="col-6">
															<h6><strong>Remarks:</strong></h6>
														</div>
													</div>
												</div>
											</div>
											<div class="p-2 mx-2">
												<b-button @click="financeToggle()" class="col-12 text-start custom-danger rounded-0 font-size-18 bx bx-credit-card p-3"><strong class="mx-2">ACCOUNT CREATION</strong></b-button>
												<div class="col-12 mb-0 p-3" :hidden="!finance_toggle" style="border:1px solid rgba(128, 128, 128, 0.295);">
													<div class="row">
														<div class="col-6">
															<h6><strong>Date:</strong> Sep 14, 2023</h6>
															<h6><strong>Name:</strong> User Finance</h6>
															<h6><strong>Status:</strong> Approved</h6>
														</div>
														<div class="col-6">
															<h6><strong>Remarks:</strong></h6>
														</div>
													</div>
												</div>
											</div>
											<div class="p-2 mx-2">
												<b-button @click="financeToggle()" class="col-12 text-start custom-danger rounded-0 font-size-18 bx bx-credit-card p-3"><strong class="mx-2">SALES MANAGER</strong></b-button>
												<div class="col-12 mb-0 p-3" :hidden="!finance_toggle" style="border:1px solid rgba(128, 128, 128, 0.295);">
													<div class="row">
														<div class="col-6">
															<h6><strong>Date:</strong> Sep 14, 2023</h6>
															<h6><strong>Name:</strong> User Finance</h6>
															<h6><strong>Status:</strong> Approved</h6>
														</div>
														<div class="col-6">
															<h6><strong>Remarks:</strong></h6>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-6">
										<div class="p-2 mb-0 custom-danger">
											<div class="row">
												<div class="col-12">
													<h5 class="mt-2 text-white text-start"><i class="bx bx-images text-white"></i>&nbsp;&nbsp;Requirements</h5>
												</div>
											</div>
										</div>
										<div class="card">
											<div class="card-body">
												<div class="col-12">
													<b-button class="custom-danger"></b-button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<b-button class="mx-1" variant="primary">Approve</b-button>
								<b-button class="mx-1" variant="danger">Deny</b-button>
								<b-button class="mx-1" @click="back()" variant="dark">Back</b-button>
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

.custom-danger{
    background: rgb(181, 15, 1);
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
