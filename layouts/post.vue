<template>
    <main>
        <Head>
            <title>{{ title }}</title>
            <meta name="description" :content="description" />
            <meta property="og:site_name" content="Blog - Nexos Creation" />
            <meta property="og:title" :content="title" />
            <meta property="og:description" :content="description" />
            <meta property="og:image" :content="thumb_url" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" :content="title" />
            <meta name="twitter:description" :content="description" />
            <meta name="twitter:image" :content="thumb_url" />
        </Head>

        <article>
            <h1>{{ title }}</h1>
            <img width="600" :src="thumb_url" :alt="title" />
            <div>
                <slot />
            </div>
        </article>
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            thumb_url: {
                type: String,
                required: true
            }
        }
    });
</script>

<style scoped>
    /* Add styles specific to the PostLayout component if needed */
</style>