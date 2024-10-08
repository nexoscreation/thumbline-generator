<template>
    <section class="hero">
        <h1 class="title">Serverless Thumb Generator</h1>
        <p class="subtitle">
            Create stunning thumbnails (og-images) on the go with our easy-to-use serverless solution.
        </p>
        <NuxtLink class="ctaButton" to="https://github.com/nexoscreation/thumbline-generator">
            Check GitHub Docs
        </NuxtLink>
        <NuxtLink class="ctaButton" to="/editor-v2">
            Editor V2
        </NuxtLink>
    </section>

    <section class="demoSection">
        <h2>How it works:</h2>
        <img :src="thumbnailUrl" alt="Sample Thumbnail" class="thumbnailPreview" />
        <p>
            Generate your own thumbnails by passing parameters to the API. For example:
        </p>
        <code class="code">
            http://localhost:3000/api/og-image?title=My%20Awesome%20Blog%20Post&bgColor=%231e293b&textColor=%23ffffff&logoUrl=https://example.com/logo.png
        </code>
    </section>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';

    export default defineComponent({
        setup() {
            const thumbnailUrl = ref('/api/thumbnail.png?title=Hello%20World'); // Default thumbnail URL

            return {
                thumbnailUrl
            };
        }
    });
</script>

<style scoped>
    .hero {
        margin-bottom: 3rem;
    }

    .title {
        font-size: 3rem;
        font-weight: bold;
        color: #ffcc00;
    }

    .subtitle {
        font-size: 1.5rem;
        color: #666;
        margin-bottom: 2rem;
    }

    .ctaButton {
        padding: 0.75rem 1.5rem;
        background-color: #ff6600;
        color: white;
        font-size: 1.2rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
    }

    .demoSection {
        margin-top: 3rem;
    }

    .thumbnailPreview {
        width: 100%;
        max-width: 600px;
        margin: 1rem auto;
    }

    .code {
        display: block;
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
    }
</style>