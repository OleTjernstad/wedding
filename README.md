# Wedding Registry API with Payload CMS and Next.js

This project implements a secure API for a wedding registry application using Payload CMS 3.0 integrated with Next.js. It includes user authentication, protected endpoints, and a complete data model for managing wedding gifts and reservations.

## Features

- **User Authentication**: Secure login system with role-based access control
- **Role-Based Access**: Different permissions for admin/couple vs guests
- **Gift Management**: Add, edit, and remove gifts from the registry
- **Category Organization**: Group gifts by categories
- **Reservation System**: Allow guests to reserve gifts
- **Admin Dashboard**: View all reservations and manage the registry

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/me` - Get current user information

### Public Registry API

- `GET /api/registry/gifts` - Get all gifts (filterable by category)
- `GET /api/registry/categories` - Get all categories
- `GET /api/registry/settings` - Get registry settings
- `POST /api/registry/reserve` - Reserve a gift

### Protected Admin API

- `GET /api/admin/reservations` - Get all gift reservations (admin/couple only)

## Data Models

### Users

- Admin: Full access to all features
- Couple: Can manage gifts, categories, and view reservations
- Guest: Can view and reserve gifts

### Gifts

- Basic information: name, description, store, link
- Category relationship
- Reservation status

### Categories

- Name, slug, and description
- Relationship to gifts

### Gift Reservations

- Guest information
- Gift relationship
- Optional message
- Anonymous option

## Security Features

- HTTP-only cookies for authentication
- Role-based access control
- Protected API routes
- Server-side authentication checks
- CSRF protection

## Environment Variables

