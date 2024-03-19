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
			keyboard_clicked: false,
			mouse_clicked: false,
			monitor_clicked: false,
			system_unit_clicked: false,
			loading:false,
        };
    },
	methods:{
		...mapActions("inventory", {
			pcList: "getPcReportList",
		}),
		changePage(pageNumber) {
            this.pages = this.pages.map((_, index) => index === pageNumber - 1);
        },
		keyboardClicker(){
			if(this.keyboard_clicked == false){
				this.keyboard_clicked = true
			}else{
				this.keyboard_clicked = false
			}
		},
		mouseClicker(){
			if(this.mouse_clicked == false){
				this.mouse_clicked = true
			}else{
				this.mouse_clicked = false
			}
		},
		monitorClicker(){
			if(this.monitor_clicked == false){
				this.monitor_clicked = true
			}else{
				this.monitor_clicked = false
			}
		},
		systemUnitClicker(){
			if(this.system_unit_clicked == false){
				this.system_unit_clicked = true
			}else{
				this.system_unit_clicked = false
			}
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
			const data = await this.pcList(pl);
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
									<h5 class=" text-white mt-2  text-start">&nbsp;&nbsp;PC SUPPLIER</h5>
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
									<thead class="bg-light">
										<tr>
											<th>ENCODED BY</th>
											<th>DATE ENCODED</th>
											<th>REFERENCE</th>
											<th>APPLICATION TYPE</th>
											<th>BUSINESS NAME</th>
											<th>MUNICIPALITY</th>
											<th>TAGGING NUMBER</th>
											<th>ITEMS</th>
											<th>BRAND</th>
											<th>SERIAL NUMBER</th>
											<th>DR NUMBER</th>
											<th>QTY</th>
											<th>QTY PULLOUT</th>
										</tr>
									</thead>
									<tbody>
										<tr class="hover-pointer" @click="keyboardClicker()" style="background: #edfaf8;">
											<th>KEYBOARD</th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th>1</th>
											<th>0</th>
										</tr>
										<tr v-for="data,index in this.data.list" :key="index"  :style="keyboard_clicked == true ? '' : 'display:none'">
											<td v-if="data.item_name == 'keyboard'" >{{data.encoded_by}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.date_encoded}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.id}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.application_type}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.business_name}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.province}}</td>
											<td v-if="data.item_name == 'keyboard'" ></td>
											<td v-if="data.item_name == 'keyboard'" >{{data.item_name}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.brand}}</td>
											<td v-if="data.item_name == 'keyboard'" >{{data.serial_number}}</td>
											<td v-if="data.item_name == 'keyboard'" ></td>
											<td v-if="data.item_name == 'keyboard'" >1</td>
											<td v-if="data.item_name == 'keyboard'" >0</td>
										</tr>
										<tr class="hover-pointer" @click="monitorClicker()" style="background: #edfaf8;">
											<th>MONITOR</th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th>27</th>
											<th>0</th>
										</tr>
										<tr :style="monitor_clicked == true ? '' : 'display:none'">
											<td v-if="data.item_name == 'monitor'" >{{data.encoded_by}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.date_encoded}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.id}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.application_type}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.business_name}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.province}}</td>
											<td v-if="data.item_name == 'monitor'" ></td>
											<td v-if="data.item_name == 'monitor'" >{{data.item_name}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.brand}}</td>
											<td v-if="data.item_name == 'monitor'" >{{data.serial_number}}</td>
											<td v-if="data.item_name == 'monitor'" ></td>
											<td v-if="data.item_name == 'monitor'" >1</td>
											<td v-if="data.item_name == 'monitor'" >0</td>
										</tr>
										<tr class="hover-pointer" @click="mouseClicker()" style="background: #edfaf8;">
											<th>MOUSE</th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th>27</th>
											<th>0</th>
										</tr>
										<tr :style="mouse_clicked == true ? '' : 'display:none'">
											<td v-if="data.item_name == 'mouse'" >{{data.encoded_by}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.date_encoded}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.id}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.application_type}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.business_name}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.province}}</td>
											<td v-if="data.item_name == 'mouse'" ></td>
											<td v-if="data.item_name == 'mouse'" >{{data.item_name}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.brand}}</td>
											<td v-if="data.item_name == 'mouse'" >{{data.serial_number}}</td>
											<td v-if="data.item_name == 'mouse'" ></td>
											<td v-if="data.item_name == 'mouse'" >1</td>
											<td v-if="data.item_name == 'mouse'" >0</td>
										</tr>
										<tr class="hover-pointer" @click="systemUnitClicker()" style="background: #edfaf8;">
											<th>SYSTEM UNIT</th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
											<th>27</th>
											<th>0</th>
										</tr>
										<tr :style="system_unit_clicked == true ? '' : 'display:none'">
											<td v-if="data.item_name == 'system unit'" >{{data.encoded_by}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.date_encoded}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.id}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.application_type}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.business_name}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.province}}</td>
											<td v-if="data.item_name == 'system unit'" ></td>
											<td v-if="data.item_name == 'system unit'" >{{data.item_name}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.brand}}</td>
											<td v-if="data.item_name == 'system unit'" >{{data.serial_number}}</td>
											<td v-if="data.item_name == 'system unit'" ></td>
											<td v-if="data.item_name == 'system unit'" >1</td>
											<td v-if="data.item_name == 'system unit'" >0</td>
										</tr>
										<tr>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none"></td>
											<td style="border:none" class="text-end fw-bold">TOTAL:</td>
											<td class="fw-bold">111</td>
											<td class="fw-bold">0</td>
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
.hover-pointer:hover{
	cursor: pointer;
}
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
