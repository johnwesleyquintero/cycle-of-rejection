# CYCLE OF REJECTION

This project is a web application built with React and Vite, utilizing Tailwind CSS for styling and shadcn/ui for UI components. It serves as a platform for showcasing music, discography, and related content for the band "Cycle of Rejection." It includes features like an audio player, discography listings, and a codex for lore and information.

## Technologies Used

- **Frontend:** React, Vite
- **UI Libraries:** shadcn/ui, Tailwind CSS, lucide-react, class-variance-authority, @radix-ui (various components)
- **Form Handling & Validation:** react-hook-form, zod
- **Routing:** react-router-dom
- **Notifications:** sonner
- **Dev Tools:** VS Code, Prettier, ESLint, Git/GitHub

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm or yarn
- Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/johnwesleyquintero/cycle-of-rejection.git
    cd cycle-of-rejection
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:5175/` (or another port if 5175 is in use).

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production-ready static files.

## Project Structure

```
.bolt/
public/
src/
├── App.tsx
├── components/
│   ├── AudioPlayer/
│   ├── ErrorBoundary/
│   ├── Icons/
│   ├── Layout/
│   └── Newsletter/
├── contexts/
│   └── AudioContext.tsx
├── data/
│   ├── codexData.ts
│   └── trackData.ts
├── index.css
├── main.tsx
├── pages/
│   ├── Codex.tsx
│   ├── Discography.tsx
│   ├── Home.tsx
│   └── Tour.tsx
└── vite-env.d.ts
```

## Contributing

Contributions are welcome! Please follow the standard Git workflow:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
