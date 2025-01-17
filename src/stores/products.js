import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()
    const storage = useFirebaseStorage()
    const selectedCategory = ref(1)

    const categories = [
        { id: 1, name: 'Video game consoles' },
        { id: 2, name: 'Phones' },
        { id: 3, name: 'Laptops' }
    ]

    const q = query(
        collection(db, 'products'),
        orderBy('availability', 'asc')
    )

    const productsCollection = useCollection(q)

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    async function updateProduct(docRef, product) {
        const { image, url, ...values} = product

        if(image.length) {
            await updateDoc(docRef, {
                ...values, 
                image: url.value
            })
        } else {
            await updateDoc(docRef, values)
        }
    }

    async function deleteProduct(id) {
        if(confirm('Do you want to delete this product?')) {

            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef)
            const { image } = docSnap.data()
            const imageRef = storageRef(storage, image)

            await Promise.all([
                //Deleting the doc passing the doc reference
                deleteDoc(docRef),
                //Deleting the image from storage, passing the image reference
                deleteObject(imageRef)
            ])
        }
    }

    const categoryOptions = computed(() => {
        const options = [
            {label: '---Select---', value: '', attrs: {disabled: true}},
            ...categories.map(category => (
                {label: category.name, value: category.id}
            ))
        ]
        return options
    })

    const noResults = computed(() => productsCollection.value.length === 0)

    const filterProducts = computed(() => {

        return productsCollection.value
            .filter( product => product.category === selectedCategory.value )
            .filter( product => product.availability > 0 )
    })

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        categoryOptions,
        productsCollection,
        categories,
        selectedCategory,
        noResults,
        filterProducts
    }
})