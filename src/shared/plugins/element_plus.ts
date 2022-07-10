import { ElPopper, ElSelectV2 } from "element-plus";
import { App } from "vue";

const components = [
    ElPopper,
    ElSelectV2
]

export function setupElementPlus(app: App<Element>) {
    components.forEach(c => {
        app.use(c)
    })

}