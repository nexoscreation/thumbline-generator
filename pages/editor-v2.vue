<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">OG Image Generator</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="title"
            type="text"
            id="title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label for="subtitle" class="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            v-model="subtitle"
            type="text"
            id="subtitle"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter subtitle"
          />
        </div>
        <div>
          <label for="bgColor" class="block text-sm font-medium text-gray-700">Background Color</label>
          <input
            v-model="bgColor"
            type="color"
            id="bgColor"
            class="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="textColor" class="block text-sm font-medium text-gray-700">Text Color</label>
          <input
            v-model="textColor"
            type="color"
            id="textColor"
            class="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="layout" class="block text-sm font-medium text-gray-700">Layout</label>
          <select
            v-model="layout"
            id="layout"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="center">Centered</option>
            <option value="left">Left Aligned</option>
            <option value="gradient">Gradient Background</option>
          </select>
        </div>
        <div>
          <label for="logo" class="block text-sm font-medium text-gray-700">Logo (optional)</label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            @change="handleLogoUpload"
            class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          @click="generateImage"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Generate OG Image
        </button>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Preview</h2>
        <div ref="canvasContainer" class="border border-gray-300 rounded-md overflow-hidden">
          <canvas ref="canvas" width="1200" height="630"></canvas>
        </div>
        <button
          v-if="imageGenerated"
          @click="downloadImage"
          class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Download Image
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

const title = ref('Your Title Here')
const subtitle = ref('Your subtitle or additional text')
const bgColor = ref('#1e293b')
const textColor = ref('#ffffff')
const layout = ref('center')
const canvas = ref<HTMLCanvasElement | null>(null)
const canvasContainer = ref<HTMLDivElement | null>(null)
const imageGenerated = ref(false)
const logo = ref<string | null>(null)

const generateImage = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Set background
  if (layout.value === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.value.width, canvas.value.height)
    gradient.addColorStop(0, bgColor.value)
    gradient.addColorStop(1, adjustColor(bgColor.value, -30))
    ctx.fillStyle = gradient
  } else {
    ctx.fillStyle = bgColor.value
  }
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // Set text properties
  ctx.fillStyle = textColor.value
  ctx.textAlign = layout.value === 'left' ? 'left' : 'center'
  ctx.textBaseline = 'middle'

  // Draw title
  ctx.font = 'bold 60px Arial'
  const titleX = layout.value === 'left' ? 50 : canvas.value.width / 2
  ctx.fillText(title.value, titleX, canvas.value.height / 2 - 40)

  // Draw subtitle
  ctx.font = '30px Arial'
  const subtitleX = layout.value === 'left' ? 50 : canvas.value.width / 2
  ctx.fillText(subtitle.value, subtitleX, canvas.value.height / 2 + 40)

  // Draw logo if available
  if (logo.value) {
    const img = new Image()
    img.onload = () => {
      const aspectRatio = img.width / img.height
      const logoHeight = 100
      const logoWidth = logoHeight * aspectRatio
      const logoX = layout.value === 'left' ? 50 : (canvas.value!.width - logoWidth) / 2
      ctx.drawImage(img, logoX, canvas.value!.height - logoHeight - 50, logoWidth, logoHeight)
    }
    img.src = logo.value
  }

  imageGenerated.value = true
}

const downloadImage = () => {
  if (!canvas.value) return

  const link = document.createElement('a')
  link.download = 'og-image.png'
  link.href = canvas.value.toDataURL()
  link.click()
}

const handleLogoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      logo.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const adjustColor = (color: string, amount: number): string => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2))
}

onMounted(() => {
  generateImage()
})

watch([title, subtitle, bgColor, textColor, layout, logo], () => {
  generateImage()
})
</script>