# Serverless OG Image Generator

This project is a serverless Open Graph (OG) image generator built with Nuxt 3. The API dynamically generates OG images by accepting parameters such as `title`, `bgColor`, `textColor`, and `logoUrl`.

## Features

- Generate OG images with custom title text.
- Customize the background and text colors.
- Add a logo to the generated image.
- Supports PNG format output.
- Serverless, built with Nuxt 3.

## API Usage

### Endpoint

```bash
GET /api/og-image
```

### Query Parameters

| Parameter   | Type     | Required | Description                                                | Example                                           |
|-------------|----------|----------|------------------------------------------------------------|---------------------------------------------------|
| `title`     | `string` | Yes      | The main title text to display on the image.                | `My Awesome Blog Post`                            |
| `bgColor`   | `string` | No       | Hex code for the background color of the image.             | `#1e293b`                                         |
| `textColor` | `string` | No       | Hex code for the color of the text.                         | `#ffffff`                                         |
| `logoUrl`   | `string` | No       | URL of the logo image to display in the top left corner.     | `https://example.com/logo.png`                    |

### Example Request

```bash
GET http://localhost:3000/api/og-image?title=My%20Awesome%20Blog%20Post&bgColor=%231e293b&textColor=%23ffffff&logoUrl=https://example.com/logo.png
```

### Example Response

The above request will return an Open Graph image with the specified parameters, which can be used for social sharing.

### Error Responses

If the `title` parameter is missing, the API will return the following error:

```json
{
  "error": "Title is required"
}
```

## Contributing

We welcome contributions! Feel free to fork this repo, submit issues, or create pull requests.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Created with ❤️ by [Nexos Creation](https://github.com/nexoscreation).