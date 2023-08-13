import Vue from 'vue'

Vue.directive('action', (el, binding) => {
    console.log(el, binding)
})
