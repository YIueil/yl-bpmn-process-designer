<template>
    <div class="container">
        <a-space class="btn-group">
            <a-button class="" type="primary" @click="createNewDiagram">
                新建
            </a-button>
            <a-dropdown>
                <a-menu slot="overlay" @click="handleExportMenuClick">
                    <a-menu-item key="svg">
                        <a-icon type="fork"/>
                        导出SVG
                    </a-menu-item>
                    <a-menu-item key="xml">
                        <a-icon type="profile"/>
                        导出XML
                    </a-menu-item>
                    <a-menu-item key="zip">
                        <a-icon type="file-zip"/>
                        导出ZIP
                    </a-menu-item>
                </a-menu>
                <a-button type="primary" style="margin-left: 8px">
                    导出
                    <a-icon type="down"/>
                </a-button>
            </a-dropdown>
        </a-space>
        <div class="bpmnCanvas djs-grid" ref="bpmn-canvas"></div>
        <div class="rightTools" ref="right-tools"></div>
    </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import DefaultEmptyXML from '@/const/defaultEmptyXML'
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel'

export default {
    name: 'BpmnCanvas',
    data() {
        return {
            bpmnModeler: null,
            processId: 'newProcessId',
            processName: 'newProcessName'
        }
    },
    methods: {
        init() {
            const canvas = this.$refs['bpmn-canvas']
            const panel = this.$refs['right-tools']
            this.bpmnModeler = new BpmnModeler({
                container: canvas,
                // 开启键盘快捷键
                keyboard: { bindTo: document },
                propertiesPanel: {
                    parent: panel // 右侧边栏挂载的 DomId
                },
                // 添加到扩展模块内
                additionalModules: [
                    BpmnPropertiesPanelModule,
                    BpmnPropertiesProviderModule
                ]
            })
        },
        loadResourceSuccess() {
            console.log('加载成功做点什么, 加事件监听啥的')
            this.addEventBusListener()
        },
        addEventBusListener() {
            const eventBus = this.bpmnModeler.get('eventBus')
            const eventTypes = ['element.click', 'element.changed', 'element.updateLabel', 'element.dblclick']
            eventTypes.forEach(eventType => {
                eventBus.on(eventType, e => {
                    console.log(eventType)
                    if (!e || e.element.type === 'bpmn:Process') return
                    if (eventType === 'element.changed') {
                        console.log('element.changed', e)
                    } else if (eventType === 'element.click') {
                        console.log('点击了element', e)
                    } else if (eventType === 'element.updateLabel') {
                        console.log('element.updateLabel', e.element)
                    } else if (eventType === 'element.dblclick') {
                        console.log('element.dblclick', e.element)
                    }
                })
            })
        },
        async createNewDiagram() {
            // 将字符串转换成图显示出来
            try {
                const { warnings } = await this.bpmnModeler.importXML(DefaultEmptyXML(this.processId, this.processName), err => {
                    if (err) {
                        console.error(err)
                    } else {
                        this.loadResourceSuccess()
                    }
                })
                if (warnings && warnings.length) {
                    warnings.forEach(warn => console.warn(warn))
                }
            } catch (e) {
                console.error(`[Process Designer Warn]: ${e?.message || e}`)
            }
        },
        handleExportMenuClick(e) {
            switch (e.key) {
                case 'svg':
                    this.bpmnModeler.saveSVG((err, svg) => {
                        if (err) {
                            console.error(err)
                        } else {
                            const filename = `${this.processId + '_bpmn20.svg'}`
                            const file = new Blob([svg], { type: 'image/svg+xml' })
                            const a = document.createElement('a')
                            const url = URL.createObjectURL(file)
                            a.href = url
                            a.download = filename
                            document.body.appendChild(a)
                            a.click()
                            setTimeout(() => {
                                document.body.removeChild(a)
                                window.URL.revokeObjectURL(url)
                            }, 0)
                        }
                    })
                    break
                case 'xml':
                    this.bpmnModeler.saveXML((err, xml) => {
                        if (err) {
                            console.error(err)
                        } else {
                            const filename = `${this.processId + '_bpmn20.xml'}`
                            const file = new Blob([xml], { type: 'text/xml' })
                            const a = document.createElement('a')
                            const url = URL.createObjectURL(file)
                            a.href = url
                            a.download = filename
                            document.body.appendChild(a)
                            a.click()
                            setTimeout(() => {
                                document.body.removeChild(a)
                                window.URL.revokeObjectURL(url)
                            }, 0)
                        }
                    })
                    break
                case 'zip':
                    break
            }
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 100vh;

    .btn-group {
        position: absolute;
        padding: 20px;
        left: 0;
        top: 0;
        width: 300px;
        z-index: 9999;
    }

    .bpmnCanvas {
        height: 100vh;

        /deep/ .djs-palette {
            top: 100px;
        }
    }

    .rightTools {
        position: absolute;
        right: 0;
        top: 0;
        width: 300px;
    }
}

.djs-grid {
    background-image: linear-gradient(to right, #ccc 1px, transparent 1px),
    linear-gradient(to bottom, #ccc 1px, transparent 1px);
    background-size: 20px 20px;
}
</style>
