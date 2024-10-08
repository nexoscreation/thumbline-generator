<template>
    <div class="container">
        <h1>OG Image Generator</h1>
        <div class="form-grid">
            <div class="form-fields">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-model="title" type="text" id="title" class="input-field" placeholder="Enter title" />
                </div>
                <div class="form-group">
                    <label for="subtitle">Subtitle</label>
                    <input v-model="subtitle" type="text" id="subtitle" class="input-field" placeholder="Enter subtitle" />
                </div>
                <div class="form-group">
                    <label for="bgColor">Background Color</label>
                    <input v-model="bgColor" type="color" id="bgColor" class="input-field" />
                </div>
                <div class="form-group">
                    <label for="textColor">Text Color</label>
                    <input v-model="textColor" type="color" id="textColor" class="input-field" />
                </div>
                <div class="form-group">
                    <label for="layout">Layout</label>
                    <select v-model="layout" id="layout" class="input-field">
                        <option value="center">Centered</option>
                        <option value="left">Left Aligned</option>
                        <option value="gradient">Gradient Background</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="logo">Logo (optional)</label>
                    <input type="file" id="logo" accept="image/*" @change="handleLogoUpload" class="file-upload" />
                </div>
                <button @click="generateImage" class="btn-primary">
                    Generate OG Image
                </button>
            </div>
            <div>
                <h2>Preview</h2>
                <div ref="canvasContainer" class="preview-container">
                    <canvas ref="canvas" width="1200" height="630"></canvas>
                </div>
                <button v-if="imageGenerated" @click="downloadImage" class="btn-download">
                    Download Image
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    h1 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .form-fields {
        display: flex;
        flex-direction: column;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .input-field {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .file-upload {
        padding: 8px;
    }

    .btn-primary {
        padding: 10px 20px;
        background-color: #4A90E2;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-primary:hover {
        background-color: #357ABD;
    }

    .preview-container {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        overflow: hidden;
    }

    .btn-download {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #28A745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-download:hover {
        background-color: #218838;
    }
</style>

<script lang="ts" setup>
    import { ref, onMounted, watch } from 'vue'

    const title = ref('Your Title Here')
    const subtitle = ref('Your subtitle or additional text')
    const bgColor = ref('#1e293b')
    const textColor = ref('#ffffff')
    const layout = ref('center')
    const canvas = ref < HTMLCanvasElement | null > (null)
    const canvasContainer = ref < HTMLDivElement | null > (null)
    const imageGenerated = ref(false)
    const logo = ref < string | null > (null)

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