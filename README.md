Enjoy the city of Trading Signals App with React and Firebase

This is a simple React application that demonstrates how to use Firebase to create a real-time trading signals platform.

## Features

*   **Firebase Integration:** Uses Firestore to store and retrieve data in real-time.
*   **User Tiers:** Implements a basic user tier system (Free, Basic, Gold).
*   **Signal Posting:** Allows traders to post new signals with a required tier.
*   **Real-time Dashboard:** Clients can see signals in real-time, filtered by their user tier.
*   **User Authentication:** Users can sign in with Google, Facebook, phone number, or email.
*   **QR Code Generation:** Trade signals can be embedded in a QR code to restrict access.
*   **UI/UX Enhancements:** Polished form elements and an improved user interface.
*   **Metatrader 5 Integration:** Ability to post signals directly from Metatrader 5.

## Roadmap

*   [x] Firebase Integration
*   [x] User Tiers
*   [x] Signal Posting
*   [x] Real-time Dashboard
*   [x] User Authentication
*   [x] QR Code Generation
*   [x] UI/UX Enhancements
*   [ ] Metatrader 5 Integration

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Firebase:**
    *   Create a new project in the [Firebase console](https://console.firebase.google.com/).
    *   Enable the following authentication methods: Google, Facebook, Phone, and Email/Password.
    *   Copy your Firebase project configuration.
    *   Paste your configuration into the `src/firebase.js` file.
4.  **Run the app:**
    ```bash
    npm start
    ```

## How to Use

*   **Traders:** Use the "Post a New Signal" form to create and send new trading signals.
*   **Clients:** View the dashboard to see QR codes for the latest signals. Scan a QR code to view the signal details.

## Deployment

To deploy the application to Firebase Hosting, run the following command:

```bash
firebase deploy --only hosting
```

## Firestore Schema

*   **users:**
    *   `tier`: (String) "Free", "Basic", or "Gold"
    *   `uid`: (String) The user's unique ID.
*   **signals:**
    *   `signal`: (String) The content of the trading signal.
    *   `requiredTier`: (String) The minimum tier required to view the signal.
    *   `createdAt`: (Timestamp) The time the signal was created.
