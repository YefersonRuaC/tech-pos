<script setup>
    import { formatCurrency } from '@/helpers';
    import Amount from './Amount.vue';

    defineProps({
        sale: {
            type: Object
        }
    })
</script>

<template>
    <div class="border-t border-gray-200 py-6 space-y-6">
        <p class="text-lg font-black text-gray-500">Sold product</p>

        <ul role="list" class="mt-4 divide-y divide-gray-200 border-t text-sm border-gray-200 font-medium text-gray-500">
            <li
                v-for="item in sale.items"
                class="flex space-x-6 py-3"
            >
                <img 
                    :src="item.image" 
                    :alt="item.name + 'image'"
                    class="h-24 w-24 rounded flex-none"
                />

                <div class="flex-auto space-y-2">
                    <h3 class="text-gray-900">{{ item.name }}</h3>
                    <p>{{ formatCurrency(item.price) }}</p>
                    <p>Quantity: {{ item.quantity }}</p>
                </div>
            </li>
        </ul>

        <dl class="space-y-2 border-t border-gray-300 text-sm pt-3 font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal: </template>
                {{ formatCurrency(sale.subtotal) }}
            </Amount>

            <Amount>
                <template #label>Taxes: </template>
                {{ formatCurrency(sale.taxes) }}
            </Amount>

            <Amount v-if="sale.discount" class="bg-green-200 p-2">
                <template #label>Discount: </template>
                {{ formatCurrency(sale.discount) }}
            </Amount>

            <Amount>
                <template #label>Total paid: </template>
                {{ formatCurrency(sale.total) }}
            </Amount>
        </dl>
    </div>
</template>