<template>
    <div>
        <h1>{{ post.title }}</h1>
        <img :src="ogImageUrl" alt="OG Image" />
        <!-- Rest of your blog post content -->
        <ContentDoc />
    </div>
</template>
<script lang="ts" setup>
    import { useHead } from '#app'
    import { computed } from 'vue'

    const post = {
        title: 'My Awesome Blog Post',
        // other post data
    }

    const ogImageUrl = computed(() => {
        const baseUrl = 'thumbline-generator.vercel.app/api/og-image'
        const params = new URLSearchParams({
            title: post.title,
            bgColor: '#1e293b',
            textColor: '#ffffff',
            logoUrl: 'https://nexoscreation.com/logo.png'
        })
        return `${baseUrl}?${params.toString()}`
    })

    useHead({
        title: post.title,
        meta: [
            { property: 'og:title', content: post.title },
            { property: 'og:image', content: ogImageUrl.value },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:image', content: ogImageUrl.value },
  ],
    })
</script>

<style scoped>
    /* Add styles specific to the Post component if needed */
</style>