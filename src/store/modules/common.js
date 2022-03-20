
function initialData() {
    return {
        barAndMenuInfo: {
            menuWidth: 0,
            barHeight: 0,
        }
    }
}
export default {
    namespaced: true,
    state: {
        ...initialData()
    },
    actions: {
        async setCommonData({ commit }, payload) {
            commit('saveMenuAndBarElementInfo', payload)
        }
    },
    mutations: {
        saveMenuAndBarElementInfo(state, payload) {
            state.barAndMenuInfo = {
                ...payload
            }
        },
    },
}
