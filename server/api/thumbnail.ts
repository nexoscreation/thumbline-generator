import { defineEventHandler, getQuery, createError, sendError } from 'h3'
import { getScreenshot } from '~/server/utils/chromium'
import getThumbnailTemplate from '~/server/utils/thumbnailGenerator'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const title = query.title as string
        const bg = (query.bg as string) || '#000000'
        const images = query.images ? (Array.isArray(query.images) ? query.images : [query.images]) : []
        const fontSize = Number(query.fontSize) || 100

        // Validate required fields
        if (!title) {
            throw createError({
                statusCode: 400,
                message: 'Missing title'
            })
        }

        const html = getThumbnailTemplate({
            title,
            thumbnail_bg: bg,
            images: images as string[],
            fontSize
        })

        const isDev = process.env.NODE_ENV !== 'production'
        const screenshot = await getScreenshot(html, isDev)

        event.node.res.setHeader('Content-Type', 'image/png')
        event.node.res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')

        return screenshot
    } catch (error) {
        console.error('Error generating thumbnail:', error)
        return sendError(event, createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Internal Server Error'
        }))
    }
})