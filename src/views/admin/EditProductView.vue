<script setup>
    import { watch, reactive } from 'vue'
    import { useRoute, useRouter  } from 'vue-router'
    import {  doc  } from 'firebase/firestore'
    import { useFirestore, useDocument } from 'vuefire'
    import Link from '@/components/Link.vue';
    import { useProductsStore } from '@/stores/products';
    import useImage from '@/composables/useImage'

    const route = useRoute()
    const router = useRouter()
    const db = useFirestore()
    const docRef = doc(db, 'products', route.params.id)
    const product = useDocument(docRef)

    const { onFileChange, url, isImageUploaded } = useImage()

    const products = useProductsStore()

    const formData = reactive({
        name: '',
        category: '',
        price: '',
        availability: '',
        image: ''
    })

    watch(product, (product) => {
        if(!product) {
            router.push({name: 'products'})
        }

        formData.name = product.name
        formData.price = product.price
        formData.category = product.category
        formData.availability = product.availability
        formData.image = product.image
    })

    const submitHandler = async(data) => {
        try {
            await products.updateProduct(docRef, {...data, url})
            router.push({name: 'products'})

        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <div class="mt-16 md:mt-5 px-10 md:px-24 pb-10">
        <Link
            to="products"
        >
            Return
        </Link>
        <h1 class="text-4xl my-5 font-extrabold">Edit product</h1>

        <div class="flex justify-center bg-white shadow rounded">
            <div class="mt-5 px-5 md:pt-0 pb-5 md:px-0 w-full xl:w-2/4">
                <FormKit
                    type="form"
                    @submit="submitHandler"
                    :value="formData"
                    :actions="false"
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
                        type="select"
                        label="Category"
                        name="category"
                        validation="required"
                        v-model.number="formData.category"
                        :options="products.categoryOptions"
                    />

                    <FormKit
                        type="number"
                        label="Price"
                        name="price"
                        placeholder="Product price"
                        step="1"
                        min="1"
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        label="Availability"
                        name="availability"
                        placeholder="Quantity available"
                        v-model.number="formData.availability"
                        step="1"
                        min="0"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">New image:</p>
                        <img    
                        :src="url"
                        alt="Product new image" 
                        class="w-52"
                        />  
                    </div>

                    <div v-else>
                        <p class="font-black">Current image:</p>
                        <img  
                        :src="formData.image"
                        :alt="formData.image + ' image'" 
                        class="w-52"
                        />  
                    </div>
                    

                    <FormKit
                        type="file"
                        label="Change image"
                        name="image"
                        multiple="false"
                        accept=".jpg"
                        @change="onFileChange"
                    />


                    <FormKit type="submit">Save changes</FormKit>

                </FormKit>
            </div>
        </div>
    </div>
</template>