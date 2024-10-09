<template>
    <div class="container">
        <h1 class="h1">Thumbnail Editor</h1>

        <div class="formGroup">
            <label class="label" for="title">Title:</label>
            <input class="intext" type="text" id="title" v-model="title" placeholder="Enter thumbnail title" />
        </div>

        <div class="formGroup">
            <label class="label" for="bgColor">Background Color:</label>
            <input class="incolor" type="color" id="bgColor" v-model="bgColor" />
        </div>

        <div class="formGroup">
            <label class="label">Images (URLs):</label>
            <div v-for="(url, index) in imageUrls" :key="index" class="imageGroup">
                <input class="intext" type="text" v-model="imageUrls[index]" placeholder="Enter image URL" />
                <button @click="handleAddImageUrl">Add</button>
            </div>
        </div>

        <button class="generateButton" @click="handleGenerateThumbnail">
            Generate Thumbnail
        </button>

        <div v-if="thumbnailUrl" class="preview">
            <h2>Thumbnail Preview:</h2>
            <img :src="thumbnailUrl" alt="Thumbnail Preview" class="thumbnailImage" />
            <p>
                Generated URL:
                <a :href="thumbnailUrl" target="_blank" rel="noopener noreferrer">{{ thumbnailUrl }}</a>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        setup() {
            const title = ref('');
            const bgColor = ref('#000000');
            const imageUrls = ref < string[] > (['']);
            const thumbnailUrl = ref('');

            const handleAddImageUrl = () => {
                imageUrls.value.push('');
            };

            const handleGenerateThumbnail = () => {
                const images = imageUrls.value.filter(url => url.trim()).join(',');
                const generatedUrl = `/api/og-image?title=${encodeURIComponent(title.value)}&bgColor=${bgColor.value}&logoUrl=${encodeURIComponent(images)}`;
                thumbnailUrl.value = generatedUrl;
            };

            return {
                title,
                bgColor,
                imageUrls,
                thumbnailUrl,
                handleAddImageUrl,
                handleGenerateThumbnail,
            };
        }
    });
</script>

<style scoped>
    /* styles/editor.module.css */
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .h1 {
        text-align: center;
        color: #333;
    }

    .formGroup {
        margin-bottom: 15px;
    }

    .label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .intext,
    .incolor {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .imageGroup {
        display: flex;
        align-items: center;
    }

    .imageGroup input {
        flex-grow: 1;
        margin-right: 10px;
    }

    .imageGroup input {
        flex-grow: 1;
        margin-right: 10px;
    }

    .imageGroup button {
        background-color: #2563EB;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .generateButton {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #0070f3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
    }

    .generateButton:hover {
        background-color: #005bb5;
    }

    .preview {
        margin-top: 20px;
        text-align: center;
    }

    .thumbnailImage {
        max-width: 100%;
        height: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>