# DocMorris Mobile App: Technical Concept

This document outlines core technical decisions for the DocMorris dual-branded mobile app.

## 1. Programming Language: TypeScript with React Native

* **Cross-Platform Efficiency**

* **Developer Pool & Onboarding**

* **TypeScript for Large Teams**

* **Mature Ecosystem & OTA Updates**

    **To have in mind: EXPO**

    While a "bare" React Native workflow provides maximum control, leveraging Expo (specifically Expo Application Services - EAS - and Development Builds) could be a strong alternative for accelerated development and simplified build processes, especially with a large team.

    However, for a concept emphasizing maximum control and deep native integration for sensitive features, the initial choice leaned towards a bare React Native setup, assuming the team has the necessary native expertise. The decision between Expo (with EAS) and "bare" React Native hinges on the team's existing native expertise, the anticipated depth of native customization, and the desired level of control versus convenience.

## 2. Styling: Design System with NativeWind & React Context API

I’d implement a comprehensive Design System leveraging a utility-first CSS-in-JS library like NativeWind (Tailwind CSS for React Native), combined with React's Context API for seamless brand-specific theming.

* **Design System Foundation:** Establishes reusable UI components for visual consistency across both brands and accelerates UI development.

* **Theming Implementation (React Context API + NativeWind):** A global `ThemeProvider` with brand-specific theme objects allows dynamic switching of design tokens (colors, fonts). NativeWind applies Tailwind CSS utility classes, configurable for semantic theming (e.g., `bg-brand-primary`).

    * **NativeWind Pros:** Rapid development, high performance, strong community, and predictable styles.

* **Graphics and Assets:** React Native's asset system will manage bundled images and graphics, with brand-specific assets organized for dynamic resolution based on the active theme.

## 3. State Management: Redux Toolkit

Redux Toolkit for global application state, combined with React's Context API for domain-specific or less complex global state, and React's `useState`/`useReducer` for local component state. It provides a standardized pattern for data management, reducing integration issues and ensuring data consistency for sensitive operations like prescription redemption and checkout.

* **Redux Toolkit (RTK) for Global State:**

    * **Predictability & Scalability:** Redux provides a single, immutable source of truth, crucial for 5 teams interacting with shared data. RTK scales with complexity, and promotes modularity across feature teams.

    * **Asynchronous Logic & Debugging:** RTK includes middleware (like Redux Thunk) for API calls and RTK Query for simplified data fetching/caching. Redux DevTools offer powerful debugging capabilities, essential in a complex, multi-team environment.

* **React Context API for Domain-Specific Global State**

* **`useState` / `useReducer` for Local Component State:** Ideal for managing state relevant only to a single component or isolated subtree (e.g., form inputs, modal visibility).

## 4. Testing: Multi-Layered Strategy

My approach would be A multi-layered testing strategy encompassing Unit, Component (Snapshot/Shallow Render), Integration, and End-to-End (E2E) tests, integrated into the CI/CD pipeline.

* **Unit Tests (Jest):** Test individual functions and business logic in isolation for fastest feedback and early bug detection.

* **Component Tests (React Native Testing Library, Jest):** Verify UI component rendering and structure for consistency, especially in the dual-branded app.

* **Integration Tests (React Native Testing Library, Jest):** Test interactions between multiple components/modules, including data flow and mocked APIs, crucial for validating complex feature flows.

* **End-to-End (E2E) Tests (Detox):** Simulate real user journeys across the entire application on devices/emulators, providing the highest confidence in overall functionality for critical customer touchpoints.

* **CI/CD Integration:** All tests are automatically run in the CI pipeline on every code commit/pull request, providing immediate feedback and preventing broken code from merging.

## 5. Reusability of Components

I would develop a comprehensive, themeable, and well-documented Component Library using a tool like Storybook, following Atomic Design principles.

The requirement for identical functionality but distinct branding for two brands, coupled with 5 specialized teams, makes component reusability essential.

* **Component Library (Monorepo Setup):** All UI components will be developed as a separate package within a monorepo for easy sharing and dependency management.

* **Atomic Design Principles:** Components will be structured hierarchically (Atoms, Molecules, Organisms, Templates/Pages) for organized and scalable development.

* **Themeable Components:** Each component will be designed to be theme-aware, rendering differently based on the active brand theme (e.g., `PrimaryButton` for Brand A vs. Brand B).

* **Storybook for Documentation and Development:** Used to develop, showcase, and document each component in isolation, acting as a "living style guide" and improving design-development handoff.

## 6. Maintainability

The key here would be to enforce strict code standards, implement a modular and clean architecture, prioritize comprehensive documentation, and establish robust code review processes. To achieve that:

* **Clean Architecture / Modular Design:**

    * **Domain-Based Organization:** Codebase organized by features/domains (e.g., `src/features/products`, `src/features/checkout`).

    * **Layered Structure within Features:** Within each feature, concerns are separated into UI/Presentation, Domain/Business Logic, and Data/Infrastructure layers.


        ```
        src/
        ├── features/
        │   ├── [feature-name-1]/           # E.g., products, checkout, userAccount, prescriptions
        │   │   ├── data/                   # Data sources, repositories, mappers, models, API services
        │   │   │   ├── __tests__/
        │   │   │   ├── mappers/
        │   │   │   ├── mocks/
        │   │   │   ├── services/           # API services for fetching/persisting data
        │   │   │   └── repositories/
        │   │   ├── domain/                 # Business logic
        │   │   │   ├── __tests__/
        │   │   │   └── mocks/
        │   │   ├── ui/                     # UI components and screens specific to this feature
        │   │   │   ├── components/
        │   │   │   └── screens/
        │   │   ├── utils/                  # Feature-specific helper functions
        │   │   └── tests/                  # Feature-specific tests (unit, integration)
        │   │
        │   ├── [feature-name-2]/           # Another feature (e.g., cart, notifications)
        │   │   ├── data/
        │   │   ├── domain/
        │   │   ├── ui/
        │   │   ├── utils/
        │   │   └── tests/
        │   │
        │   └── common/                     # Truly shared, generic UI components or utilities NOT tied to a specific domain
        │       ├── components/             # E.g., AppBar, TabBar, global Modals, generic buttons
        │       ├── hooks/                  # Generic custom React hooks
        │       ├── utils/                  # General utility functions (e.g., date formatters, validators)
        │       └── types/                  # Global TypeScript types and interfaces
        │
        ├── App.tsx                         # Root component of the application
        ├── navigation/                     # React Navigation setup and navigators
        ├── context/                        # Global contexts
        └── hooks/                          # Global custom hooks (if not feature-specific)
        ```

* **Code Standards and Linting:** Implementation of ESLint, Prettier, and TypeScript linting, integrated into CI.

* **Documentation:** Centralized documentation (README.md, inline comments, Storybook, Architecture Decision Records…).

* **Code Review Process:** Mandatory peer code reviews.

## 7. Role of Native Layer

My recommendation: adopt a "native bridge" strategy: leverage React Native's capabilities for the vast majority of the application, and interact with the native layer only when necessary for platform-specific functionalities.

* **Key Scenarios Requiring Native Modules:**

    * **Electronic Prescription Redemption (QR Code and NFC):** Requires dedicated native modules for highly optimized, secure scanning and NFC capabilities for health insurance cards.

    * **Integration with Apple Health/Google Health:** Direct interaction with platform-specific health APIs (HealthKit, Google Fit/Health Connect) necessitates native modules.

    * **Biometric Authentication (FaceID/Touch ID):** Secure biometric authentication directly interfaces with native security frameworks.

* **Implementation Strategy:**

    * **Native Modules (Linking):** React Native's bridge allows communication between JavaScript and native code (Swift/Objective-C for iOS, Kotlin/Java for Android).

    * **Event Emitters:** Native modules can emit events back to JavaScript for native-specific occurrences (e.g., NFC scan complete).

    * **Community Modules First:** Prioritize existing, well-maintained community React Native libraries before implementing custom native modules to save development time.

## 8. Deployment Strategies for Internal Testing

We should leverage automated CI/CD pipelines with dedicated internal distribution platforms for efficient and consistent internal testing of both Android and iOS builds.

This approach reduces manual effort, scales for multiple teams, and builds pre-release confidence by identifying issues early.

* **Automated CI/CD Pipeline:**

    * **Triggering Builds:** Automatically trigger builds on every push/merge to relevant branches.

    * **Environment-Specific Builds:** CI pipeline generates distinct builds for Development, Staging, and Production, configured with correct API endpoints and settings.

    * **Automated Signing:** Handles complex code signing for both iOS and Android, ensuring valid, installable builds.

* **Internal Distribution Platforms:**

    * **Firebase App Distribution.**

    * **TestFlight (iOS-specific).**

    * **Google Play Internal Test Track.**

## 9. Automation for Building, Testing, and Deployments

* **CI/CD Platform:** Utilize highly configurable platforms like GitHub Actions or GitLab CI, integrated with Fastlane.

* **Key Automation Stages within the Pipeline:**

    * **Continuous Integration (CI):** On every push/pull request, automatically perform code linting/formatting, type checking, unit/component tests, static code analysis, and dependency caching.

    * **Continuous Delivery (CD):** On merge to `develop`/`main`, generate automated debug/staging builds, run integration tests, and upload to internal distribution platforms (e.g., Firebase App Distribution).

    * **Production Releases:** On tag or manual trigger, generate optimized production builds, run E2E tests, automate App Store/Play Store deployment, and apply release tagging.

## 10. Monitoring

* **Crash Reporting (Firebase Crashlytics):** Automatically collects and reports all app crashes and non-fatal errors in real-time.

* **Application Performance Monitoring (Firebase Performance Monitoring):** Monitors key performance metrics like app startup time, screen rendering times, network request latency…

* **Logging (Remote Logging Service)**

* **Alerting**

## 11. Tracking

* **Analytics Platform (Google Analytics for Firebase / Amplitude)::** Provides comprehensive analytics capabilities for mobile apps, including user engagement, retention, audience demographics, and custom event tracking.

* **Key Tracking Areas & Custom Events:** Focus on e-commerce funnel tracking (product views, add-to-cart, checkout, purchase), prescription services (QR/NFC scans, uploads), search & discovery, user account actions, and feature usage.

## 12. OTA Updates

* **Tool (Microsoft CodePush):** Hosts JavaScript bundles and assets, allowing the app to query for updates, download them in the background, and apply them on the next launch/resume. Supports deployment environments, rollbacks, and mandatory updates.

## 13. Local Storing of Sensitive Health Data

* **Secure Storage Mechanisms:**

    * **Keychain (iOS) / Keystore (Android):** For small, highly sensitive data (authentication tokens, encryption keys, biometric flags).

    * **Encrypted Local Database (SQLCipher / Realm with Encryption):** For larger volumes of sensitive health data (prescription history), ensuring data at rest is protected.

* **Encryption at Rest:** All sensitive local data must be encrypted using strong algorithms (e.g., AES-256), with keys securely stored.

* **Data Minimization:** Only collect and store the absolute minimum sensitive data necessary.

* **Strict Access Controls:** Implement robust user authentication, biometric authentication (FaceID/Touch ID).