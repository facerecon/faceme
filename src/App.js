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
    this.state = {
       pictures: [],
       link: ""
       };
    this.onDrop = this.onDrop.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.uploadLink = this.uploadLink.bind(this);
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    }, () => {
      console.log(this.state.pictures); 
      getme(this.state.pictures[0].name)
    });
    
}

handleLinkChange(event) {
  this.setState({
    link: event.target.value
  })
}

  uploadLink() {
      getme(this.state.link)
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
        <div class="pa4-l">
          <form class="bg-light-red mw7 center pa4 br2-ns ba b--black-10">
            <fieldset class="cf bn ma0 pa0">
              <legend class="pa0 f5 f4-ns mb3 black-80">Enter the link here</legend>
              <div class="cf">
                <label class="clip">Image Link</label>
                <input class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                type="text"
                            placeholder="Image Link"
                            onChange={this.handleLinkChange.bind(this)}/>
                <input class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="button" value="Submit" onClick={this.uploadLink.bind(this)}/>
              </div>
            </fieldset>
          </form>
        </div>
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
