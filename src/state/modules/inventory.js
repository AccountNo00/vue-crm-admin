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
	getPcDashboardList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`inventory/pc?` + new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	getCbandDashboardList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`inventory/cband?` + new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	getPcList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`inventory/report/pc?` + new URLSearchParams(pl).toString(), {
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
	getCbandList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`inventory/report/video?`+ new URLSearchParams(pl).toString(), {
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
	getPriceList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`inventory/list?`+ new URLSearchParams(pl).toString(), {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
					},
				})
				.then(function (res) {
					if (res.status == 200) {
						resolve(res.data.data);
					}
				})
				.catch(function (err) {
					if (err.response.status == 401) {
						dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
					}
				});
		});
	},
	createItem({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`inventory/create?`+ new URLSearchParams(pl).toString(), {}, {
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
					if (err) {
						resolve(err);
					}
				});
		});
	},
	updateItem({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`inventory/update?`+ new URLSearchParams(pl).toString(), {}, {
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
					if (err) {
						resolve(err);
					}
				});
		});
	},
	deleteItem({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.delete(`inventory/delete?`+ new URLSearchParams(pl).toString(), {
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
					if (err) {
						resolve(err);
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
