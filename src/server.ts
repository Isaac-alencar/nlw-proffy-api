import app from "./app";

app.listen(process.env.PORT || 3333, () => {
  console.log("🔥 Server is running at http://localhost:3333/ ");
});
