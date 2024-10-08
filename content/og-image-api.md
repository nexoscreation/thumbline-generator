---
title: OG Image API Documentation
description: API to dynamically generate Open Graph images with custom text, background, text color, and logos.
thumb_url: /api/og-image?title=OG%20Image%20API&bgColor=%231e293b&textColor=%23ffffff&logoUrl=https://nexoscreation.com/logo.png
---

# OG Image API

This API allows you to generate dynamic Open Graph (OG) images by providing query parameters such as text, background color, text color, and a logo URL.

## Endpoint

```bash
GET /api/og-image
```

### Base URL

```bash
http://localhost:3000/api/og-image
```

### Query Parameters

| Parameter    | Type     | Required | Description                                                  | Example                                         |
|--------------|----------|----------|--------------------------------------------------------------|-------------------------------------------------|
| `title`      | `string` | Yes      | The main title text to display on the image.                 | `My Awesome Blog Post`                          |
| `bgColor`    | `string` | No       | Hex code for the background color of the image.              | `#1e293b`                                       |
| `textColor`  | `string` | No       | Hex code for the color of the text.                          | `#ffffff`                                       |
| `logoUrl`    | `string` | No       | URL of the logo image to display in the top left corner.      | `https://example.com/logo.png`                  |

## Example Request

```bash
GET http://localhost:3000/api/og-image?title=My%20Awesome%20Blog%20Post&bgColor=%231e293b&textColor=%23ffffff&logoUrl=https://example.com/logo.png
```

### Example Response

The above request will return an Open Graph image with the specified parameters, which can be used for social sharing.

## Parameters Explained

- **title**: The title is the most important text displayed in the center of the image. It should be URL-encoded (spaces should be replaced with `%20`).
- **bgColor**: The background color of the image, provided in hexadecimal format. The default is `#1e293b` if not provided.
- **textColor**: The text color, also provided in hexadecimal format. The default is `#ffffff` (white).
- **logoUrl**: The URL of the logo to display in the top-left corner. This could be a brand logo or any other image.

## Usage Tips

- Make sure to URL-encode the parameters when sending the request.
- Test different combinations of colors to ensure the readability of the text on the image.
- Use a logo image that is appropriately sized to avoid distorting the final OG image.

## Response Format

The response will be a PNG image rendered based on the provided parameters.

```plaintext
Content-Type: image/png
```

You can use this image directly as an OG image for social media sharing or as a thumbnail for blog posts and pages.

## Error Handling

If required parameters are missing (e.g., `title`), the API will return an error:

```json
{
  "error": "Title is required"
}
```

## Conclusion

This API is a flexible tool for generating Open Graph images dynamically with custom titles, colors, and logos. Make sure to include all necessary parameters in the URL when making a request.
