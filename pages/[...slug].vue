<template>
    <div :title="post.title" :description="post.description" :thumb_url="post.thumb_url">
        <ContentDoc />
        </div>
</template>

<script lang="ts">


    import { defineComponent, ref, onMounted } from 'vue';

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

<script setup lang="ts">
definePageMeta({
    layout: 'Post'
})

    // Use this section for fetching the static paths for the dynamic route
    import { defineEventHandler } from 'h3';

    export default defineEventHandler(async (event) => {
        const posts = await getAllPosts();
        return posts.map(post => ({ params: { slug: post.slug } }));
    });
</script>

<style scoped>
    /* Add styles specific to the Post component if needed */
</style>