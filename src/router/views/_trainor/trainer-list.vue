<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
// import jsonData from "@/assets/json/account-creation.json"
import { mapActions } from "vuex";
import Loader from '../../../components/widgets/loader.vue'
import formatter from "../../../mixins/formatter";
import Swal from "sweetalert2";
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
        Layout,Loader
    },
    data() {
        return {
            title: "Dashboard",
			data: [],
			edit_data:[],
			id: '',
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
			pl:{
				full_name:'',
			},
			filterData:{
				start_date:'',
				end_date:'',
				show_entries: 50,
				search:'',
			},
			edit_modal: false,
			loading: false,
			pages:[true,false,false],
        };
    },
	methods:{
		...mapActions("trainor", {
			getList: "trainerList",
			updateTrainer: "trainerUpdate",
			deleteTrainer: "trainerDelete",
			createTrainer: "trainerCreate",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		getData(data){
			this.edit_data = data
			this.id = data.id
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
		async createData(){
			var pl ={
				full_name: this.pl.full_name,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to add new trainer?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.createTrainer(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Trainer Successfully added`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.edit_modal = false;
					this.initList(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to add new trainer.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async saveEdit(){
			var pl ={
				id: this.id,
				full_name: this.edit_data.full_name,
				status: this.edit_data.status,
				remarks: this.edit_data.remarks,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to save this?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updateTrainer(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Save Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.edit_modal = false;
					this.initList(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to save this update.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async deleteData(){
			var pl ={
				id: this.id,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to delete this?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.deleteTrainer(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Successfully deleted`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
					});
					this.edit_modal = false;
					this.initList(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to delete this data.`,
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
		this.initList(1);
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
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">FULL NAME:</label>
							<input class="form-control" v-model="pl.full_name"/>
						</div>
						<button class="col-2 btn btn-success" style="float:right !important;" @click="createData()">Submit</button>
					</div>
				</div>
			</div>
			<div class="col-8">
				<div class="col-12">
					<div class="card">
						<div class="custom-danger d-flex p-2" >
							<i class="bx ml-2 bxs-user-plus text-white" style="font-size:30px;"></i>
							<h5 class="m-1 text-white">TRAINER</h5>
						</div>
						<div class="col-12">
							<div class="row">
								<div class="col-8 p-4 mt-2" style="float:right !important;">
									<div class="d-flex px-4">
										<b-button variant="success mx-1">PRINT</b-button>
										<b-button variant="success mx-1">EXCEL</b-button>
										<b-button variant="success mx-1">PDF</b-button>
									</div>
								</div>
								<div class="col-4 p-4 mt-2" style="float:right !important;">
									<div class="d-flex">
										<label class="m-2"><strong>SEARCH:</strong></label>
										<input class="form-control" v-model="this.filterData.search" @input="initList(1)"/>
									</div>
								</div>
							</div>
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead>
										<tr>
											<th>ID</th>
											<th>FULL NAME</th>
											<th>STATUS</th>
											<th>REMARKS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{ index + 1 }}</td>
											<td>{{data.full_name}}</td>
											<td>{{data.status}}</td>
											<td>{{data.remarks}}</td>
											<td class="text-center">
												<b-button variant="info" class="btn-sm" @click="getData(data),edit_modal = true">Edit</b-button>
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
			<!-- MODALS -->
			<b-modal centered v-model="edit_modal" title="PENDING" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="lg">
				<div class="col-12 " style="font-size: 20px;">
					<div class="card-body" >
					<div class="col-12 mb-4" >
						<div class="col-12 mb-3">
							<div class="row">
								<div class="col-6">
									<label class="fw-bolder">FULL NAME:</label>
								</div>
								<div class="col-6">
									<input class="form-control" v-model="this.edit_data.full_name"/>
								</div>
							</div>
						</div>
						<div class="col-12 mb-3">
							<div class="row">
								<div class="col-6">
									<label class=" fw-bolder">STATUS:</label>
								</div>
								<div class="col-6">
									<select class="form-control" v-model="this.edit_data.status">
										<option>QUARANTINE</option>
										<option>BET MONITORING SUPPORT</option>
										<option>DEPLOYED</option>
										<option>ICS TRAINING CENTER</option>
										<option>MANILA ARENA</option>
										<option>LEAVE</option>
										<option>OFF SITE</option>
									</select>
								</div>
							</div>
						</div>
						</div>
						<div class="col-12 mb-4">
							<div class="col-12">
								<label style="font-weight: bolder;">Remarks</label>
								<textarea class="form-control" rows="5" v-model="this.edit_data.remarks"></textarea>
							</div>
						</div>
						<div class="text-end">
							<b-button class="mx-1" variant="info" @click="saveEdit()">SAVE</b-button>
							<b-button class="mx-1" variant="danger" @click="deleteData()">DELETE</b-button>
						</div>
					</div>
				</div>
			</b-modal>
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
