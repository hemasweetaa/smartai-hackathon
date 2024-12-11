const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost", // Replace with your host
  user: "root", // Replace with your username
  password: "swee090104", // Replace with your password
  database: "workers_db", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected.");
});

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Routes for managing workers

// Get all workers
app.get("/api/workers", (req, res) => {
  const sql = "SELECT * FROM workers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching workers:", err.message);
      res.status(500).send("Database error");
    } else {
      const formattedResults = results.map((worker) => ({
        ...worker,
        dob: formatDate(worker.dob),
        dateOfJoining: formatDate(worker.dateOfJoining),
      }));
      res.json(formattedResults);
    }
  });
});

// Add a worker
app.post("/api/workers/add", (req, res) => {
  const worker = {
    ...req.body,
    dob: formatDate(req.body.dob),
    dateOfJoining: formatDate(req.body.dateOfJoining),
  };
  const sql = "INSERT INTO workers SET ?";
  db.query(sql, worker, (err, results) => {
    if (err) {
      console.error("Error adding worker:", err.message);
      res.status(500).send("Database error");
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// Edit a worker
app.put("/api/workers/edit", (req, res) => {
  const { id, ...updatedWorker } = req.body;
  const formattedWorker = {
    ...updatedWorker,
    dob: formatDate(updatedWorker.dob),
    dateOfJoining: formatDate(updatedWorker.dateOfJoining),
  };
  const sql = `
    UPDATE workers 
    SET employeeId = ?, rfidId = ?, name = ?, department = ?, designation = ?, 
        address = ?, dob = ?, dateOfJoining = ?, currentSalary = ?, mobile = ? 
    WHERE id = ?`;
  db.query(
    sql,
    [
      formattedWorker.employeeId,
      formattedWorker.rfidId,
      formattedWorker.name,
      formattedWorker.department,
      formattedWorker.designation,
      formattedWorker.address,
      formattedWorker.dob,
      formattedWorker.dateOfJoining,
      formattedWorker.currentSalary,
      formattedWorker.mobile,
      id,
    ],
    (err) => {
      if (err) {
        console.error("Error updating worker:", err.message);
        res.status(500).send("Database error");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Delete a worker
app.delete("/api/workers/delete", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM workers WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting worker:", err.message);
      res.status(500).send("Database error");
    } else {
      res.sendStatus(200);
    }
  });
});

// Routes for managing cameras

// Get all cameras
app.get("/api/cameras", (req, res) => {
  const sql = "SELECT * FROM manage_cameras";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching cameras:", err.message);
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
});

// Add a camera
app.post("/api/cameras/add", (req, res) => {
  const { camera_name, camera_url } = req.body;
  const sql = "INSERT INTO manage_cameras (camera_name, camera_url) VALUES (?, ?)";
  db.query(sql, [camera_name, camera_url], (err, results) => {
    if (err) {
      console.error("Error adding camera:", err.message);
      res.status(500).send("Database error");
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// Edit a camera
app.put("/api/cameras/edit", (req, res) => {
  const { id, camera_name, camera_url } = req.body;
  const sql = "UPDATE manage_cameras SET camera_name = ?, camera_url = ? WHERE id = ?";
  db.query(sql, [camera_name, camera_url, id], (err) => {
    if (err) {
      console.error("Error updating camera:", err.message);
      res.status(500).send("Database error");
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a camera
app.delete("/api/cameras/delete", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM manage_cameras WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting camera:", err.message);
      res.status(500).send("Database error");
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


  // fetch unauthorized areas

  app.get("/api/unauthorized-areas", (req, res) => {
    const sql = "SELECT * FROM unauthorized_area";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching unauthorized areas:", err.message);
        return res.status(500).send("Database error");
      }
      // Convert JSON string to object for the response
      const formattedResults = results.map(area => ({
        ...area,
        coordinates: JSON.parse(area.coordinates),
      }));
      res.json(formattedResults);
    });
  });

  
  //add unauthorized areas

  app.post("/api/unauthorized-areas/add", (req, res) => {
    const { camera_name, coordinates } = req.body;
    if (!camera_name || !coordinates || coordinates.length < 3) {
      return res.status(400).send("Invalid data. Camera name and at least 3 coordinates are required.");
    }
    const sql = "INSERT INTO unauthorized_area (camera_name, coordinates) VALUES (?, ?)";
    db.query(sql, [camera_name, JSON.stringify(coordinates)], (err, results) => {
      if (err) {
        console.error("Error adding unauthorized area:", err.message);
        return res.status(500).send("Database error");
      }
      res.json({ id: results.insertId });
    });
  });

  
  //edit unauthorized areas

  app.put("/api/unauthorized-areas/:id", (req, res) => {
    const { id } = req.params;
    const { camera_name, coordinates } = req.body;
    if (!camera_name || !coordinates || coordinates.length < 3) {
      return res.status(400).send("Invalid data. Camera name and at least 3 coordinates are required.");
    }
    const sql = `
      UPDATE unauthorized_area
      SET camera_name = ?, coordinates = ?
      WHERE id = ?
    `;
    db.query(sql, [camera_name, JSON.stringify(coordinates), id], (err) => {
      if (err) {
        console.error("Error updating unauthorized area:", err.message);
        return res.status(500).send("Database error");
      }
      res.sendStatus(200);
    });
  });

  
  // delete unauthorized areas
  app.delete("/api/unauthorized-areas/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM unauthorized_area WHERE id = ?";
    db.query(sql, [id], (err) => {
      if (err) {
        console.error("Error deleting unauthorized area:", err.message);
        return res.status(500).send("Database error");
      }
      res.sendStatus(200);
    });
  });
  