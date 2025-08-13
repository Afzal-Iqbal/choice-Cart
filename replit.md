# Overview

ShopHub is a modern e-commerce web application built with React and Express. It features a comprehensive shopping experience with product browsing, cart management, user authentication, and checkout functionality. The application follows a full-stack architecture with a React frontend, Express backend, and PostgreSQL database integration using Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using functional components and hooks
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Context API for authentication and cart state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **HTTP Client**: TanStack Query for server state management and data fetching

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Development Setup**: Vite integration for seamless full-stack development experience

## Authentication System
- **Primary Auth**: Firebase Authentication with email/password authentication
- **Firestore Integration**: Optional user data storage in Firestore
- **Context Management**: React Context for global authentication state
- **Protected Routes**: Route-level authentication checks

## Database Schema
- **Users Table**: User profiles with email, password, names, and contact information
- **Products Table**: Product catalog with pricing, categories, images, and inventory
- **Cart Items Table**: User shopping cart persistence with product references
- **Orders Table**: Order history and transaction records

## UI Component System
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Theme**: CSS variables with support for light/dark modes
- **Icons**: Lucide React icon library
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

# External Dependencies

## Core Technologies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the entire application
- **Vite**: Build tool and development server

## Database & ORM
- **Drizzle ORM**: Type-safe database queries and schema management
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and schema management

## Authentication & Storage
- **Firebase Auth**: User authentication service
- **Firestore**: Optional NoSQL database for user data

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

## Development Tools
- **TanStack Query**: Server state management
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation
- **Wouter**: Lightweight routing library