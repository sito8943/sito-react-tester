import "./App.css";
import React from "react";

// components
import MemeShare, { Title, Container } from "./components/MemeShare/MemeShare";
import AppleDots from "./components/MemeShare/AppleDots/AppleDots";
import Button from "./components/MemeShare/Button/Button";
import { RightArrowIcon } from "./components/MemeShare/Icons/icons";

function App() {
  return (
    <div className="App">
      <MemeShare>
        <Container>
          <AppleDots />
          <Container className="ms-sub-container">
            <Title variant="h3">Ways to declare a constant</Title>
            <Container
              className="flex justify-center"
              style={{ marginTop: 20 }}
            >
              <Button className="ms-icon-button ms-button ease-transition">
                <RightArrowIcon />
              </Button>
            </Container>
          </Container>
        </Container>
      </MemeShare>
    </div>
  );
}

export default App;
