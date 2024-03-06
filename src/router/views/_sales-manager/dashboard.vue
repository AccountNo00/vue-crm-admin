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
			<div class="d-flex">
				<div class="col-3 p-2">
					<div class="custom-danger custom-card">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">12</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">ACTIVATED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>10</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>5</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-9 p-2">
					<div class="custom-success custom-card">
						<div class="d-flex">
							<div class="col-5">
								<div class="d-flex">
									<div class="p-4 mt-4" >
										<b class="p-3 text-white" style="font-size:30px;">9</b>
									</div>
									<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
										<h4 class="text-white text-center">FIT</h4>
										<span class="text-white font-size-16 mb-1">OCBS: <strong>8</strong></span>
										<span class="progress-bar mt-1 mb-1"></span>
										<span class="text-white font-size-16">ARENA: <strong>1</strong></span>
									</div>
								</div>
							</div>
							<div class="col-3">
								<div class="mt-3">
									<h4 class="text-center text-white" style="display:flex;flex-direction: column;width:100%;">OCBS</h4>
									<div class="d-flex">
										<div class="col-6" style="display:flex;flex-direction: column;">
											<span class=" text-white font-size-16 mb-1">PC : <strong>4</strong></span>
											<span class=" text-white font-size-16 mb-1">CBAND : <strong>3</strong></span>
											<span class=" text-white font-size-16 mb-1">TRAINING : <strong>2</strong></span>
										</div>
										<div class="col-6">
											<span class=" text-white font-size-16 mb-1"># of PC : <strong>16</strong></span>
										</div>
									</div>
								</div>
							</div>
							<div class="col-4">
								<div class="mt-3">
									<h4 class="text-center text-white" style="display:flex;flex-direction: column;width:100%;">ARENA</h4>
									<div class="d-flex">
										<div class="col-6" style="display:flex;flex-direction: column;">
											<span class=" text-white font-size-16 mb-1">PC : <strong>0</strong></span>
											<span class=" text-white font-size-16 mb-1">CBAND : <strong>0</strong></span>
											<span class=" text-white font-size-16 mb-1">TRAINING : <strong>0</strong></span>
										</div>
										<div class="col-6">
											<span class=" text-white font-size-16 mb-1"># of PC : <strong>0</strong></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex">
				<div class="col-3 p-2">
					<div class="custom-cyan custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">12</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">LEADS</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>10</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>5</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-3 p-2">
					<div class="custom-red custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">1</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">DENIED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>1</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>0</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-3 p-2">
					<div class="bg-dark custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">2</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">CLOSED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>2</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>0</strong></span>
							</div>
						</div>
					</div>
				</div>
				<div class="col-3 p-2">
					<div class="custom-warning custom-card-sm">
						<div class="d-flex">
							<div class="p-4 mt-4" >
								<b class="p-3 text-white" style="font-size:30px;">2</b>
							</div>
							<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
								<h4 class="text-white text-center">CANCELLED</h4>
								<span class="text-white font-size-16 mb-1">OCBS: <strong>2</strong></span>
								<span class="progress-bar mt-1 mb-1"></span>
								<span class="text-white font-size-16">ARENA: <strong>0</strong></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="row">
			<div class="col-12 px-4 mt-2">
				<div class="col-12">
					<div class="card">
						<div class="p-2 mb-0 custom-danger">
							<div class="row">
								<div class="col-6">
									<h5 class="mt-2  text-white text-start"><i class="text-white"></i>&nbsp;&nbsp;SUMMARY</h5>
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
									<thead class="bg-light text-center">
										<tr>
											<th>REGION</th>
											<th>PROVINCE</th>
											<th>ACTIVATED</th>
											<th>FIT</th>
											<th>LEAD</th>
											<th>DENIED</th>
											<th>CANCELLED</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in data" :key="index">
											<td>{{row.region}}</td>
											<td>{{row.province}}</td>
											<td>{{row.activated}}</td>
											<td>{{row.fit}}</td>
											<td>{{row.lead}}</td>
											<td>{{row.denied}}</td>
											<td>{{row.cancelled}}</td>
										</tr>
										<tr>
											<td></td>
											<td><strong>TOTAL:</strong></td>
											<td><strong>32</strong></td>
											<td><strong>2</strong></td>
											<td><strong>3</strong></td>
											<td><strong>6</strong></td>
											<td><strong>0</strong></td>
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
