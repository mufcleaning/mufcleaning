# MUF Cleaning Webhook Server

A simple Express.js webhook server for MUF Cleaning that handles webhook verification and data reception.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mufcleaning/mufcleaning.git
cd mufcleaning
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env` and update values):
```
PORT=3000
VERIFY_TOKEN=your_secure_token_here
```

## Running the Server

**Production mode:**
```bash
npm start
```

**Development mode (with auto-reload):**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### GET `/` - Webhook Verification
Used by webhook providers to verify the endpoint.

**Query Parameters:**
- `hub.mode`: Should be 'subscribe'
- `hub.challenge`: Challenge string from provider
- `hub.verify_token`: Token to verify (must match VERIFY_TOKEN env var)

**Example:**
```
GET /?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=your_token
```

**Response:**
- **200**: Returns the challenge string if verification succeeds
- **403**: Returns forbidden if verification fails

### POST `/` - Receive Webhook Data
Receives and logs webhook data from providers.

**Request Body:** JSON data from webhook provider

**Response:** 200 OK

**Example:**
```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": "example"}'
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `VERIFY_TOKEN`: Token for webhook verification (set to your secure token)

## Project Structure

```
mufcleaning/
├── app.js              # Main application file
├── package.json        # Project dependencies
├── .env               # Environment variables (create this)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Troubleshooting

**Error: "Cannot find module 'express'"**
```bash
npm install
```

**Port already in use**
```bash
PORT=3001 npm start
```

**Webhook not verifying**
- Check that `VERIFY_TOKEN` in `.env` matches the token from your webhook provider
- Verify query parameters are correct

## License

ISC
