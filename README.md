# College Compass

College Compass is a comprehensive, responsive Full Stack web application developed with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** with a **PostgreSQL** database.

It allows students to search, filter, compare, and save colleges of interest while providing user signup, login, and token-based JWT authentication.

## Features

- **JWT Authentication**: Secure user registration and login with encrypted passwords (`bcryptjs`).
- **College Directory**: Search, page navigation, and advanced filtering options:
  - Location
  - Minimum Rating
  - Fee Range
- **College Details**: Complete details for each college, listing their offered courses, ratings, placements, and reviews.
- **Compare Colleges**: Choose up to 3 colleges to compare side-by-side on details like location, fees, placement stats, and course counts.
- **Saved Colleges**: Save preferred colleges and access them later in a dedicated dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database Engine**: PostgreSQL
- **Security**: JSON Web Tokens (JWT), bcryptjs password hashing

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [PostgreSQL](https://www.postgresql.org/) database instance running locally or hosted

### Setup Instructions

1. **Clone or navigate to the directory**:
   ```bash
   cd college-compass
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file and update the values:
   ```bash
   copy .env.example .env
   ```
   Modify `.env` and fill in your connection details for PostgreSQL:
   ```env
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
   JWT_SECRET="generate_a_random_jwt_secret"
   ```

4. **Initialize Database and Schema**:
   Generate the Prisma client and run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed the Database**:
   Populate the database with 20 sample colleges:
   ```bash
   npm run prisma:seed
   ```

6. **Run the Development Server**:
   Start the application:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## Folder Structure

- `prisma/`: Prisma schema and database seed script
- `src/app/`: Next.js pages, page layouts, and backend API routes
- `src/components/`: Reusable components (Navbar, Footer, CollegeCard, ComparisonTable, etc.)
- `src/hooks/`: React Custom hooks (`useAuth`, `useColleges`)
- `src/lib/`: Backend utilities (JWT authentication, bcrypt helper, validations)
- `src/types/`: TypeScript interface definitions
- `src/services/`: Client-side API fetch client wrappers
