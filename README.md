# FPGA Code Reveal

A single-page static Cyclone IV FPGA simulation, ready for GitHub Pages.

## Customize

At the top of `script.js`, change:

```js
const SECRET_CODE = "582914";
```

Use any six numeric digits, including leading zeros. The board briefly tests all segments, counts from zero, then shows the code. The fourth digit from the left is green; the others are red.

## Deploy to GitHub Pages

1. Create a new public GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder to the repository root.
3. Open **Settings → Pages → Build and deployment**.
4. Select **Deploy from a branch**, then **main**, **/(root)**, and save.
5. Your site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/` after publication.

No backend, frameworks, build tools, or server needed.

**Note:** The six-digit code is not secret from someone inspecting the source code. This is suitable for a fun reveal or scavenger-hunt clue, not secure authentication.
