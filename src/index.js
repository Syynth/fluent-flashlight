import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Canvas from "./Canvas";

function App() {
  return (
    <div className="App">
      <Canvas />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        className="fluent"
        style={{
          background: "#EFEFEF",
          border: "1px solid #CCC"
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
