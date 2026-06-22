# WheelWay

An Uber-style ride-booking web app designed for riders with disabilities, built as a freelance project. Riders and drivers ("captains") get separate flows, with ride types representing different vehicle sizes and service levels (e.g., caregiver-assisted rides).

## Features

- Separate signup/login flows for riders and drivers, with bcrypt-hashed passwords
- Interactive map-based trip booking (pickup/dropoff selection, distance/duration/price calculation)
- Live trip tracking screens for both rider and driver during an ongoing trip
- Driver-side trip hunting/accept flow for incoming ride requests
- Post-trip rider/driver rating system
- Trip history per user
- Admin dashboard with account search/update capabilities

## Tech stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Google Maps / Places API
- **Backend:** Node.js, Express
- **Database:** MySQL (via `mysql2`)
- **Auth:** bcrypt password hashing

## Project structure

```
WheelWay/
├── src/
│   ├── pages/        Route-level pages (booking, signup, login, trip tracking, admin, etc.)
│   ├── components/    Shared UI components (map, navbar, rating bar, trip cards)
│   ├── layouts/       Page layout wrappers
│   ├── backend/       Express route handlers (signup, login, booking, trip status, admin)
│   └── server.js      Express app entrypoint + MySQL connection pool
├── public/
└── vite.config.js
```

## Setup

```bash
git clone <repo-url>
cd WheelWay/WheelWay
npm install
```

Create a MySQL database and copy `.env.example` to `.env`, filling in your own values:

```bash
cp .env.example .env
```

```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=wheelway
ALLOWED_ORIGIN=http://localhost:5173
PORT=3001
```

You'll also need a Google Maps API key for the map components — add it wherever the map components currently expect it (see `src/components/Map.jsx` / `MapView.jsx`).

Run the backend and frontend (in separate terminals):

```bash
node src/server.js     # API server
npm run dev             # Vite dev server
```

## Database schema (expected tables)

The backend queries assume tables roughly shaped like:

- `user_table` — riders (`user_id`, `first_name`, `last_name`, `email`, `password` [hashed])
- `driver_Table` — drivers (`driver_id`, ...)
- `admin_table` — admin accounts (`admin_id`, ...)
- `rides_Table` / `rides_table` — trip records (`ride_id`, pickup/dropoff coordinates, status, price, etc.)

No schema migration files are included yet — the tables need to be created manually to match the columns referenced in `src/backend/*.js`.

## Known limitations

- No automated tests.
- CORS is restricted to a single configurable origin rather than supporting multiple environments out of the box.
- Some backend routes use string-built table names based on `accountType` (e.g. `` `SELECT * FROM ${table}` ``) — safe here since the values are constrained by an `if/else` check rather than passed through directly, but worth keeping in mind if more account types are added later.
- This was built solo as a freelance/portfolio project; it models the core Uber-like booking flow but hasn't been load-tested or used with real riders/drivers in production.

## Author

Ahmed Ayman
