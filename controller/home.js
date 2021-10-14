import { AdminManagement } from "../components/admin-management.js";
import { IndexWelcome } from "../components/index-welcome.js";

const app = new Vue({
    el: "#app",
    components: {
        IndexWelcome,
        AdminManagement,
    },
    data() {
        return {};
    },
    methods: {},
    computed: {},
});
