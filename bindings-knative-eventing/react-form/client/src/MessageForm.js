// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

import React from 'react';

export class MessageForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = this.getInitialState();
    }
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      console.log(`Setting ${name} to ${value}`)
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (event) => {
        const data = {data:{message:this.state.message}, operation:this.state.messageType};
        fetch('/publish', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify(data),
        });
        event.preventDefault();
        this.setState(this.getInitialState());
    }

    getInitialState = () => {
      return {
        messageType: "a",
        message: ""
      };
    }

    render() {
      return (
        <div class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Select Message Type</label>
          <select className="custom-select custom-select-lg mb-3" name="messageType" onChange={this.handleInputChange} value={this.state.messageType}>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter message</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="message" onChange={this.handleInputChange} value={this.state.message} placeholder="Enter message here"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      );
    }
  }