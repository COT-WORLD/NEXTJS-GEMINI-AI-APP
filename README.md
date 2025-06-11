# 🌟 NEXTJS-GEMINI-AI-APP

# ✉️ AnonMessage

Welcome to **AnonMessage App**! This is a Next.js application built with React and TypeScript, MongoDB Database, Google Gemini AI, Zod, Next-auth(Credentials and JWT strategy), Resend email, Shadcn UI library and react-hook-form. It features server-side rendering, static site generation, and API routes, providing a modern and powerful framework for sending annonymous message to users.

## Website Link

You can access the website at the following link:

[AnonMessage](https://nextjs-gemini-ai-app.vercel.app/dashboard)

## Login Details

For testing purposes, you can use the following credentials to log in:

- **Email**: `ema@sharklasers.com`
- **Password**: `password123`

> Note: These credentials are for demo/testing purposes only.

# 🚀 Features

- 🔐 Authentication: Secure login and registration via NextAuth (Credentials & JWT)
- 📬 Anonymous Messaging: Users can send/receive messages anonymously
- 💬 AI Message Suggestions: Powered by Google Gemini AI
- 📮 Email Verification: Via Resend
- 🧾 Form Validation: With Zod and React Hook Form
- 🎨 Styled UI: Using Shadcn UI
- 🌐 Full SSR(Server-Side Rendering) + SSG(Static Site Generation) Support

# 🧰 Tech Stack

| Category       | Tools / Libraries                     |
| -------------- | ------------------------------------- |
| **Frontend**   | Next.js, React, TypeScript, Shadcn UI |
| **Backend**    | Next.js API Routes, MongoDB, Mongoose |
| **Auth**       | NextAuth (JWT + Credentials strategy) |
| **AI**         | Google Generative AI (Gemini)         |
| **Email**      | Resend                                |
| **Validation** | Zod, React Hook Form                  |
| **Styling**    | Tailwind CSS                          |
| **Deployment** | Vercel (Recommended)                  |

# ⚙️ Setup Instructions

Clone the repository to your local machine using `git`:

```bash
git clone https://github.com/COT-WORLD/NEXTJS-GEMINI-AI-APP.git
cd NEXTJS-GEMINI-AI-APP
npm install
```

## Set-up-the-environment-variables

- Option 1: Rename the .env.sample file to .env.local, then add your credentials.

- Option 2: Create a new .env.local file in the root of the project manually.

```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
RESEND_API_KEY=your_resend_api_key
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_URL=http://localhost:3000
```

## Running-the-application

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment-on-vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🙋‍♂️ Author

Made with ❤️ by Hardik Chaudhary
