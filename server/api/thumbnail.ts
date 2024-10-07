import { defineEventHandler, getQuery } from 'h3'; // Use `getQuery` instead of `useQuery`
import { getScreenshot } from '../../utils/chromium'; // Import the getScreenshot function
import getThumbnailTemplate from '../../utils/thumbnailGenerator'; // Your HTML template generator

export default defineEventHandler(async (event) => {
    const { title, bg, images, fontSize } = getQuery(event); // Use `getQuery` to extract query params

    const thumbnail_bg = bg || '#000000';
    const size = Number(fontSize) || 100;
    const imageUrls = Array.isArray(images) ? images : [images];

    // Validate required fields
    if (!title) {
        return {
            statusCode: 400,
            body: { error: 'Missing title' }
        };
    }

    const html = getThumbnailTemplate({
        title,
        thumbnail_bg,
        images: imageUrls,
        fontSize: size
    });

    try {
        const isDev = process.env.NODE_ENV !== 'production'; // Check if in development mode
        const screenshot = await getScreenshot(html, isDev); // Generate screenshot

        return {
            statusCode: 200,
            body: screenshot,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
            }
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: { error: 'Internal Server Error' }
        };
    }
});
