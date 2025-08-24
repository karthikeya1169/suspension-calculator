# Overview

This is a Suspension Calculator web application designed for automotive engineers and enthusiasts to analyze vehicle suspension systems. The app provides a comprehensive tool for calculating spring rates, damping characteristics, weight transfer, and other critical suspension parameters based on vehicle specifications and driving scenarios. It features a premium dark-themed UI built with modern React components and focuses on delivering precise engineering calculations with an intuitive user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a React-based Single Page Application (SPA) architecture with TypeScript for type safety:

- **Framework**: React with TypeScript for component-based UI development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Hook Form for form state management and TanStack React Query for server state
- **Styling**: Tailwind CSS with a custom dark theme focused on automotive engineering aesthetics
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent, accessible UI elements
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture

The backend follows a Node.js/Express architecture pattern:

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Custom Vite integration for seamless full-stack development
- **API Pattern**: RESTful API design with `/api` prefix routing
- **Error Handling**: Centralized error handling middleware

## Data Storage Solutions

The application is configured for PostgreSQL with Drizzle ORM:

- **Database**: PostgreSQL (configured but not actively used for core calculator functionality)
- **ORM**: Drizzle ORM with type-safe database operations
- **Schema Management**: Drizzle migrations for database version control
- **In-Memory Storage**: MemStorage class for temporary data persistence during development

## Authentication and Authorization

Currently implements a basic user management system:

- **User Schema**: Basic username/password structure defined in shared schema
- **Storage Interface**: Abstracted storage layer with CRUD operations for users
- **Session Management**: Prepared for session-based authentication (connect-pg-simple configured)

## Design System

The UI implements a comprehensive design system:

- **Theme**: Custom dark theme with teal/blue accent colors optimized for engineering applications
- **Typography**: Inter font family for readability
- **Components**: Modular component architecture with consistent spacing and color schemes
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance

## Calculator Architecture

The suspension calculator follows a modular calculation approach:

- **Input Sections**: Organized into collapsible sections (Vehicle Setup, Suspension Setup, Driving Scenarios)
- **Calculation Engine**: Pure calculation functions that process input parameters
- **Results Display**: Structured result cards showing different calculation categories
- **Data Flow**: Unidirectional data flow from inputs through calculations to results display

## Performance Optimization

- **Bundle Optimization**: Vite-based bundling with tree shaking and code splitting
- **Development Experience**: Hot module replacement and error overlay for rapid iteration
- **Type Safety**: Full TypeScript coverage from frontend to backend including shared schemas

# External Dependencies

## UI and Styling
- **@radix-ui/react-***: Complete suite of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe utility for handling component variants
- **lucide-react**: Consistent icon library for UI elements

## State Management and Data Fetching
- **@tanstack/react-query**: Server state management with caching and synchronization
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Form validation resolvers integration

## Database and ORM
- **drizzle-orm**: Type-safe PostgreSQL ORM
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-zod**: Schema validation integration between Drizzle and Zod

## Development and Build Tools
- **vite**: Next-generation frontend build tool
- **@vitejs/plugin-react**: React integration for Vite
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production builds

## Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **zod**: TypeScript-first schema validation

## Development Environment
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling integration