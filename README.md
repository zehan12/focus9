# Focus 9 ERP System

## Overview

Focus 9 ERP is a comprehensive Enterprise Resource Planning system designed to streamline business operations across various departments. This modern web-based application provides modules for inventory management, procurement, sales, finance, and more, with a focus on user-friendly interfaces and efficient workflows.

## Features

### Core Features

- **User Authentication**: Secure login system with role-based access control
- **Dashboard**: Centralized overview of key business metrics
- **Navigation**: Intuitive sidebar navigation with module categorization

### Procurement Module
  - Purchase Orders Standard 


## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: Shadcn UI, Lucide React (icons)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
  ```bash
  git clone https://github.com/zehan12/focus9.git
  cd focus9-erp
  ```

2. Install dependencies:
  ```
  pnpm install
  ```

3. Run the development server:
```
  pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## Usage Guide

### Authentication

- Use the login page to access the system
- Default credentials: Username: `admin`, Password: `admin`

### Navigation

- Use the sidebar to navigate between different modules
- The sidebar is organized by department (Inventory, Finance, etc.)
- Each department has sub-modules accessible via dropdown

### Purchase Orders

1. Navigate to Inventory → Transactions → Purchases → Purchase Orders Standard
2. Click "New" to create a new Purchase Order
3. Fill in the required fields:
   - Document No. (auto-generated)
   - Vendor Account (select from dropdown)
   - Date
   - Add line items with Item, Units, Quantity, and Rate
4. Save the Purchase Order
5. Use the action buttons to:
   - Submit for approval
   - Print
   - Delete
   - Suspend

---
