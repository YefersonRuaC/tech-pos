<script setup>
    import ShoppingCartItem from './ShoppingCartItem.vue'
    import Amount from './Amount.vue'
    import CouponForm from './CouponForm.vue'
    import { useCartStore } from '@/stores/cart'
    import { useCouponStore } from '@/stores/coupons'
    import { formatCurrency } from '@/helpers';

    const cart = useCartStore()

    const coupon = useCouponStore()
</script>

<template>
    <p v-if="cart.isCartEmpty" class="text-xl text-center text-gray-600">Cart is empty</p>

    <div v-else>
        <p class="text-3xl font-bold text-gray-900">Cart items</p>
        <ul role="list" class="mt-3 divide-y divide-gray-300">
            <ShoppingCartItem 
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
            />
        </ul>

        <dl class="space-y-2 border-t border-gray-300 text-sm pt-3 font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal: </template>
                {{ formatCurrency(cart.subtotal) }}
            </Amount>

            <Amount>
                <template #label>Taxes: </template>
                {{ formatCurrency(cart.taxes) }}
            </Amount>

            <Amount v-if="coupon.isValidCoupon">
                <template #label>Discount: </template>
                {{ formatCurrency(coupon.discount) }}
            </Amount>

            <Amount>
                <template #label>Total: </template>
                {{ formatCurrency(cart.total) }}
            </Amount>
        </dl>

        <CouponForm />

        <button
            type="button"
            class="mt-4 w-full bg-green-500 hover:bg-green-600 uppercase text-white p-3 font-bold transition-all"
            @click="cart.checkout"
        >
            Confirm purchase
        </button>
    </div>
</template>