# Assets Directory Structure

This directory contains all static assets for the HavenFi application.

## 📁 Folder Organization

### `/images/`
- **Main images**: logos, hero backgrounds, general UI images
- **`/properties/`**: Property photos and thumbnails
- **`/team/`**: Team member photos
- **`/partners/`**: Partner logos and branding

### `/icons/`
- **Favicons**: favicon.ico, apple-touch-icon.png
- **Custom icons**: SVG icons and other icon files

### `/documents/`
- **Whitepaper**: whitepaper.pdf
- **Legal docs**: terms, privacy policy, etc.
- **Other PDFs**: documentation, guides

### `/videos/`
- **Promotional videos**: demo videos, explanations
- **Background videos**: hero section backgrounds

## 🎯 Usage Examples

```jsx
// Images
<Image src="/images/logo.svg" alt="HavenFi Logo" width={200} height={50} />
<img src="/images/properties/property1.jpg" alt="Property" />

// Documents
<a href="/documents/whitepaper.pdf" target="_blank">Whitepaper</a>

// Icons (in head tag)
<link rel="icon" href="/icons/favicon.ico" />
```

## 📝 Best Practices

1. **Optimize images** before uploading (WebP format recommended)
2. **Use descriptive filenames**: `luxury-apartment-miami.jpg` not `img1.jpg`
3. **Keep file sizes reasonable** for web performance
4. **Use Next.js Image component** for better optimization