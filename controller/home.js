import { menu } from "../utils/menu.js";

const app = new Vue({
    el: "#app",
    data: () => ({
        menu,
        viewName: "主页",
    }),
    methods: {},
    computed: {
        viewComponent() {
            const item = menu.find((item) => item.name === this.viewName);
            return item.component ?? IndexWelcome;
        },
    },
    watch: {
        viewName(value) {
            sessionStorage.setItem("lastView", value)
        }
    },
    mounted() {
        const viewName = sessionStorage.getItem("lastView")
        if (viewName) {
            this.viewName = viewName
        }
    }
});
