<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/ocbs-list.json"
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
			<div class="col-12 px-4 mt-2">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-12">
									<h5 class="mt-2  text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;FOR APPROVAL</h5>
								</div>
							</div>
						</div>
						<div class="col-12">
							<div class="px-3 mt-2 mb-0">
								<div class="row">
									<div class="col-10 px-4 mt-2" style="float:right !important;">
										<div class="d-flex">
											<div class="d-flex">
												<label class="mt-2" style="width:200px;"><strong>Show entries:</strong></label>
												<select class="mx-2 form-control">
													<option value="10">10</option>
													<option value="25">25</option>
													<option value="50">50</option>
													<option value="-1">All</option>
												</select>
											</div>
											<b-button variant="success mx-1">EXCEL</b-button>
											<b-button variant="success mx-1">PDF</b-button>
											<span class="bg-secondary text-white p-2 mx-5" style="border-radius: 3px;">
												0 Return Queue
											</span>
										</div>
									</div>
									<div class="col-2 px-4 mt-2" style="float:right !important;">
										<div class="d-flex">
											<label class="m-2"><strong>SEARCH:</strong></label>
											<input class="form-control"/>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead class="bg-light text-center">
										<tr>
											<th>CREATED DATE</th>
											<th>REFERENCE</th>
											<th>SALES COORDINATOR</th>
											<th>ADDRESS</th>
											<th>MUNICIPALITY</th>
											<th>OWNER</th>
											<th>GUARANTOR</th>
											<th>STATUS</th>
											<th>REMARKS</th>
											<th>REQUEST</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in data" :key="index">
											<td>02-20-1992</td>
											<td>SAMPLE DATA</td>
											<td>SAMPLE DATA</td>
											<td>SAMPLE DATA</td>
											<td>SAMPLE DATA</td>
											<td>SAMPLE DATA</td>
											<td>SAMPLE DATA</td>
											<td>
												<span v-if="row.status == 1" style="color:#84bbf5;">
													<strong>LEADS</strong>
												</span>
												<span v-else-if="row.status == 2" style="color:#967705;">
													<strong>FIT</strong>
												</span>
												<span v-else-if="row.status == 3" style="color:green;">
													<strong>ACTIVATED</strong>
												</span>
												<span v-else-if="row.status == 4" style="color:#d17166;">
													<strong>CANCELLED</strong>
												</span>
												<span v-else-if="row.status == 5" style="color:#6c757d;">
													<strong>CLOSED</strong>
												</span>
											</td>
											<td>SAMPLE DATA</td>
											<td>SAMPLE DATA</td>
											<td>
												<b-button @click="view(row)" variant="primary" size="sm">REVIEW</b-button>
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
    </Layout>
</template>
<style scoped>
.custom-warning{
	background:#ffc107;
}
.custom-red{
	background: #dc3545;
}
.custom-cyan{
	background: #17a2b8;
}
.custom-success{
	background: #28a745;
}
.custom-danger{
    background: rgb(181, 15, 1);
}
.custom-card{
	height:140px;
	border-radius: 5px;
}
.custom-card-sm{
	height:130px;
	border-radius: 5px;
}
.progress-bar{
	border-bottom: 2px solid white;
}

.pagination > button{
	border:none;
	padding:5px 15px;
	margin-right: 5px;
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
