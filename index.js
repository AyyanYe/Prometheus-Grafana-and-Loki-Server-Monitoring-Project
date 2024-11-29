const express = require("express");
const reponseTime = require("response-time");
const client = require("prom-client"); // Metric Collection
const { createLogger, transports, format } = require("winston");
const LokiTransport = require("winston-loki");

const { doSomeHeavyTask } = require("./util");
const responseTime = require("response-time");

//Configuration for Grafana Loki using winston package
const options = {
  transports: [
    new LokiTransport({
      host: "http:127.0.0.1:3100", //change this to your loki server
      labels: {
        appName: "testing_server_ayyan_ahmed",
        //this will be used to select this loki instance on Grafana
      },
    }),
  ],
};

const logger = createLogger(options);

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "Response and Request time of express server",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalReqCounter = new client.Counter({
  name: "total_req",
  help: "Tells the total number of requests made to the server.",
});

app.use(
  responseTime((req, res, time) => {
    totalReqCounter.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

app.get("/", (req, res) => {
  logger.info('Request came on "/" route');
  return res.json({
    message: `Hello from Express Server running at PORT ${PORT}`,
  });
});

app.get("/slow", async (req, res) => {
  try {
    logger.info('Request came on "/slow" route');
    const timeTaken = await doSomeHeavyTask();

    return res.json({
      status: "Success",
      message: `Heavy task completed in ${timeTaken}ms`,
    });
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({
      status: "Error",
      message: "Failed to complete heavy task",
    });
  }
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

app.listen(PORT, () =>
  console.log(`Express Server started at http://localhost:${PORT}`)
);

if (!process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}
