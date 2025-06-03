---
title: "Demystifying the GitHub Actions Workflow for Our Hugo Blog"
date: 2025-06-02
draft: false
tags: ["github-actions", "hugo", "devops", "tutorial"]
categories: ["Technical"]
---

After a bit of a journey, we've landed on a stable GitHub Actions workflow to automatically build and deploy our Hugo blog with the PaperMod theme to GitHub Pages. This post breaks down the key components and versions used, so you can replicate this success or understand what makes it tick!

## Workflow Structure Overview

Our workflow, defined in `.github/workflows/hugo.yml`, uses a single job named `deploy`. This job handles everything from checking out the code to deploying the final built site.

Here's a high-level view of the steps involved in the `deploy` job:

1.  **Checkout Code:** Fetches the latest version of your repository, including submodules (for the theme).
2.  **Setup Hugo:** Downloads and installs the specific version of Hugo required by the PaperMod theme.
3.  **Build Site:** Runs the `hugo` command to generate the static site files. It also copies the `CNAME` file for our custom domain into the output directory.
4.  **Setup Pages:** Configures the environment for GitHub Pages deployment.
5.  **Upload Artifact:** Bundles the built site (from the `public` directory) into an artifact that GitHub Pages can use.
6.  **Deploy to GitHub Pages:** Takes the uploaded artifact and deploys it.

## Key GitHub Actions and Versions

Getting the versions of the GitHub Actions right was crucial. Here's what we're using:

*   **`actions/checkout@v4`**:
    *   **Purpose:** Checks out your repository under `$GITHUB_WORKSPACE`, so your workflow can access it.
    *   **Configuration:** Used with `submodules: true` to ensure the PaperMod theme (which is a submodule) is also fetched, and `fetch-depth: 0` to get the full git history (useful for some Hugo features).

*   **Manual Hugo Installation (v0.146.0)**:
    *   **Purpose:** Instead of a dedicated "setup Hugo" action, we directly download and install a specific Hugo version. This was done because the PaperMod theme requires Hugo `v0.146.0` or newer.
    *   **Method:**
        ```bash
        HUGO_VERSION=0.146.0
        wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
        && sudo dpkg -i ${{ runner.temp }}/hugo.deb
        ```

*   **`actions/configure-pages@v4`**:
    *   **Purpose:** This action configures the GitHub Pages environment, preparing it for the deployment. It helps set up necessary environment variables and settings.

*   **`actions/upload-pages-artifact@v3`**:
    *   **Purpose:** Takes the output of your Hugo build (typically the `public/` directory) and uploads it as an artifact specifically designed for GitHub Pages.
    *   **Note:** We landed on `v3` as the latest stable version that resolved previous "Missing download info" errors which occurred due to GitHub deprecating older artifact action versions.

*   **`actions/deploy-pages@v4`**:
    *   **Purpose:** This is the final step that actually deploys the uploaded artifact to GitHub Pages, making your site live.

## Permissions

The workflow also specifies necessary permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

These are important for allowing the actions to read your repository content, write to GitHub Pages, and use an ID token for authentication.

## Conclusion

This setup ensures that every push to the `main` branch (or a manual dispatch) triggers a fresh build and deployment of the Hugo site. By using specific versions for the actions and Hugo itself, we maintain stability and avoid issues caused by unexpected updates or deprecations.

Hopefully, this detailed breakdown helps if you're setting up a similar Hugo deployment! 