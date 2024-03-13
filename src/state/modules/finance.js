import $api from "../api";

export const state = {
	data: {
		list: [],
		links: [],
		current_page: 0,
		last_page: 0,
		per_page: 0,
		total: 0,
	},
};

export const actions = {
	queueList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/finance/queue?` + new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	queueReturnedList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/finance/returned/queue?` + new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	financeReport({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/finance/report?` + new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	approveQueue({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/finance/approve?` + new URLSearchParams(pl).toString(),{}, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	returnQueue({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/finance/return?` + new URLSearchParams(pl).toString(),{}, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
};

export const mutations = {
	setData(state, data) {
		state.data.list = data.data;
		state.data.links = data.links;
		state.data.current_page = data.current_page;
		state.data.last_page = data.last_page;
		state.data.per_page = data.per_page;
		state.data.total = data.total;
	},

	clearData(state) {
		state.data.list = [];
		state.data.links = [];
		state.data.current_page = 0;
		state.data.last_page = 0;
		state.data.per_page = 0;
		state.data.total = 0;
	},
};

export const getters = {};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
};
