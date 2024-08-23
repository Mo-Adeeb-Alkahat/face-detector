import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm";
import Rank from "./components/Rank/Rank";
import Facerec from "./components/Facerec/Facerec";
import Signin from "./components/Signin/Signin";
import SignUp from "./components/SignUp/SignUp";

import ParticlesBg from "particles-bg";
import { Component } from "react";

const initialState = {
  input: "",
  imageurl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calcFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // c0c0ac362b03416da06ab3fa36fb58e3
  onSubmit = () => {
    this.setState({ imageurl: this.state.input });

    fetch("http://localhost:3001/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        console.log("hi", response);
        if (response) {
          this.displayFaceBox(this.calcFaceLocation(response));

          fetch("http://localhost:3001/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        //this.displayFaceBox(this.calcFaceLocation(response))
      })
      .catch((err) => console.log(err));

    console.log("d");
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <ParticlesBg color="#282c34" num={200} type="cobweb" bg={true} />
        {this.state.route === "home" ? (
          <div>
            {" "}
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImgLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <Facerec box={this.state.box} imageUrl={this.state.imageurl} />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
