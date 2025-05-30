import { dbConnection } from "../config/dbConfig.js";
// import { nanoid } from "nanoid";

// Connect PostgreSQL database
dbConnection
  .connect()
  .then(() => console.log(`⛁ ${" "}Connected to db..`))
  .catch((err) => console.log(err));

export const getTest = (req, res) => {
  console.log("Test endpoint hit!");
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ message: "Test endpoint is working!" });
};

// ====================================
export const getStudents = (req, res) => {
  console.log("Fetching data from DB");
  res.setHeader("Content-Type", "application/json");

  const selectQuery = "SELECT * FROM my_students";
  dbConnection.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched!!", result.rows);
      res.status(200).json(result.rows);
    }
  });
};

// export const getCourseById = (req, res) => {
//   const { id } = req.params;

//   const selectQuery = "SELECT * FROM courses WHERE id = $1";
//   dbConnection.query(selectQuery, [id], (err, result) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//       res.status(500).send("Error fetching data");
//     } else {
//       const course = result.rows[0];
//       if (!course) {
//         return res.status(404).send("Course not found");
//       }
//       console.log("Data fetched!!", course);
//       res.status(200).json(course);
//     }
//   });
// };

// export const postToDB = (req, res) => {
//   const { courseName, duration, instructors } = req.body;
//   const courseId = nanoid(10);

//   // const insertQuery = `INSERT INTO courses (id, course_name, duration, instructors) VALUES ('${courseId}', '${courseName}', '${duration}', '${instructors}')`;

//   const insertQuery = `INSERT INTO courses (id, course_name, duration, instructors) VALUES ($1, $2, $3, $4)`;

//   dbConnection.query(
//     insertQuery,
//     [courseId, courseName, duration, instructors],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data:", err);
//         res.status(500).send("Error inserting data");
//       } else {
//         console.log("Data inserted!!", result);
//         res.status(200).send("Data inserted successfully");
//       }
//     }
//   );
// };

// export const createUser = (req, res) => {
//   const user = req.body;
//   // Validate the user object
//   if (!user || !user.name || !user.age) {
//     return res.status(400).send("Invalid user data");
//   }
//   users.push({ id: uuidv4(), ...user });
//   res.status(201).send(`New user '${user.name}' added!`);
// };

// export const getUserById = (req, res) => {
//   const { id } = req.params;
//   const foundUser = users.find((user) => user.id === id);

//   console.log(`Fetching user with ID: ${id}`);
//   if (!foundUser) {
//     return res.status(404).send("User not found");
//   }
//   res.send(foundUser);
// };

/**
 * Delete a user by ID
 * from DELETE requests to the "/users/:id" endpoint.
 * @param {*} req - The request object containing the user ID in the URL parameters.
 * @param {*} res - The response object used to send the response back to the client.
 * @returns --
 */
// export const deleteUserById = (req, res) => {
//   const { id } = req.params;

//   //   Filter out the user with the specified ID from the users array.
//   //   users = users.filter((user) => user.id !== id);

//   // Find the index of the user with the specified ID in the users array.
//   // If the user is not found, send a 404 response.
//   // If the user is found, remove it from the users array and send a success message.
//   const userIndex = users.findIndex((user) => user.id === id);

//   if (userIndex === -1) {
//     return res.status(404).send("User not found");
//   }

//   users.splice(userIndex, 1);
//   res.send(`User with ID: ${id} deleted!!`);
// };

// ===

// export const updateUserById = (req, res) => {
//   const { id } = req.params;
//   const { name, age } = req.body;

//   const user = users.find((user) => user.id === id);
//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   // Update the user object with the new data from the request body
//   // Object.assign(user, req.body);

//   if (name) user.name = name;
//   if (age) user.age = age;
//   //   users = users.map((user) => (user.id === id ? { ...user, ...req.body } : user));

//   res.send(`User with ID: ${id} updated!!`);
// };
