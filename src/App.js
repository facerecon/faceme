import React, { Component } from "react";
import "./App.css";
import ImageUploader from "react-images-upload";
import WebCamPicture from './Components/WebCamPicture';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'd06c0fe75fab447f8cd0b3f0dc8059fd';

const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.canvasPicWebCam = React.createRef();
    this.state = {
      pictures: [],
      link: "",
      baseObject: "",
      dumpImg: null
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
  }

  onDrop(picture) {
    this.setState(
      {
        pictures: this.state.pictures.concat(picture)
      }
    );
  }

  handleLinkChange(event) {
    this.setState({
      link: event.target.value
    });
  }

  getMe = () => {
    var imageUrl = this.state.link; 

    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post(options, (error, response, body) => {
        console.log(options)
        if (error) {
          console.log('Error: ', error);
          return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        this.setState({baseObject: jsonResponse})
        console.log(this.state.baseObject)
        return jsonResponse;
      });
}

  printMe() {
    console.log(this.state.baseObject)
  }

  async componentDidMount() {
    const testImageHTML = document.getElementById('test');
    this.drawHTMLImage(this.canvas.current,testImageHTML,296,296);
  }

  drawHTMLImage(canvas,image,width,height){
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image,0,0,width,height);
  }

  landmarkWebCamPicture = (picture) => {
    const ctx = this.canvasPicWebCam.current.getContext("2d");
    var image = new Image();
    image.onload = async () => {
      ctx.drawImage(image,0,0);
    };
    image.src = picture;
    this.setState({dumpImg: image});
    console.log(this.state.dumpImg);
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
          <img id="test" src={"base1.jpg"} alt="test" />
          <canvas ref={this.canvas} width={296} height={296} />
        </div>
        <WebCamPicture landmarkPicture={this.landmarkWebCamPicture} />
        <canvas ref={this.canvasPicWebCam} width={350} height={350} />
          <div className="pa4-l">
            <form className="bg-light-red mw7 center pa4 br2-ns ba b--black-10">
              <fieldset className="cf bn ma0 pa0">
                <legend className="pa0 f5 f4-ns mb3 black-80">
                  Enter the link here
                </legend>
                <div className="cf">
                  <label className="clip">Image Link</label>
                  <input
                    className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                    type="text"
                    placeholder="Image Link"
                    onChange={this.handleLinkChange.bind(this)}
                  />
                  <input
                    className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                    type="button"
                    value="Submit"
                    onClick={this.getMe.bind(this)}
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            singleImage={true}
          />
        </header>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>

  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }
}

export default App;
