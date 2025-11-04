# TODO: Fix Page Overflow Issues on iPhone SE

## Tasks

- [x] Update #root in App.css: Change max-width from 100vw to 100%
- [x] Add overflow-x: hidden to body in index.css to prevent horizontal scrolling
- [x] In DedicatedArticlePage.module.css: Add max-width: 100% and box-sizing: border-box to .article; reduce margins on .content div for screens <=767px
- [x] In Article.module.css: Ensure .article has max-width: 100% and box-sizing: border-box
- [x] In Articles.module.css: Change width: 100vw to width: 100% in .articles
- [x] In Links.module.css: Change width: 100vw to width: 100% in .container
- [x] In SelectedArticles.module.css: Add max-width: 100% and box-sizing: border-box to .article; add responsive styles and content styling
- [x] Fix dropdown menu scrolling on mobile: Add overscroll-behavior: contain, -webkit-overflow-scrolling: touch, and touch-action: none to prevent page scrolling
- [x] Test the changes by running the app and simulating iPhone SE (375px width) in browser dev tools to verify no overflow
