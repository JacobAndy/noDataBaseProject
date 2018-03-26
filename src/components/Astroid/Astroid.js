import React, { Component } from "react";
import "./Astroid.css";

class Astroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      diameterft: props.diameterft,
      approach: props.approach,
      hazardous: props.hazardous,
      inputSwitch: false,
      trueFlag: false,
      falseFlag: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDiameter = this.handleDiameter.bind(this);
    // this.handleApproach = this.handleApproach.bind(this);
    this.hazardFalse = this.hazardFalse.bind(this);
    this.hazardTrue = this.hazardTrue.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  handleSwitch() {
    this.setState({ inputSwitch: !this.state.inputSwitch });
    if (this.state.hazardous === false) {
      this.hazardFalse();
    } else {
      this.hazardTrue();
    }
  }
  handleName(val) {
    this.setState({ name: val });
  }
  handleDiameter(val) {
    this.setState({ diameterft: val });
  }
  // handleApproach(val) {
  //   this.setState({ approach: val });
  // }
  hazardTrue() {
    this.setState({ hazardous: true, trueFlag: true, falseFlag: false });
  }
  hazardFalse() {
    this.setState({ hazardous: false, falseFlag: true, trueFlag: false });
  }

  handleConfirm() {
    let { name, diameterft, approach, hazardous } = this.state;
    const { id, edit } = this.props;
    edit(id, name, diameterft, approach, hazardous);
    this.setState({ inputSwitch: !this.state.inputSwitch });
  }
  render() {
    let { name, diameterft, hazardous } = this.state;
    // let planet = approach.map((e, i) => {
    //   return <span key={i}>{e.orbiting_body}</span>;
    // });
    return (
      <div className="main-div">
        {!this.state.inputSwitch ? (
          <div className="div-holder">
            <p>
              <span className="value">Name:</span>
              <span className="key"> {name}</span>
            </p>
            <p>
              <span className="value">Feet Diameter:</span>
              <span className="key"> {diameterft}</span>
            </p>
            {/* <p>I have orbited {planet}</p> */}
            <p>
              <span className="value">Hazardous:</span>{" "}
              <span className="key"> {JSON.stringify(hazardous)}</span>
            </p>
            <button
              className="delete"
              onClick={() => this.props.remove(this.props.id)}
            >
              Delete Asteroid
            </button>
            <button className="edit" onClick={this.handleSwitch}>
              Edit Asteroid
            </button>
          </div>
        ) : (
          <div className="div-holder-edit">
            <h4>Edit Name</h4>
            <input
              value={name}
              onChange={e => this.handleName(e.target.value)}
            />
            <h4>Edit Diameter</h4>
            <input
              value={diameterft}
              onChange={e => this.handleDiameter(e.target.value)}
            />
            {/* <input
              value={planet}
              onChange={e => this.handleApproach(e.target.value)}
            /> */}
            <div>
              <h4>Is It Hazardous?</h4>
              {!this.state.trueFlag ? (
                <button onClick={this.hazardTrue}>True</button>
              ) : (
                <button className="clicked" onClick={this.hazardTrue}>
                  True
                </button>
              )}
              {!this.state.falseFlag ? (
                <button onClick={this.hazardFalse}>False</button>
              ) : (
                <button className="clicked" onClick={this.hazardFalse}>
                  False
                </button>
              )}
            </div>
            {/* <input
              value={hazardous}
              onChange={e => this.handleHazard(e.target.value)}
            /> */}
            <div className="edit-canceldiv">
              <button className="edit-cancel" onClick={this.handleSwitch}>
                Cancel
              </button>
              <button className="edit-update" onClick={this.handleConfirm}>
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Astroid;
