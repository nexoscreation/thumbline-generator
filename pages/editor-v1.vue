<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Thumbnail Generator</h1>
        <div class="mb-4">
            <input type="file" @change="handleFileUpload" accept="image/*" class="mb-2" />
            <div v-if="error" class="text-red-500">{{ error }}</div>
        </div>
        <div v-if="originalImage" class="mb-4">
            <h2 class="text-xl font-semibold mb-2">Original Image</h2>
            <img :src="originalImage" alt="Original" class="max-w-full h-auto" />
        </div>
        <div v-if="thumbnail" class="mb-4">
            <h2 class="text-xl font-semibold mb-2">Thumbnail</h2>
            <img :src="thumbnail" alt="Thumbnail" class="max-w-full h-auto" />
            <button @click="downloadThumbnail" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download Thumbnail
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const originalImage = ref < string | null > (null)
    const thumbnail = ref < string | null > (null)
    const error = ref < string | null > (null)

    const handleFileUpload = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                originalImage.value = e.target?.result as string
                generateThumbnail(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const generateThumbnail = (imageSrc: string) => {
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // Set thumbnail size
            const maxWidth = 200
            const maxHeight = 200
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width
                    width = maxWidth
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height
                    height = maxHeight
                }
            }

            canvas.width = width
            canvas.height = height

            ctx?.drawImage(img, 0, 0, width, height)
            thumbnail.value = canvas.toDataURL('image/jpeg')
        }
        img.src = imageSrc
    }

    const downloadThumbnail = () => {
        if (thumbnail.value) {
            const link = document.createElement('a')
            link.href = thumbnail.value
            link.download = 'thumbnail.jpg'
            link.click()
        }
    }
</script>