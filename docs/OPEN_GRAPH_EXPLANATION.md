# Open Graph Protocol - Complete Guide

## 🎯 What is Open Graph Protocol?

Open Graph Protocol (OGP) is a protocol that allows any web page to become a rich object in social media platforms. It uses HTML meta tags to describe the content of your page.

## 🔍 How It Works

When someone shares your website link on social media (Facebook, LinkedIn, Twitter, WhatsApp, etc.), these platforms crawl your page and look for specific meta tags in the `<head>` section:

```html
<meta property="og:title" content="RamK Infotech" />
<meta property="og:description" content="Expanding Technologies" />
<meta property="og:image" content="https://www.ramkinfotech.com/images/hero-img.webp" />
<meta property="og:url" content="https://www.ramkinfotech.com" />
<meta property="og:type" content="website" />
```

These tags tell social media platforms:
- **What title** to show
- **What description** to display
- **What image** to preview
- **What URL** it links to
- **What type** of content it is

## ✅ Why It's Used

### 1. **Better Social Media Presence**
- Without OG tags: Social media shows a generic link preview
- With OG tags: Shows a rich preview with image, title, and description

### 2. **Increased Click-Through Rates**
- Eye-catching previews get more clicks
- Professional appearance builds trust
- Visual previews are more engaging

### 3. **Brand Consistency**
- Control how your site appears when shared
- Consistent branding across all platforms
- Professional image

### 4. **SEO Benefits**
- Better visibility in search results
- Improved social signals
- Higher engagement rates

## 📍 Where It's Used

### Social Media Platforms:
1. **Facebook** - Uses OG tags for link previews
2. **LinkedIn** - Uses OG tags for professional sharing
3. **Twitter** - Uses Twitter Card tags (similar to OG)
4. **WhatsApp** - Shows OG previews in chats
5. **Telegram** - Displays OG previews
6. **Slack** - Shows link previews with OG data
7. **Discord** - Uses OG tags for link embeds

### Example Scenarios:

**Scenario 1: Someone shares your homepage on Facebook**
```
User shares: https://www.ramkinfotech.com

Facebook shows:
┌─────────────────────────────┐
│  [Hero Image]               │
│  RamK Infotech              │
│  Expanding Technologies     │
│  ramkinfotech.com           │
└─────────────────────────────┘
```

**Scenario 2: Someone shares a course page on LinkedIn**
```
User shares: https://www.ramkinfotech.com/courses/web-development

LinkedIn shows:
┌─────────────────────────────┐
│  [Course Image]             │
│  Web Development Course     │
│  Learn web development...   │
│  ramkinfotech.com           │
└─────────────────────────────┘
```

## 🔧 Implementation in Your Site

### In `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://www.ramkinfotech.com"), // Base URL for all images
  openGraph: {
    title: "RamK Infotech",           // og:title
    description: "Expanding Technologies", // og:description
    url: "/",                          // og:url
    siteName: "RamK Infotech",        // og:site_name
    images: [{                         // og:image
      url: images.heroimg.src,
      width: 1200,
      height: 630,
      alt: "RamK Infotech",
    }],
    locale: "en_US",                   // og:locale
    type: "website",                   // og:type
  },
  twitter: {
    card: "summary_large_image",      // Twitter Card type
    title: "RamK Infotech",           // twitter:title
    description: "Expanding Technologies", // twitter:description
    images: [images.heroimg.src],      // twitter:image
  },
};
```

### What Gets Generated:

Next.js automatically converts this to HTML meta tags:

```html
<meta property="og:title" content="RamK Infotech" />
<meta property="og:description" content="Expanding Technologies" />
<meta property="og:image" content="https://www.ramkinfotech.com/images/hero-img.webp" />
<meta property="og:url" content="https://www.ramkinfotech.com/" />
<meta property="og:site_name" content="RamK Infotech" />
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="RamK Infotech" />
<meta name="twitter:description" content="Expanding Technologies" />
<meta name="twitter:image" content="https://www.ramkinfotech.com/images/hero-img.webp" />
```

## 🎨 Image Requirements

### Recommended OG Image Size:
- **Dimensions**: 1200 x 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: PNG or JPG
- **File Size**: Under 8MB (recommended < 1MB)

### Why These Dimensions?
- Facebook requires: 1200x630px minimum
- LinkedIn uses: 1200x627px
- Twitter large image: 1200x675px
- 1200x630 works well across all platforms

## 🔄 Per-Page Overrides

You can override OG tags for specific pages:

### Example: Course Page
```typescript
// src/app/courses/[courseName]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const course = findCourseBySlug(params.courseName);
  
  return {
    title: course.name,
    description: course.description,
    openGraph: {
      title: course.name,
      description: course.description,
      images: [course.image],
      url: `/courses/${params.courseName}`,
    },
  };
}
```

## 🧪 Testing Your OG Tags

### 1. **Facebook Debugger**
- URL: https://developers.facebook.com/tools/debug/
- Enter your URL and click "Scrape Again"
- Shows how Facebook sees your page

### 2. **Twitter Card Validator**
- URL: https://cards-dev.twitter.com/validator
- Test how your link appears on Twitter

### 3. **LinkedIn Post Inspector**
- URL: https://www.linkedin.com/post-inspector/
- Preview how your link looks on LinkedIn

### 4. **Open Graph Preview**
- URL: https://www.opengraph.xyz/
- Preview how your link appears on multiple platforms

## 📊 Real-World Impact

### Before OG Tags:
- Generic link preview
- No image shown
- Lower click-through rate (~2-3%)
- Less professional appearance

### After OG Tags:
- Rich preview with image
- Professional appearance
- Higher click-through rate (~5-8%)
- Better brand recognition

## 🚀 Best Practices

1. **Always include an image** - Visuals increase engagement
2. **Keep descriptions concise** - 150-200 characters
3. **Use absolute URLs** - For images and URLs
4. **Test regularly** - Use debugging tools
5. **Override per page** - Different content for different pages
6. **Keep images optimized** - Fast loading times

## 📝 Summary

Open Graph Protocol is essential for:
- ✅ Professional social media presence
- ✅ Higher engagement rates
- ✅ Better brand visibility
- ✅ Improved SEO signals
- ✅ Consistent user experience

Your site now has OG tags implemented, so when anyone shares your website on social media, it will show a beautiful preview with your image, title, and description!

