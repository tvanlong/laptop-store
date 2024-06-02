# 🛒 Store

This is a React-based web application for an online store. The application allows users to view, buy, manage cart, checkout products and manage information account. Also, the application provides an admin panel for managing products and orders. You can visit the application for store admin at [Store Admin](https://github.com/tvanlong/store-admin).

## 🌐 Live Demo

You can access the live demo of the application at [here](https://laptop-kt-store.vercel.app/).

## ✨ Features

- **🔒 Authentication**:
  - Account sign-up.
  - Account login (supports Google login).
  - Account logout.
  - Password reset.
- **📦 Products access**:
  - Viewing product listings.
  - Viewing product details.
  - Product search functionality.
  - Filtering products by category.
  - Sorting products by price.
- **🛒 Cart Management**:
  - Adding products to the cart.
  - Updating product quantities in the cart.
  - Removing products from the cart.
  - Clearing the cart.
- **🛍️ Checkout**:
  - Viewing the cart summary.
  - Entering shipping information.
  - Entering payment information.
  - Viewing the order summary.
- **👤 Account Management**:
  - Viewing and updating account information.
  - Changing the account password.
  - Viewing order history.

## 🛠️ Tech Stack

- **⚛️ React**: A JavaScript library for building user interfaces.
- **⚡ Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **🔍 React Query**: Fetch, cache, and update data in your React and React Native applications all without touching any "global state".
- **🧭 React Router**: A collection of navigational components that compose declaratively with your application.
- **📝 React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **✅ Yup**: A JavaScript schema builder for value parsing and validation.
- **🌐 Axios**: Promise-based HTTP client for the browser and node.js.
- **🔔 Sonner**: A React library for toast notifications.
- **🪶 React Helmet**: A document head manager for React.
- **🎨 TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
- **💠 Flowbite**: A utility-first CSS framework packed with React components.

## 🧹 Code Quality

- **🔍 ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **🎨 Prettier**: An opinionated code formatter.

## 📂 Project Structure

The project is structured as follows:

- `src/`: Contains the source code of the application.
  - `apis/`: Contains API calls.
  - `components/`: Contains reusable React components.
  - `pages/`: Contains the pages of the application.
  - `utils/`: Contains utility functions.
  - `constants/`: Contains constants used in the application.
  - `context/`: Contains the context provider for the application.
  - `hooks/`: Contains custom hooks used in the application.
  - `layouts/`: Contains the layout component of the application.
  - `routes/`: Contains the routes of the application.
  - `schema/`: Contains the schema to validate the data of the application.
  - `...`: Other files and folders.
- `public/`: Contains static files like images.
- `package.json`: Contains the list of project dependencies.

## 🚀 Getting Started

To begin using this project, follow the steps below:

1. Clone the repository using the command `git clone https://github.com/tvanlong/laptop-store.git`.
2. Navigate to the project directory using `cd store-admin`.
3. Install all the necessary dependencies using `npm install`.
4. Start the development server using `npm run dev`.
5. Open the browser and visit `http://localhost:5173` to view the application.

> **Note**: Access to backend APIs is required to use the application. The APIs are not included in this repository. You can use the APIs provided in the [Store API](https://github.com/tvanlong/laptop-store-api).

## 🤝 Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## 📜 License

This project is licensed under the terms of the MIT license.
