
function initialData() {
    return {
        barAndMenuInfo: {
            menuWidth: '0px',
            barHeight: '0px',
        },
        tree: {},
        saveActiveSublineId: ''
    }
}
export default {
    namespaced: true,
    state: {
        ...initialData()
    },
    actions: {
        // async setActiveSubline({ commit, state }, id) {
        //     const { tree } = state
        //     console.log(tree,id)
        // }
    },
    mutations: {
        saveMenuAndBarElementInfo(state, payload) {
            state.barAndMenuInfo = {
                ...payload
            }
        },
        saveTreeData(state, payload) {
            state.tree = {
                ...payload
            }
        },
        saveActiveSublineId(state, id) {
            state.saveActiveSublineId = id
        },
    },
}
