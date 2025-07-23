# DocMorris Coding Challenge Demo

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* **Node.js** (v16.x or newer, [nvm](https://github.com/nvm-sh/nvm) recommended)

* **Yarn** (preferred package manager for this project)

* **Expo CLI:** `yarn global add eas-cli`

* **Xcode (for iOS development/simulator):** Download from Mac App Store.

* **Android Studio (for Android development/emulator):** Download from [developer.android.com](https://developer.android.com/studio).

    * Ensure you have a recent Android SDK Platform and Build-Tools installed (e.g., API 33/34).

    * Set up an Android Emulator or connect a physical device.

    * **Crucial for Android:** Ensure your `gradlew` script is executable: `chmod +x android/gradlew` in your project root.

    * **Crucial for Android Studio:** Configure Android Studio's Gradle JDK to JDK 11 or 17 (`File > Project Structure... > SDK Location > Gradle JDK`).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dmartorell/docmorris-coding-challenge.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd docmorris-coding-challenge
    ```
3.  **Install dependencies:**
    ```bash
    yarn install
    ```
    This will install all project dependencies, including local modules like `healthkit-writer`.

### Running the Application

This project uses custom native modules (for HealthKit), so you cannot run it directly with `expo go`. You need to build a development client.

1.  **Generate native project files (if not already present):**
    ```bash
    npx expo prebuild --clean
    ```
    This command creates/recreates the `ios/` and `android/` directories based on the `app.json` and plugins.

2.  **Install iOS Pods (for iOS only):**
    ```bash
    cd ios
    pod install
    cd ..
    ```

3.  **Start the Metro Bundler:**
    ```bash
    npx expo start -c
    ```
    This will start the JavaScript bundler. Keep this terminal window open.

4.  **Run on iOS Simulator/Device:**
    In a **new terminal window** (in the project root):
    ```bash
    npx expo run:ios
    ```
    This will build and launch the app on your connected iOS simulator or device.

5.  **Run on Android Emulator/Device:**
    In a **new terminal window** (in the project root):
    ```bash
    npx expo run:android
    ```
    This will build and launch the app on your connected Android emulator or device.

**Note on HealthKit:** The "Add to Health" functionality is **iOS-specific**. On Android, it will display a log on the termial.

### App Flow (Demo Scope)

Due to the demo's focused scope, the application's navigation flow is limited:

* You can navigate through the **bottom tab items**, but **only the "Cart" tab is implemented** with interactive content. Other tabs ("Home", "Categories", "Explore", "User") will display placeholder screens.

* From the **"Cart" screen**, you can interact with mock cart items (add/remove quantity, remove item).

* Pressing the **"Continue" button** on the Cart screen will navigate you to the **"Checkout" screen**.

* On the **"Checkout" screen**, if your cart contains medication items, you will see a button labeled **"Add to Health"** on each medication card. Pressing this button will trigger the **Apple HealthKit integration** (on iOS only) to save the medication information.

### Running Tests

To run the unit and integration tests:

```bash
yarn test