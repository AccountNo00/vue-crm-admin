<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/account-creation.json"
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
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">FULL NAME:</label>
							<input class="form-control"/>
						</div>
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">USERNAME:</label>
							<input class="form-control"/>
						</div>
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">EMAIL:</label>
							<input class="form-control"/>
						</div>
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">POSITION:</label>
							<select class="form-control">
								<option value="salesm*sales/marketing*SALES MANAGER">SALES MANAGER</option>
								<option value="sales*sales/marketing*SALES COORDINATOR">SALES COORDINATOR</option>
								<option value="finance*finance*FINANCE">FINANCE</option>
								<option value="mis*mis*SIM">SIM</option>
								<option value="trainor*operations*TRAINOR">TRAINOR</option>
								<option value="hd*operations*HELP DESK">HELP DESK</option>
								<option value="inventory*inventory*INVENTORY">INVENTORY</option>
								<option value="account*account*ACCOUNT CREATION">ACCOUNT CREATION</option>
								<option value="tech*v-tech*VIDEO TECH">VIDEO TECH</option>
								<option value="mis*PC Supplier*PC Supplier">PC Supplier</option>
								<option value="tech*C-Band Provider*C-Band Provider">C-Band Provider</option>
								<option value="mis*Technical Department*Technical Department">Technical Department</option>
							</select>
						</div>
						<button class="col-2 btn btn-success" style="float:right !important;">Submit</button>
					</div>
				</div>
			</div>
			<div class="col-8">
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							<h4>Default Password: 123456</h4>
						</div>
					</div>
				</div>
				<div class="col-12">
					<div class="card">
						<div class="custom-danger d-flex p-2" >
							<i class="bx ml-2 bxs-user-plus text-white" style="font-size:30px;"></i>
							<h5 class="m-1 text-white">ACCOUNTS</h5>
						</div>
						<div class="col-12">
							<div class="col-4 p-4" style="float:right !important;">
								<div class="d-flex mb-2">
									<label class="m-2"><strong>SEARCH:</strong></label>
									<input class="form-control"/>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead>
										<tr>
											<th>ID</th>
											<th>FULL NAME</th>
											<th>USERNAME</th>
											<th>DEPARTMENT</th>
											<th>POSOITION</th>
											<th>EMAIL</th>
											<th>EDIT</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in data" :key="index">
											<td>{{ index + 1 }}</td>
											<td>{{row.fullname}}</td>
											<td>{{row.username}}</td>
											<td>{{row.department}}</td>
											<td>{{row.position}}</td>
											<td>{{row.email}}</td>
											<td>
												<b-button variant="info" class="btn-sm">Edit</b-button>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="d-flex">
									<span style="width:90%">Showing 1 to 20 of 220 entries</span>
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
	padding:8px;
	border: 2px solid rgb(239, 242, 247);
	margin:0;
}
.custom-style tr:hover{
	background: rgba(255, 233, 230, 0.213);
}
</style>
