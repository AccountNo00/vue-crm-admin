<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/account-history.json"
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
        };
    },
	methods:{
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
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
			<div class="col-12">
				<div class="col-12">
					<div class="card">
						<div class="p-3 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class=" text-white text-start"><i class="bx bxs-user mt-2 text-white"></i>&nbsp;&nbsp;Activity logs</h5>
								</div>
								<div class="col-6 d-flex">
									<label class="m-2 text-white">FROM</label>
									<input type="date" class="form-control"/>
									<label class="m-2 text-white">TO</label>
									<input type="date" class="form-control"/>
									<b-button variant="dark" class="mx-2">Enter</b-button>
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
											<b-button variant="success mx-1">PRINT</b-button>
											<b-button variant="success mx-1">EXCEL</b-button>
											<b-button variant="success mx-1">PDF</b-button>
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
									<thead>
										<tr>
											<th>DATE</th>
											<th>TIME</th>
											<th>ADMIN NAME</th>
											<th>USERNAME</th>
											<th>FULL NAME</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in data" :key="index">
											<td>{{row.date}}</td>
											<td>{{row.time}}</td>
											<td>{{row.adminname}}</td>
											<td>{{row.username}}</td>
											<td>{{row.fullname}}</td>
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
