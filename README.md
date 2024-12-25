# NEXTJS-GEMINI-AI-APP
# My Next.js App

Welcome to **Annonymous Message App**! This is a Next.js application built with React and TypeScript, MongoDB Database, Google Gemini AI, Zod, Next-auth(Credentials and JWT strategy), Resend email, Shadcn UI library and react-hook-form. It features server-side rendering, static site generation, and API routes, providing a modern and powerful framework for sending annonymous message to users.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Set up the Environment Varibles](#set-up-the-environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment-on-vercel)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the Next.js app, follow the instructions below to set up the project locally.

### Prerequisites

Before getting started, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12.0.0 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm comes with Node.js, but you can also install Yarn)

### Installation

Clone the repository to your local machine using `git`:

```bash
git clone https://github.com/COT-WORLD/NEXTJS-GEMINI-AI-APP.git
cd NEXTJS-GEMINI-AI-APP
npm install
```

## Set-up-the-environment-variables
Rename .env.sample file to .env file and then paste the keys of MongoDB, resend and Google gemini api and next auth secret.


## Running-the-application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment-on-vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
