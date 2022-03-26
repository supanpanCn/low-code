import { watch, computed } from 'vue'
import { useStore } from "vuex";
export default function ({ revocation, history, save,copy,paste }) {
    const store = useStore();
    const shortcutKeyInfo = computed(() => store.state.common.shortcutKeyInfo);
    watch(shortcutKeyInfo, (info) => {
        if (info) {
            const { label } = info || {};
            switch (label) {
                case "撤销":
                    revocation && revocation()
                    break;
                case "历史":
                    history && history()
                    break;
                case "保存":
                    save && save()
                    break;
                case "复制":
                    copy && copy()
                    break;
                case "粘贴":
                    paste && paste()
                    break;
            }
        }
    });
}