import { NextApiRequest, NextApiResponse } from 'next';
import { getScreenshot } from './_lib/chromium';
import getThumbnailTemplate from './_lib/thumb_template';

const isDev = !process.env.AWS_REGION;

const getArray = (stringOrArray: string[] | string | undefined): string[] => {
	if (typeof stringOrArray === 'undefined') {
		return [];
	} else if (Array.isArray(stringOrArray)) {
		return stringOrArray;
	} else {
		return [stringOrArray];
	}
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		const thumbnail_bg = String(req.query.bg || '#000000');
		const fontSize = Number(req.query.fontSize || 100);
		const images = getArray(req.query.images);
		const title = String(req.query.title);

		if (!title) {
			return res.status(400).json({ err: 'Missing title' });
		}

		const html = getThumbnailTemplate({
			title,
			thumbnail_bg,
			images,
			fontSize
		});
		const file = await getScreenshot(html, isDev);

		res.setHeader('Content-Type', 'image/png');
		res.setHeader(
			'Cache-Control',
			'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		);

		return res.end(file);
	} catch (error) {
		console.error(error);

		return res.status(500).send('Internal error');
	}
}
