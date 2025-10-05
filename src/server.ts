// src/server.ts
import "./config"; // MUST come first
import app from "./app"; // app imports db.ts internally

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
