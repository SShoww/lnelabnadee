# 2. Light/Dark Mode and Responsive UI Implementation

We decided to implement a Light/Dark Mode toggle (persisted via `localStorage` and managed via a `data-theme` body attribute in React) and a responsive sidebar navigation layout. The sidebar remains pinned on desktop views, but automatically collapses into a sliding overlay drawer on mobile and tablet screens (width <= 768px), triggered by a header hamburger menu button, and auto-closes upon navigation events.
