<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/salescoor-tb-dashboard.json"
import { mapActions } from "vuex";
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
			pl:{
				application_type: '',
				business_name: '',
				business_address: '',
				island_group: '',
				region: '',
				province: '',
				surveyor: '',
				date_surveyed: '',
				area: '',
				gps: '',
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
        };
    },
	methods:{
		...mapActions("salesCoor", {
			create: "createApplication",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
        },
		back(){
			this.$router.push({path:'/sales-coor-dashboard'});
		},
		async deny(){
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to DENY CREATION?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				this.reset();
				this.back();
			}
		},
		reset(){
			this.pl.application_type = '';
			this.pl.business_name = '';
			this.pl.business_address = '';
			this.pl.island_group = '';
			this.pl.region = '';
			this.pl.province = '';
			this.pl.surveyor = '';
			this.pl.date_surveyed = '';
			this.pl.area = '';
			this.pl.gps = '';
			this.pl.owner_full_name = '';
			this.pl.owner_contact_number = '';
			this.pl.owner_email = '';
			this.pl.owner_is_pep = '';
			this.pl.guarantor_full_name = '';
			this.pl.guarantor_contact_number = '';
			this.pl.guarantor_email = '';
			this.pl.guarantor_is_pep = '';
			this.pl.operator_full_name = '';
			this.pl.operator_contact_number = '';
			this.pl.operator_email = '';
			this.pl.operator_is_pep = '';
			this.pl.contact_full_name = '';
			this.pl.contact_contact_number = '';
			this.pl.contact_email = '';
			this.pl.contact_is_pep = '';
			this.pl.remarks = '';
		},
		async createNewApplication() {
			var pl = {
				application_type: this.pl.application_type,
				business_name: this.pl.business_name,
				business_address: this.pl.business_address,
				island_group: this.pl.island_group,
				region: this.pl.region,
				province: this.pl.province,
				surveyor: this.pl.surveyor,
				date_surveyed: this.pl.date_surveyed,
				area: this.pl.area,
				gps: this.pl.gps,
				owner_full_name: this.pl.owner_full_name,
				owner_contact_number: this.pl.owner_contact_number,
				owner_email: this.pl.owner_email,
				owner_is_pep: this.pl.owner_is_pep,
				guarantor_full_name: this.pl.guarantor_full_name,
				guarantor_contact_number: this.pl.guarantor_contact_number,
				guarantor_email: this.pl.guarantor_email,
				guarantor_is_pep: this.pl.guarantor_is_pep,
				operator_full_name: this.pl.operator_full_name,
				operator_contact_number: this.pl.operator_contact_number,
				operator_email: this.pl.operator_email,
				operator_is_pep: this.pl.operator_is_pep,
				contact_full_name: this.pl.contact_full_name,
				contact_contact_number: this.pl.contact_contact_number,
				contact_email: this.pl.contact_email,
				contact_is_pep: this.pl.contact_is_pep,
				remarks: this.pl.remarks,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to create NEW APPLICATION?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.create(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Creation Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.initList(1);
					this.reset();
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to create application.`,
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
							<h5 class="mt-2  text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;NEW APPLICATION</h5>
						</div>
					</div>
				</div>
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Application Type *</label>
										<select class="form-control" v-model="pl.application_type">
											<option value="OCBS">OCBS</option>
											<option value="ARENA">ARENA</option>
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
										<input class="form-control" placeholder="Business Name" v-model="pl.business_name"/>
									</div>
									<div class="col-6">
										<label style="font-weight: bolder;">Business Address *</label>
										<input class="form-control"  placeholder="Business Address" v-model="pl.business_address"/>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Island GRP *</label>
										
										<select class="form-control" v-model="pl.island_group">
											<option disabled>Select</option>
											<option value="luzon">LUZON</option>
											<option value="visayas">VISAYAS</option>
											<option value="mindanao">MINDANAO</option>
										</select>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Region</label>
										<select class="form-control" v-model="pl.region">
											<option disabled>Select</option>
											<option value="sample">SAMPLE</option>
										</select>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Province</label>
										<select class="form-control" v-model="pl.province">
											<option disabled>Select</option>
											<option value="sample">SAMPLE</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-3">
										<label style="font-weight: bolder;">Surveyor *</label>
										<input class="form-control"  placeholder="Surveyor" v-model="pl.surveyor"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Date Surveyed</label>
										<input class="form-control" type="date" v-model="pl.date_surveyed"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">AREA (in SQM) *</label>
										<input class="form-control" type="number" placeholder="(in SQM)" v-model="pl.area"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">GPS (Copy and paste link from google map) *</label>
										<input class="form-control"  placeholder="GPS" v-model="pl.gps"/>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Owner Full name</label>
										<input class="form-control"  placeholder="Owner" v-model="pl.owner_full_name"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Owner Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="pl.owner_contact_number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" type="email" placeholder="Email" v-model="pl.owner_email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control" v-model="pl.owner_is_pep">
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
										<input class="form-control"  placeholder="Guarantor" v-model="pl.guarantor_full_name"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Guarantor Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="pl.guarantor_contact_number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" type="email" placeholder="Email" v-model="pl.guarantor_email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control" v-model="pl.guarantor_is_pep">
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
										<input class="form-control"  placeholder="Operator" v-model="pl.operator_full_name"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Operator Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="pl.operator_contact_number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" type="email" placeholder="Email" v-model="pl.operator_email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control" v-model="pl.operator_is_pep">
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
										<input class="form-control"  placeholder="Contact Person" v-model="pl.contact_full_name"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Contact Person Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number" v-model="pl.contact_contact_number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" type="email" placeholder="Email" v-model="pl.contact_email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control" v-model="pl.contact_is_pep">
											<option value="1">YES</option>
											<option value="0">NO</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="col-12">
									<label style="font-weight: bolder;">Remarks (please indicate IATF Protocol)</label>
									<textarea class="form-control" rows="5" placeholder="Enter ..." v-model="pl.remarks"></textarea>
								</div>
							</div>
							<div>
								<b-button class="mx-1" variant="primary" @click="createNewApplication()">Approve</b-button>
								<b-button class="mx-1" variant="danger" @click="deny()">Deny</b-button>
								<b-button class="mx-1" variant="dark" @click="back()">Back</b-button>
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
