# robinsr.github.io

This is the source code for my personal website and blog, built with [Jekyll](https://jekyllrb.com/) and [Tailwind CSS](https://tailwindcss.com/).

## Features

- **Blog**: Technical articles and posts in `_posts/`.
- **Work Experience**: Modular work history as Markdown files in the `_work/` collection, rendered as standalone pages.
- **Resume**: Resume page in Markdown.
- **Modern Styling**: Tailwind CSS for utility-first styling, with the Typography plugin for beautiful content.
- **Responsive Design**: Mobile-friendly layouts and components.

## Development

### Prerequisites
- Ruby (for Jekyll)
- Node.js & npm (for Tailwind CSS)
- Bundler (`gem install bundler`)

### Setup
1. Install Ruby gems:
   ```sh
   bundle install
   ```
2. Install Node dependencies:
   ```sh
   npm install
   ```

### Running Locally
- For full development (Jekyll + Tailwind in watch mode):
  ```sh
  npm run dev
  ```
- To serve the site only (Jekyll):
  ```sh
  npm run serve
  ```

### Building CSS
- To build Tailwind CSS manually:
  ```sh
  npm run build:css
  ```

## Adding Work Experience
- Add new Markdown files to `_work/` with front matter for each job.
- See existing files for examples of structure and fields.

## Customization
- Tailwind config is in `tailwind.config.js` (includes Typography plugin and custom font stack).
- Main styles are in `stylesheets/tailwind.css`.
- Google Fonts (Open Sans) is loaded in the site head.

## Deployment
- The site is built statically by Jekyll and can be deployed to GitHub Pages or any static host.

## License
MIT 