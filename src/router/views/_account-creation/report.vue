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
			pages:[true,false,false],
			pagesReturn:[true,false,false],
			loading:false,
        };
    },
	methods:{
		...mapActions("accountCreation", {
			getList: "getReportList",
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
			const data = await this.getList(pl);
			this.loading = false;
			this.data.list = data.data;
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;REPORTS</h5>
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
											<th>TYPE</th>
											<th>CODE NAME</th>
											<th>BUSINESS NAME</th>
											<th>OWNER NAME</th>
											<th>GUARANTOR NAME</th>
											<th>CONTACT NUMBER</th>
											<th>PROVINCE</th>
											<th>BUSINESS ADDRESS</th>
											<th>DOMAIN</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{index + 1}}</td>
											<td>{{data.application_type}}</td>
											<td>{{data.account_creation.code_name}}</td>
											<td>{{data.business_name}}</td>
											<td>{{data.person.owner_full_name}}</td>
											<td>{{data.person.guarantor_full_name}}</td>
											<td>{{data.person.contact_contact_number}}</td>
											<td>{{data.location.province}}</td>
											<td>{{data.business_address}}</td>
											<td>{{data.account_creation.domain}}</td>
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
