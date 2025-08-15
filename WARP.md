# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Hugo-based blog using the PaperMod theme with extensive accessibility improvements, deployed to both GitHub Pages and Netlify. The site features WCAG 2.1 AA compliance with comprehensive testing infrastructure.

## Architecture

- **Hugo Static Site Generator**: Uses Hugo v0.146.0 (production) with PaperMod theme
- **Theme Management**: PaperMod theme installed as Git submodule in `themes/PaperMod/`
- **Custom Layouts**: Accessibility-enhanced templates in `layouts/partials/` and `layouts/_default/`
- **Accessibility Features**: Semantic landmarks, ARIA attributes, heading validation, focus management, reduced motion support, and high contrast themes
- **Dual Deployment**: Automated deployment to both GitHub Pages (via Actions) and Netlify

## Common Development Commands

### Local Development
```bash
# Start local development server with live reload
hugo serve --disableFastRender

# Build for production
hugo --minify

# Clean build directory before building
hugo --cleanDestinationDir

# Help with Hugo commands
hugo help
```

### Theme Management
```bash
# Update PaperMod theme to latest version
git submodule update --remote themes/PaperMod

# Alternative update method
cd themes/PaperMod
git fetch origin
git merge origin/main
cd ../..

# After theme updates, commit the submodule pointer
git add themes/PaperMod
git commit -m "Update PaperMod theme"
```

### Content Creation
```bash
# Create new post
hugo new posts/your-post-title.md

# Preview locally (serves at http://localhost:1313)
hugo serve

# When ready to publish, commit and push to main branch
git add .
git commit -m "Add new post: your-post-title"
git push origin main
```

## Deployment

### GitHub Pages
- **Workflow**: `.github/workflows/hugo.yml`
- **Trigger**: Push to `main` branch
- **Process**: Downloads Hugo v0.146.0, builds with `--minify`, copies `CNAME`, deploys to GitHub Pages
- **URL**: Configured via `CNAME` file

### Netlify
- **Configuration**: `netlify.toml`
- **Build Command**: `hugo --gc --minify`
- **Publish Directory**: `public`
- **Environment**: Hugo v0.146.0, Git info enabled for production
- **Local Testing**: When using MCP, run `netlify dev &` in background

## Accessibility Testing

This project has comprehensive accessibility infrastructure:

### Automated Testing
- **Test Page**: `accessibility-test.html` (includes axe-core integration)
- **Validation Script**: `validate-accessibility.js` (run in browser console)
- **Documentation**: `ACCESSIBILITY.md` (complete implementation guide)

### Manual Testing Checklist
- Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Color contrast verification (WebAIM Contrast Checker)
- Focus management and skip links
- Mobile menu accessibility

### WCAG 2.1 AA Compliance Features
- Semantic HTML landmarks (main, nav, header, footer)
- Proper heading hierarchy validation
- ARIA labels for icons and interactive elements
- High contrast and reduced motion support
- Focus trapping in mobile menus
- Skip navigation links

## Key Configuration Files

- **`config.toml`**: Hugo site configuration, theme parameters, menu structure
- **`netlify.toml`**: Netlify build settings, redirects, security headers
- **`.github/workflows/hugo.yml`**: GitHub Actions CI/CD pipeline
- **`ACCESSIBILITY.md`**: Comprehensive accessibility documentation
- **Theme Files**: Custom accessibility enhancements in `layouts/partials/`

## Content Structure

- **Posts**: Create in `content/posts/` with proper front matter
- **Tags & Categories**: Use YAML front matter for organization
- **Static Files**: Place in `static/` directory (e.g., `static/CNAME`)
- **Custom Layouts**: Override theme templates in `layouts/` directory

## Special Notes

- Always test accessibility changes using provided validation tools
- Maintain WCAG 2.1 AA compliance when making layout modifications  
- Both deployment targets (GitHub Pages and Netlify) should remain functional
- Theme updates require committing the submodule pointer change
- Local development server runs at `http://localhost:1313`
