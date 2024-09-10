<script setup>
    import { RouterLink } from 'vue-router'

    defineProps({
        to: {
            type: String
        }
    })
</script>

<template>
    <RouterLink 
        :to="{name: to}"
        class="rounded bg-sky-400 hover:bg-sky-500 font-bold py-2 px-10 transition-all text-white"
    >
        <slot></slot>
    </RouterLink>
</template>