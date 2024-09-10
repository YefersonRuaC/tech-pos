<script setup>
    import { storeToRefs } from 'pinia'
    import MainNav from '@/components/MainNav.vue'
    import ProductCard from '@/components/ProductCard.vue'
    import ShoppingCart from '@/components/ShoppingCart.vue'
    import Footer from '@/components/Footer.vue'
    import { useProductsStore } from '@/stores/products'
    import { useCartStore } from '@/stores/cart'

    const products = useProductsStore()
    const cart = useCartStore()
    const { filterProducts, noResults } = storeToRefs(products)
</script>

<template>
    <MainNav />
    <main class="pt-24 lg:flex lg:h-screen lg:overflow-y-hidden">
        <div class="lg:w-2/3 lg:screen lg:overflow-y-scroll pt-20 md:pt-10 pb-10 px-10">
            <p v-if="noResults" class="text-center text-3xl">There aren't results</p>
            
            <div 
                v-else
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
                <ProductCard
                    v-for="product in filterProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>
        <aside 
            class="lg:w-1/3 lg:screen lg:overflow-y-scroll py-6 px-10"
            :class="cart.isCartEmpty ? '' : 'bg-white'"
        >
            <ShoppingCart />
        </aside>
    </main>
    <Footer />
</template>