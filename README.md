## Random Quote API

A simple REST API that returns inspirational quotes to inspire your projects.

### API Endpoint

```
GET https://quotejar.vercel.app/api/quote
```

### Response Format

```json
{
  "quote": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Usage Example

```javascript
const response = await fetch('https://quotejar.vercel.app/api/quote');
const quote = await response.json();
console.log(quote);
```

### Live Demo

Visit [https://quotejar.vercel.app/](https://quotejar.vercel.app/) to see the API in action.
