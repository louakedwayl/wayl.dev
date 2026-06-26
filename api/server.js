require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "https://wayl.dev" }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function handleContact(req, res) {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "contact@wayl.dev",
      subject: `Portfolio — ${name}`,
      replyTo: email,
      text: `From: ${name} (${email})\n\n${message}`,
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Send failed" });
  }
}

app.post("/contact", handleContact);
app.post("/api/contact", handleContact);

app.listen(3001, "127.0.0.1", () => console.log("✓ contact API on 127.0.0.1:3001"));
