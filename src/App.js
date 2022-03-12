import "./App.css";
import React from "react";

// components
import MemeShare, {
  Title,
  Paragraph,
  Container,
} from "./components/MemeShare/MemeShare";
import AppleDots from "./components/MemeShare/AppleDots/AppleDots";

function App() {
  return (
    <div className="App">
      <MemeShare>
        <Container>
          <AppleDots />
          <Container className="ms-sub-container">
            <Title variant="h3">Ways to declare a constant</Title>
            <Paragraph>Este es el párrafo</Paragraph>
          </Container>
        </Container>
      </MemeShare>
    </div>
  );
}

export default App;
