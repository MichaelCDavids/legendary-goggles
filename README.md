# Trading Signals App with React and Firebase

This is a simple React application that demonstrates how to use Firebase to create a real-time trading signals platform.

## Features

*   **Firebase Integration:** Uses Firestore to store and retrieve data in real-time.
*   **User Tiers:** Implements a basic user tier system (Free, Basic, Gold).
*   **Signal Posting:** Allows traders to post new signals with a required tier.
*   **Real-time Dashboard:** Clients can see signals in real-time, filtered by their user tier.

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
    *   Copy your Firebase project configuration.
    *   Paste your configuration into the `src/firebase.js` file.
4.  **Run the app:**
    ```bash
    npm start
    ```

## How to Use

*   **Traders:** Use the "Post a New Signal" form to create and send new trading signals.
*   **Clients:** Select your user tier from the dropdown menu to see the signals you have access to.

## Firestore Schema

*   **users:**
    *   `tier`: (String) "Free", "Basic", or "Gold"
*   **signals:**
    *   `signal`: (String) The content of the trading signal.
    *   `requiredTier`: (String) The minimum tier required to view the signal.
    *   `createdAt`: (Timestamp) The time the signal was created.
