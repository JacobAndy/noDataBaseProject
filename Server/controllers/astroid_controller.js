const axios = require("axios");
let astroids = [];
let newId = 30000000;
module.exports = {
  getAstroid: (req, res) => {
    // astroids= [];
    console.log(astroids.length);
    if (!astroids.length) {
      axios
        .get(
          `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${
            process.env.API_KEY
          }`
        )
        .then(results => {
          astroids = results.data.near_earth_objects;
          // console.log(results.data.near_earth_objects);
        });
      // .catch(console.log);
      res.status(200).json(astroids);
    } else {
      res.status(200).json(astroids);
    }
  },
  createAstroid: (req, res, next) => {
    let { name, diameterFtMin, hazard } = req.body;
    estimated_diameter = {
      feet: {
        estimated_diameter_min: diameterFtMin
      }
    };
    is_potentially_hazardous_asteroid = hazard;
    astroids.push({
      neo_reference_id: newId,
      name,
      estimated_diameter,
      is_potentially_hazardous_asteroid
    });
    newId++;
    res.status(200).json(astroids);
  },
  updateAstroid: (req, res, next) => {
    let { id } = req.params;
    let { name, diameterFtMin, orbiting_body } = req.body;
    astroids.forEach(astroid => {
      if (astroid.neo_reference_id === id) {
        astroid.name = name;
        astroid.estimated_diameter.feet.estimated_diameter_min = diameterFtMin;
        astroid.close_approach_data.orbiting_body = orbiting_body;
      }
    });
    res.status(200).json(astroids);
  },
  deleteAstroid: (req, res, next) => {
    let { id } = req.params;
    let index = astroids.findIndex(astroid => astroid.neo_reference_id === id);
    astroids.splice(index, 1);
    res.status(200).json(astroids);
  }
};
