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
        };
    },
	methods:{
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		changePageReturn(pageNumberReturn) {
            this.pagesReturn = this.pages.map((_, index) => index === pageNumberReturn - 1);
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
										<select class="form-control">
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
										<input class="form-control" placeholder="Business Name"/>
									</div>
									<div class="col-6">
										<label style="font-weight: bolder;">Business Address *</label>
										<input class="form-control"  placeholder="Business Address"/>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Island GRP *</label>
										
										<select class="form-control">
											<option disabled>Select</option>
											<option>LUZON</option>
											<option>VISAYAS</option>
											<option>MINDANAO</option>
										</select>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Region</label>
										<select class="form-control">
											<option disabled>Select</option>
										</select>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Province</label>
										<select class="form-control">
											<option disabled>Select</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-3">
										<label style="font-weight: bolder;">Surveyor *</label>
										<input class="form-control"  placeholder="Surveyor"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Date Surveyed</label>
										<input class="form-control" type="date"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">AREA (in SQM) *</label>
										<input class="form-control"  placeholder="(in SQM)"/>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">GPS (Copy and paste link from google map) *</label>
										<input class="form-control"  placeholder="GPS"/>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="row">
									<div class="col-4">
										<label style="font-weight: bolder;">Owner Full name</label>
										<input class="form-control"  placeholder="Owner"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Owner Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control">
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
										<input class="form-control"  placeholder="Guarantor"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Guarantor Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control">
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
										<input class="form-control"  placeholder="Operator"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Operator Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control">
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
										<input class="form-control"  placeholder="Contact Person"/>
									</div>
									<div class="col-4">
										<label style="font-weight: bolder;">Contact Person Contact Number</label>
										<div class="d-flex">
											<h6 class="contact-label">+63</h6>
											<input class="form-control" placeholder="Contact Number"/>
										</div>
									</div>
									<div class="col-3">
										<label style="font-weight: bolder;">Email</label>
										<input class="form-control" placeholder="Email"/>
									</div>
									<div class="col-1">
										<label style="font-weight: bolder;">PEP</label>
										<select class="form-control">
											<option>YES</option>
											<option>NO</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12 mb-4">
								<div class="col-12">
									<label style="font-weight: bolder;">Remarks (please indicate IATF Protocol)</label>
									<textarea class="form-control" rows="5" placeholder="Enter ..."></textarea>
								</div>
							</div>
							<div>
								<b-button class="mx-1" variant="primary">Approve</b-button>
								<b-button class="mx-1" variant="danger">Deny</b-button>
								<b-button class="mx-1" variant="dark">Back</b-button>
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
