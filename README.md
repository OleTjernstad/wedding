# Wedding Registry API with Payload CMS and Next.js

This project implements a secure API for a wedding registry application u integrated with Next.js. It includes user authentication, protected endpoints, and a complete data model for managing wedding gifts and reservations.

## Features

- **User Authentication**: Secure login system with role-based access control
- **Role-Based Access**: Different permissions for admin/couple vs guests
- **Gift Management**: Add, edit, and remove gifts from the registry
- **Category Organization**: Group gifts by categories
- **Reservation System**: Allow guests to reserve gifts
- **Admin Dashboard**: View all reservations and manage the registry


## Data Models

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

