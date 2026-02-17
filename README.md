<div align="center">
    <h1>HonestPoll - Live Polling Platform</h1>
</div>

HonestPoll is an interactive web application designed to simplify the process of creating, participating in, and managing polls. It combines user-friendly features with real-time updates to deliver a seamless polling experience📊.

## Features

- User can signup and login using his credentials, used cookie based authentication with jwt.
- User can browse all the Polls created by other users in a pagination format and click on view to view the poll.
- In poll view page user can vote on the poll and see the result of the poll live with chart using sockt.io.
- User can bookmark the poll and see the bookmarked poll in bookmark page.
- In user dashboard user can see the their details and manage their poll.
- By clicking on the create poll button user can create a new poll and add options to the poll.
- Used react-toastify for showing the error and success message.
- Used chart.js and scocket.io-client for showing the poll result live in chart in poll view page.
- Used daisyui and tailwind for styling the UI of the application for responsive design.


## Preview Images

### Home Page

<img src="./images/Home.png"/>
<img src="./images/Home2.png"/>
<img src="./images/Home3.png"/>


### Polls Page

<img src="./images/pollsPage.png"/>

### Login Page

<img src="./images/login.png"/>

### Signup Page

<img src="./images/signup.png"/>

### Poll Votting Page

<img src="./images/votingPage.png"/>

### Dashboard Page

<img src="./images/dashboard.png"/>

### Create Poll Page

<img src="./images/createPollPage.png"/>

### Bookmarks Page

<img src="./images/bookmark.png"/>

## Tech Stack

### Frontend

Framework & Routing: `ReactJS`, `React Router`  
State Management: `Zustand`, `React Query`  
Real-Time & Charts: `Socket.io-client`, `react-chartjs-2`  
Styling: `TailwindCSS`, `DaisyUI`  
Notifications & Icons: `React-Toastify`, `React Icons`

### Backend

Framework & Authentication: `Node.js`, `Express.js`, `JWT`, `bcrypt`  
Validation & Documentation: `Zod`, `Swagger-jsdoc`  
Real-Time Communication: `Socket.io`  
Database & ORM: `Mongoose`

### Others

API Communication: `Axios`

## Installation and Setup

### Prerequisites

- Node.js and npm/yarn installed.
- MongoDB database set up locally or on a cloud provider.

### Steps

1. Clone the Repository

   ```bash
   git clone https://github.com/Anmoolll/HonestPoll.git
   cd HonestPoll
   ```

2. Backend Setup

   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     `env
    PORT=3000
    DB_CONNECTION="your mongodb url" 
    SALT_ROUNDS=6
    JWT_PRIVATE="your jwt private key"
    CLIENT_URL="your client url"
     `
   - Start the server:
     ```bash
     npm run dev
     ```

3. Frontend Setup

   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Update `.env` file with the backend URL (e.g., `http://localhost:3000`).
   - Start the development server:
     ```bash
     npm start
     ```

4. Access the Application
   - Open a browser and go to `http://localhost:5173`.

---

### To Switch Between Local and Deployed Environments

- Update backend `.env` with:
  ```env
  BACKEND_URL=http://localhost:3000
  ```
- Update frontend Axios base URL to:
  ```javascript
  axios.defaults.baseURL = "http://localhost:3000/api/v1";
  ```
- Update the Socket.io URL in the voting page:
  ```javascript
  const socket = io("http://localhost:3000");
  ```

---

## Usage

- Navigate to the `frontend` directory and run `npm run dev` to start the development server.
- Navigate to the `backend` directory and run `npm run dev` to start the server.
- Open a browser and go to `http://localhost:5173` to access the application.

---

## Fairness / Anti-Abuse Mechanisms

HonestPoll implements a layered approach to prevent vote manipulation and ensure fair polling results.

### 1. One Vote per Authenticated User Account

When a logged-in user attempts to vote, the backend checks the `Vote` collection for an existing record matching both the `pollId` and the user's `userId`. If a prior vote is found, the request is rejected with a **400** status and the message *"You have already voted on this poll"*. This ensures that each registered account can influence a poll only once.

**Relevant code:** `backend/src/services/poll.service.js` → `createVoteService` (Mechanism 1) and `backend/src/repositories/vote.repo.js` → `findVoteByPollIdAndUserId`.

### 2. One Vote per Browser / Client (Anonymous & Logged-Out Users)

For users who are not logged in (or who access the public voting endpoint), the server generates a random `clientId` via `crypto.randomUUID()` and persists it in an **HTTP-only** cookie (`honestpoll-client-id`) that lasts one year. On every subsequent vote attempt, the backend looks up any existing vote matching the `pollId` and `clientId`. A duplicate is rejected with a **400** status. This prevents the same browser from voting twice on a poll even without an account.

**Relevant code:** `backend/src/controllers/poll.controller.js` → `createVoteController` (clientId cookie generation) and `backend/src/services/poll.service.js` → `createVoteService` (Mechanism 2).

### 3. IP-Based Soft Rate Limiting (Bonus Layer)

As an additional safeguard, the backend counts how many votes have been cast from the same IP address on a given poll. If the count reaches `MAX_VOTES_PER_IP_PER_POLL` (currently **3**), subsequent votes from that IP are rejected with a **429 Too Many Requests** status and the message *"Too many votes from this network for this poll. Please ask others to vote from their own devices."* This mitigates abuse from shared networks where different browsers or cleared cookies could bypass client-level checks.

**Relevant code:** `backend/src/services/poll.service.js` → `createVoteService` (Mechanism 3) and `backend/src/repositories/vote.repo.js` → `countVotesByPollIdAndIp`.

---

## Edge Cases Handled

### Backend Edge Cases

| Edge Case | Where | How It's Handled |
|---|---|---|
| **Poll not found** | `getPollDataService`, `createVoteService`, `deletePollService`, `addToBookMarkService` | Returns **404** with *"Poll not found"* before any further processing. |
| **Unauthorized poll deletion** | `deletePollService` | Compares `poll.creatorId` with the requesting user's ID; returns **401 Unauthorized** if they don't match. |
| **Duplicate user registration** | `signupService` | Catches MongoDB duplicate-key error (code `11000`) on the unique `email` field and returns **409** *"User already exists"*. |
| **Empty / whitespace-only fields** | `signupService`, `signinService` | Explicitly checks `.trim() == ""` for all fields and returns **400** *"All fields are required"*, even beyond Zod schema validation. |
| **User not found during sign-in** | `signinService` | Returns **404** *"User not found."* when no user matches the provided email. |
| **Incorrect password** | `signinService` | Uses `bcrypt.compareSync` and returns **401** *"Password isn't correct."* on mismatch. |
| **Missing or invalid JWT token** | `verifyToken` middleware | Returns **401** with *"No token provided"* or *"Invalid token"* depending on the failure reason. |
| **Graceful anonymous access** | `optionalVerifyToken` middleware | If the token is absent or invalid, the request continues without `req.user` instead of being rejected — enabling public voting. |
| **Double response prevention** | `createVoteController` | Checks `res.headersSent` before sending an error response, preventing the "headers already sent" crash when a cookie was set before an error occurred. |
| **IP extraction behind proxies** | `createVoteController` | Parses `x-forwarded-for` header (handles both string and array formats), splits on commas to get the real client IP, and falls back to `req.ip`. |
| **CORS origin trailing-slash mismatch** | `backend/src/index.js` | Normalizes both the allowed origins and incoming `Origin` header by stripping trailing slashes before comparison, preventing false CORS rejections. |
| **Non-browser clients (no Origin)** | `backend/src/index.js` CORS config | Requests with no `Origin` header (e.g. `curl`, server-to-server) are explicitly allowed through. |
| **Socket missing poll ID** | `poll.socket.js` → `handleJoinPoll` | Emits an `error` event back to the client if `pollId` is falsy. |
| **Socket invalid vote data** | `poll.socket.js` → `handleVote` | Validates that both `data.pollId` and `data.success` are present before processing; emits an `error` event otherwise. |
| **Bookmark toggle (add / remove)** | `addToBookMarkService` | Checks if the poll ID already exists in the user's bookmarks array; adds it if absent, removes it if present — a single endpoint for both actions. |
| **Pagination defaults** | `getAllPolls` controller | Defaults to `page = 1` and `limit = 10` when query parameters are omitted. |
| **Password leak prevention** | `signinService`, `addToBookMarkService` | Destructures and excludes the `password` field from every user object before returning it in API responses. |

### Frontend Edge Cases

| Edge Case | Where | How It's Handled |
|---|---|---|
| **API request failure** | `ErrorFallback` component | Renders a user-friendly error card with a **Retry** button and a **Go Home** link. |
| **Unauthenticated access to protected pages** | `PrivateRoute` component | Redirects users without a valid session to the `/login` page via `<Navigate>`. |
| **Clipboard copy failure** | `VotingPage` → `handleCopyLink` | Catches the error and shows a toast: *"Failed to copy link. You can copy it manually."* |
| **Vote button disabled after selection** | `VotingPage` → `handleOptionSelect` | Once `selectedOption` is set, clicking another option does not overwrite the selection, preventing double-vote attempts on the client side. |

### Validation Edge Cases (Zod Schemas)

| Schema | Validations Applied |
|---|---|
| **Poll Data** (`pollDataValidation.js`) | Title: 3–50 chars, trimmed. Description: 3–500 chars, trimmed. Options: array with min 2 items, each option 1–50 chars, trimmed. |
| **Vote Data** (`voteValidation.js`) | `pollId` and `optionId` are required strings with type checks. |
| **Sign Up** (`signupValidation.js`) | Username: 3–50 chars, trimmed. Email: valid format. Password: 6–50 chars. |
| **Sign In** (`signinValidation.js`) | Email: 1–200 chars, valid format. Password: 6–50 chars. |

### Security Edge Cases

| Measure | Details |
|---|---|
| **HTTP-only cookies** | Both `honestpoll-access-token` (auth) and `honestpoll-client-id` (vote tracking) are set with `httpOnly: true`, preventing client-side JavaScript from reading them (XSS mitigation). |
| **Secure cookies in production** | The `honestpoll-client-id` cookie sets `secure: true` when `NODE_ENV === "production"`, ensuring it is only sent over HTTPS. |
| **Password hashing** | User passwords are hashed with `bcrypt` using a configurable salt rounds value before storage. |
| **Unique email constraint** | The `User` model enforces `unique: true` on the `email` field at the database level, preventing duplicate accounts even under race conditions. |
