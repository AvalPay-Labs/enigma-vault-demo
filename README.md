# Enigma Vault Demo

A modern React application built with TypeScript, featuring a comprehensive UI component library and authentication system.

## Project Structure

```
enigma-vault-demo/
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/             # React components
│   │   ├── auth/              # Authentication components
│   │   │   └── LoginModal.tsx
│   │   ├── common/            # Shared/common components
│   │   │   ├── CookieBanner.tsx
│   │   │   └── UserTour.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   └── ui/                # UI component library (shadcn/ui)
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── use-toast.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                    # Utility libraries
│   │   └── utils.ts
│   ├── pages/                  # Page components
│   │   ├── app/               # Application pages
│   │   │   ├── Auditor.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── TokenDetail.tsx
│   │   ├── legal/             # Legal pages
│   │   │   ├── Cookies.tsx
│   │   │   ├── Privacy.tsx
│   │   │   └── Terms.tsx
│   │   ├── About.tsx
│   │   ├── Docs.tsx
│   │   ├── HelpFAQ.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── Pricing.tsx
│   ├── App.css                # Global styles
│   ├── App.tsx                # Main App component
│   ├── index.css              # Entry point styles
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite type definitions
├── components.json             # shadcn/ui configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.app.json          # TypeScript app configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # TypeScript node configuration
└── vite.config.ts             # Vite configuration
```

## Project Info

This repository contains the Enigma Vault Demo application.

## How can I edit this code?

There are several ways of editing your application.

**Use Enigma**

Work locally or with your preferred tools to iterate on the Enigma Vault Demo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Build the production bundle and deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, S3, etc.).

```sh
npm run build
npm run preview # optional local preview
```

## Supabase Setup

Configure environment variables in a local `.env.local` file (not committed):

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

The Supabase client is initialized in `src/lib/supabaseClient.ts`.

Notes:
- Never use `SERVICE_ROLE` in the frontend. Keep it only in secure backend environments.
- After setting env vars, restart `npm run dev` to reload Vite.

## Custom domains

If your hosting provider supports it, point your custom domain to the deployed site following their documentation.
