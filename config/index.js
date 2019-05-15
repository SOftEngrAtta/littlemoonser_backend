module.exports = {
  port: process.env.PORT || "8080",
  // mongodbURI: (process.env.PORT ? "mongodb://littleMoonAdmin:pakistan123*+@ds113136.mlab.com:13136/app-db" : "mongodb://littleMoonAdmin:pakistan123*+@ds113136.mlab.com:13136/app-db")

  mongodbURI: (process.env.PORT ? "mongodb://littleMoonAdmin:pakistan123*+@ds113136.mlab.com:13136/app-db" : "mongodb://localhost:27017/little_moon")
};
