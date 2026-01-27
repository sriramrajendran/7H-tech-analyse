# Blog Post Template

This template serves as a guide for creating new blog posts in markdown format for the BeaconOfTech blog system.

## File Structure

```
assets/blog/
├── template.md                 # This template file
├── your-blog-post.md          # Your new blog post
└── existing-posts.md          # Existing blog posts
```

## How to Create a New Blog Post

### 1. Create the Markdown File
Create a new `.md` file in the `assets/blog/` directory with a descriptive name.

### 2. Add Blog Entry to blog.js
Update the `blogPosts` array in `/assets/js/modules/blog.js`:

```javascript
{
    id: 7, // Next available ID
    title: "Your Blog Post Title",
    excerpt: "A brief description of your blog post (1-2 sentences).",
    category: "Category Name",
    date: "2026-01-27", // Current date
    readTime: "5 min", // Estimated reading time
    tags: ["tag1", "tag2", "tag3"],
    contentType: "markdown",
    markdownFile: "assets/blog/your-blog-post.md"
}
```

### 3. Write Your Content
Use the markdown structure below as a template:

---
# Your Blog Post Title

**Category:** Category Name  
**Date:** January 27, 2026  
**Read Time:** 5 minutes  
**Tags:** #tag1 #tag2 #tag3

## Introduction

Write a compelling introduction that hooks the reader and explains what they'll learn.

## Main Section 1

### Subsection 1.1

Use **bold** for emphasis and *italic* for emphasis.

### Subsection 1.2

Use code blocks for code examples:

```javascript
function example() {
    console.log("Hello, World!");
}
```

## Main Section 2

Use bullet points for lists:
- Point 1
- Point 2
- Point 3

Or numbered lists:
1. First step
2. Second step
3. Third step

## Conclusion

Summarize the key takeaways and provide next steps for the reader.

---

## Supported Markdown Features

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
__Bold text__
_Italic text_
```

### Code
```markdown
`Inline code`

```javascript
// Code block with syntax highlighting
function example() {
    return "Hello";
}
```
```

### Links
```markdown
[Link text](https://example.com)
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

## Best Practices

1. **Keep titles concise** - Under 60 characters
2. **Write clear excerpts** - 1-2 sentences that summarize the content
3. **Use proper structure** - Headers, lists, and code blocks
4. **Add relevant tags** - 3-5 tags maximum
5. **Estimate read time** - Based on 200 words per minute
6. **Use descriptive filenames** - kebab-case, no spaces

## Categories

Common categories used in the blog:
- Project Management
- Gen AI
- Serverless
- Architecture
- Frontend
- Backend
- DevOps
- Security
- JavaScript
- React
- Node.js
- Cloud
- AI/ML

## Tips for Writing Great Blog Posts

1. **Use clear, descriptive titles**
2. **Write compelling excerpts** (around 150 characters)
3. **Include relevant tags** for better discoverability
4. **Estimate reading time** accurately
5. **Use proper markdown formatting** for readability
6. **Include code examples** where helpful
7. **Add internal and external links** for context

## Example Blog Post Structure

```markdown
# Your Amazing Blog Post

A brief introduction to your topic.

## Main Point 1

Detailed explanation with examples.

### Sub-point

More specific details.

## Code Example

```javascript
function example() {
    return "Hello, World!";
}
```

## Conclusion

Summary and key takeaways.
```

## Testing

To test your markdown blog post:

1. Save your `.md` file in this directory
2. Add the blog post entry to `blog.js`
3. Open the application in your browser
4. Navigate to the Tech Blog section
5. Click on your blog post to verify rendering

The markdown content will be automatically converted to HTML when displayed.
