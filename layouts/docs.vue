<template>

    <Head>
        <title>{{ document.title }}</title>
    </Head>

    <header>
        <nav class="nav-bar">
            <NuxtLink to="/editor-v1">
                <h1>Serverless Thumbnail Generator</h1>
            </NuxtLink>
            <div class="links">
                <NuxtLink to="/editor-v1">Editor V1</NuxtLink>
                <NuxtLink to="/editor-v2">Editor V2</NuxtLink>
                <NuxtLink to="/docs/og-image-api">Documentation</NuxtLink>
            </div>
        </nav>
    </header>

    <main>
        <article>
            <h1>{{ document.title }}</h1>
            <img width="600" :src="document.image" :alt="document.title" />
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
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--primary-foreground);
        margin: 0;
    }

    .nav-bar .links {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
    }

    .nav-bar a {
        color: var(--primary-foreground);
        text-decoration: none;
        font-size: 1.2rem;
        transition: background-color 0.3s ease;
    }

    .nav-bar a:hover {
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
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        async setup() {
            const { document } = await useContentHead(); // Fetch content and metadata

            // Update the head with metadata
            useHead({
                title: document.title,
                meta: [
                    { name: 'description', content: document.description },
                    { property: 'og:site_name', content: 'Og Image Generator - Nexos Creation' },
                    { property: 'og:title', content: document.title },
                    { property: 'og:description', content: document.description },
                    { property: 'og:image', content: document.image },
                    { property: 'og:image:type', content: 'image/png' },
                    { property: 'og:image:width', content: '1200' },
                    { property: 'og:image:height', content: '630' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:title', content: document.title },
                    { name: 'twitter:description', content: document.description },
                    { name: 'twitter:image', content: document.image },
            ],
            });

            return {
                document
            };
        }
    });
</script>