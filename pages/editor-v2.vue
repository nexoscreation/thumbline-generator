<template>
    <div class="custom-container">
        <div class="custom-grid">
            <div class="custom-flex-col">
                <div class="custom-header">
                    <h1 class="custom-title">Open Graph Image Generator</h1>
                </div>
                <p class="custom-muted-text">
                    Create beautiful Open Graph images for your website or social media posts.
                </p>
                <form class="custom-form">
                    <div class="custom-flex">
                        <div class="custom-input-group">
                            <label for="title" class="custom-label">Title</label>
                            <input v-model="title" type="text" id="title" class="custom-input" placeholder="Enter title" />
                        </div>
                        <div class="custom-input-group">
                            <label for="subtitle" class="custom-label">Subtitle</label>
                            <input v-model="subtitle" type="text" id="subtitle" class="custom-input" placeholder="Enter subtitle" />
                        </div>
                    </div>
                    <div class="custom-flex">
                        <div class="custom-layout-group">
                            <label for="layout" class="custom-label">Layout</label>
                            <select v-model="layout" id="layout" class="custom-layout-button">
                                <option value="center">Centered</option>
                                <option value="left">Left Aligned</option>
                                <option value="gradient">Gradient Background</option>
                            </select>
                        </div>
                        <div class="custom-logo-group">
                            <label for="logo" class="custom-label">Logo (optional)</label>
                            <input type="file" id="logo" accept="image/*" @change="handleLogoUpload" class="custom-logo-button" />
                        </div>
                    </div>
                    <div class="custom-flex">
                        <div class="custom-background-group">
                            <label for="bgColor" class="custom-label">Background Color</label>
                            <input v-model="bgColor" type="color" id="bgColor" class="custom-color-button" />
                        </div>
                        <div class="custom-color-group">
                            <label for="textColor" class="custom-label">Text Color</label>
                            <input v-model="textColor" type="color" id="textColor" class="custom-color-button" />
                        </div>
                    </div>
                    <button @click="generateImage" class="custom-generate-button" disabled>
                       Auto Generate OG Image
                    </button>
                </form>
            </div>
            <div ref="canvasContainer" class="custom-preview">
                <h2 class="custom-preview-title">Preview</h2>
                <canvas ref="canvas" width="1200" height="630" class="custom-preview-image"></canvas>
            </div>
            <button v-if="imageGenerated" @click="downloadImage" class="custom-download-button">
                Download Image
            </button>
        </div>
    </div>
</template>

<style scoped>
    .custom-container {
        padding: 0;
    }

    .custom-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .custom-flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
    }

    .custom-flex-col {
        display: flex;
        flex-direction: column;
    }

    .custom-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .custom-title {
        font-size: 24px;
        font-weight: bold;
    }

    .custom-muted-text {
        color: #6b7280;
    }

    .custom-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .custom-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #d1d5db;
        border-radius: 5px;
    }

    .custom-input-group,
    .custom-layout-group,
    .custom-logo-group,
    .custom-background-group,
    .custom-color-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .custom-label {
        font-size: 14px;
        font-weight: bold;
    }

    .custom-layout-button,
    .custom-background-button,
    .custom-color-button,
    .custom-logo-button {
        padding: 10px;
        border: 1px solid #d1d5db;
        background: transparent;
        cursor: pointer;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
    }

    .custom-generate-button,
    .custom-download-button {
        padding: 10px;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .custom-preview {
        display: flex;
        flex-direction: column;
    }

    .custom-preview-title {
        font-size: 20px;
        font-weight: bold;
    }

    .custom-image-container {
        border: 1px solid #d1d5db;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .custom-preview-image {
        max-width: 100%;
        height: auto;
    }

    .custom-icon {
        width: 20px;
        height: 20px;
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
        ctx.font = 'bold 60px Inter'
        const titleX = layout.value === 'left' ? 50 : canvas.value.width / 2
        ctx.fillText(title.value, titleX, canvas.value.height / 2 - 40)

        // Draw subtitle
        ctx.font = '30px Roboto'
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