<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import Link from '@/components/Link.vue'
    import useImage from '@/composables/useImage'
    import { useProductsStore } from '@/stores/products'

    const { url, onFileChange, isImageUploaded } = useImage()
    const products = useProductsStore()
    const router = useRouter()

    const formData = reactive({
        name: '',
        category: '',
        price: '',
        availability: '',
        image: ''
    })

    const submitHandler = async (data) => {
        
        const { image, ...values } = data
        try {
            await products.createProduct({
                ...values,
                image: url.value
            })

            router.push({name: 'products'})

        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <div class="mt-16 md:mt-5 px-10 md:px-24 pb-10">
        <Link to="products">
            Return
        </Link>

        <h1 class="text-4xl font-black my-5">New product</h1>

        <div class="flex justify-center bg-white shadow rounded">
            <div class="mt-5 px-5 md:pt-0 pb-5 md:px-0 w-full xl:w-2/4">
                <FormKit
                    type="form"
                    submit-label="Add product"
                    @submit="submitHandler"
                    :value="formData"
                >
                    <FormKit 
                        type="text"
                        label="Name"
                        name="name"
                        placeholder="Product name"
                        validation="required"
                        v-model.trim="formData.name"
                    />
                    
                    <FormKit 
                        type="file"
                        label="Product image"
                        name="image"
                        validation="required"
                        accept=".jpg"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Product Image:</p>
                        <img 
                            :src="url" 
                            alt="Product new image"
                            class="w-40"
                        >
                    </div>

                    <FormKit 
                        type="select"
                        label="Category"
                        name="category"
                        validation="required"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"
                    />

                    <FormKit 
                        type="number"
                        label="Price"
                        name="price"
                        placeholder="Product price"
                        validation="required"
                        min="1"
                        v-model.number="formData.price"
                    />

                    <FormKit 
                        type="text"
                        label="Availability"
                        name="availability"
                        placeholder="Quantity available"
                        validation="required"
                        min="1"
                        v-model.number="formData.availability"
                    />
                </FormKit>
            </div>
        </div>
    </div>
</template>