# Taste PC - A Trading Signal Platform

This is a web application that provides trading signals to users. It includes a user authentication system with Google and Phone number sign-in, and a dashboard that displays trading signals based on the user's membership tier.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm installed on your machine.

### Installing

1. Clone the repository to your local machine.
2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm run start
```

The application will be available at `http://localhost:3000`.

## Authentication

The application uses Firebase for authentication. Users can sign in with their Google account or with their phone number.

### Google Sign-In

Users can sign in by clicking the "Sign In with Google" button on the sign-in page.

### Phone Number Sign-In

Users can sign in by entering their phone number and a verification code that is sent to their phone.

## Deployment

The application is deployed to Firebase Hosting. To deploy the application, you will need to have the Firebase CLI installed and configured.

To build and deploy the application, run the following commands:

```
npm run build
npm run deploy
```
