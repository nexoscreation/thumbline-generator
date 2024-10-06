import { sanitizeHtml } from './sanitizer';
import marked from 'marked';

interface GetThumbnailTemplateArgs {
	thumbnail_bg: string;
	images: string[];
	fontSize: number;
	title: string;
}

const getImage = (image: string) => {
	return `<img
      class="logo"
      alt="Generated Image"
      src="${sanitizeHtml(image)}"
      width="auto"
      height="225"
  />`;
};

function getPlusSign(i: number) {
	return i === 0 ? '' : '<div class="plus">+</div>';
}

export default function getThumbnailTemplate({
	title,
	thumbnail_bg,
	images,
	fontSize
}: GetThumbnailTemplateArgs) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Thumbnail</title>
  
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
    <style>
      body {
        background: ${thumbnail_bg};
        background-image: radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
      }
  
      svg {
        height: 40px;
        margin-top: 80px;
      }
  
      h1 {
        font-size: 62px;
        line-height: 80px;
  
        max-width: 80%;
      }

      .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
      }

      .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
      }

      .logo {
        margin: 0 75px;
      }

      .spacer {
        margin: 150px
      }

      .heading {
        font-style: normal;
        font-family: 'Inter', sans-serif;
        font-size: ${fontSize}px;
        color: #fff;
        line-height: 1.8;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="spacer">
      <div class="logo-wrapper">
         ${
						images.length === 0
							? ''
							: images.map((img, i) => getPlusSign(i) + getImage(img))
					}
      </div>
      <div class="spacer">
      <div class="heading">
        ${marked(title)}
      </div>
    </div>
  </body>
  </html>`;
}
