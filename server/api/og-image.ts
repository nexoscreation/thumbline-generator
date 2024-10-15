import { createCanvas, loadImage, registerFont } from 'canvas'
import { defineEventHandler, getQuery, sendStream } from 'h3'
import { Buffer } from 'buffer'

export default defineEventHandler(async (event) => {
    try {
        // Get font data from storage
        const fontData = await useStorage('assets:fonts').getItem('Roboto-Bold.woff2')

        if (!fontData) {
            throw new Error('Font file not found in storage')
        }

        // Register the font using the font data
        const fontBuffer = Buffer.from(fontData)
        registerFont(fontBuffer, { family: 'Roboto' })

        // Get query parameters
        const query = getQuery(event)
        const title = (query.title as string) || 'Default Title'
        const bgColor = (query.bgColor as string) || '#1e293b'
        const textColor = (query.textColor as string) || '#ffffff'
        const logoUrl = query.logoUrl as string


        // Create canvas
        const width = 1200
        const height = 630
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')


        // Draw background
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)

        // Set text properties
        ctx.font = '60px Roboto'
        ctx.fillStyle = textColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Draw title with text wrapping
        const maxWidth = width - 100
        const lineHeight = 70
        const words = title.split(' ')
        let line = ''
        const lines = []

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' '
            const metrics = ctx.measureText(testLine)
            const testWidth = metrics.width

            if (testWidth > maxWidth && i > 0) {
                lines.push(line.trim())
                line = words[i] + ' '
            } else {
                line = testLine
            }
        }
        lines.push(line.trim())

        let y = height / 2 - (lines.length - 1) * lineHeight / 2
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], width / 2, y)
            y += lineHeight
        }

        // Draw logo if provided
        if (logoUrl) {
            try {
                const logo = await loadImage(logoUrl)
                const logoSize = 100
                const logoX = width - logoSize - 50
                const logoY = height - logoSize - 50
                ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
            } catch (error) {
                console.error('Error loading logo:', error)
            }
        }


        // Set content type and send the image
        event.node.res.setHeader('Content-Type', 'image/png')
        return sendStream(event, canvas.createPNGStream())
    } catch (error) {
        console.error('Error generating image:', error)
        event.node.res.statusCode = 500
        return { error: 'Failed to generate image' }
    }
})
