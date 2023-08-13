<template>
    <div id="app">
        <BpmnCanvas />
    </div>
</template>

<script>
import BpmnCanvas from '@/components/BpmnCanvas'

export default {
    name: 'App',
    components: {
        BpmnCanvas
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
}
</style>
