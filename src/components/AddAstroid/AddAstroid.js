import React, { Component } from "react";
import "./AddAstroid.css";

class AddAstroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      diameter: "",
      hazard: "",
      flagYes: false,
      flagNo: false
      // orbit: ""
    };
    this.handleName = this.handleName.bind(this);
    this.handleDiameter = this.handleDiameter.bind(this);
    this.handleHazard = this.handleHazard.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }
  handleName(val) {
    this.setState({ name: val });
  }
  handleDiameter(val) {
    this.setState({ diameter: val });
  }
  // handleApproach(val) {
  //   this.setState({ orbit: val });
  //   console.log(val);
  // }
  handleHazard(val) {
    this.setState({ hazard: val });
    console.log(val);
  }
  handleYes() {
    this.setState({ flagYes: !this.state.flagYes, flagNo: false });
    this.handleHazard(true);
  }
  handleNo() {
    this.setState({ flagNo: !this.state.flagNo, flagYes: false });
    this.handleHazard(false);
  }

  render() {
    let { name, diameter, hazard, orbit } = this.state;
    return (
      <div className="all-holder">
        <div className="input-holder">
          <input
            id="name-input"
            className="input"
            placeholder="Enter a Name"
            onChange={e => this.handleName(e.target.value)}
          />
          <input
            id="diameter-input"
            className="input"
            placeholder="Diameter in feet"
            onChange={e => this.handleDiameter(e.target.value)}
          />
          <h3 className="hazardq">Is It Hazardous?</h3>
          <div className="hazarddiv">
            {!this.state.flagYes ? (
              <button className="hazard-button" onClick={this.handleYes}>
                Yes
              </button>
            ) : (
              <button className="hazard-button-active" onClick={this.handleYes}>
                Yes
              </button>
            )}
            {!this.state.flagNo ? (
              <button className="hazard-button" onClick={this.handleNo}>
                Nope
              </button>
            ) : (
              <button className="hazard-button-active" onClick={this.handleNo}>
                Nope
              </button>
            )}
          </div>
          {/* <input
          className="input"
          placeholder="What has it orbit?"
          onChange={e => this.handleApproach(e.target.value)}
        /> */}
          <div>
            <button
              className="button"
              className="submit-asteroid"
              onClick={() => {
                this.props.create(name, diameter, hazard, orbit);
                this.setState({ flagYes: false, flagNo: false });
                document.getElementById("name-input").value = "";
                document.getElementById("diameter-input").value = "";
              }}
            >
              Submit Your Asteroid
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAstroid;
