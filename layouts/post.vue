<template>

    <Head>
        <title>{{ document.title }}</title>
        <meta name="description" :content="document.description" />
        <meta property="og:site_name" content="Blog - Nexos Creation" />
        <meta property="og:title" :content="document.title" />
        <meta property="og:description" :content="document.description" />
        <meta property="og:image" :content="document.thumb_url" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="document.title" />
        <meta name="twitter:description" :content="document.description" />
        <meta name="twitter:image" :content="document.thumb_url" />
    </Head>

    <header>
        <nav class="nav-bar">
            <h1>Serverless Thumbnail Generator</h1>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/editor-v1">Editor</NuxtLink>
            <NuxtLink to="/og-image-api">Documentation</NuxtLink>
        </nav>
    </header>

    <main>
        <article>
            <h1>{{ document.title }}</h1>
            <img width="600" :src="document.thumb_url" :alt="document.title" />
            <div v-html="document.body">
                <!-- Render body content from the content file -->
            </div>
        </article>
    </main>

    <footer>
        <p>
            Built with ❤️ by Nexos Creation. View the full source on
            <a href="https://github.com/nexoscreation/thumbline-generator" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
    </footer>
</template>

<style scoped>
    /* Scoped styles for the layout */
    header {
        background-color: var(--foreground);
        padding: 2rem 1rem;
        text-align: center;
    }

    .nav-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }

    .nav-bar h1 {
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--primary-foreground);
        margin: 0;
    }

    .nav-bar a {
        color: var(--primary-foreground);
        text-decoration: none;
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        background-color: var(--primary);
        border-radius: var(--radius);
        transition: background-color 0.3s ease;
    }

    .nav-bar a:hover {
        background-color: var(--primary-foreground);
        color: var(--foreground);
    }

    main {
        padding: 4rem 2rem;
        margin: 0 auto;
        max-width: 1200px;
        text-align: center;
        flex: 1;
        font-family: var(--font-sans-serif);
    }

    footer {
        background-color: var(--secondary);
        padding: 2rem 1rem;
        text-align: center;
        color: var(--muted-foreground);
        margin-top: 2rem;
    }

    footer a {
        color: var(--foreground);
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;
    }

    footer a:hover {
        color: var(--primary);
    }
</style>

<script lang="ts">
    import { defineComponent, ref, useAsyncData } from 'vue';
    import { useContent } from '@nuxt/content';

    export default defineComponent({
        setup() {
            const { data: document } = useAsyncData(() => useContent().fetch()); // Fetch content data

            return {
                document
            };
        }
    });
</script>