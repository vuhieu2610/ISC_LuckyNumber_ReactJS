import React, { Component } from 'react';

import { Card, InputNumber, Button, Modal } from 'antd';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Animated } from "react-animated-css";

import 'antd/dist/antd.css';
import './App.css';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minNumber: null,
      maxNumber: null,
      loading: false,
      isCompleted: false,
      modalVisible: false,
      luckyNumber: 0,
      isPlaying: false
    };


    this.__renderActions = this.__renderActions.bind(this);
    this.__handlerClickSubmit = this.__handlerClickSubmit.bind(this);
  }


  __renderActions() {
    const { loading, minNumber, maxNumber } = this.state;
    let isDisabled = true;

    if (minNumber !== null && maxNumber !== null) {
      if (minNumber < maxNumber) isDisabled = false;
    }

    return [
      <Button 
        disabled = { isDisabled }
        loading  = { loading }
        type     = "primary"
        onClick  = { this.__handlerClickSubmit }
      >Lấy số</Button>
    ];
  }

  __handlerNumberChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  __handlerClickSubmit() {
    const { minNumber, maxNumber } = this.state;
    this.setState({ 
      loading: true,
      modalVisible: true,
      Completed: false,
      luckyNumber: 0,
      isPlaying: true
    });
  }

  __renderContentCountDown(renderTime){
    return(
      <Animated animationIn="bounceIn" animationOut="bounceOut"  >
        <div
          style = {{
            fontSize: 50
          }}
        >
          { renderTime }
        </div>
      </Animated>
    );
  }

  __renderFooter(){
    const { isCompleted }  = this.state;

    return(
      <div>
        <Button
          disabled = { !isCompleted }
          onClick = { () => {

            this.setState({
              loading: false,
              isCompleted: false,
              modalVisible: false,
              luckyNumber: 0,
              isPlaying: false
            });
    
          }}
        >Lấy số mới</Button>
      </div>
    );
  }

  __renderLuckyNumber(){
    const { luckyNumber } = this.state;

    return(
      <Animated animationIn="bounceIn" >
        <div
          style = {{
            fontSize: 50,
            textAlign: "center"
          }}
        >
          { luckyNumber }
        </div>
      </Animated>
    
    );
  }

  render() {
    const { minNumber, maxNumber, modalVisible, isCompleted, luckyNumber, isPlaying } = this.state;
    return (
      <div
        style={{
          height: window.innerHeight
        }}
        className = "container">
        <Card
          hoverable
          title        = "Lucky Number"
          actions      = { this.__renderActions() }
          className    = "card" >
          
          <label>
            <span>Min: </span>
            <InputNumber
              className ="input"
              value     = {minNumber}
              onChange  = { value => this.__handlerNumberChange("minNumber", value) }
              min       = {1}
              max       = {10} />
          </label>
          <label>
            <span>Max: </span>
            <InputNumber
              value     = {maxNumber}
              onChange  = { value => this.__handlerNumberChange("maxNumber", value) }
              className = "input"
              min       = {1}
              max       = {10} />
          </label>

        </Card>




        <Modal
          title    = "Lucky Number"
          closable = { false }
          visible  = { modalVisible }
          footer   = { this.__renderFooter() }
        >
          {
            !isCompleted ? (
              <CountdownCircleTimer
                durationSeconds   = { 10 }
                colors            = {[
                                        ['#004777', .33],
                                        ['#F7B801', .33],
                                        ['#A30000']
                                    ]}
                renderTime        = { _renderTime => this.__renderContentCountDown(_renderTime) }
                
                onComplete        = { () => {
                                      this.setState({
                                        luckyNumber: getRandomInt(minNumber, maxNumber),
                                        loading: false,
                                        isCompleted: true
                                      })
                                    }}

                isPlaying        = { isPlaying }
              />
            ) : this.__renderLuckyNumber()
          }
        </Modal>
        <audio src="tone.mp3" autoPlay loop />
      </div>
    );
  }
}

export default App;