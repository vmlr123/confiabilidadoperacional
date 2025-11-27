# Website Optimization Plan

## 1. Image Optimization

- [ ] Compress images in src/assets/ using a tool like imagemin or sharp
- [ ] Add lazy loading to Article component images
- [ ] Add lazy loading to DedicatedArticlePage component images

## 2. Bundle Size Reduction

- [x] Audit package.json for unused dependencies
- [x] Remove unused dependencies (styled-components, voca) - react-draggable restored
- [x] Ensure tree-shaking is enabled in vite.config.ts (added manual chunks for code splitting)

## 3. Component Memoization

- [x] Add React.memo to App component
- [x] Add React.memo to Articles component
- [x] Add React.memo to DedicatedArticlePage component
- [x] Add React.memo to Article component
- [x] Add useMemo/useCallback to heavy state/effect logic in App.tsx

## 4. CSS Optimization

- [ ] Remove unused CSS classes in Article.module.css
- [ ] Remove unused CSS classes in DedicatedArticlePage.module.css
- [ ] Improve CSS specificity and reduce redundancy

## 5. Performance Enhancements

- [ ] Add service worker for caching static assets (create src/serviceWorker.ts)
- [ ] Implement code splitting for routes in App.tsx
- [ ] Optimize API fetches with caching in App.tsx

## 6. SEO and Accessibility

- [ ] Add meta tags to index.html
- [ ] Improve alt texts in components
- [ ] Ensure semantic HTML in components

## 7. General

- [x] Enable gzip compression in vite.config.ts (already enabled with compression plugin)
- [ ] Optimize fonts if any
- [ ] Add error boundaries where needed
