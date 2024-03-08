import $cookies from "vue-cookies";
import router from "../../router/index";
import $api from "../api";
export const state = {
    token: $cookies.get("token"),
    role: $cookies.get("role"),
}

export const mutations = {
    setToken(state ,data) {
        var token = `${data.token_type} ${data.access_token}`;
        var role = `${data.role}`;
        state.token = token;
        state.role = role;
        $cookies.set("token", token);
        $cookies.set("role", role);
        router.replace({ path: '/' }).catch(() => {});
    },
    destroyAuth(state) {
        // console.log("destroyAuth");
        $cookies.remove("token");
        $cookies.remove("profile");
        state.token = null;
        state.profile.username = null;
        router.replace({ path: "/login" }).catch(() => { });
    },
}

export const getters = {
    authenticated(state) {
        return state.token != null;
    },
    bearer_token(state) {
        return state.token;
    },
    profile(state) {
        return {
            username: state.profile_token,
            id: state.user_token,
            role: state.role,
        };
    },

}

export const actions = {
    loginUser({ rootGetters ,commit}, pl) {
		return new Promise(function (resolve) {
			$api
				.post("login", pl, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
                        commit("setToken", res.data.data);
                        // commit("setProfile", res.data);
						resolve(res);
					}
				})
				.catch(function (err) {
					resolve(err);
				});
		});
	},
    registerUser({ rootGetters, dispatch }, pl) {
		return new Promise(function (resolve) {
			$api
				.post("register", pl, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					console.log(res);
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
					if (err.response.status == 422) {
						resolve(err.response.data);
					}
				});
		});
	},
}
