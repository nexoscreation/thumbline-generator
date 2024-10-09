<template>
    <div class="docs">
        <ContentDoc>
            <template #not-found>
                <h1>This is Example of Generated og image</h1>
            </template>
            <template #empty>
                <h1>Page is empty</h1>
            </template>
        </ContentDoc>
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
        layout: 'docs'
    })
</script>

<style scoped>
    /* Add styles specific to the Post component if needed */

    /* General docs Styles */
    .docs {
        font-family: sans-serif;
        line-height: 1.7;
        color: var(--foreground);
    }

    /* Headings */
    .docs h1,
    .docs h2,
    .docs h3,
    .docs h4 {
        font-weight: bold;
        margin: 1.5rem 0 1rem;
        color: var(--primary);
    }

    /* Paragraphs */
    .docs p {
        margin: 1rem 0;
    }

    /* Links */
    .docs a {
        color: var(--link);
        text-decoration: underline;
    }

    .docs a:hover {
        color: var(--link-hover);
    }

    /* Lists */
    .docs ul,
    .docs ol {
        padding-left: 2rem;
        margin: 1rem 0;
    }

    /* Blockquotes */
    .docs blockquote {
        border-left: 4px solid var(--muted);
        padding-left: 1rem;
        color: var(--muted-foreground);
        margin: 1rem 0;
    }

    /* Code */
    .docs code {
        background-color: var(--code-bg);
        color: var(--code-fg);
        padding: 0.2rem 0.4rem;
        border-radius: var(--radius);
        font-family: 'Courier New', Courier, monospace;
    }

    /* Tables */
    .docs table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
        background-color: var(--table-bg);
    }

    .docs th,
    .docs td {
        padding: 0.75rem;
        border: 1px solid var(--table-border);
    }

    .docs th {
        background-color: var(--table-header-bg);
        color: var(--table-header-fg);
    }

    /* Images */
    .docs img {
        max-width: 100%;
        height: auto;
        border-radius: var(--radius);
    }
</style>