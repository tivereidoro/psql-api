import { dbConnection } from "../config/dbConfig.js";
import { nanoid } from "nanoid";

// Connect PostgreSQL database
dbConnection
  .connect()
  .then(() => console.log(`⛁ ${" "}Connected to db..`))
  .catch((err) => console.log(err));

// ==========
// Student Controller functions
// Handles CRUD operations for students
// ==========

/**
 * Fetch all students data from the database
 * @param {*} req - The request object containing query parameters.
 * @param {*} res - The response object for sending response back to client.
 */
export const getStudents = (req, res) => {
  console.log("Fetching data from DB");
  res.setHeader("Content-Type", "application/json");

  const selectQuery = "SELECT * FROM my_students";
  dbConnection.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched!!\n", result.rows);
      res.status(200).json(result.rows);
    }
  });
};

// GET student by ID
/**
 * Fetch a student by ID from the database
 * This function handles GET requests to the "/students/:id" endpoint.
 * It retrieves a student's data based on the provided ID in the request parameters.
 * @param {*} req - The request object containing the student ID in the URL parameters.
 * @param {*} res - The response object used to send the response back to the client.
 * @returns -- Returns the student data in JSON format if found, or an error message if not found.
 * @example request - GET /students/:id
 * Example response: { "student_id": "12345", "firstname": "John", "lastname": "Doe", "email": "john@description.com" }
 * @example response - 200 OK with student data, or 404 Not Found if the student does not exist.
 */
export const getStudentById = (req, res) => {
  const { id } = req.params;
  console.log(`Fetching student with ID: ${id}\n`);
  res.setHeader("Content-Type", "application/json");
  const selectQuery = "SELECT * FROM my_students WHERE student_id = $1";
  dbConnection.query(selectQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      const student = result.rows[0];
      if (!student) {
        console.log(`Student with ID: ${id} not found`);
        return res.status(404).send("Student not found");
      }
      console.log("Data fetched!!", student);
      res.status(200).json(student);
    }
  });
};

/**
 * Create a new student in the database
 * This function handles POST requests to the "/students" endpoint.
 * It inserts a new student's data into the database.
 * @param {*} req - The request object containing the student's data in the body.
 * @param {*} res - The response object used to send the response back to the client.
 * @returns -- Returns a success message if the student is created successfully, or an error message if there is an issue.
 */
export const createStudent = (req, res) => {
  const { firstName, lastName, email } = req.body;
  // Generate unique student ID
  const studentId = nanoid(10);

  // Validate the input data
  if (!firstName || !lastName || !email) {
    return res.status(400).send("All fields are required");
  }

  // const insertQuery = `INSERT INTO courses (id, course_name, duration, instructors) VALUES ('${courseId}', '${courseName}', '${duration}', '${instructors}')`;
  const insertQuery = `INSERT INTO my_students (student_id, firstname, lastname, email) VALUES ($1, $2, $3, $4)`;

  dbConnection.query(
    insertQuery,
    [studentId, firstName, lastName, email],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
      } else {
        console.log("Data inserted!!", result);
        res.status(200).send(`Success! Student with ID: ${studentId} created.`);
      }
    }
  );
};

/**
 * Update a student by ID in the database
 * Handles PUT requests to the "/students/:id" endpoint.
 * It updates an existing student's data based on the provided ID in the request parameters.
 * @param {*} req
 * @param {*} res
 * @returns -- Returns a success message if the student is updated successfully, or an error message if not found or if there is an issue.
 */
export const updateStudentById = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  // Validate the input data
  if (!firstName || !lastName || !email) {
    return res.status(400).send("All fields are required");
  }

  const updateQuery = `UPDATE my_students SET firstname = $1, lastname = $2, email = $3 WHERE student_id = $4`;

  dbConnection.query(
    updateQuery,
    [firstName, lastName, email, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).send("Error updating data");
      } else if (result.rowCount === 0) {
        console.log(`Student with ID: ${id} not found`);
        res.status(404).send("Student not found");
      } else {
        console.log(`Student with ID: ${id} updated successfully`);
        res.status(200).send(`Student with ID: ${id} updated successfully`);
      }
    }
  );
};

/**
 * Delete a student by ID from the database
 * Handles DELETE requests to the "/students/:id" endpoint.
 * It removes a student's data based on the provided ID in the request parameters.
 * @param {*} req
 * @param {*} res
 */
export const deleteStudentById = (req, res) => {
  const { id } = req.params;
  console.log(`Deleting student with ID: ${id}\n`);
  res.setHeader("Content-Type", "application/json");

  const deleteQuery = "DELETE FROM my_students WHERE student_id = $1";
  dbConnection.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else if (result.rowCount === 0) {
      console.log(`Student with ID: ${id} not found`);
      res.status(404).send("Student not found");
    } else {
      console.log(`Student with ID: ${id} deleted successfully`);
      res.status(200).send(`Student with ID: ${id} has been deleted!!`);
    }
  });
};

// PATCH request to partially update a student by ID
export const patchStudentById = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  console.log(`Partially updating student with ID: ${id}\n`);
  res.setHeader("Content-Type", "application/json");
  const updateFields = [];
  const updateValues = [];
  let fieldIndex = 1;
  if (firstName) {
    updateFields.push(`firstname = $${fieldIndex++}`);
    updateValues.push(firstName);
  }
  if (lastName) {
    updateFields.push(`lastname = $${fieldIndex++}`);
    updateValues.push(lastName);
  }
  if (email) {
    updateFields.push(`email = $${fieldIndex++}`);
    updateValues.push(email);
  }
  if (updateFields.length === 0) {
    return res.status(400).send("No fields to update");
  }
  updateValues.push(id); // Add the student ID to the end of the array
  const updateQuery = `UPDATE my_students SET ${updateFields.join(
    ", "
  )} WHERE student_id = $${fieldIndex}`;
  dbConnection.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Error updating data");
    } else if (result.rowCount === 0) {
      console.log(`Student with ID: ${id} not found`);
      res.status(404).send("Student not found");
    } else {
      console.log(`Student with ID: ${id} updated successfully`);
      res.status(200).send("Student updated successfully");
    }
  });
};

// ==========
