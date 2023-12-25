
## Features
- User-friendly interface for making requests to the OpenAI API
- Responses are displayed in a chat-like format

## Technologies Used
- For client, I used React.js.
- For server, I used express.

## Setup Introduction
This guide will help you set up the repository on your local machine. Please follow these steps carefully to ensure a smooth setup process.

### Cloning the repository
Use the following command to clone the repository:
```sh
git clone the repo
```

### Backend Setup
 
- Navigate to server directory
```sh
cd server # Navigate to the server directory:
```
- Install dependencies
```sh
npm install #install the backend dependencies
```
- Set the OPENAI_API_KEY in the .env file:
```sh
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

- Start the backend server by running the following command:
```sh
node index.js
```

### Frontend Setup

- Navigate to the client directory:
```sh
cd client
```

- Run the following command to install the frontend dependencies:
```sh
npm install
```

- Set the `REACT_APP_BACKEND_URL` in the `.env` file to the URL of your backend server. For local development, use the following URL:
```sh
REACT_APP_BACKEND_URL=http://localhost:3001/
```

- Start the frontend app by running the following command:
```sh
npm start
```

### Hosting Backend and Frontend in Same Port/URL

If you wish to host both the backend and frontend on the same port/URL, follow these steps:

- Build the frontend by running the following command in the `client` directory:
```sh
npm run build
```
- Copy the `build` directory to the `server` directory and rename it to `frontend`.

- Start the backend server using the instructions in the "Backend Setup" section.

- Once the setup process is complete, the frontend will be accessible at the URL of your backend server.

## Usage
- Type in the input field and press enter or click on the send button to make a request to the OpenAI API
- Use control+enter to add line breaks in the input field
- Responses are displayed in the chat-like format on top of the page



