import Vue from 'vue'
import App from './App.vue'
// ant-design-vue
import '@/core/antDesignVue'
import 'bpmn-js/dist/assets/diagram-js.css' // 左侧工具栏基础样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css' // 节点基础图标
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css' // 节点完整图标
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css' // 节点完整图标
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右侧工具栏样式

Vue.config.productionTip = false
new Vue({
    render: h => h(App)
}).$mount('#app')
