# Goober App

## Introduction

Goober is an innovative ride-hailing platform providing convenient and reliable transportation services similar to Uber, designed to connect drivers with riders through an intuitive mobile experience. Goober stands out for its seamless integration of cutting-edge technologies and user-centered design to deliver a premium service experience.

## Demo
Here's a quick look at our app in action:

![App Demo](assets/demo.gif)

## Overview
The app leverages React Native alongside Expo for development, enabling rapid iteration with native device features like location services. For geolocation functionality, the Expo Location library is utilized, while the Google Maps API provides mapping and routing services. The UI is constructed using @gluestack-ui to expedite development, and AsyncStorage is employed to maintain application state directly on the device in lieu of a database.

## Getting Started

To get started with the Goober app, clone the repository and navigate to the project directory:

```bash
git clone
cd goober
npm install
expo start
``` 

## Technical and Product Decisions

### Driver Selection Logic (Score)

The selection of a driver for a ride request is determined by a scoring algorithm that factors in:

- **Proximity:** Assessed through a `calculateDistance` function, with closer drivers receiving higher scores.
- **Availability:** Only active drivers are considered for ride requests.
- **Acceptance Rate:** A metric that positively influences the driver's score.
- **Cancellation Rate:** A high cancellation rate negatively impacts the score.

This composite score ensures a balance between driver reliability and proximity to the rider.

### Trip Cost Calculation

Trip costs are calculated based on:

- **Base Fare:** An initial fee applied to every ride.
- **Distance and Time:** Costs accrue according to the travel distance and duration.
- **Dynamic Pricing:** Surge pricing may apply during peak demand times to balance the number of ride requests with available drivers.


## High-Level Architecture

The application leverages a modular, feature-based architecture, ensuring that each feature is encapsulated with all necessary components such as types, state management, views, and more. We prioritize scalability and maintainability, enabling the application to grow and adapt over time.Our codebase follows a clean code approach, ensuring that variable names are intuitive and self-documenting.

### Performance

### Design Patterns

The app's design follows a combination of Domain-Driven Design (DDD), Port and Adaptors, Modular, State Management, and Component Architecture patterns for UI components. These patterns form the foundation of our application's structure, enabling organized and scalable development.

### Scalability

Our architecture supports scalable development by organizing features into self-contained modules. The application uses TypeScript to ensure that data structures are clearly defined and understood, preventing runtime errors and facilitating easier team collaboration.

With scalability in mind, the project is structured to accommodate incremental development and integration:

- **Ports and Adapters Architecture (Services):** Within the Services directory, the app's logic for cost calculations, driver scoring, ride selection, distance computations, and mock data generation is isolated. This architectural choice allows for seamless backend integration when it becomes available, minimizing changes to the broader codebase.


- **MVVM Pattern**: The application adopts the MVVM pattern, separating the UI components from data logic. Hooks are used to manage data, keeping the components clean and focused solely on rendering.


- **Modular Architecture:** The app is organized into modules, each pertaining to a specific feature (Home, Driver, Ride). Everything related to a feature's context, including hooks, components, and repositories, is encapsulated within its respective module.

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **TypeScript:** The use of TypeScript provides strong typing, facilitating clearer data flow and reducing runtime errors.
- **Expo:** An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- **Expo Location Library:** Provides access to location services like user location and reverse geocoding.
- **Google Maps API:** For map rendering, location search, and routing services.
- **@gluestack-ui:** A UI library to speed up development with pre-built components.
- **AsyncStorage:** An asynchronous, unencrypted, persistent, key-value storage system.
Implementing these technologies, Goober ensures a robust, efficient, and user-friendly application that stands out in the mobile ride-sharing market.


## Folder Organization

Below is the project structure for Goober, organized for clarity and ease of development:


- **`src/`**:
    - **`common/`**: Shared components and utilities.
  - **`features/`**: Feature-specific modules.
       - **`driver/`**: Components and logic related to drivers.
       - **`home/`**: Home screen UI components and logic.
       - **`rider/`**: Rider-related components and logic.
  - **`services/`**: Centralized service logic.
  - **`types/`**: TypeScript type definitions.
  - **`config/`**: Configuration files and constants.
  - **`assets/`**: Static assets like images and fonts.
  - **`utils/`**: Utility functions and helpers.


## UX Decisions

The UX of Goober is crafted to offer:

- **Map Visualization:** A straightforward display of locations and routes.
- **Clear Options:** Transparent presentation of ride choices with associated costs and ETA.
- **Streamlined Interaction:** A frictionless experience from ride selection to navigation.

## Improvements

Future enhancements to further enrich the Goober experience could include:

- **Skeleton Loading Screens:** To improve perceived load times.
- **Animated Buttons:** To provide visual feedback on user interactions.
- **Sound Feedback:** For a more immersive experience with notifications and actions.
- **Feature Expansion:** Such as carpool options or frequent rider subscriptions.
- **Map Cars Visualization:** Show all driver cars in the map so the user can be aware about the availability 

Goober's foundation is robust, with a user-centric focus. The suggested improvements are aimed at enhancing the overall experience, positioning Goober as a premier choice in the ride-hailing market.
