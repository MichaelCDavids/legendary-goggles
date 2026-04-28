# API Endpoints and Data Models

## Endpoints

### User Endpoints
*   `POST /api/users/signup`: Create a new user.
*   `POST /api/users/signin`: Authenticate a user.
*   `GET /api/users/me`: Get the current user's profile.
*   `PUT /api/users/me`: Update the current user's profile.

### Signal Endpoints
*   `POST /api/signals`: Create a new trade signal (admin only).
*   `GET /api/signals`: Get a list of trade signals based on user's tier.
*   `GET /api/signals/:id`: Get a specific trade signal.

## Data Models

### User Model
*   `uid`: string (from Firebase Auth)
*   `email`: string
*   `displayName`: string
*   `tier`: string ('free', 'tier1', 'tier2')
*   `role`: string ('user', 'admin')

### Signal Model
*   `id`: string
*   `title`: string
*   `description`: string
*   `tradeType`: string ('buy', 'sell')
*   `asset`: string
*   `entryPrice`: number
*   `stopLoss`: number
*   `takeProfit`: number
*   `tier`: string ('free', 'tier1', 'tier2')
*   `createdAt`: timestamp
