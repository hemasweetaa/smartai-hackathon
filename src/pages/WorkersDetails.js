import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "./WorkersDetails.css";

const WorkersDetails = () => {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newWorker, setNewWorker] = useState({
    employeeId: "",
    rfidId: "",
    name: "",
    department: "",
    designation: "",
    address: "",
    dob: "",
    dateOfJoining: "",
    currentSalary: "",
    mobile: "",
  });

  const [editId, setEditId] = useState(null);

  // Fetch workers from the backend
  const fetchWorkers = () => {
    axios.get("http://localhost:5000/api/workers").then((response) => {
      setWorkers(response.data);
    });
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setNewWorker({
      employeeId: "",
      rfidId: "",
      name: "",
      department: "",
      designation: "",
      address: "",
      dob: "",
      dateOfJoining: "",
      currentSalary: "",
      mobile: "",
    });
  };

  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleAddOrEditWorker = () => {
    if (isEditing) {
      console.log("Editing Worker:", { id: editId, ...newWorker });
      axios
        .put("http://localhost:5000/api/workers/edit", {
          id: editId,
          ...newWorker, // Spread worker details
        })
        .then(() => {
          console.log("Worker updated successfully");
          fetchWorkers(); // Refresh worker list
        })
        .catch((err) => {
          console.error("Error updating worker:", err.message);
        });
    } else {
      console.log("Adding Worker:", newWorker);
      axios
        .post("http://localhost:5000/api/workers/add", newWorker)
        .then(() => {
          console.log("Worker added successfully");
          fetchWorkers(); // Refresh worker list
        })
        .catch((err) => {
          console.error("Error adding worker:", err.message);
        });
    }
    handleCloseModal(); // Close modal after operation
  };
  

  const handleEditWorker = (id, index) => {
    setIsEditing(true);
    setEditId(id);
    setNewWorker(workers[index]);
    handleShowModal();
  };

  const handleDeleteWorker = (id) => {
    axios
      .delete("http://localhost:5000/api/workers/delete", { data: { id } })
      .then(() => {
        fetchWorkers(); // Fetch updated worker list after deleting
      });
  };

  return (
    <div className="workers-container">
      <h3>Manage Workers</h3>
      <Button variant="primary" onClick={handleShowModal}>
        Add Worker
      </Button>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>RFID ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Date of Joining</th>
              <th>Current Salary</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={worker.id}>
                <td>{worker.employeeId}</td>
                <td>{worker.rfidId}</td>
                <td>{worker.name}</td>
                <td>{worker.department}</td>
                <td>{worker.designation}</td>
                <td>{worker.address}</td>
                <td>{worker.dob}</td>
                <td>{worker.dateOfJoining}</td>
                <td>{worker.currentSalary}</td>
                <td>{worker.mobile}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditWorker(worker.id, index)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteWorker(worker.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Worker" : "Add Worker"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(newWorker).map((key) => (
              <Form.Group controlId={`form${key}`} key={key}>
                <Form.Label>{key.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${key}`}
                  name={key}
                  value={newWorker[key]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrEditWorker}>
            {isEditing ? "Update Worker" : "Add Worker"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkersDetails;
