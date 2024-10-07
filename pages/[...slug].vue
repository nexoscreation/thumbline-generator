<template>
    <div :title="post.title" :description="post.description" :thumb_url="post.thumb_url">
        <ContentDoc />
    </div>
</template>

<script setup lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';

    definePageMeta({
        layout: 'Post'
    })

    export default defineComponent({
        setup() {
            const post = ref({
                title: '',
                description: '',
                content: '',
                thumb_url: ''
            });

            // Use Nuxt's asyncData to fetch data
            const slug = useRoute().params.slug;

            onMounted(async () => {
                await fetchPost(slug as string);
            });

            return {
                post,
            };
        }
    });
</script>

<style scoped>
    /* Add styles specific to the Post component if needed */
</style>