const db = require("../data/db");

const AflamSchema = new db.Schema(
  {
    title: { type: String, required: true },
    plot: { type: String },
    fullplot: { type: String },
    genres: [{ type: String }],
    runtime: { type: Number },
    cast: [{ type: String }],
    poster: { type: String },
    languages: [{ type: String }],
    released: { type: Date },
    directors: [{ type: String }],
    rated: { type: String },
    lastupdated: { type: Date },
    year: { type: Number },
    imdb: {
      id: { type: Number },
      rating: { type: Number },
      votes: { type: Number },
    },
    countries: [{ type: String }],
    type: { type: String },
    num_mflix_comments: { type: Number, default: 0 },
  },
  { _id: false }
);

module.exports = db.model("movie", AflamSchema);
