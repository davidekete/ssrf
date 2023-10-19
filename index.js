const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload-image-url", async (req, res) => {
  try {
    //Get image URL from request
    const imageURL = req.body.imageURL;

    if (!imageURL) {
      return res.status(400).send("Image URL is required");
    }

    //Get image from URL
    const image = await axios.get(imageURL);

    return res.json({
      response: "Image uploaded successfully",
      image: image.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response.status).send(error.response.data);
    }

    res.status(500).send("Something went wrong");
  }
});

app.get("/users", (req, res) => {
  return res.send({
    credentials: [
      {
        email: "user@example.com",
        password: "xswekwi11234499",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "12345",
        },
        name: "John Doe",
        securityQuestion: "What is your favorite color?",
        securityAnswer: "Blue",
      },
      {
        email: "user1@example.com",
        password: "xswekwi11234499",
        address: {
          street: "80 Main St",
          city: "New York",
          state: "NY",
          zipCode: "12345",
        },
        name: "Jane Doe",
        securityQuestion: "What was your first pet's name?",
        securityAnswer: "Spot",
      },
    ],
  });
});

app.get("users/:id/profile", (req, res) => {
  const userId = req.params.id;

  return res.send({
    info: {
      userId,
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
      dateOfBirth: "01/01/1990",
      SSN: "123456789",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "12345",
      },
    },
  });
});

app.listen(8050, () => {
  console.log(`Server is running on port ${8050}`);
});
