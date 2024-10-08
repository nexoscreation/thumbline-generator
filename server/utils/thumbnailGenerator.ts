import { sanitizeHtml } from './sanitizer'
import { marked } from 'marked'

interface ThumbnailTemplateArgs {
    title: string
    thumbnail_bg: string
    images: string[]
    fontSize: number
}

const getImage = (image: string): string => {
    return `<img
    class="logo"
    alt="Generated Image"
    src="${sanitizeHtml(image)}"
    width="auto"
    height="225"
  />`
}

function getPlusSign(i: number): string {
    return i === 0 ? '' : '<div class="plus">+</div>'
}

export default function getThumbnailTemplate({
    title,
    thumbnail_bg,
    images,
    fontSize
}: ThumbnailTemplateArgs): string {
    const imageElements = images.map((img, i) => getPlusSign(i) + getImage(img)).join('')

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thumbnail</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: ${sanitizeHtml(thumbnail_bg)};
      background-image: radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%),
        radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
      background-size: 100px 100px;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 90%;
    }
    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
    }
    .logo {
      margin: 0 30px;
      max-height: 225px;
      width: auto;
    }
    .plus {
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Times New Roman', Times, serif;
      font-size: 80px;
    }
    .heading {
      font-family: 'Inter', sans-serif;
      font-size: ${sanitizeHtml(String(fontSize))}px;
      color: #fff;
      line-height: 1.4;
      margin: 0;
      padding: 0 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-wrapper">
      ${imageElements}
    </div>
    <h1 class="heading">
      ${marked(sanitizeHtml(title))}
    </h1>
  </div>
</body>
</html>`
}