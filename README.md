# HealthWise: AI-Powered Personalized Health Insights

**HealthWise** is a comprehensive web application designed to provide personalized health insights, wellness recommendations, and actionable plans using advanced AI/ML technologies. It features an AI-powered chatbot that can assist users in real-time with their health and wellness questions.

## Project Structure

HealthWise ├── backend/ # Backend server (Node.js) │ ├── app.ts # Main application file in TypeScript │ ├── package.json # Backend dependencies │ ├── config/ # Database configurations (MongoDB/MySQL) │ ├── controllers/ # Controllers for handling business logic │ ├── routes/ # API routes │ ├── models/ # Database models │ ├── scripts/ # Python scripts for AI and chatbot │ │ └── chatbot_service.py # Python script with LangChain/RAG integration │ └── utils/ # Utility functions │ ├── frontend/ # Frontend React application │ ├── public/ # Public files │ ├── src/ # Source code │ │ ├── components/ # React components (Chatbot, etc.) │ │ ├── pages/ # Application pages │ │ ├── services/ # API service calls to backend │ │ └── App.tsx # Main React component │ └── package.json # Frontend dependencies │ ├── docker-compose.yml # Docker Compose for the entire project └── README.md # Project overview and setup and instructions. 


## Features

- **Personalized Health Insights**: Users receive customized health recommendations based on their profile.
- **AI Chatbot**: Uses LangChain and Retrieval-Augmented Generation (RAG) to interact with users and provide real-time assistance.
- **Health Recommendations**: Wellness plans covering nutrition, fitness, and mindfulness.
- **User-Friendly Frontend**: Built with React and TypeScript for a modern, responsive UI.

## Tech Stack

- **Frontend**: React.js, TypeScript, Styled Components
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (for profile and chatbot data) and MySQL (for structured data)
- **AI Service**: Python with LangChain and RAG for chatbot responses

## Prerequisites

- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop)

## Setup Instructions

### Using Docker Compose

This project is Dockerized using `docker-compose.yml` to manage all services (backend, frontend, MongoDB, MySQL, and the Python chatbot). Docker will handle dependencies and network configurations automatically.

### 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone <repository-url>
cd HealthWise

Here's a README.md tailored for the Docker-based setup. This version will guide users on how to set up and deploy the HealthWise project using Docker to streamline the installation and ensure consistent configurations across environments.

markdown
Copy code
# HealthWise: AI-Powered Personalized Health Insights

**HealthWise** is a comprehensive web application designed to provide personalized health insights, wellness recommendations, and actionable plans using advanced AI/ML technologies. It features an AI-powered chatbot that can assist users in real-time with their health and wellness questions.

## Project Structure

HealthWise ├── backend/ # Backend server (Node.js) │ ├── app.ts # Main application file in TypeScript │ ├── package.json # Backend dependencies │ ├── config/ # Database configurations (MongoDB/MySQL) │ ├── controllers/ # Controllers for handling business logic │ ├── routes/ # API routes │ ├── models/ # Database models │ ├── scripts/ # Python scripts for AI and chatbot │ │ └── chatbot_service.py # Python script with LangChain/RAG integration │ └── utils/ # Utility functions │ ├── frontend/ # Frontend React application │ ├── public/ # Public files │ ├── src/ # Source code │ │ ├── components/ # React components (Chatbot, etc.) │ │ ├── pages/ # Application pages │ │ ├── services/ # API service calls to backend │ │ └── App.tsx # Main React component │ └── package.json # Frontend dependencies │ ├── docker-compose.yml # Docker Compose for the entire project └── README.md # Project overview and setup instructions

markdown
Copy code

## Features

- **Personalized Health Insights**: Users receive customized health recommendations based on their profile.
- **AI Chatbot**: Uses LangChain and Retrieval-Augmented Generation (RAG) to interact with users and provide real-time assistance.
- **Health Recommendations**: Wellness plans covering nutrition, fitness, and mindfulness.
- **User-Friendly Frontend**: Built with React and TypeScript for a modern, responsive UI.

## Tech Stack

- **Frontend**: React.js, TypeScript, Styled Components
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (for profile and chatbot data) and MySQL (for structured data)
- **AI Service**: Python with LangChain and RAG for chatbot responses

## Prerequisites

- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop)

## Setup Instructions

### Using Docker Compose

This project is Dockerized using `docker-compose.yml` to manage all services (backend, frontend, MongoDB, MySQL, and the Python chatbot). Docker will handle dependencies and network configurations automatically.

### 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone <repository-url>
cd HealthWise
2. Set Up Environment Variables
Create an .env file in the root directory with the following environment variables for MongoDB and MySQL:
# MongoDB
MONGO_URI=mongodb://mongodb:27017/healthwise

#MySQL
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=healthwise_db

3. Run Docker Compose
Use Docker Compose to build and run the entire project stack.
docker-compose up --build
This will:

Start the frontend on http://localhost:3000
Start the backend on http://localhost:5000
Set up MongoDB and MySQL databases
Run the Python chatbot service
Docker Configuration Files
Docker Compose (docker-compose.yml)
The docker-compose.yml file manages the entire application stack, including the backend, frontend, MongoDB, MySQL, and the Python chatbot service.

version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
      - mysql
      - ai-python
    volumes:
      - ./backend:/app
    environment:
      MONGO_URI: mongodb://mongodb:27017/healthwise
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: healthwise_db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app

  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  mysql:
    image: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: healthwise_db
    volumes:
      - mysql_data:/var/lib/mysql

  ai-python:
    image: python:3.8-slim
    volumes:
      - ./backend/scripts:/scripts
    working_dir: /scripts
    command: python chatbot_service.py

volumes:
  mongo_data:
  mysql_data:
4. Access the Application
Frontend: http://localhost:3000
Backend API: http://localhost:5000
5. Stopping the Containers
To stop the application, press Ctrl + C in the terminal where Docker Compose is running, or use the following command:

docker-compose down
Contributing
Feel free to fork this repository and submit pull requests to enhance the application.

License
This project is licensed under the MIT License. See the LICENSE file for more information.


--- 

This `README.md` file is written to guide users through Docker-based setup and deployment, making it simple for contributors to get started with Docker Compose. Let me know if you need further assistance!


