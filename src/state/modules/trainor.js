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
	getQueueList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/training/queue?` + new URLSearchParams(pl).toString(), {
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
	getScheduledList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/training/scheduled?` + new URLSearchParams(pl).toString(), {
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
	getPendingList({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/training/pending/queue?` + new URLSearchParams(pl).toString(), {
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
	getReports({ rootGetters, dispatch },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/training/report?` + new URLSearchParams(pl).toString(), {
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
	saveSchedule({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/training/schedule?`+ new URLSearchParams(pl).toString(), {}, {
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
	returnQueueSchedule({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/training/return?`+ new URLSearchParams(pl).toString(), {}, {
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
	pendingQueueSchedule({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/training/pending`,pl, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
						'Content-Type': 'application/json'
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
	completeSchedule({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/training/approve`,pl, {
					headers: {
						Authorization: rootGetters["auth/bearer_token"],
						'Content-Type': 'application/json'
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
	trainerList({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`trainer/show?` + new URLSearchParams(pl).toString(), {
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
	trainerCreate({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`trainer/create`, pl, {
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
	trainerUpdate({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`trainer/update`, pl, {
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
	trainerDelete({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.delete(`trainer/delete?` + new URLSearchParams(pl).toString(), {
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
	traineesList({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.get(`application/training/trainees/show?` + new URLSearchParams(pl).toString(), {
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
	traineeAdd({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/training/add-trainee`, pl, {
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
	traineeUpdate({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.post(`application/training/trainees/update`,pl, {
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
	traineeDelete({ rootGetters },pl) {
		return new Promise(function (resolve) {
			$api
				.delete(`application/training/trainees/delete?` + new URLSearchParams(pl).toString(), {
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
