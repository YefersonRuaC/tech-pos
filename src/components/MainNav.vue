<script setup>
    import { useProductsStore } from '@/stores/products';
    import Link from './Link.vue';
    import Logo from './Logo.vue'

    const products = useProductsStore()
</script>

<template>
    <header class="px-10 py-5 bg-slate-600 flex flex-col md:flex-row justify-between absolute top-0 w-full z-10">
        <div>
            <Logo />

            <div class="flex gap-8 text-white">
                <h2 class="text-lg font-extrabold">Filters:</h2>
                <div
                    class="flex items-center gap-2"
                    v-for="category in products.categories"
                    :key="category.id"
                >
                    <input 
                        type="radio" 
                        name="category"
                        :value="category.id"
                        :id="category.id"
                        class="cursor-pointer h-4 w-4 text-sky-300 border-gray-300 focus:ring-isky-200 rounded"
                        :checked="products.selectedCategory === category.id"
                        @change="products.selectedCategory = +$event.target.value"
                    >
                    <label :for="category.id" class="text-gray-100 cursor-pointer">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <nav class="mt-5">
            <Link to="sales">
                Manage
            </Link>
        </nav>
    </header>
</template>