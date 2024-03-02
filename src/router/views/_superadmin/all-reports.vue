<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import jsonData from "@/assets/json/department-3rdparty.json"
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
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="bg-danger d-flex p-2" >
							<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
							<h5 class="m-1 text-white">SALES</h5>
						</div>
						<div class="col-12 border-style ">
							<div class="d-flex px-4 pt-4">
								<div class="col-lg-3 p-2">
									<div class="report-card d-flex">
										<div class="p-4 mt-4" >
											<b class="p-3" style="font-size:30px;">12</b>
										</div>
										<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
											<h4>ACTIVATED</h4>
											<span class="font-size-16 mb-1">OCBS: <strong>10</strong></span>
											<div class="progress-bar mb-1"></div>
											<span class="font-size-16">ARENA: <strong>5</strong></span>
										</div>
									</div>
								</div>
								<div class="col-lg-9 p-2 ">
									<div class="report-card d-flex">
										<div class="col-6 d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">12</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>ACTIVATED</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>10</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>5</strong></span>
											</div>
										</div>
										<div class="col-3">
											<div class="mt-3">
												<h4 class="text-center" style="display:flex;flex-direction: column;width:100%;">OCBS</h4>
												<div class="d-flex">
													<div class="col-6" style="display:flex;flex-direction: column;">
														<span class="font-size-16 mb-1">PC : <strong>4</strong></span>
														<span class="font-size-16 mb-1">CBAND : <strong>3</strong></span>
														<span class="font-size-16 mb-1">TRAINING : <strong>2</strong></span>
													</div>
													<div class="col-6">
														<span class="font-size-16 mb-1"># of PC : <strong>16</strong></span>
													</div>
												</div>
											</div>
										</div>
										<div class="col-3">
											<div class="mt-3">
												<h4 class="text-center" style="display:flex;flex-direction: column;width:100%;">ARENA</h4>
												<div class="d-flex">
													<div class="col-6" style="display:flex;flex-direction: column;">
														<span class="font-size-16 mb-1">PC : <strong>0</strong></span>
														<span class="font-size-16 mb-1">CBAND : <strong>0</strong></span>
														<span class="font-size-16 mb-1">TRAINING : <strong>0</strong></span>
													</div>
													<div class="col-6">
														<span class="font-size-16 mb-1"># of PC : <strong>0</strong></span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="d-flex px-4 pb-4">
								<div class="col-12 d-flex">
									<div class="col-lg-3 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">6</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>LEADS</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>6</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>5</strong></span>
											</div>
										</div>
									</div>
									<div class="col-lg-3 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">1</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>DENIED</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>1</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>0</strong></span>
											</div>
										</div>
									</div>
									<div class="col-lg-3 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">2</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>CLOSED</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>2</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>0</strong></span>
											</div>
										</div>
									</div>
									<div class="col-lg-3 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">2</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>CANCELLED</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>2</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>0</strong></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- FINANCE -->
						<div class="bg-info d-flex p-2 mt-4" >
							<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
							<h5 class="m-1 text-white">FINANCE</h5>
						</div>
						<div class="col-12 border-style ">
							<div class="d-flex px-4 pb-4 pt-2">
								<div class="col-12 d-flex">
									<div class="col-lg-4 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">1</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>QUEUE (new)</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>1</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>0</strong></span>
											</div>
										</div>
									</div>
									<div class="col-lg-4 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">0</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>RETURN</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>0</strong></span>
											</div>
										</div>
									</div>
									<div class="col-lg-4 p-2">
										<div class="report-card d-flex">
											<div class="p-4 mt-4" >
												<b class="p-3" style="font-size:30px;">3</b>
											</div>
											<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
												<h4>COMPLETED</h4>
												<span class="font-size-16 mb-1">OCBS: <strong>21</strong></span>
												<div class="progress-bar mb-1"></div>
												<span class="font-size-16">ARENA: <strong>3</strong></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-6">
								<!-- PC SUPPLIER -->
								<div class="col-12">
									<div class="d-flex p-2 mt-4 " style="background-color:#f0a52e;">
										<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
										<h5 class="m-1 text-white">PC SUPPLIER</h5>
									</div>
									<div class="px-4 pb-4 pt-2 border-style" style="display:grid;grid-template-columns: repeat(2,4fr);">
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">2</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>NEW REQUEST</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>1</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">1</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>SCHEDULED</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>1</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>0</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>PENDING</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>0</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">20</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>COMPLETED</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>18</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- TRAINING -->
								<div class="col-12">
									<div class="d-flex p-2 mt-4 " style="background-color:#e8722e">
										<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
										<h5 class="m-1 text-white">TRAINING</h5>
									</div>
									<div class="px-4 pb-4 pt-2 border-style" style="display:grid;grid-template-columns: repeat(2,4fr);">
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>NEW REQUEST</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>SCHEDULED</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>PENDING</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>0</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">1</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>COMPLETED</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>20</strong></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-6">
								<!-- C-BAND PROVIDER -->
								<div class="col-12">
									<div class="d-flex p-2 mt-4 " style="background-color:#42c6ed">
										<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
										<h5 class="m-1 text-white">C-BAND PROVIDER</h5>
									</div>
									<div class="px-4 pb-4 pt-2 border-style" style="display:grid;grid-template-columns: repeat(2,4fr);">
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">2</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>NEW REQUEST</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>1</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">1</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>SCHEDULED</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>1</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>0</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>PENDING</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>0</strong></span>
												</div>
											</div>
										</div>
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">20</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>COMPLETED</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>18</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- NEW REQUEST -->
								<div class="col-12">
									<div class="d-flex p-2 mt-4 " style="background-color:#B50F01">
										<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
										<h5 class="m-1 text-white"> SALES MANAGER</h5>
									</div>
									<div class="px-4 pb-4 pt-2 border-style" style="display:grid;grid-template-columns: repeat(2,4fr);">
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>NEW REQUEST</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-6">
								<!-- TRAINING -->
								<div class="col-12">
									<div class="bg-dark d-flex p-2 mt-4 " >
										<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
										<h5 class="m-1 text-white">HELP DESK</h5>
									</div>
									<div class="px-4 pb-4 pt-2 border-style">
										<div class="p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-3" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h4>NEW REQUEST</h4>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-6">
								<!-- NEW REQUEST -->
								<div class="col-12">
									<div class="d-flex p-2 mt-4 " style="background-color:#28a745">
										<i class="bx ml-2 bx bxs-pie-chart-alt-2 text-white" style="font-size:30px;"></i>
										<h5 class="m-1 text-white"> KIOSK</h5>
									</div>
									<div class="d-flex px-2 pb-4 pt-2 border-style">
										<div class="col-4 p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-1" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h5>NEW REQUEST</h5>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
										<div class="col-4 p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-1" style="font-size:30px;">0</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h5>RETURN</h5>
													<span class="font-size-16 mb-1">OCBS: <strong>0</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>1</strong></span>
												</div>
											</div>
										</div>
										<div class="col-4 p-2">
											<div class="report-card d-flex">
												<div class="p-4 mt-4" >
													<b class="p-1" style="font-size:30px;">20</b>
												</div>
												<div class="p-4" style="display:flex;flex-direction: column;width:100%;">
													<h5>COMPLETED</h5>
													<span class="font-size-16 mb-1">OCBS: <strong>14</strong></span>
													<div class="progress-bar mb-1"></div>
													<span class="font-size-16">ARENA: <strong>6</strong></span>
												</div>
											</div>
										</div>
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
.progress-bar{
	width: 100%;
    background-color: #1e9afe;
	height: 2px;
}
.border-style{
	border:1px solid #e7e7e7;
}
.report-card{
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.125), 0 1px 3px rgba(0, 0, 0, 0.2);
	height:140px;
	border-radius:20px;
}
.custom-danger {
    background: rgb(181, 15, 1);
}
</style>
