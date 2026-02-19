# 🚀 Deployment Guide - Chad GPT Store

This guide provides step-by-step instructions for deploying your badass Shopify store.

## 📋 Table of Contents
- [Option 1: Deploy to Shopify (Recommended)](#option-1-deploy-to-shopify-recommended)
- [Option 2: Deploy as Static Site](#option-2-deploy-as-static-site)
- [Option 3: Local Development](#option-3-local-development)

---

## Option 1: Deploy to Shopify (Recommended)

This is the best option if you want full e-commerce functionality with Shopify's backend.

### Prerequisites
- A Shopify account (free trial available at [shopify.com](https://www.shopify.com))
- Shopify CLI installed
- Node.js 16+ installed

### Step 1: Install Shopify CLI

```bash
# Using npm
npm install -g @shopify/cli @shopify/theme

# Or using Homebrew (Mac)
brew tap shopify/shopify
brew install shopify-cli
```

### Step 2: Authenticate with Shopify

```bash
shopify auth login
```

This will open a browser window for you to log into your Shopify account.

### Step 3: Connect to Your Store

```bash
shopify theme init
```

Follow the prompts to connect to your Shopify store.

### Step 4: Push the Theme to Shopify

From the repository root directory:

```bash
# Preview the theme on your development store
shopify theme dev

# Or push directly to your store
shopify theme push
```

### Step 5: Customize Your Store

1. Log into your Shopify admin panel
2. Go to **Online Store > Themes**
3. Click **Customize** on the Chad GPT theme
4. Configure colors, fonts, and settings using the theme editor
5. Add your products under **Products**
6. Configure your collection under **Products > Collections**

### Step 6: Go Live

1. In your Shopify admin, go to **Online Store > Themes**
2. Find the Chad GPT theme
3. Click **Publish** to make it your live theme

---

## Option 2: Deploy as Static Site

If you want to use this as a demo or portfolio piece without full Shopify integration.

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Manual Deployment:**

1. **Create a Netlify account** at [netlify.com](https://www.netlify.com)

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Initialize and Deploy:**
   ```bash
   cd /path/to/CHAD_GPT
   netlify init
   netlify deploy --prod
   ```

4. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `./`

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Manual Deployment:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /path/to/CHAD_GPT
   vercel
   ```

3. **Configure:**
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `./`

### Deploy to GitHub Pages

1. **Create a `.github/workflows/deploy.yml` file:**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages
   - Select `gh-pages` branch as source

---

## Option 3: Local Development

Perfect for testing and development before deploying.

### Using Python HTTP Server

```bash
cd /path/to/CHAD_GPT
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Using Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run the server
cd /path/to/CHAD_GPT
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Using Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

---

## 🎨 Post-Deployment Configuration

### Customizing Your Store

#### 1. Update Store Information
Edit `index.html` to customize:
- Store name and branding
- Hero section content
- About section information
- Footer links and contact info

#### 2. Add Your Products
For Shopify deployment:
- Products are managed in Shopify admin
- The theme automatically displays them

For static deployment:
- Edit `assets/js/main.js`
- Update the `products` array with your items

#### 3. Configure Colors and Theme
Edit `assets/css/styles.css`:
```css
:root {
  --primary-color: #6366f1;  /* Your brand color */
  --secondary-color: #06b6d4;
  --accent-color: #f59e0b;
  /* Add more custom colors */
}
```

#### 4. Set Up Analytics
Add Google Analytics or other tracking:
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔧 Troubleshooting

### Common Issues

**Issue: Theme doesn't appear in Shopify**
- Solution: Make sure all required Shopify theme files are present (layout/theme.liquid, config/settings_schema.json)

**Issue: Products not loading**
- For Shopify: Check that you've added products in admin and assigned them to a collection
- For static: Verify the products array in `assets/js/main.js`

**Issue: Cart not working on static site**
- Solution: The cart requires Shopify backend. For static sites, consider integrating with [Snipcart](https://snipcart.com/) or [Gumroad](https://gumroad.com/)

**Issue: Images not loading**
- Solution: Check that image paths are correct and assets are uploaded

---

## 📦 Production Checklist

Before going live, ensure:

- [ ] All products are added with descriptions and images
- [ ] Payment gateway is configured (Shopify only)
- [ ] Shipping rates are set up (Shopify only)
- [ ] Legal pages added (Privacy Policy, Terms of Service, Refund Policy)
- [ ] Domain name configured
- [ ] SSL certificate is active (usually automatic)
- [ ] Google Analytics or tracking is set up
- [ ] Site tested on multiple devices and browsers
- [ ] Performance optimized (images compressed, etc.)
- [ ] SEO meta tags configured

---

## 🎯 Next Steps

1. **Customize Content**: Update all text and branding to match your store
2. **Add Products**: Populate your store with real products
3. **Test Everything**: Try the full checkout process
4. **Marketing**: Set up email marketing and social media
5. **Go Live**: Remove any "Coming Soon" notices and launch!

---

## 📚 Additional Resources

- [Shopify Theme Documentation](https://shopify.dev/themes)
- [Shopify CLI Documentation](https://shopify.dev/themes/tools/cli)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)

---

## 💬 Need Help?

- Check out the [Shopify Community Forums](https://community.shopify.com/)
- Review the code documentation in this repository
- File an issue on GitHub if you encounter bugs

---

**Happy Selling! 🎉**