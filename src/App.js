import React, { Component } from "react";

class BeforeUnload extends Component {
  constructor(props) {
    super(props);
    this.alertMessage = this.alertMessage.bind(this);
  }
  componentDidMount() {
    window.addEventListener("beforeunload", this.alertMessage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { active } = this.props;
    const { active: wasActive } = prevProps;

    if (wasActive && !active) {
      window.removeEventListener("beforeunload", this.alertMessage);
    } else if (!wasActive && active) {
      window.addEventListener("beforeunload", this.alertMessage);
    }
  }
  

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.alertMessage);
  }

  alertMessage(e) {
    if (this.props.active) {
      e.returnValue = true;
      return true;
    }
  }
  render() {
    return React.Children.only(this.props.children);
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState(state => {
      return { active: !state.active };
    });
  }

  render() {
    return (
      <BeforeUnload active={this.state.active}>
        <button onClick={this.toggle}>{this.state.active ? "Active" : "Inactive"}</button>
      </BeforeUnload>
    );
  }
}

export default App;
