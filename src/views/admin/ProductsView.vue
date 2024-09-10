<script setup>
    import Link from '@/components/Link.vue'
    import Product from '@/components/Product.vue'
    import { useProductsStore } from '@/stores/products'

    const products = useProductsStore()
</script>

<template>
    <div class="mb-10 pb-10 mt-16 md:mt-5 px-8">
        <Link to="new-product">
            New product
        </Link>

        <h1 class="text-4xl font-black my-5">Products</h1>
        <p v-if="products.noResults">There aren't results</p>
        <ul 
            v-else
            role="list"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
            <Product 
                v-for="product in products.productsCollection"
                :key="product.id"
                :product="product"
            />
        </ul>
    </div>
</template>