# Prometheus, Grafana, and Loki Server Monitoring Project

This project is a basic setup for integrating **Prometheus**, **Grafana**, and **Loki** for server monitoring. It includes a sample Express.js server that demonstrates how to simulate server load and generate metrics, making it suitable for large-scale server replication and monitoring.

---

## **Features**

- A simple Express.js server with endpoints:
  - `/`: Basic health check endpoint.
  - `/slow`: Simulates a heavy task with random delays and errors.
- Utilizes Prometheus, Grafana, and Loki for performance monitoring and logging.
- Demonstrates how to track server load and responses.

---

## **Installation**

### **Prerequisites**

- Node.js (v14+)
- npm (v6+)
- Prometheus, Grafana, and Loki setup on your system.

### **Steps**

1. Clone this repository:

   ```bash
   git clone https://github.com/AyyanYe/Prometheus-Grafana-and-Loki-Server-Monitoring-Project.git
   cd Prometheus-Grafana-and-Loki-Server-Monitoring-Project
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server using `nodemon`:

   ```bash
   npm start
   ```

4. The server will start at:

   ```
   http://localhost:8000
   ```

5. Run the docker file to start the Prometheus Server:

   ```bash
   docker compose up
   ```

6. Run the command to start the Grafana Server:

   ```bash
   docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
   ```

7. Run the command to start the Grafana-Loki Server:
   ```bash
   docker run -d -p 3100:3100 --name=loki grafana/grafana-loki
   ```

---

## **Endpoints**

### **`GET /`**

- **Description**: Health check for the server.
- **Response**:
  ```json
  {
    "message": "Hello from Express Server running at PORT 8000"
  }
  ```

### **`GET /slow`**

- **Description**: Simulates a heavy task with random delays and occasional errors.
- **Success Response**:
  ```json
  {
    "status": "Success",
    "message": "Heavy task completed in <time-taken>ms"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": "Error",
    "message": "Failed to complete heavy task"
  }
  ```

### **`GET /metrics`**

- **Description**: For Prometheus metrics endpoint.
- **Response**: Returns all the server data.

---

## **Project Structure**

```
.
├── index.js              # Main Express.js server file
├── util.js               # Utility functions for simulating server load
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation
```

---

## **Technologies Used**

- **Express.js**: Lightweight and fast server framework for Node.js.
- **Prometheus**: Open-source monitoring and alerting toolkit.
- **Grafana**: Visualization tool for metrics.
- **Loki**: Log aggregation system.

---

## **Usage**

1. Use `/` to verify that the server is running correctly.
2. Use `/slow` to test heavy tasks and simulate delays/errors.

You can integrate **Prometheus** to monitor the `/slow` endpoint and visualize the performance in **Grafana**.

---

## **Contributing**

Feel free to contribute to this project by submitting issues or pull requests. Contributions are highly appreciated!

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Author**

**Ayyan Ahmed**

- GitHub: [AyyanYe](https://github.com/AyyanYe)
- Email: [ayyanahmed@outlook.com](ayyanahmed@outlook.com)

---

## **Acknowledgments**

- This project serves as a foundation for server monitoring tools and can be easily extended for production environments.
