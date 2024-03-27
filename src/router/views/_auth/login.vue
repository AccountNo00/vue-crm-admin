<script>
import Layout from "../../layouts/auth";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
	components: {
		Layout,
	},
	data() {
		return {
			username: "Admin",
			password: "123456",
		};
	},
	computed: {
		...mapGetters("auth", ["profile"]),
	},
	methods: {
		...mapActions("auth", {
			authLogin: "loginUser",
		}),
		async login() {
			if (!this.username) {
				Swal.fire("Failed!", "Please Input Username", "");
				return;
			}
			if (!this.password) {
				Swal.fire("Failed!", "Please Input Password", "");
				return;
			}
			await this.authLogin({
				username: this.username,
				password: this.password,
			});
		},
	},
	mounted() {
	},
};
</script>

<template>
	<Layout>
		<img class="wave" src="../../../assets/images/wave.png">
		<div class="row justify-content-center">
			<div class="login-container">
				<img class="logo" src="../../../assets/images/crm-ss.png">
				<h2 class="title">WELCOME</h2>
				<div class="col-4 mx-auto">
					<div class="row inputs">
						<i class="fas fa-user"></i>
						<input
							class="form-control mb-2 border-red"
							placeholder="Username"
							type="text"
							v-model="username"
							v-on:keyup.enter="login()"
						/>
						<i class="fas fa-lock"></i>
						<input
							class="form-control mb-2 border-red"
							placeholder="Password"
							type="password"
							v-model="password"
							v-on:keyup.enter="login()"
						/>
					</div>
					<button class="btn btn-info w-100 login-btn" @click="login()">
						Login
					</button>
				</div>
			</div>
		</div>
	</Layout>
</template>
<style scoped>
.login-btn{
	display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-color: red;
    opacity: 0.7;
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    margin: 2rem 0;
    padding-top: 10px;
    cursor: pointer;
    transition: .5s;
}
.inputs > i{
	position: relative;
	top: 38px;
	font-size: 22px;
}
.border-red{
    font-size: 25px !important;
	border:none;
    outline: none;
    background: none;
	border-radius: 0;
    padding: 0.5rem 0.7rem;
	padding-left: 50px;
    font-size: 1.2rem;
    color: #555 !important;
    font-family: 'poppins', sans-serif;
    border-bottom: 3px solid red;
}
.title {
    margin: 15px 0;
    color: #333;
    text-transform: uppercase;
    font-size: 2.9rem;
}
.login-container{
	margin-top: 150px;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.logo{
	height: 250px;
}
.wave{
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
}
</style>