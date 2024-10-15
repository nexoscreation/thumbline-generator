import { createCanvas, registerFont } from 'canvas'
import * as path from 'path'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { title, subtitle } = body

        if (!title || !subtitle) {
            throw new Error('Title and subtitle are required')
        }

        registerFont(path.join(process.cwd(), 'public', 'fonts', 'Roboto-Bold.ttf'), { family: 'Roboto' })

        const canvas = createCanvas(1200, 630)
        const ctx = canvas.getContext('2d')

        // Background
        ctx.fillStyle = '#f3f4f6'
        ctx.fillRect(0, 0, 1200, 630)

        // Title
        ctx.font = '60px Roboto'
        ctx.fillStyle = '#1f2937'
        ctx.textAlign = 'center'
        ctx.fillText(title, 600, 300)

        // Subtitle
        ctx.font = '40px Roboto'
        ctx.fillStyle = '#4b5563'
        ctx.fillText(subtitle, 600, 380)

        const buffer = canvas.toBuffer('image/png')
        return buffer
    } catch (error) {
        console.error('Error generating image:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error generating image',
        })
    }
})