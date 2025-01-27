# StackOverflow Clone - DevOverflow

A modern, feature-rich StackOverflow clone built with the latest web
technologies. This project provides a platform for developers to ask questions,
share knowledge, and collaborate in an intuitive, user-friendly interface.

## Tech Stack

- **Frontend**: Next.js (Server Actions, Server Components), React, TypeScript,
  Tailwind CSS
- **State Management & Forms**: React Hook Form, Zod for schema validation
- **Authentication**: OAuth
- **Database**: MongoDB with Mongoose
- **Markdown Support**: MDX Remote for rich markdown previews, including code
  blocks

## Features

- **OAuth Authentication**: Secure and seamless login with third-party
  providers. (e.g., Github, Google, Credentials)
- **Ask & Answer Questions**: Post, edit, and answer questions with rich
  markdown support.
- **Tag Management**: Add and manage tags for better content categorization.
- **Job Search**: Browse and post job listings.
- **Upvotes & Downvotes**: Vote on questions and answers to highlight the best
  content.
- **Markdown Preview**: Live markdown rendering for question descriptions and
  answers.
- **Code Blocks**: Support for syntax-highlighted code snippets in markdown.
- **Error Handling**: Robust error handling across the application using Zod.
- **Responsive Design**: Fully responsive and mobile-friendly layout.

## Installation

1.  Clone the repository:

    ```bash
    > git clone https://github.com/your-username/stackoverflow-clone.git
    > cd stackoverflow-clone
    ```

2.  Install dependencies

    ```bash
    > npm install
    ```

3.  Set up environmental variables Create a .env.local file in the root
    directory and configure the following variables:

        MONGO_URI=your-mongodb-connection-string
        AUTH_SECRET=your-nextauth-secret
        AUTH_GITHUB_ID=
        AUTH_GITHUB_SECRET=
        AUTH_GOOGLE_SECRET=

        NEXT_PUBLIC_API_BASE_URL=

4.  Run the development server and open the url in your browser to view the
    application.

    ```bash
    > npm run dev
    ```
