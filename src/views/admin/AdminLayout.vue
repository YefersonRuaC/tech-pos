<script setup>
    import AdminNav from '@/components/AdminNav.vue'
</script>

<template>
    <AdminNav />
    <div class="pt-28 container mx-auto md:min-h-screen">
        <RouterView />
    </div>
</template>