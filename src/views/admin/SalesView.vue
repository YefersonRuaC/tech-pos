<script setup>
    import { ref }  from 'vue'
    import { useSalesStore } from '@/stores/sales';
    import VueTailwindDatePricker from 'vue-tailwind-datepicker'
    import SaleDetails from '@/components/SaleDetails.vue'
    import { formatCurrency } from '@/helpers';

    const sales = useSalesStore()

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM'
    })
</script>

<template>
    <h1 class="text-4xl font-black mb-6 mt-11 md:mt-4 ml-6">Sales summary</h1>
    <div class="md:flex md:items-start gap-4 px-6">
        <div class="flex flex-col md:w-1/2 lg:w-1/3 bg-white justify-center items-center p-5 rounded">
            <VueTailwindDatePricker 
                as-single
                no-input
                v-model="sales.date"
                :formatter="formatter"
            />

            <div 
                v-if="sales.salesCollection.length" 
                class="flex justify-center items-start my-10 bg-green-100 p-2 rounded"
            >
                <p class="text-right text-xl">
                    Total of the day: <span class="text-green-800 font-black">{{ formatCurrency(sales.totalSalesOfDay) }}</span>
                </p>
            </div>
        </div>
        <div class="md:w-1/2 lg:w-2/3 justify-center space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-16">
            <p
                class="text-center text-lg"
                v-if="sales.isDateSelected"
            >
                Date: <span class="font-black">{{ sales.date }}</span>
            </p>

            <p v-else class="text-center text-lg">Select a date</p>

            <div v-if="sales.salesCollection.length" class="space-y-5">
                <h2 class="text-xl font-black">Sales details:</h2>
                <SaleDetails 
                    v-for="sale in sales.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
            </div>

            <p v-else-if="sales.noSalesDay" class="text-center text-lg text-gray-500">
                No sales on this day
            </p>
        </div>
    </div>
</template>