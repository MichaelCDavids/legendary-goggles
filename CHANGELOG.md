# Changelog

## [Unreleased]

### Added
- Implemented QR code generation for each trade signal on the dashboard.
- Created a new Signal Detail Page to display the full details of a trade signal when a user scans the QR code or navigates to the signal's URL.
- Added routing for the Signal Detail Page.
- Implemented authorization on the Signal Detail Page to ensure users can only view signals that correspond to their subscription tier.
- Added a navigation bar to the header for easier navigation between the dashboard and the signal posting page.

### Changed
- Updated the Dashboard to display a QR code that links to the Signal Detail Page instead of showing the full signal details directly.
- Overhauled the application's styling with a more modern and responsive design.
- Refactored the SignalForm component to use `useRef` for better performance and to align with modern React practices.
- Updated the main App component to manage user authentication and tier status more efficiently, passing the necessary data to the routed components.
- The project's dependencies were updated to include `react-router-dom` for routing.

### Fixed
- Resolved a critical dependency conflict between `react-router-dom` and `react-scripts` by downgrading `react-router-dom` to a stable version (v6). This fixed the "module not found" error during testing.
- Corrected a failing test case in `App.test.js` by updating the test to handle asynchronous component loading and to look for the correct text content.
- Eliminated all security vulnerabilities by using `npm`'s `overrides` feature to update vulnerable sub-dependencies to secure versions. This was a safer alternative to running `npm audit fix --force`.
