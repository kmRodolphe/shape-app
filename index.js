const express = require("express");
const DataStore = require("nedb");

const app = express();
app.listen(1080, () => console.log("Listening at 1080"));
app.use(express.static("public"));
app.use(express.json());
const db = new DataStore("database.db");

db.loadDatabase();

app.post("/api", (request, response) => {
  db.remove({}, { multi: true });
  db.insert(request.body);
  response.json({
    status: "Success",
    itemSaved: request.body.data,
  });
});

app.get("/api", (request, response) => {
  db.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
    console.log("data sent");
  });
});
