export const SakuraSwitch = {
    name: "sakura-switch",
    template: `
        <el-switch v-model="enabled" @change="change"/>
    `,
    data: () => ({
        enabled: JSON.parse(localStorage.getItem("sakura")) ?? true,
    }),
    mounted() {
        if (this.enabled) {
            const scriptElement = document.createElement("script");
            scriptElement.src = `./utils/yinghua.js`;
            scriptElement.async = true;
            scriptElement.defer = true;
            document.body.appendChild(scriptElement);
        }
    },
    methods: {
        change() {
            localStorage.setItem("sakura", String(this.enabled))
            setTimeout(() => location.reload(), 500)
        },
    },
};




