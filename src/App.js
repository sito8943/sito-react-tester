import "./App.css";
import React from "react";

// components
import MemeShare, {
  Title,
  Container,
  Paragraph,
} from "./components/MemeShare/MemeShare";
import AppleDots from "./components/MemeShare/AppleDots/AppleDots";
import {
  JavaIcon,
  JavascriptIcon,
  SwiftIcon,
  PhpIcon,
  KotlinIcon,
  TypescriptIcon,
  CPlusPlusIcon,
  DartIcon,
  GoIcon,
} from "./components/MemeShare/Icons/icons";

function App() {
  return (
    <div className="App">
      <MemeShare>
        <Container>
          <AppleDots />
          <Container className="ms-sub-container">
            <Title variant="h3">Ways to declare a constant</Title>
            <Container className="flex" style={{ marginTop: 25 }}>
              <PhpIcon color={"aliceblue span"} />
              <Title variant="h5" style={{ marginLeft: 15 }}>
                Php
              </Title>
            </Container>
            <Paragraph className="ms-code">
              <span className="ms-keyword">definee</span>(
              <span className="ms-string">"var name"</span>,{" "}
              <span className="ms-string">"some value"</span>);
            </Paragraph>
          </Container>
        </Container>
      </MemeShare>
    </div>
  );
}

export default App;
