# Active Context: AI Book Agent Platform

## Current Work Focus

The primary focus has shifted to include frontend development alongside ongoing backend refinements.

**Backend:**

- Focus remains on ensuring the stability and robustness of the data ingestion pipeline (Celery, EmbeddingService, VectorStoreService).
- Verifying API route functionality and Celery worker operations.

**Frontend:**

- Initial project setup with Next.js and Tailwind CSS.
- Definition of a global color palette.
- Development of `NavBar` component.
- Development of reusable `Button` component.
- Added active link styling to `NavBar` component.
- Development of `Banner` component for the home page.
- Development of `KeyFeatures` component for the home page, including decorative background shape.
- Development of `WhyChoose` component for the home page.
- Development of `Faq` component for the home page (accordion style, with animation, background, and react-icons).
- Development of `CallToActionBanner` component for the home page.
- Development of `Footer` component.

## Recent Changes

**Frontend:**

- **Footer Component**: Created `frontend/src/components/common/Footer.jsx` with logo, description, useful links, features, social media links, and copyright.
- **Layout Update**: Added `Footer` component to `frontend/src/app/layout.js` to display on all pages. Added flex styling to ensure footer sticks to the bottom.
- **CallToActionBanner Component**: Created `frontend/src/components/home/CallToActionBanner.jsx` with the specified content, styling, and mascot image.
- **Home Page Update**: Added `CallToActionBanner` component to `frontend/src/app/page.jsx` after the `Faq` component.
- **Faq Component Update**: Updated `frontend/src/components/home/Faq.jsx` to use `react-icons` for the chevron, added animation for expand/collapse, and a background color.
- **Faq Component**: Created `frontend/src/components/home/Faq.jsx` with the provided FAQ content.
- **Home Page Update**: Added `Faq` component to `frontend/src/app/page.jsx` after the `WhyChoose` component.
- **WhyChoose Component**: Created `frontend/src/components/home/WhyChoose.jsx` with a two-column layout, mascot image, and feature list for the "Why choose TextuLearn?" section.
- **Home Page Update**: Added `WhyChoose` component to `frontend/src/app/page.jsx` after the `KeyFeatures` component.
- **KeyFeatures Styling**: Added a decorative background shape to the bottom-left of the `KeyFeatures` component.
- **KeyFeatures Component**: Created `frontend/src/components/home/KeyFeatures.jsx` with the four agreed-upon features.
- **Home Page Update**: Added `KeyFeatures` component to `frontend/src/app/page.jsx` after the `Banner`.
- **Banner Component**: Created `frontend/src/components/home/Banner.jsx` with specified text, image, and button.
- **Home Page Update**: Added `Banner` component to `frontend/src/app/page.jsx`.
- **NavBar Active Link**: Updated `frontend/src/components/common/NavBar.jsx` to highlight the active navigation link using `usePathname` hook and `text-primary` color.
- **Button Component**: Created `frontend/src/components/libs/Button.jsx` with "contain" and "outline" variants.
- **NavBar Update**: Updated `frontend/src/components/common/NavBar.jsx` to use the new `Button` component for Login and Register buttons.
- **NavBar Component**: Created `frontend/src/components/common/NavBar.jsx` with logo, menu items (Home, Chatbot, Books), and Login/Register buttons.
- **Layout Update**: Integrated `NavBar` into `frontend/src/app/layout.js` to display on all pages.
- **Initialization**: The `frontend/` directory was initialized as a Next.js project.
- **Styling**: Tailwind CSS was integrated.
- **Color Palette**: A color palette was defined in `frontend/src/app/globals.css`:
  ```css
  @theme inline {
    --color-primary: #1dc9b4;
    --color-primary-dark: #1a1a1a;
    --color-secondary: #e6faf8;
    --color-divider: #b0bec5;
    --color-secondary-text: #b0bec5;
    --color-highligh-blue: #80d8ff;
  }
  ```

**Backend (No new changes in this update, summarizing previous state):**

- **Route Modularization**:
  - `server/routes/train_routes.py`: Houses the `/api/train/` POST endpoint.
  - `server/app.py`: Registers `train_bp` and `main_bp`.
- `server/services/queue/tasks.py`:
  - `process_single_chunk_task` uses `EmbeddingService` and `VectorStoreService`.
- **Python Packaging for Celery**: `__init__.py` files in `services` and `services/queue`.
- **Service Implementation**:
  - `EmbeddingService` implemented.
  - `VectorStoreService` fixed by the user.
- `memory-bank/techContext.md`: Updated to include Next.js and Tailwind CSS.
- `memory-bank/projectbrief.md`: Updated to reflect frontend development commencement.
- `memory-bank/systemPatterns.md`: Updated architecture diagram and component relationships to include frontend.

## Next Steps

**Frontend:**

- Develop basic page structure and layout components.
- Implement UI elements for interacting with the backend (e.g., file upload, chat interface).

**Backend:**

- **Celery Worker Verification**: Continue to monitor and ensure Celery workers process tasks correctly.
- **Configuration**: Double-check API keys and configurations in `server/config/settings.py` and `.env`.
- **Testing**:
  - Thoroughly test the `/api/train/` endpoint.
  - Verify Celery task processing.
- **Documentation**: Continue updating memory bank files.

## Active Decisions and Considerations

- **Error Handling**: Refine error handling within `process_single_chunk_task` for embedding and Pinecone operations. Decide on retry strategies for transient errors.
- **Service Initialization**: Determine the best way to initialize and access `EmbeddingService` and `VectorStoreService` within Celery tasks (e.g., global instances, initialized per task, or passed as arguments if feasible).
- **Batching for Pinecone**: While tasks are per-chunk, consider if `VectorStoreService` should internally batch upserts to Pinecone for efficiency if many tasks run concurrently. (Current task `process_single_chunk_task` prepares a single vector for upsert).
- **Security**: Ensure API keys and sensitive data are handled securely.
- **Scalability**: Keep in mind the potential for a large number of chunks and tasks.
