# Sparkle Educational Institute Platform

A modern educational platform for Sparkle Educational Institute, designed to showcase programs, facilitate student applications, and provide information about the institute.

## Project Overview

This is a React-based web application built with Vite, TypeScript, and Tailwind CSS. It features a responsive design, SEO optimization, and integration with Meta Pixel and Google Analytics.

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM (v6)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **SEO**: react-helmet-async

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or later) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd sparkle-learn-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:8080` (or the port shown in your terminal).

### building for Production

To create a production build:
```bash
npm run build
```

The output will be in the `dist` folder.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL="http://localhost:5217/api/client"
VITE_SUBSCRIBER_ID="your_subscriber_id"
VITE_META_PIXEL_ID="your_meta_pixel_id"
VITE_GA_MEASUREMENT_ID="your_ga_measurement_id"
```

## Features

- **Program Listing**: Browse and filter available courses.
- **Enquiry Form**: Apply for programs with a seamless form experience.
- **Analytics**: Integrated with Mata Pixel and Google Analytics for tracking.
- **SEO**: Dynamic meta tags and sitemap generation.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
