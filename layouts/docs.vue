<template>

    <Head>
        <title>{{ page.title }}</title>
    </Head>

    <header>
        <nav class="nav-bar">
            <NuxtLink to="/">
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
            <h1>{{ page.title }}</h1>
            <img width="600" :src="page.image" :alt="page.title" />
            <div v-html="page.body">
                <!-- Render body content from the content file -->
            </div>
        </article>
    </main>

    <footer>
        <p>
            Built with ❤️ by <a href="https://nexoscreation.com/" target="_blank" rel="noopener noreferrer">Nexos Creation</a>. View the full source on
            <a href="https://github.com/nexoscreation/thumbline-generator" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
    </footer>
</template>

<style scoped>
    /* Scoped styles for the layout */
    header {
        background-color: var(--secondary);
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
        color: var(--foreground);
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
        color: var(--foreground);
        text-decoration: none;
        font-size: 1.2rem;
        transition: background-color 0.3s ease;
    }

    .nav-bar a:hover {
        color: var(--primary);
    }

    main {
        padding: 4rem 2rem;
        margin: 0 auto;
        max-width: 1200px;
        flex: 1;
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

<script setup lang="ts">
    // Fetch the content dynamically based on the current route's slug
    const route = useRoute()
    const { data: page, error } = await useAsyncData(() => queryContent(route.params.slug).findOne())

    // Pass the document to useContentHead for metadata handling
    if (page) {
        useContentHead(page) // This sets up the head metadata automatically
    }

    // Update the head with metadata
    useHead({
        title: page.title,
        meta: [
            { name: 'description', content: page.description },
            { property: 'og:site_name', content: 'Og Image Generator - Nexos Creation' },
            { page: 'og:title', content: page.title },
            { property: 'og:description', content: page.description },
            { property: 'og:image', content: page.image },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: page.title },
            { name: 'twitter:description', content: page.description },
            { name: 'twitter:image', content: page.image },
            ],
    });
</script>