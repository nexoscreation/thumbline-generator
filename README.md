# Thumbline Generator

This is a project inspired by the Rocketseat tutorial on Serverless Thumbnail Generation with Next.js. The tutorial demonstrates how to create dynamic, serverless thumbnails, and you can watch it [here](https://www.youtube.com/watch?v=qvetoR6V5ic).

## Usage
To generate a thumbnail, you need to call the `/api/og-image` endpoint with the following query parameters:

### Required Parameters
- **title**: A string that contains the title of the thumbnail.

### Optional Parameters
- **background**: A hex code representing the background color. If not provided, the default is `#000000`.
- **color**: same as background
- **images**: A comma-separated list of URLs for the images/logos to be included in the thumbnail. Multiple images can be specified.

### Example URL
Here's an example URL for generating a thumbnail:
```
http://localhost:3000/api/og-image?title=My%20Awesome%20Blog%20Post&bgColor=%231e293b&textColor=%23ffffff&logoUrl=https://example.com/logo.png
```

## Examples
### Example 1: Basic Thumbnail Generation
Generate a thumbnail with a title and default background color.
```bash
GET /api/og-image?title=My%20First%20Thumbnail
```

### Example 2: Custom Background Color
Generate a thumbnail with a custom background color.
```bash
GET /api/og-image?title=Custom%20Background&bgColor=%23ff5733
```

### Example 3: Custom Custom Color
Generate a thumbnail with a custom text color.
```bash
GET /api/og-image?title=Custom%20Background&textColor=%23ff5733
```

### Example 4: Custom Images
Generate a thumbnail that includes images.
```bash
GET /api/og-image?title=Multiple%20Images&logoUrl=https%3A%2F%2Fexample.com%2Flogo1.png,
```

## API Reference
### Endpoint
`GET /api/og-image`

### Query Parameters
| Parameter | Type   | Required | Description                                              |
|-----------|--------|----------|----------------------------------------------------------|
| title     | string | Yes      | The title for the thumbnail.                             |
| bgColor        | string | No       | The background color in hex format (default: `#000000`).|
| textColor        | string | No       | The text color in hex format (default: `#f5f5f5`).|
| logoUrl    | string | No       | Comma-separated list of image URLs.                     |

### Response
The response will be a PNG image of the generated thumbnail.


## Features

- **Customizable Title:** Add any title to your thumbnails.
- **Logo Support:** Include logos using the `images` parameter.
- **Background Colors:** Change the thumbnail background using hex color codes via the `bg` parameter.

## TODO

- [x] Add logo support.
- [x] Editor Support.
- [ ] Enhance the UI for text formatting.
- [ ] Support for multiple images.
- [ ] Add custom font support.

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
