<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import Loader from '../../../components/widgets/loader.vue'
import { mapActions } from "vuex";
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
        };
    },
	methods:{
		...mapActions("finance", {
			getList: "financeReport",
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
			this.data.list = data.data.data;
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;FINANCE REPORT</h5>
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
							<div class="p-4 table-div">
								<table class="table table-responsive custom-style" >
									<thead class="bg-light">
										<tr>
											<th>TYPE</th>
											<th>APPROVED BY</th>
											<th>APPROVED DATE/TIME</th>
											<th>SALES REMARKS</th>
											<th>BUSINESS NAME</th>
											<th>ADDRESS</th>
											<th>ISLAND</th>
											<th>REGION</th>
											<th>PROVINCE</th>
											<th>OPERATOR NAME</th>
											<th>OPERATOR CONTACT NUMBER</th>
											<th>OPERATOR EMAIL</th>
											<th>PEP(YES/NO)</th>
											<th>GUARANTOR</th>
											<th>GUARANTOR CONTACT</th>
											<th>GUARANTOR EMAIL</th>
											<th>PEP(YES/NO)</th>
											<th>BANK</th>
											<th>ACCOUNT NAME</th>
											<th>ACCOUNT NUMBER</th>
											<th>DEPOSIT VERIFIED BY</th>
											<th>DEPOSIT VERIFICATION REMARKS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{data.application_type}}</td>
											<td>{{data.approved_by}}</td>
											<td>{{data.approved_date}}</td>
											<td>{{data.remarks}}</td>
											<td>{{data.business_name}}</td>
											<td>{{data.business_address}}</td>
											<td>{{data.location.island_grp }}</td>
											<td>{{data.location.region}}</td>
											<td>{{data.location.province}}</td>
											<td>{{data.person.operator_full_name}}</td>
											<td>{{data.person.operator_contact_number}}</td>
											<td>{{data.person.operator_email}}</td>
											<td>
												<span v-if="data.person.operator_is_pep == 0" >
													<strong>NO</strong>
												</span>
												<span v-else-if="data.person.operator_is_pep == 1">
													<strong>YES</strong>
												</span>
											</td>
											<td>{{data.person.guarantor_full_name}}</td>
											<td>{{data.person.guarantor_contact_number}}</td>
											<td>{{data.person.guarantor_email}}</td>
											<td>
												<span v-if="data.person.guarantor_is_pep == 0" >
													<strong>NO</strong>
												</span>
												<span v-else-if="data.person.guarantor_is_pep == 1">
													<strong>YES</strong>
												</span>
											</td>
											<td>{{data.bank.account_name}}</td>
											<td>{{data.bank.account_number}}</td>
											<td>{{data.bank.account_name}}</td>
											<td>{{}}</td>
											<td>{{}}</td>
											<td>{{}}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="d-flex p-3">
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
	width: 4000px;
}
.table-div{
	width: 100%;
	overflow-x: scroll;
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
