const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
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

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) console.error("Email Transport Error:", error);
  else console.log("✅ Email transporter connected!");
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
    //   // send email
    app.post("/mybooking", async (req, res) => {
      const booking = req.body;
      try {
        const result = await BookingCollection.insertOne(booking);

        if (result.insertedId) {
          const mailOptions = {
            from: `"AthleticHub Events" <${process.env.EMAIL_USER}>`,
            to: booking.userEmail,
            subject: `Booking Confirmed! 🎉 Join us for ${booking.eventName}`,
            html: `
  <div style="font-family: Arial, sans-serif; background:#f4f7fa; padding:20px; margin:0;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <div style="background:#0A78E6; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">🎉 Booking Confirmation</h2>
        <p style="margin:6px 0 0;">Thank you for choosing AthleticHub Events</p>
      </div>

      <img src="${
        booking.imageUrl
      }" alt="Event Banner" style="width:100%; height:auto;" />

      <div style="padding:20px;">
        <h3 style="color:#0A78E6; margin:0;">${booking.eventName}</h3>
        <p style="margin:8px 0 15px; color:#333;">${booking.description}</p>
        
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:8px 0; font-weight:600;">📅 Event Date:</td>
            <td>${booking.eventDate}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">📍 Location:</td>
            <td>${booking.location}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">🎯 Event Type:</td>
            <td>${booking.eventType}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">🧑 Booked By:</td>
            <td>${booking.userName} (${booking.userEmail})</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">📌 Booking ID:</td>
            <td>${result.insertedId}</td>
          </tr>
        </table>

        <div style="text-align:center; margin-top:25px;">
          <a href="https://athletichub-f25f3.web.app/mybooking" 
            style="background:#0A78E6; color:white; padding:12px 24px; 
            border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block;">
            View Booking Details
          </a>
        </div>
      </div>

      <div style="background:#eef4fa; padding:15px; text-align:center; font-size:12px; color:#555;">
        <p>If you have any questions, please contact our support.</p>
        <p>© ${new Date().getFullYear()} AthleticHub Events — All Rights Reserved.</p>
      </div>

    </div>
  </div>
`,
          };

          await transporter.sendMail(mailOptions);
          console.log(`✅ Confirmation email sent to ${booking.userEmail}`);

          return res.status(201).send({
            success: true,
            message: "Booking created and email sent successfully.",
            bookingId: result.insertedId,
          });
        }

        return res.status(500).send({
          success: false,
          message: "Booking inserted but result missing insertedId.",
        });
      } catch (error) {
        console.error("Error creating booking or sending email:", error);
        return res.status(500).send({
          success: false,
          message: "Failed to create booking or send email",
          error: error.message,
        });
      }
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

