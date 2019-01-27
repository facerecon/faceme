import React, { Component } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: 'user',
};

export default class WebCamPicure extends Component {
  constructor(props){
    super(props);
    this.state = {
      takingPicture: false
    }
    this.image = null;
    this.webcam = React.createRef();
  }

  capture = () => {
    const imageSrc = this.webcam.current.getScreenshot();
    //console.log("Take Picture");
    this.props.landmarkPicture(imageSrc);
  };

  loopme = () => {
    setTimeout(10000)
    new Promise((resolve, reject) =>
      resolve(this.capture)
    ).then(resolve => console.log(resolve))
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Webcam
          audio={false}
          height={350}
          ref={this.webcam}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <img src="cam-icon.jpg" alt="Take Pic button here" height={100}

          onClick={this.capture}
        />

        
      </div>
    );
  }
}