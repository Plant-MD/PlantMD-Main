# Plant MD Landing Page

A modern, responsive landing page for Plant MD - an AI-powered plant disease diagnosis application built with Next.js and Tailwind CSS.

## Features

- 🌱 **Modern Design**: Clean, professional design with plant-themed aesthetics
- 📱 **Fully Responsive**: Optimized for all devices from mobile to desktop
- ⚡ **Next.js 14**: Built with the latest Next.js App Router
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid development
- 🔧 **TypeScript**: Full type safety throughout the application
- 🎭 **Interactive Components**: Coming soon modals and smooth animations
- 📧 **Contact Form**: Professional contact section with form validation
- 🖼️ **Optimized Images**: Next.js Image component for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd plant-md-landing
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
plant-md-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts
├── public/
│   ├── contact-illustration.png
│   └── video-background.png
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
\`\`\`

## Customization

### Colors

The project uses a custom color palette defined in `tailwind.config.js`:
- Primary dark green: `#011606` (plant-dark)
- Various shades of green for accents and highlights

### Components

All UI components are built with Radix UI primitives and styled with Tailwind CSS:
- Button component with multiple variants
- Dialog/Modal components for "Coming Soon" features
- Form components (Input, Textarea)

### Images

- Contact illustration and video background are stored in `/public`
- Placeholder images are used for team members and app screenshots
- All images are optimized using Next.js Image component

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
\`\`\`bash
npm run build
\`\`\`

The built files will be in the `.next` folder.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

## License

This project is licensed under the MIT License.
