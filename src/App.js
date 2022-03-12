import "./App.css";
import React from "react";

import MemeShare, {
  Title,
  Paragraph,
  Container,
} from "./components/MemeShare/MemeShare";

function App() {
  return (
    <div className="App">
      <MemeShare>
        <Container>
          <Title variant="h3">Ways to declare a constant</Title>
          <Paragraph>Este es el párrafo</Paragraph>
        </Container>
      </MemeShare>
    </div>
  );
}

export default App;
