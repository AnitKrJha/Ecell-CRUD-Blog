const express = require("express");
const methodoverride = require("method-override");
const jwt=require('jsonwebtoken')
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

app.get('/login',(req,res)=>{
  res.render("login")
})

// -----------------------------Post Routes---------------------------------------------

// Create a new blog

app.post("/blogs",authenticateToken, (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const id = blogData.length + 1;

  blogData.push({ id: id, title: title, content: content });

  res.redirect("/blogs");
});

app.put("/blogs/:id",authenticateToken, (req, res) => {
  const blog = blogData.find((b) => b.id == req.params.id);

  blog.title = req.body.title;
  blog.content = req.body.content;

  res.redirect("/blogs");
});

app.delete("/blogs/:id",authenticateToken, (req, res) => {
  const index = blogData.findIndex((b) => b.id == req.params.id);

  blogData.splice(index, 1);

  res.redirect("/blogs");
});


app.post('/login', function(req, res) {
  // get the user data from request body
  const {username, password} = req.body;

  // check if username and password match hardcoded values
  if (username === 'admin' && password === 'password') {
    // create a token and sign it
    const token = jwt.sign({username: username}, 'secret_key');
    res.json({token});
  } else {
    res.status(401).json({message: 'Invalid username or password'});
  }
});

//--------------------------------authentication middleware---------------------------------

function authenticateToken(req, res, next) {
  // get the token from request headers
  console.log(req.headers);
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


//-------------------------------------APP listen-------------------------------

app.listen(3000, () => {
  console.log("Blog app listening on port 3000!");
});
