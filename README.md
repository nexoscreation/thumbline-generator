# Thumbnail Generator

This is a project based on the Rocketseat Tutorial on Serverless Thumbnail Generation with Next.js. Here is the [link](https://www.youtube.com/watch?v=qvetoR6V5ic).

To generate a thumbnail, just call the /thumbnail.png endpoint with title (the thumbnail title) and bg (the background color param) query params and use that URL to your img tags.

## Params

- **title** (obligatory): A string containing the title
- **bg** (optional): A hex code containing the background color (default is #121214)
- **images** (optional): The tech logos svg link

This would be an example URL for generating a thumb:

    https://thumbnail-generator.vercel.app/api/thumbnail.png?title=Hoisting%20in%20Javascript&images=https%3A%2F%2Fcdn.worldvectorlogo.com%2Flogos%2Flogo-javascript.svg

## TODOs

- [x] Add logo support
