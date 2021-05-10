import React, {Component} from "react";

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 10
    }
  }

  tick() {
    this.setState({
      time: this.state.time -1
    })
  }

  componentDidMount(){
    setInterval(() => this.tick(), 1000);
  }

  render(){
    return (
      <div>
        <h2>{this.state.time}</h2>
      </div>
    )
  }
}

export default Timer;