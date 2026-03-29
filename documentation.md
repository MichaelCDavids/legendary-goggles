# Project Documentation

## 1. Project Overview

This project is a trading signal platform that provides users with trade signals for various assets. Users can sign up for different tiers, and the signals they see are based on their subscription level.

### 1.1. User Tiers

*   **Gold:** Can see all trade signals.
*   **Basic:** Can see signals marked as 'Free' and 'Basic'.
*   **Free:** Can only see signals marked as 'Free'.

### 1.2. Authentication

Users can sign in using:

*   Google
*   Facebook
*   Phone Number
*   Email and Password

## 2. Key Features

*   **Tier-Based Signal Access:** Users can only view trade signals that correspond to their subscription tier.
*   **Secure Signal Sharing:** Each trade signal has a unique QR code that links to a dedicated, authorization-protected Signal Detail Page. This prevents unauthorized sharing of trade details.
*   **Real-time Signal Updates:** The dashboard displays the latest trade signals in real-time.
*   **User-Friendly Interface:** The application has a modern and responsive design that provides a great user experience on both desktop and mobile devices.
*   **Multiple Authentication Options:** Users can sign in using a variety of methods, including social media accounts and email/password.

## 3. Development Progress

### 3.1. Dashboard and Authentication Updates

*   **Separate Sign-In/Sign-Up:** The login and registration functionalities have been separated into distinct pages (`SignIn.js` and `SignUp.js`) for a more intuitive user experience.
*   **UI Refresh:** A teal color scheme has been applied across the application for a more modern and visually appealing look.
*   **Dashboard Enhancements:** The dashboard has been streamlined to provide tailored views for different user roles (platform administrators and regular users). The signal display has been simplified to show a QR code, the trade type, and the date of the trade, making the information more accessible and scannable.

### 3.2. QR Code and Signal Detail Page
The QR code feature has been implemented. Each trade signal on the dashboard now has a QR code that, when scanned, redirects the user to a dedicated page for that signal. The Signal Detail Page is protected, and only users with the appropriate subscription tier can view the information. This prevents the unauthorized sharing of trade details.

### 3.3. UI/UX Enhancements
The user interface has been updated with a more modern and professional design. The new design is responsive and provides a better user experience on both desktop and mobile devices. A navigation bar has been added to the header for easier navigation between the dashboard and the signal posting page.

### 3.4. Code Refactoring and Updates
The `SignalForm` component has been refactored to use `useRef` for better performance. The main `App` component has been updated to manage user authentication and tier status more efficiently. The project's dependencies were updated to include `react-router-dom` for routing.

### 3.5. Dependency Management and Testing

*   **Dependency Resolution:** Resolved a critical dependency conflict between `react-router-dom` and `react-scripts` by downgrading `react-router-dom` to a stable version (v6). This fixed the "module not found" error during testing.
*   **Test Correction:** Corrected a failing test case in `App.test.js` by updating the test to handle asynchronous component loading and to look for the correct text content.
*   **Vulnerability Patching:** Eliminated all security vulnerabilities by using `npm`'s `overrides` feature to update vulnerable sub-dependencies to secure versions. This was a safer alternative to running `npm audit fix --force`.

## 4. Features Under Development

### 4.1. MetaTrader 5 Integration

We will explore the possibility of integrating with MetaTrader 5 to allow for the automatic posting of trade signals from the platform.

## 5. Technology Stack

*   **Frontend:** React, React Router
*   **Backend:** Firebase (Firestore, Authentication)
*   **Testing:** Playwright and/or Vite

## 6. Changelog

For a detailed list of all changes, see the [Changelog](CHANGELOG.md).
