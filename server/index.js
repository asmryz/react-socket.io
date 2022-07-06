const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
	transports: ["polling"],
	cors: {
		origin: "*",
	},
});

dotenv.config({
	path: "./config.env",
});

// CORS
app.use(cors());

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("message", (message) => {
		console.log(`message from ${socket.id} : ${message}`);
	});
});

// const socketIOMiddleware = (req, res, next) => {
// 	req.io = io;
// 	next();
// };

// // ROUTES
// app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
// 	req.io.emit("message", `Hello, ${req.originalUrl}`);
// 	res.send("hello world!");
// });

// LISTEN
const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

//const express = require("express");
//const app = express();
//const http = require("http");
//const server = http.createServer(app);

// server.listen(3000, () => {
// 	console.log("listening on *:3000");
// });
