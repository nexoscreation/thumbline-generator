<template>
    <section class="hero">
        <h1 class="title">Serverless Thumb Generator</h1>
        <p class="subtitle">
            Create stunning thumbnails (og-images) on the go with our easy-to-use serverless solution.
        </p>
        <div class="cta-buttons">
            <NuxtLink class="cta-button" to="/og-image-api">
                API Documentation
            </NuxtLink>
            <NuxtLink class="cta-button" to="/editor-v2">
                Latest Editor
            </NuxtLink>
        </div>
    </section>

    <section class="demo-section">
        <h2>How it works:</h2>
        <img :src="thumbnailUrl" alt="Sample Thumbnail" class="thumbnail-preview" />
        <p>
            Generate your own thumbnails by passing parameters to the API. For example:
        </p>
        <code class="code-block">
            /api/og-image?title=My%20Awesome%20Blog%20Post&bgColor=%231e293b&textColor=%23ffffff&logoUrl=https://example.com/logo.png
        </code>
    </section>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        setup() {
            const thumbnailUrl = ref('/api/og-image?title=Hello%20World'); // Default thumbnail URL

            return {
                thumbnailUrl
            };
        }
    });
</script>

<style scoped>
    .hero {
        text-align: center;
        margin-bottom: 2rem;
    }

    .title {
        font-size: 3rem;
        font-weight: bold;
        color: var(--foreground);
        margin-bottom: 1rem;
    }

    .subtitle {
        font-size: 1.5rem;
        color: var(--muted-foreground);
        margin-bottom: 2rem;
    }

    .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }

    .cta-button {
        padding: 0.75rem 1.5rem;
        background-color: var(--foreground);
        color: var(--primary-foreground);
        font-size: 1.2rem;
        border-radius: var(--radius);
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .cta-button:hover {
        background-color: var(--primary-foreground);
        color: var(--foreground);
    }

    .demo-section {
        padding: 2rem;
        background-color: var(--card);
        text-align: center;
        border-radius: var(--radius);
    }

    .thumbnail-preview {
        width: 100%;
        max-width: 600px;
        margin: 1rem auto;
        border-radius: var(--radius);
    }

    .code-block {
        display: block;
        background-color: var(--muted);
        color: var(--muted-foreground);
        padding: 1rem;
        border-radius: var(--radius);
        margin-top: 1rem;
        word-wrap: break-word;
    }
</style>