<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonDataTab1 from "@/assets/json/ticket-tracker-1.json"
// import jsonDataTab2 from "@/assets/json/ticket-tracker-2.json"
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
        Layout,
		Loader
		// Pagination
    },
    data() {
        return {
            title: "Dashboard",
			data: [],
			data_cband: [],
			tTrackerModal: false,
			headerBgVariant: 'dark',
			headerTextVariant: 'light',
			bodyBgVariant: 'light',
			bodyTextVariant: 'dark',
			footerBgVariant: 'warning',
			footerTextVariant: 'dark',
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
			row_data:{
			},
			filterData:{
				start_date:'',
				end_date:'',
				show_entries_pc: 50,
				show_entries_cband: 50,
				search_pc:'',
				search_cband:'',
			},
			tabs: [true, false],
			isCollapsed: false,
			financeCollapsed: false,
			pcSupplierCollapsed: false,
			cBandCollapsed: false,
			trainingCollapsed: false,
			kiosCollapsed: false,
			pages:[true,false,false],
        };
    },
	methods:{
		...mapActions("inventory", {
			getPc: "getPcDashboardList",
			getCband: "getCbandDashboardList",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		tTracker(){
			if(this.tTrackerModal == false){
				this.tTrackerModal = true
			}else{
				this.tTrackerModal = false
			}
		},
		changeTab(tabNumber) {
            this.tabs = this.tabs.map((_, index) => index === tabNumber - 1);
		},
		salesCollapse() {
			if(this.isCollapsed == false){
				this.isCollapsed = true
			}else{
				this.isCollapsed = false
			}
		},
		financeCollapse() {
			if(this.financeCollapsed == false){
				this.financeCollapsed = true
			}else{
				this.financeCollapsed = false
			}
		},
		pcSupplierCollapse() {
			if(this.pcSupplierCollapsed == false){
				this.pcSupplierCollapsed = true
			}else{
				this.pcSupplierCollapsed = false
			}
		},
		cBandCollapse() {
			if(this.cBandCollapsed == false){
				this.cBandCollapsed = true
			}else{
				this.cBandCollapsed = false
			}
		},
		trainingCollapse() {
			if(this.trainingCollapsed == false){
				this.trainingCollapsed = true
			}else{
				this.trainingCollapsed = false
			}
		},
		kiosCollapse() {
			if(this.kiosCollapsed == false){
				this.kiosCollapsed = true
			}else{
				this.kiosCollapsed = false
			}
		},
		async initPc(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_pc,
				order: "desc",
			};
			if(this.filterData.search_pc){
				pl['search'] = this.filterData.search_pc;
			}
			this.loading = true;
			const data = await this.getPc(pl);
			this.loading = false;
			this.data.list = data.data;
		},
		async initCband(p) {
			var pl = {
				page: p,
				limit:this.filterData.show_entries_cband,
				order: "desc",
			};
			if(this.filterData.search_cband){
				pl['search'] = this.filterData.search_cband;
			}
			this.loading = true;
			const data = await this.getCband(pl);
			this.loading = false;
			this.data_cband.list = data.data;
		},
	},
    mounted() {
		this.initPc(1);
		this.initCband(1);
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
			<div class="div-tabs">
				<button :class="`${this.tabs[0] == true ? 'active-tab' : 'inactive-tab'}`"
					@click="changeTab(1)">PC SUPPLIER</button>
				<button :class="`${this.tabs[1] == true ? 'active-tab' : 'inactive-tab'}`"
					@click="changeTab(2)">C-BAND INSTALLER</button>
			</div>
			<div class="col-12 bg bg-white" v-if="this.tabs[0] == true">
				<div class="px-3 mt-2 mb-0">
					<div class="row">
						<div class="col-10 px-4 mt-2" style="float:right !important;">
							<div class="d-flex">
								<div class="d-flex">
									<label class="mt-2" style="width:200px;"><strong>Show entries:</strong></label>
									<select class="mx-2 form-control" v-model="filterData.show_entries_pc" @change="initPc(1)">
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
								<input class="form-control" v-model="filterData.search_pc" @input="initPc(1)"/>
							</div>
						</div>
					</div>
				</div>
				<div class="py-4">
					<div class="table-container">
						<table class="table table-responsive custom-style">
							<thead>
								<tr>
									<th>DATE REQUEST</th>
									<th>REFERENCE</th>
									<th>APPLICATION TYPE</th>
									<th>BUSINESS NAME</th>
									<th>REQUESTED BY</th>
									<th>INSTALLED BY</th>
									<th>PROVIDER</th>
									<th>STATUS</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(data,index) in this.data.list" :key="index">
									<td>{{data.requested_date }}</td>
									<td>{{data.application_id}}</td>
									<td>{{data.application_type}}</td>
									<td>{{data.business_name}}</td>
									<td>{{data.requested_by}}</td>
									<td>{{data.installed_by}}</td>
									<td>{{data.provider}}</td>
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
								</tr>
							</tbody>
						</table>
					</div>
					<div class="d-flex mt-3">
						<span style="width:90%">Showing 1 to 20 of 120 entries</span>
						<div class="d-flex pagination">
							<button :class="`${this.pages[0] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(1)">1</button>
							<button :class="`${this.pages[1] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(2)">2</button>
							<button :class="`${this.pages[2] == true ? 'bg-primary text-white' : 'inactive-page'}`" @click="changePage(3)">3</button>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 bg bg-white" v-if="this.tabs[1] == true">
				<div class="px-3 mt-2 mb-0">
					<div class="row">
						<div class="col-10 px-4 mt-2" style="float:right !important;">
							<div class="d-flex">
								<div class="d-flex">
									<label class="mt-2" style="width:200px;"><strong>Show entries:</strong></label>
									<select class="mx-2 form-control" v-model="filterData.show_entries_cband" @change="initCband(1)">
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
								<input class="form-control" v-model="filterData.search_cband" @input="initCband(1)"/>
							</div>
						</div>
					</div>
				</div>
				<div class="py-4">
					<table class="table table-responsive custom-style">
						<thead>
							<tr>
								<th>DATE REQUEST</th>
								<th>REFERENCE</th>
								<th>APPLICATION TYPE</th>
								<th>BUSINESS NAME</th>
								<th>INSTALLED BY</th>
								<th>PROVIDER</th>
								<th>STATUS</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(data,index) in this.data_cband.list" :key="index">
								<td>{{data.request_date }}</td>
								<td>{{data.application_id}}</td>
								<td>{{data.application_type}}</td>
								<td>{{data.business_name}}</td>
								<td>{{data.installed_by}}</td>
								<td>{{data.provider}}</td>
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
    </Layout>
</template>
<style scoped>
.pagination > button{
	border:none;
	padding:5px 15px;
	margin-right: 5px;
}
.div-tabs{
    background: rgb(181, 15, 1);
	width: 100%;
	height: 44px;
	padding:0;
	margin:0;
}
.active-tab,.inactive-tab{
	margin-top:5px;
	color:black;
	border:none;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	height:100%;
	font-weight: bold;
	padding: 0 20px;
}
.active-tab{
	background:white;
}
.inactive-tab{
	background: transparent;
	color:white;
}
.custom-danger {
    background: #a32c21;
}
.custom-style{
	border: 2px solid rgb(239, 242, 247);
}
.custom-style tr{
	padding:4px;
}
.custom-style th{
	background: rgb(237, 237, 237);
	padding: 25px 7px;
	border-bottom: 2px solid rgb(0, 0, 0);
}
.custom-style td{
	padding:10px;
	margin:0;
	border: 2px solid rgb(239, 242, 247);
}
.custom-style tr:hover{
	background: rgba(255, 233, 230, 0.213);
}
.font-17{
	font-size: 17px;
}
.font-22{
	font-size: 22px;
}
/* MODAL */
.btn-container{
	display:flex;
	flex-direction:column;
}
/* SALES */
.general-modal{
	border: 1px solid rgb(229, 233, 242);
	transition: .5s;
}
</style>
