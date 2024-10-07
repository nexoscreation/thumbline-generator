// server/api/thumbnail.ts
import { defineEventHandler, useQuery } from 'h3';
import { getScreenshot } from '../../utils/chromium'; // Import the getScreenshot function
import getThumbnailTemplate from '../../utils/thumbnailGenerator';

const isDev = process.env.NODE_ENV !== 'production';

const getArray = (stringOrArray: string[] | string | undefined): string[] => {
  if (typeof stringOrArray === 'undefined') {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
};

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event);
    const thumbnail_bg = String(query.bg || '#000000');
    const fontSize = Number(query.fontSize || 100);
    const images = getArray(query.images);
    const title = String(query.title);

    if (!title) {
      return {
        statusCode: 400,
        body: { err: 'Missing title' },
      };
    }

    const html = getThumbnailTemplate({
      title,
      thumbnail_bg,
      images,
      fontSize,
    });

    const file = await getScreenshot(html, isDev);

    // Set response headers
    event.res.setHeader('Content-Type', 'image/png');
    event.res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
    );

    return file; // Return the image file directly
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal error',
    };
  }
});
