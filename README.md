# Thumbline Generator

This is a project inspired by the Rocketseat tutorial on Serverless Thumbnail Generation with Next.js. The tutorial demonstrates how to create dynamic, serverless thumbnails, and you can watch it [here](https://www.youtube.com/watch?v=qvetoR6V5ic).

## Usage
To generate a thumbnail, you need to call the `/api/thumbnail.png` endpoint with the following query parameters:

### Required Parameters
- **title**: A string that contains the title of the thumbnail.

### Optional Parameters
- **bg**: A hex code representing the background color. If not provided, the default is `#000000`.
- **images**: A comma-separated list of URLs for the images/logos to be included in the thumbnail. Multiple images can be specified.

### Example URL
Here's an example URL for generating a thumbnail:
```
https://thumbline-generator.vercel.app/api/thumbnail.png?title=Your%20Thumbnail%20Title&bg=%23ff5733&images=https%3A%2F%2Fexample.com%2Flogo1.png,https%3A%2F%2Fexample.com%2Flogo2.png
```

## Examples
### Example 1: Basic Thumbnail Generation
Generate a thumbnail with a title and default background color.
```bash
GET /api/thumbnail.png?title=My%20First%20Thumbnail
```

### Example 2: Custom Background Color
Generate a thumbnail with a custom background color.
```bash
GET /api/thumbnail.png?title=Custom%20Background&bg=%23ff5733
```

### Example 3: Multiple Images
Generate a thumbnail that includes multiple images.
```bash
GET /api/thumbnail.png?title=Multiple%20Images&bg=%23ff5733&images=https%3A%2F%2Fexample.com%2Flogo1.png,https%3A%2F%2Fexample.com%2Flogo2.png
```

## API Reference
### Endpoint
`GET /api/thumbnail.png`

### Query Parameters
| Parameter | Type   | Required | Description                                              |
|-----------|--------|----------|----------------------------------------------------------|
| title     | string | Yes      | The title for the thumbnail.                             |
| bg        | string | No       | The background color in hex format (default: `#000000`).|
| images    | string | No       | Comma-separated list of image URLs.                     |

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
