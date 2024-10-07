# Thumbline Generator

This is a project inspired by the Rocketseat tutorial on Serverless Thumbnail Generation with Next.js. The tutorial demonstrates how to create dynamic, serverless thumbnails, and you can watch it [here](https://www.youtube.com/watch?v=qvetoR6V5ic).

## How it Works

The **Thumbline Generator** allows you to generate custom thumbnails by calling the `/thumbnail.png` endpoint with query parameters. These thumbnails can be embedded directly into your web applications via an image URL.

### Endpoint Example

To generate a thumbnail, simply use this example URL:

```
https://thumbnail-generator.vercel.app/api/thumbnail
```

### Query Parameters

- **title** (required): A string representing the title of the thumbnail. This is the text that will be displayed on the image.
- **bg** (optional): A hexadecimal color code for the background color of the thumbnail. If not specified, the default color is `#121214`.
- **images** (optional): A link to an SVG image logo (e.g., a tech logo) that will appear on the thumbnail.

### Example

Here’s an example that generates a thumbnail with the title *"Hoisting in Javascript"*, a JavaScript logo, and the default background:

```
https://thumbnail-generator.vercel.app/api/thumbnail.png?title=Hoisting%20in%20Javascript&images=https%3A%2F%2Fcdn.worldvectorlogo.com%2Flogos%2Flogo-javascript.svg
```

This URL will return a thumbnail with the text "Hoisting in Javascript" and a JavaScript logo at the side.

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