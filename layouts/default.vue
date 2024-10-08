<template>
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
        <slot />
    </main>

    <footer>
        <p>
            Built with ❤️ by Nexos Creation. View the full source on
            <a href="https://github.com/nexoscreation/thumbline-generator" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
    </footer>
</template>

<script setup>
</script>

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
        color: var(--accent);
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