import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';
import WebCamPicture from './Components/WebCamPicture';
import getme from './faceme';


const testImage = 'base1.jpg'

class App extends Component {

  constructor(props){
    super(props);
    this.canvas = React.createRef();
    this.canvasPicWebCam = React.createRef();
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    }, () => {
      console.log(this.state.pictures); 
      getme(this.state.pictures[0].name)
    });
    
}

  
  async componentDidMount() {
    const testImageHTML = document.getElementById('test')
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
  }


  render() {
    return (
      <div className="App" >
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
          <img id="test" src={testImage} alt="test" />
          <canvas ref={this.canvas} width={296} height={296} />
        </div>
        <WebCamPicture landmarkPicture={this.landmarkWebCamPicture} />
        <canvas ref={this.canvasPicWebCam} width={350} height={350} />
        <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
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
