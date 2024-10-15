<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Thumbnail Generator</h1>
    <form @submit.prevent="generateImage" class="mb-4">
      <div class="mb-4">
        <label for="title" class="block mb-2">Title</label>
        <input
          v-model="title"
          id="title"
          type="text"
          class="w-full p-2 border rounded"
          required
        >
      </div>
      <div class="mb-4">
        <label for="subtitle" class="block mb-2">Subtitle</label>
        <input
          v-model="subtitle"
          id="subtitle"
          type="text"
          class="w-full p-2 border rounded"
          required
        >
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Thumbnail
      </button>
    </form>

    <div v-if="previewUrl" class="mb-4">
      <h2 class="text-2xl font-bold mb-2">Preview</h2>
      <img :src="previewUrl" alt="Preview" class="max-w-full h-auto">
    </div>

    <div v-if="imageUrl">
      <h2 class="text-2xl font-bold mb-2">Generated Thumbnail</h2>
      <img :src="imageUrl" alt="Generated Thumbnail" class="max-w-full h-auto">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const title = ref('')
const subtitle = ref('')
const imageUrl = ref('')
const previewUrl = ref('')

const generatePreview = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Background
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, 1200, 630)

    // Title
    ctx.font = '60px Roboto'
    ctx.fillStyle = '#1f2937'
    ctx.textAlign = 'center'
    ctx.fillText(title.value, 600, 300)

    // Subtitle
    ctx.font = '40px Roboto'
    ctx.fillStyle = '#4b5563'
    ctx.fillText(subtitle.value, 600, 380)

    previewUrl.value = canvas.toDataURL('image/png')
  }
}

watch([title, subtitle], generatePreview)

const generateImage = async () => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title.value, subtitle: subtitle.value }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    const blob = await response.blob()
    imageUrl.value = URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error generating image:', error)
    alert('Failed to generate image. Please try again.')
  }
}
</script>