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
        Layout,
		Loader
    },
    data() {
        return {
            title: "Dashboard",
			data: [],
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
			filterData:{
				start_date:'',
				end_date:'',
				show_entries: 50,
				search:'',
			},
			pl:{
				item_name: '',
				category: '',
				price: '',
			},
			update:{
				id: '',
				category: '',
				item_name: '',
				remarks: '',
				price: '',
			},
			loading:false,
			update_modal:false,
        };
    },
	methods:{
		...mapActions("inventory", {
			getList: "getPriceList",
			create: "createItem",
			updateItemProduct: "updateItem",
			deleteItemProduct: "deleteItem",
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
		reset(){
			this.pl.item_name = '';
			this.pl.category = '';
			this.pl.price = '';
		},
		getData(data){
			this.update.id = data.id;
			this.update.category = data.category;
			this.update.item_name = data.item_name;
			this.update.remarks = data.remarks;
			this.update.price = data.price;
		},
		async updateProduct(){
			var pl = {
				id: this.update.id,
				category: this.update.category,
				item_name: this.update.item_name,
				remarks: this.update.remarks,
				price: this.update.price,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to update this ITEM?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.updateItemProduct(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Updating Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
						timer:1000,
					});
					this.reset();
					this.initList(1);
					this.update_modal = false;
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to update this item.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async deleteProduct(){
			var pl = {
				id: this.update.id,
			}
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to delete this ITEM?`,
				type: "warning",
				icon: "warning",
				confirmButtonColor: "#556ee6",
				showCancelButton: true,
				padding: "2em",
			}).then((result) => {
				return result.isConfirmed;
			});
			if (confirmed) {
				const success = await this.deleteItemProduct(pl);
				if (success.status == 200 || success.status == "success") {
					Swal.fire({
						title: "Successful",
						html: `Deleting Successful`,
						icon: "success",
						type: "success",
						showConfirmButton: false,
						timer:1000,
					});
					this.reset();
					this.initList(1);
					this.update_modal = false;
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to delete this item.`,
						type: "error",
						icon: "error",
						confirmButtonColor: "#556ee6",
						padding: "2em",
					});
				}
			}
		},
		async createProduct() {
			var pl = {
				item_name: this.pl.item_name,
				category: this.pl.category,
				price: this.pl.price,
			};
			const confirmed = await Swal.fire({
				title: "Are you sure?",
				html: `You want to create NEW ITEM?`,
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
						timer:1000,
					});
					this.reset();
					this.initList(1);
				} else {
					Swal.fire({
						title: "Failed",
						html: `Failed to create new item.`,
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
							<label class="col-4 mt-2">ITEM NAME:</label>
							<input class="form-control" v-model="pl.item_name"/>
						</div>
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">PC/CBAND:</label>
							<select class="form-control" v-model="pl.category">
								<option value=""></option>
								<option value="1">PC SUPPLIER</option>
								<option value="2">C-BAND PROVIDER</option>
							</select>
						</div>
						<div class="d-flex mb-2">
							<label class="col-4 mt-2">PRICE:</label>
							<input class="form-control" v-model="pl.price"/>
						</div>
						<button class="col-2 btn btn-success" style="float:right !important;" @click="createProduct()">Submit</button>
					</div>
				</div>
			</div>
			<div class="col-8">
				<div class="col-12">
					<div class="card">
						<div class="custom-danger d-flex p-2" >
							<h5 class="m-1 text-white">PRICE LIST</h5>
						</div>
						<div class="col-12">
							<!-- <div class="col-4 p-4" style="float:right !important;">
								<div class="d-flex mb-2">
									<label class="m-2"><strong>SEARCH:</strong></label>
									<input class="form-control"/>
								</div>
							</div> -->
							<div class="p-4">
								<table class="table table-responsive custom-style">
									<thead>
										<tr>
											<th>ITEM</th>
											<th>PRICE</th>
											<th>REMARKS</th>
											<th>ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(data,index) in this.data.list" :key="index">
											<td>{{data.item_name}}</td>
											<td>{{data.price}}</td>
											<td>{{data.remarks}}</td>
											<td class="text-center">
												<b-button variant="info" class="btn-sm" @click="getData(data),update_modal = true">Edit</b-button>
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
			<b-modal centered v-model="update_modal" title="STATUS UPDATE" title-class="text-black font-18 text-white"
				header-class="bg-dark" body-class="p-3" hide-footer @hidden="reset" size="lg">
				<div class="col-12">
					<div class="row p-4" style="font-size: 17px;">
						<div class="col-12">
							<div class="col-6 d-flex">
								<label class="col-12 fw-bolder mb-3">ITEM :</label>
								<input class="col-12 form-control mb-3" v-model="update.item_name"/>
							</div>
							<div class="col-6 d-flex">
								<label class="col-12 fw-bolder mb-3">PRICE :</label>
								<input class="col-12 form-control mb-3" v-model="update.price"/>
							</div>
						</div>
						<div class="col-12">
							<label class="col-6 fw-bolder">REMARKS :</label>
							<textarea class="form-control" placeholder="Enter..." v-model="update.remarks"></textarea>
						</div>
					</div>
					<div class="text-end mt-4">
						<button class="btn btn-info" @click="updateProduct()">Save</button>
						<button class="btn btn-danger mx-2" @click="deleteProduct()">Delete</button>
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
