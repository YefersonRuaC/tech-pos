<script setup>
    import { useCouponStore } from '@/stores/coupons'

    const store = useCouponStore()
</script>

<template>
    <p class="mt-5 py-3 font-bold border-t border-gray-300">Do you have a coupon?</p>

    <div class="flex">
        <input 
            type="text"
            placeholder="Enter a coupon"
            class="p-2 bg-white border-gray-300 w-full"
            v-model="store.couponInput"
        />

        <button 
            type="button"
            class="p-3 bg-slate-600 font-bold disabled:opacity-30 text-sky-300"
            @click="store.applyCoupon"
            :disabled="store.isValidCoupon"
        >
            Redeem
        </button>
    </div>
    
    <p class="mt-2 text-center font-bold p-2 text-gray-500">
        {{ store.couponValidationMessage }}
    </p>
</template>