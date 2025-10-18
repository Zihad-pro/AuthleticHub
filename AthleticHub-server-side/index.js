const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sdwtdhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB Client setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const AthletichubCollection = client.db("AthleticHub").collection("Events");
    const BookingCollection = client.db("AthleticHub").collection("MyBooking");

    //  events  filter by email
    app.get("/events", async (req, res) => {
      try {
        const email = req.query.email;
        const query = email ? { creatorEmail: email } : {};
        const events = await AthletichubCollection.find(query).toArray();
        res.send(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send({ error: "Failed to fetch events" });
      }
    });

    // Event details
    app.get("/events/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const event = await AthletichubCollection.findOne({
          _id: new ObjectId(id),
        });
        res.send(event);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch event." });
      }
    });

    // Create new event
    app.post("/events", async (req, res) => {
      const newEvent = req.body;
      const result = await AthletichubCollection.insertOne(newEvent);
      res.send(result);
    });

    // Update an existing event
    app.put("/events/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedEvent = req.body;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            eventName: updatedEvent.eventName,
            eventType: updatedEvent.eventType,
            eventDate: updatedEvent.eventDate,
            location: updatedEvent.location,
            description: updatedEvent.description,
            imageUrl: updatedEvent.imageUrl,
            creatorName: updatedEvent.creatorName,
            creatorEmail: updatedEvent.creatorEmail,
          },
        };

        const result = await AthletichubCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to update event." });
      }
    });

    // delete event 
    app.delete("/events/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await AthletichubCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount > 0) {
          res.send({ success: true, deletedCount: result.deletedCount });
        } else {
          res.status(404).send({ success: false, message: "Event not found" });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        res
          .status(500)
          .send({ success: false, error: "Internal server error" });
      }
    });
    // create booking
    app.post("/mybooking", async (req, res) => {
      const booking = req.body;
      const result = await BookingCollection.insertOne(booking);
      res.send(result);
    });

    // my bookings event
    app.get("/mybooking", async (req, res) => {
      const email = req.query.email;
      const query = email ? { userEmail: email } : {};
      const bookings = await BookingCollection.find(query).toArray();
      res.send(bookings);
    });

    // delete my booking
    app.delete("/mybooking/:id", async (req, res) => {
      const id = req.params.id;
      const result = await BookingCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Ping MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully!");
  } finally {
    // Do not close client if using continuously
    // await client.close();
  }
}

run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("AthleticHub Server is Running");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
