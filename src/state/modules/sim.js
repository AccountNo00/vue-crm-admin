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
	reportList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/pc/report?` + new URLSearchParams(pl).toString(), {
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
	priceList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`inventory/list?` + new URLSearchParams(pl).toString(), {
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
	itemList({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/pc/items?` + new URLSearchParams(pl).toString(), {
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
					if (err) {
						resolve(err);
					}
				});
		});
	},
	requestList({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/pc/queue?` + new URLSearchParams(pl).toString(), {
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
					if (err) {
						resolve(err);
					}
				});
		});
	},
	scheduledList({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/pc/scheduled?` + new URLSearchParams(pl).toString(), {
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
					if (err) {
						resolve(err);
					}
				});
		});
	},
	checkingList({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/pc/for-checking?` + new URLSearchParams(pl).toString(), {
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
					if (err) {
						resolve(err);
					}
				});
		});
	},
	requestScheduleSave({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/pc/scheduled/save`, pl, {
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
	requestScheduleSubmit({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/pc/scheduled/approve`, pl, {
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
	updateChecking({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/pc/for-checking/save`, pl, {
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
	completeChecking({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/pc/approve`, pl, {
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
