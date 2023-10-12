# Email Queue Service

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)
![npm](https://img.shields.io/badge/npm-latest-blue)
![Redis](https://img.shields.io/badge/Redis-v6%2B-red)
![Bull](https://img.shields.io/badge/Bull-v4%2B-orange)

This is a Node.js application that provides a simple email queue service using Express, Bull, and Nodemailer. The service allows you to send emails by submitting a POST request with the email details to the /send-email endpoint. The email sending is processed asynchronously using a queue, and the service can be easily scaled to handle a large number of email requests.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Node.js
- Redis server
- Create a .env file with the following environment variables:

```bash
REDIS_URL=<your_redis_url>
USER=<your_gmail_user>
PASSWORD=<your_gmail_password>
```

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd <repository_directory>
```

2. Install dependencies:

```bash
npm install
```

## Configuration

Edit the .env file to configure your Redis server URL, Gmail user, and password.

## Running the Application

To start the email queue service, use the following command:

```bash
node app.mjs
```

The service will start on the default port (8080), or you can set the PORT environment variable to a custom port.

## Sending an Email

To send an email using the HTML form, access the form by making a GET request to the /send-email endpoint. The HTML form will be served, allowing users to input email details and send emails through the service.

Example GET request:

```http
GET http://localhost:8080/send-email
```

To send an email programmatically, make a POST request to the /send-email endpoint with the email details in the request body. The email will be added to the email processing queue and sent asynchronously.

Example POST request:

```http
POST http://localhost:8080/send-email
Content-Type: application/json

{
  "recipient": "recipient@example.com",
  "subject": "Hello from Email Queue Service",
  "message": "This is a test email."
}
```

## Email Queue Processing

Emails are processed asynchronously using Bull. The email.queue.mjs file sets up the email processing queue and handles the email sending process. Emails are retried up to 2 times if sending fails.

## Email Sending

Emails are sent using Nodemailer, and the email sending process is defined in the email.process.mjs file. It reads the email details from the queue job and sends the email using the configured Gmail credentials.

## Logging

The service logs messages to the console to indicate when the server has started and when an email has been sent successfully.
