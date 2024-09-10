<script setup>
    import { RouterLink } from 'vue-router';
    import Link from './Link.vue';
    import Logo from './Logo.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute()
</script>

<template>
    <header class="px-10 py-8 bg-slate-600 flex flex-col md:flex-row justify-between items-center absolute top-0 w-full z-10 gap-4">
        <Logo />
        <nav>
            <RouterLink 
                :to="{name: 'products'}"
                class="rounded text-white font-bold p-2 hover:text-gray-200 hover:bg-gray-800 mr-3 transition-all"
                :class="route.name === 'products' ? 'bg-gray-800' : '' "
            >
                Products
            </RouterLink>
            <RouterLink 
                :to="{name: 'sales'}"
                class="rounded text-white font-bold p-2 hover:text-gray-200 hover:bg-gray-800 mr-3 transition-all"
                :class="route.name === 'sales' ? 'bg-gray-800' : '' "
            >
                Sales
            </RouterLink>
            <Link to="shop">
                Go to store
            </Link>
        </nav>
    </header>
</template>