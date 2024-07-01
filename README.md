
# Fun Chat Application

## View the Project
You can view the deployment of Fun Chat Application here: [Fun Chat App](https://rolling-scopes-school.github.io/chekhanadski-JSFE2023Q4/fun-chat/#/).

**Important Note:** The Fun Chat application will only work when the mock server is running. Make sure to start the server before running the client application.

## Description
Welcome to our Fun Chat Application! This app is designed to provide a basic and user-friendly platform for real-time communication between users.

Users can enjoy features such as user authentication, real-time messaging, user status indicators, message history, and more. Our application is responsive and works well on devices with varying screen sizes, from desktops to mobile phones 📱💻.

It is important to note that Fun Chat App will only work when the [server application](https://github.com/rolling-scopes-school/fun-chat-server/tree/main) is running. You can learn about it from the [detailed description](https://github.com/rolling-scopes-school/fun-chat-server/tree/main#readme).

## Key Features
**1. User Authentication Page**

- Login and password validation.
- Error messages for authentication failures.
- Redirects unauthorized users trying to access the Main page.
- Authenticated users are redirected from the login page to the Main page.

**2. Main Page**

- Accessible only to authenticated users.
- Redirects unauthorized users to the Authentication page.
  
**3. Header**

- Displays the current user's name and app's name.
- Logout button to terminate the session and redirect to the Authentication page.
  
**4. Footer**

- Includes the school's logo, the author's name, a link to the author's GitHub, and the year of creation.
  
**5. User List**

- Displays all registered users and their online status.
- Excludes the currently authenticated user.
- Implements user search by name.
- Displays the number of unread messages for each user.

**6. User Dialogue**

- Shows information about the user in dialogue and their online status.
- Displays complete message history with the selected user.
- Messages are chronologically arranged.
- Allows sending, deleting, and editing messages.
- Handles unread messages and read statuses.
  
**7. Message Content**

- Includes the time of sending, sender's username, message delivery status, message text, and edit indication.
- "Delivered" and "Read" statuses are visible only to the sender.
- Prevents sending messages without content.
  
**8. Message Delivery and Read Status**

- Changes status to "delivered" when the recipient logs in.
- Changes status to "read" when the recipient opens the dialogue and performs specific actions.
  
**9. About Page**

- Contains brief information about the application and its author.
- Accessible to both authenticated and unauthorized users.
  
**10. Interface and Visual Design**

- Displays the application icon in the browser tab.
- Responsive and interactive interface elements.
- Supports responsive layout from 1440 px to 380 px resolutions.
  
**11. Server Connection**

- Displays a message and attempts to reconnect on sudden disconnection.
- Reauthorization upon reconnecting without user intervention.

## Technology Stack
**General:**

- JavaScript
- TypeScript
- HTML5
- CSS3

**Libraries:**

- WebSockets
- Asynchronous JavaScript (Async/Await)
- DOM Manipulation

## Available Scripts in the Project

This project includes several scripts for development, building, testing, and code formatting. Here's a brief overview of each script and its usage:

### start

```sh
npm run start
```

This script starts the development server.

### build

```sh
npm run build
```

This script creates a production-ready build of the application.

### test

```sh
npm run test
```

This script runs the test suite using Jest. Use this to run all tests in the project and ensure that all code changes are working as expected.

### validate

```sh
npm run validate
```

This script validates the branch naming to local convention.

### lint

```sh
npm run lint
```

This script runs ESLint on the codebase. Use this to catch and fix syntax errors, find problematic patterns, and enforce code style.

### format

```sh
npm run format
```

This script formats the codebase using Prettier. Use this to enforce a consistent code style across the project.

## Setting Up and Running the Project Locally

Here are the steps to get you started:

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm.
- You have a Windows/Linux/Mac machine.
- You have cloned and set up the server application.

### Setting Up the Project

To set up the project, follow these steps:

**1. Clone the repository**
Open your terminal, navigate to the directory where you want to clone the repository, and run the following command:

```sh
git clone https://github.com/your-username/chat-application
```

This will clone the repository to your local machine.

**2. Navigate to the project directory**

Change your current directory to the project directory:

```sh
cd chat-fun-chat
```
**3. Install the dependencies**

Now, run the following command to install all the project dependencies:

```sh
npm install
```

This command installs all the necessary packages required for the project.

**4. Setting up the server application**

Clone the server application from [here](https://github.com/rolling-scopes-school/fun-chat-server/tree/main) and follow the instructions in the server application's README to set it up and run it.

**5. Running the Project**
After setting up both the client and server applications, you can now run the project locally using:

```sh
npm start
```

This command starts the development server and the project will be up and running on your local machine.
