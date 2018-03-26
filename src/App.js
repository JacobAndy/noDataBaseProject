import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import AddAstroid from "./components/AddAstroid/AddAstroid";
import Astroid from "./components/Astroid/Astroid";
import Title from "./components/Title/Title";
import CreateTitle from "./components/Title/CreateTitle";
import Footer from "./components/Footer/Footer";
// import Logo from "./asteroid-icon-png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      astroids: [],
      title: "Asteroids Near Earth",
      userTitle: "",
      userInput: "",
      searchOptions: "",
      torfflag: false
      // neo_reference_id: "3000000"
    };
    this.createAstroid = this.createAstroid.bind(this);
    this.updateAstroid = this.updateAstroid.bind(this);
    this.deleteAstroid = this.deleteAstroid.bind(this);
    this.searchAsteroids = this.searchAsteroids.bind(this);
    this.handleSearchOpt = this.handleSearchOpt.bind(this);
  }
  componentDidMount() {
    axios.get("/api/astroids").then(results => {
      this.setState({ astroids: results.data });
      console.log(results.data);
    });
  }
  handleSearchOpt(e) {
    console.log(e.target.value);
    this.setState({ searchOptions: e.target.value });
  }
  handleFlag(val) {
    this.setState({ torfflag: val });
  }
  createAstroid(name, diameterFtMin, hazard) {
    let { neo_reference_id } = this.state;
    axios
      .post(`/api/astroids`, {
        name,
        diameterFtMin,
        hazard
        // orbiting_body
      })
      .then(res => {
        console.log(res.data);
        this.setState({ astroids: res.data });
      });
  }
  updateAstroid(id, name, diameterFtMin, hazardous) {
    axios
      .put(`/api/astroids/${id}`, {
        name,
        diameterFtMin,
        // orbiting_body,
        hazardous
      })
      .then(res => {
        this.setState({ astroids: res.data });
      });
  }
  deleteAstroid(id) {
    axios.delete(`/api/astroids/${id}`).then(res => {
      this.setState({ astroids: res.data });
    });
  }

  searchAsteroids(val) {
    this.setState({
      userInput: val
    });
  }
  render() {
    let { astroids, title, userInput } = this.state;
    console.log(astroids);
    let astroidList = astroids
      .filter(asteroid => {
        if (document.getElementById("search-option").value === "name") {
          return asteroid.name.includes(userInput);
        } else if (
          document.getElementById("search-option").value === "diameter"
        ) {
          return (
            asteroid.estimated_diameter.feet.estimated_diameter_min > userInput
          );
        } else if (
          document.getElementById("search-option").value === "hazardous" &&
          this.state.torfflag === false
        ) {
          return asteroid.is_potentially_hazardous_asteroid === false;
        } else if (
          document.getElementById("search-option").value === "hazardous" &&
          this.state.torfflag === true
        ) {
          return asteroid.is_potentially_hazardous_asteroid === true;
        }
      })
      .map(e => {
        return (
          <Astroid
            edit={this.updateAstroid}
            remove={this.deleteAstroid}
            name={e.name}
            id={+e.neo_reference_id}
            key={+e.neo_reference_id}
            diameterft={e.estimated_diameter.feet.estimated_diameter_min}
            hazardous={e.is_potentially_hazardous_asteroid}
            // approach={e.close_approach_data}
          />
        );
      });

    return (
      <div>
        <Title title={title} />
        <CreateTitle />
        <AddAstroid create={this.createAstroid} />
        <div className="page-holder">
          <div className="search-box">
            <h5 className="title">Search for an Asteroid</h5>

            <select
              onChange={this.handleSearchOpt}
              id="search-option"
              name="search-option"
            >
              <option value="name">Name</option>
              <option value="diameter">Diameter</option>
              <option value="hazardous">hazardous</option>
            </select>

            {this.state.searchOptions === "hazardous" ? (
              <div>
                <h4 className="title">Choose one..</h4>
                <button
                  className="searchButton"
                  onClick={() => this.handleFlag(true)}
                >
                  true
                </button>
                <button
                  className="searchButton"
                  onClick={() => this.handleFlag(false)}
                >
                  false
                </button>
              </div>
            ) : (
              <input
                id="search-input"
                placeholder="Search Asteroid"
                onChange={e => this.searchAsteroids(e.target.value)}
              />
            )}
          </div>
          {!astroids.length ? (
            <div className="warningdiv">
              <h4 className="warning-message1">
                OOPS! If you see this message please refresh the page!
              </h4>
              <h4 className="warning-message2">
                After refreshing, the list of asteroid N.E.O's will load in!
              </h4>
            </div>
          ) : !astroidList.length ? (
            <div className="warningdiv">
              <h3 className="warning-message1">
                There are currently no asteroids that have the value you are
                searching for...
              </h3>
            </div>
          ) : (
            <div className="astroid-container">{astroidList}</div>
          )}
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
