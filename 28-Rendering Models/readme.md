# Web Rendering Architectures

> The SPA model — where React lives in the browser, calls your Express API for data, and owns every rendering decision — isn't the only way to build for the web, and depending on what you're building, it might not even be the best way.

🚗 Think of it like choosing a car for a daily trip to the grocery store. You could drive a $300k supercar — it'll get you there. But a sensible person asks before buying: what are the actual requirements? How far am I going? What's the running cost? What happens when something breaks?

> 💡 The right tool isn't always the most powerful one — it's the one that fits the job.

These are the patterns worth understanding before a single line of code gets written, because choosing the wrong one early is a lot cheaper to fix on a whiteboard than in production.

## At a Glance

| Pattern | Where rendering happens | Who fetches the data? | What the browser receives | SEO | Best for |
|---|---|---|---|---|---|
| Classic Server-Side Rendering | Server | 🖥️ Server | Full HTML + CSS | ✅ | Content sites, blogs |
| Single Page App (SPA) | Browser | 🌐 Browser | Empty HTML + JS bundle | ❌ | Apps, dashboards |
| Server-Side Rendering (SSR) | Server → then Browser | 🖥️ Server | Full HTML + JS bundle | ✅ | E-commerce, media |
| React Server Components (RSC) | Per component (mixed) | 🖥️ Server + 🌐 Browser | HTML + smaller JS bundle | ✅ | Full-stack React apps |
| Static Site Generation (SSG) | Build time (CDN) | 🖥️ Server (at build time) | Pre-built HTML + CSS | ✅ | Docs, portfolios |

The single most important column here is **"Who fetches the data?"** — it's the clearest way to understand what makes each model different. In a SPA, the browser is doing the fetching itself, which is why you see that loading spinner. In every other model, the server has already done the fetching before anything reaches the browser.

## 1. 🏛️ The Classic Model: Server-Rendered HTML (before React)

Before React existed, every page on the web worked the same way. You clicked a link, the browser sent a request to a server, and the server sent back a **complete, fully-built HTML document** — data already filled in, structure already there, ready to paint.

The server did everything. It hit the database, pulled the data, dropped it into an HTML template, and shipped the finished page. The browser's only job was to display it. JavaScript existed, but it was mostly used for small things — a dropdown menu, a form validation message, maybe an image carousel. The *page itself* came from the server.

```
Browser ──GET /page──▶ Server (fetches DB, renders HTML) ──Full HTML──▶ Browser paints page
```

### The tools — then and now

The core mechanic was a **templating language**: the server would receive a request for something like `/products/42`, query the database, and inject the data into an HTML template before sending it back. The most common tools for this were:

- **PHP** — by far the most widely used. WordPress, Facebook (early), and a huge portion of the web ran on PHP. You'd write HTML files with PHP tags mixed in: `<h1><?php echo $product->name; ?></h1>`
- **Ruby on Rails** — popularised the MVC pattern for web apps, used `.erb` templates to inject Ruby into HTML
- **Django (Python)** — same idea, with Python and its own templating syntax
- **Java with JSP / Spring MVC** — common in enterprise environments
- **ASP.NET (C#)** — Microsoft's stack, still widely used in corporate apps
- **Node.js with Express** — once Node arrived, you could do the same pattern in JavaScript using template engines like **Handlebars**, **EJS**, or **Pug**

None of this is just history. Most of these tools are still actively used today:

- **WordPress** still powers over 43% of the web and is still PHP rendering HTML on the server. The block editor (Gutenberg) is built with React, but that's just the admin interface — the pages themselves are still rendered by PHP
- **Laravel** (PHP) has seen a major resurgence as a modern, well-structured take on the classic model
- **Rails** and **Django** are still go-to choices for teams that want to move fast without the complexity of a separate frontend
- **Express with EJS or Handlebars** is a completely valid stack today, especially for smaller projects or teams already working in Node

### When to still consider this model

A good rule of thumb: if your users are primarily **reading** rather than **doing**, and Google being able to find your content matters, the classic model is a serious option — not a fallback. It's a genuinely good fit for:

- **Content-heavy sites** — blogs, news sites, magazines, documentation. The content doesn't change per user, SEO matters, and you don't need app-like interactivity
- **E-commerce stores** — product pages, category listings, checkout flows. WordPress + WooCommerce and Rails-based Shopify stores are proof this model scales
- **Company and marketing sites** — landing pages, about pages, pricing pages. No reason to reach for React when the page barely changes
- **Government and institutional sites** — accessibility and reliability matter more than interactivity; server-rendered HTML is the safest bet
- **Forums and community sites** — Reddit was server-rendered for years; Stack Overflow still largely is
- **Admin dashboards and internal tools** — especially in enterprises where the team knows Rails, Django, or Laravel and doesn't need a slick SPA

### Advantages

- The browser gets fully-built HTML immediately — no waiting for JavaScript to run
- Search engines can read the page without executing any JS
- Works on any device, including low-end phones with slow processors
- Simple mental model: one request, one response, one page

### Disadvantages

- Every navigation meant a full round-trip to the server and a complete page reload — the screen would go blank and repaint, which felt clunky for anything interactive
- The backend and frontend were tightly coupled — your server had to know about your UI, and changing one often meant touching the other
- Harder to build rich, app-like experiences (think Gmail or Google Maps) — the page-reload model just wasn't designed for that

## 2. ⚛️ The React / SPA Era: The Browser Does the Rendering

React (released 2013) popularised a fundamentally different approach. Instead of the server sending complete HTML, the server (or a CDN) sends a nearly-empty HTML shell and a large JavaScript bundle. React runs **in the browser**, fetches data as JSON from an API, and constructs the entire page in JavaScript.

This is the architecture you just learned — the backend sends only JSON, React owns every rendering decision, and the user's machine does all the work.

### What actually happens in the browser

When you open a React SPA, the browser receives HTML that looks roughly like this:

```html
<body>
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>
```

There is no real content in that HTML. The browser downloads `bundle.js` (your entire app), executes it, and React calls `createRoot` and starts rendering components into `#root`. Those components need data, so they fire `fetch()` calls to your Express/Node backend. The backend returns JSON. React takes that JSON, flows it through your component tree as props and state, and produces DOM nodes the browser finally paints as visible content.

```
CDN ──bundle.js──▶ Browser runs React
                        │
                        ▼
                   React fires fetch()
                        │
                        ▼
               Node/Express API ──JSON──▶ React renders components ──▶ User sees page
```

The key shift here: **rendering is happening on the user's machine, not on a server.** The server is no longer in charge of what the page looks like — it just hands over data and gets out of the way.

### The tools

The SPA model didn't arrive with React alone. A whole ecosystem grew around it:

- **React** — the dominant UI library, built by Facebook. Component-based, declarative, and designed around the idea of UI as a function of state
- **Vue.js** — a lighter, more approachable alternative to React that follows the same SPA model
- **Angular** — Google's full framework for SPAs, popular in enterprise environments
- **Vite / Webpack** — bundlers that take your JavaScript modules and package them into the `bundle.js` the browser downloads
- **React Router** — handles client-side navigation so clicking a link doesn't trigger a real page load
- **Axios / Fetch API** — how your React app talks to your Express backend to get JSON
- **Redux / Zustand / React Query** — state management tools for handling the data your components need once it arrives from the API

On the backend, the server's job became much simpler — just return JSON. Your Express app stops caring about HTML entirely:

```js
app.get('/api/products/:id', async (req, res) => {
  const product = await db.getProduct(req.params.id);
  res.json(product); // that's it — no templates, no HTML
});
```

### When this model makes sense

SPAs are a genuinely good fit when your app is more of an **application** than a **document**:

- **Dashboards and admin panels** — lots of interactivity, data that updates in real time, users who are logged in and don't need Google to find the page
- **Social media feeds** — infinite scroll, live updates, complex state across many components
- **SaaS products** — project management tools, design apps, anything where the user is *doing* things rather than reading
- **Internal tools** — employee portals, CRMs, anything behind a login where SEO is irrelevant
- **Apps that need to feel native** — drag-and-drop interfaces, real-time collaboration, complex multi-step forms

Well-known examples built as SPAs: Gmail, Figma, Notion, Trello.

### Advantages

- **Navigation feels instant** after the initial load — switching between pages doesn't trigger a server round-trip; React just swaps what's rendered
- **Rich interactivity is natural** — modals, live search, drag-and-drop, real-time updates all live in the same JavaScript environment
- **Clean separation of concerns** — your backend is just an API with no knowledge of the UI; it could serve a mobile app or third-party integration equally well
- **Offline capability** — since logic lives in the browser, PWAs can cache data and work without a network connection

### Disadvantages

- **Slow first load** — the user sees a blank screen while the JS bundle downloads, parses, and executes. The larger your app grows, the worse this gets. This is known as the *Time to Interactive (TTI)* problem
- **SEO is hard** — when a search engine bot visits your page, it sees that empty `<div id="root">`. Bots traditionally don't execute JavaScript, so your content is invisible to Google without extra work
- **Performance on slow devices** — parsing and executing megabytes of JavaScript on a low-end phone is expensive; the classic model just paints HTML, which browsers handle extremely fast
- **Waterfall requests** — the browser must: download HTML → download JS → execute JS → fetch data → render. Multiple sequential round-trips before the user sees anything meaningful

## 3. 🔄 Server-Side Rendering (SSR): The Hybrid Comeback

SPAs solved the interactivity problem but introduced new ones — slow first loads, blank screens, and pages Google couldn't read. The industry's response was to take the best of both worlds: render the initial HTML on the server like the classic model, but then hand control to React in the browser for everything after that.

This is **Server-Side Rendering (SSR)** — and it's what frameworks like Next.js are built around.

### The key concept: Hydration

The server runs React, generates full HTML, and sends it to the browser. The user sees a real page immediately — no blank screen, no waiting for JavaScript. But the browser also downloads the JS bundle in the background. Once it's ready, React "wakes up" the static HTML by attaching event listeners and taking over. This handoff process is called **hydration**.

A useful mental model: the server sends a photograph of your app, and hydration turns that photograph into the real, interactive thing.

```
Request ──▶ Server runs React ──Full HTML──▶ Browser paints page immediately
                                                  │
                                     JS bundle downloads in background
                                                  │
                                     React hydrates the HTML (attaches events)
                                                  │
                                             Page is now interactive
```

### The tools

SSR with React isn't something you wire up yourself from scratch — it's complex enough that frameworks handle it for you:

- **Next.js** — the dominant choice. Built by Vercel, it gives you SSR, SSG, and client-side rendering in one framework. Most teams reaching for SSR are using Next.js
- **Remix** — a more opinionated framework that leans heavily into SSR and web platform fundamentals. Popular with teams who find Next.js too much
- **Astro** — primarily a static site generator but supports SSR; great for content-heavy sites that need some dynamic pages
- **Express + ReactDOMServer** — you can roll your own SSR with Node and `renderToString()` from `react-dom/server`, but most teams don't bother when Next.js exists

What SSR changes about your backend: instead of Express just serving JSON to a React frontend, your server is now also responsible for rendering the initial HTML. In the older Next.js Pages Router, this happened in `getServerSideProps` — a function that runs on the server on every request, fetches data, and passes it to your component before the HTML is sent:

```js
// Pages Router (still valid, but older pattern)
export async function getServerSideProps(context) {
  const product = await db.getProduct(context.params.id);
  return { props: { product } }; // passed to the component server-side
}
```

In the modern Next.js App Router (Next.js 16), `getServerSideProps` is gone. Instead, you just write an async server component that fetches data directly — no special function needed:

```js
// App Router (modern pattern)
export default async function ProductPage({ params }) {
  const product = await db.getProduct(params.id); // runs on the server, no API needed
  return <div>{product.name}</div>;
}
```

### When this model makes sense

SSR hits a sweet spot when you need both **SEO and interactivity** — something a pure SPA can't give you without a lot of extra work:

- **E-commerce product pages** — the page needs to be indexed by Google, but the cart, size selector, and reviews need to be interactive. Amazon, Shopify storefronts, and most modern e-commerce runs on some form of SSR
- **News and media sites** — articles need to be crawlable and shareable, but comment sections and live feeds need JavaScript. The Guardian, BBC News, and most major publications use SSR
- **Marketing and landing pages** — SEO is the primary concern, but a contact form, video player, or interactive pricing table still needs JS
- **Authenticated dashboards** — the server can verify a session and redirect before sending any HTML, preventing the flash of unauthenticated content you get with SPAs
- **Social platforms** — Twitter, LinkedIn, and Reddit all moved toward SSR after running into the SEO and performance limits of pure SPAs

### Advantages

- **Fast first paint** — the user sees real content immediately, without waiting for JavaScript to execute
- **SEO works out of the box** — search engine bots receive fully-rendered HTML with no extra configuration
- **Social sharing works** — Open Graph tags (`og:title`, `og:image`) are populated server-side, so link previews on Slack, Twitter, and iMessage actually show content
- **Better perceived performance on slow devices** — the server does the heavy rendering work, so low-end phones don't have to

### Disadvantages

- **Server costs go up** — every request now requires a server to run React, not just serve a static file from a CDN. At scale, this adds up
- **Hydration overhead** — the browser still downloads and executes the full JS bundle to make the page interactive. Users can see content before hydration completes but can't interact with it yet — buttons don't work, forms don't respond. This gap between "looks ready" and "is ready" is sometimes called the hydration uncanny valley
- **Running React in two environments** — your components run on the server (Node) and in the browser, which can cause subtle mismatches if you're not careful. Anything that touches `window` or `document` will break server-side
- **TTFB can be slower than static** — the server has to build the full HTML before sending anything, which adds latency compared to just serving a pre-built file from a CDN

## 4. 🧩 React Server Components (RSC): Not Just SSR With a New Name

If your first reaction to RSC is "wait, isn't this just SSR?" — that's a completely reasonable take. Both involve running React on the server. But they're solving different problems, and understanding the distinction is what makes RSC click.

**SSR** is a page-level strategy for the initial load. The server renders the full page to HTML, sends it to the browser, and React hydrates it. After that, everything runs in the browser as normal — your entire component tree eventually ships JavaScript to the client.

**RSC** is a component-level architecture that's permanent. A server component doesn't just render on the server for the first request — it *always* runs on the server. It never becomes a client component, never ships JavaScript to the browser, and can talk directly to a database on every render. The split between server and client happens at the component level, not the page level.

You can use SSR and RSC at the same time — Next.js 16 does exactly this. SSR handles the initial page render, and RSC determines which parts of your component tree live permanently on the server vs. the client.

### How RSC actually works

In all previous models, every React component eventually shipped JavaScript to the browser — even purely presentational ones like a page header, a footer, or a static article body. That JavaScript had to be downloaded, parsed, and executed, even if the component never needed interactivity.

RSC changes this by letting you mark components as server-only. They run on the server, return their rendered output, and send **zero JavaScript to the browser**. The browser just receives the result, not the code that produced it.

```
                    Component Tree
                         │
           ┌─────────────┼─────────────┐
           │             │             │
   ServerComponent   ServerComponent  ClientComponent
   (runs on server,  (reads directly  (ships JS to
    no JS sent)       from database)   browser, interactive)
```

Server components can read directly from a database, access the filesystem, or use secrets — without an API in between:

```js
// This is a server component — no 'use client' at the top
// It runs only on the server and never ships to the browser
async function ProductPage({ id }) {
  const product = await db.products.findById(id); // direct DB access, no fetch() needed

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton id={product.id} /> {/* this one IS a client component */}
    </div>
  );
}
```

Client components work exactly like React components always have — they just need a `'use client'` directive at the top:

```js
'use client';

function AddToCartButton({ id }) {
  const [added, setAdded] = useState(false); // useState works here — this runs in the browser
  return <button onClick={() => setAdded(true)}>{added ? 'Added!' : 'Add to cart'}</button>;
}
```

### The tools

RSC is a React feature, but it requires framework support to actually use — the underlying protocol for serialising server component output is complex enough that you wouldn't want to implement it yourself:

- **Next.js 16** — the primary place RSC exists in practice. The App Router is built entirely around RSC; components are server components by default and you opt into client components with `'use client'`
- **React Router v7 / Remix** — Remix merged into React Router v7, and RSC support is now in active preview. The team has shipped an experimental RSC-powered architecture that works alongside existing loader patterns, though it's not yet stable for production use
- **React core** — RSC is part of React itself, but without a framework handling the infrastructure, it's not practical to use standalone

### When this model makes sense

RSC is most valuable when you have a mix of **static, data-driven UI** and **interactive elements** on the same page:

- **E-commerce** — product listings, descriptions, and images are server components (fast, no JS, SEO-friendly); the cart, quantity picker, and reviews are client components
- **Content platforms** — articles, author bios, and related posts are server components; comment forms and like buttons are client components
- **Data-heavy dashboards** — tables, charts, and read-only data displays are server components; filters, date pickers, and modals are client components
- **Any large app where bundle size is a concern** — moving presentational components to the server can dramatically reduce the JavaScript a user has to download

### Advantages

- **Smaller JS bundles** — server components send no JavaScript to the client, which can significantly reduce what the browser has to download and parse
- **Direct data access** — server components can query a database or read from the filesystem without going through a REST API, removing an entire layer of indirection
- **Sensitive data stays on the server** — API keys, database credentials, and internal logic never leave the server environment
- **Streaming** — the server can stream server component output progressively, so the browser can start rendering parts of the page before the full response is ready

### Disadvantages

- **It's a genuinely new mental model** — thinking about which components live where, and what can and can't cross the server/client boundary, takes time to get comfortable with. It's one of the more conceptually challenging things in modern React
- **Tied to Next.js for now** — RSC is hard to use outside of Next.js. The protocol is complex and most other frameworks haven't fully adopted it yet
- **Debugging spans two environments** — an error can happen on the server, the client, or at the boundary between them, which makes tracing problems harder than in a pure SPA
- **`useState`, `useEffect`, and event handlers are client-only** — any component that needs interactivity must be a client component. Getting the split wrong is a common source of confusion early on

## 5. 🏗️ Static Site Generation (SSG): Pre-rendering at Build Time

SSR generates HTML on the server when a user visits — every request triggers a render. SSG asks a different question: if the content doesn't change that often, why render it on every request at all? Instead, run React once at **build time**, save the output as plain HTML files, and serve those files from a CDN.

No server. No rendering on request. Just files.

```
Build time:  React runs once ──▶ HTML files saved to disk ──▶ Deployed to CDN

Request time: User visits ──▶ CDN serves pre-built HTML instantly (no server needed)
```

### How SSG differs from SSR

| | SSR | SSG |
|---|---|---|
| When is HTML generated? | On every request | Once at build time |
| Requires a running server? | Yes | No — just a CDN |
| Content freshness | Always current | Stale until next build |
| Speed | Fast | Fastest possible |
| Cost | Server compute per request | Essentially free |

### The tools

SSG has a rich ecosystem — some tools are React-based, others are independent:

- **Next.js** — supports SSG alongside SSR. In the Pages Router, you opt into static generation per page using `getStaticProps`:

```js
// Pages Router (still valid, but older pattern)
export async function getStaticProps() {
  const posts = await getBlogPosts();
  return { props: { posts } }; // rendered once at build time, not per request
}
```

In the App Router (Next.js 16), static generation is the default — server components are pre-rendered at build time unless they use dynamic data. No special function needed.

- **Gatsby** — a React-based SSG that was the dominant choice before Next.js took over. Still used for blogs and marketing sites, though its popularity has faded
- **Astro** — a newer SSG that lets you use React, Vue, or plain HTML. Ships zero JavaScript by default — only the interactive parts get JS. A strong choice for content-heavy sites
- **Hugo** — not React-based, written in Go. Extremely fast build times. Popular for documentation and large content sites
- **Jekyll** — one of the original SSGs, built in Ruby. Tightly integrated with GitHub Pages. Still widely used for simple blogs and project docs
- **Eleventy (11ty)** — a lightweight, flexible SSG with no opinions about your JavaScript framework. Popular with developers who want full control

### When this model makes sense

SSG is the right call when your content is **stable, public, and needs to be fast**:

- **Documentation sites** — content changes infrequently, SEO matters, and fast load times are expected. Most major open source projects (React, Vue, Tailwind) use SSG for their docs
- **Blogs and editorial sites** — posts don't change after publishing. The entire site can be pre-built and served from a CDN with no backend running at all
- **Marketing and landing pages** — maximum performance, no dynamic data, and Lighthouse scores that make the marketing team happy
- **Portfolios** — personal sites and agency portfolios are a perfect fit; content rarely changes and there's no need for a running server
- **Product catalogues with stable inventory** — if your products don't change daily, pre-building the pages is faster and cheaper than rendering on every request

A useful way to think about it: if you could print your website out as a stack of HTML files and nothing would be wrong, SSG is probably the right model.

### Advantages

- **Fastest possible load times** — pre-built HTML served from a CDN edge node physically close to the user; zero server computation on request
- **Extremely cheap to host** — serving static files from a CDN is nearly free. Netlify, Vercel, and GitHub Pages all have generous free tiers for static sites
- **Scales effortlessly** — a CDN can absorb millions of simultaneous requests without breaking a sweat; there's no server to overload
- **Nothing to go down** — no server means no server outages. Static files on a CDN are about as reliable as hosting gets

### Disadvantages

- **Content goes stale** — if your data changes, you have to rebuild and redeploy the whole site. Not suitable for anything that updates frequently
- **Build times grow with scale** — a site with 100,000 pages has to regenerate all 100,000 on every build. This can take minutes or hours for large sites
- **No personalisation out of the box** — a pre-built HTML page is the same for every visitor. Showing user-specific content (a logged-in user's name, their cart) requires client-side JavaScript fetching data after the page loads — which starts to feel like a SPA bolted onto a static site

## 📋 Summary: Choosing the Right Model

| Pattern | When to use it |
|---|---|
| 🏛️ Classic Server-Side Rendering | Content sites, blogs, marketing pages — users are reading, not doing |
| ⚛️ Single Page App (SPA) | Highly interactive apps, dashboards, anything behind a login |
| 🔄 Server-Side Rendering (SSR) | Public pages that need both SEO and interactivity |
| 🧩 React Server Components (RSC) | Full-stack React apps wanting smaller bundles and direct DB access |
| 🏗️ Static Site Generation (SSG) | Docs, blogs, portfolios — content that rarely changes |

The key insight is that these aren't competing standards — they're tools on a spectrum. Most modern frameworks (Next.js in particular) let you **mix all of these patterns within a single application**, choosing the right rendering strategy for each page or even each component.

---

*This document covers web rendering architectures as they stood in early 2026. The field continues to evolve rapidly.*
