const express = require("express");
const methodoverride = require("method-override");
const blogData = require("./data");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

//--------------------------------GET ROUTES-------------------------------

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blogs", (req, res) => {
  res.render("index", { blogs: blogData });
});

app.get("/blogs/create", (req, res) => {
  res.render("create");
});

app.get("/blogs/:id", (req, res) => {
  const blog = blogData.find((b) => b.id == req.params.id);
  res.render("blog", { blog: blog });
});

app.get("/blogs/:id/update", (req, res) => {
  const blog = blogData.find((b) => b.id == req.params.id);
  res.render("update", { blog: blog });
});

app.get("/blogs/:id/delete", (req, res) => {
  const blog = blogData.find((b) => b.id == req.params.id);
  res.render("delete", { blog: blog });
});

// -----------------------------Post Routes---------------------------------------------

// Create a new blog

app.post("/blogs", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const id = blogData.length + 1;

  blogData.push({ id: id, title: title, content: content });

  res.redirect("/blogs");
});

app.put("/blogs/:id", (req, res) => {
  const blog = blogData.find((b) => b.id == req.params.id);

  blog.title = req.body.title;
  blog.content = req.body.content;

  res.redirect("/blogs");
});

app.delete("/blogs/:id", (req, res) => {
  const index = blogData.findIndex((b) => b.id == req.params.id);

  blogData.splice(index, 1);

  res.redirect("/blogs");
});

//-------------------------------------APP listen-------------------------------

app.listen(3000, () => {
  console.log("Blog app listening on port 3000!");
});
