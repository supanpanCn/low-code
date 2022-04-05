
function initialData() {
    return {
        barAndMenuInfo: {
            menuWidth: '0px',
            barHeight: '0px',
        },
        tree: {},
        saveActiveSublineId: '',
        shortcutKeyInfo: '',
        dragingElementInfo:{},
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
        saveDragingElementInfo(state, payload) {
            state.dragingElementInfo = payload
        },
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
        saveShortcutKey(state, info) {
            state.shortcutKeyInfo = info
        }
    },
}
