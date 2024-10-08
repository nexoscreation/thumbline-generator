<template>
    <header>
        <nav class="nav-bar">
            <h1>Serverless Thumbnail Generator</h1>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/editor-v1">Editor</NuxtLink>
            <NuxtLink to="/og-image-api">Documentation</NuxtLink>
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