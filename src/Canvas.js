import * as React from "react";
import * as ReactDOM from "react-dom";

export default class Canvas extends React.Component {
  canvas = React.createRef();
  img = document.createElement("img");

  componentDidMount() {
    document.addEventListener("mousemove", this.updateMouse);
    this.img.src =
      "https://uploads.codesandbox.io/uploads/user/137bfef7-7297-444f-82ba-8ef33a874c32/2ZPX-centerblur.png";
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.updateMouse);
  }

  updateMouse = event => {
    requestAnimationFrame(() => {
      if (!this.canvas.current || !this.img.complete) return;

      const context = this.canvas.current.getContext("2d");
      const width = context.canvas.offsetWidth,
        height = context.canvas.offsetHeight;
      context.canvas.width = width;
      context.canvas.height = height;

      context.clearRect(0, 0, width, height);

      document
        .querySelectorAll(".fluent")
        .forEach(el => this.drawElement(el, context));

      context.fillStyle = "red";
      for (let i = 0; i < 10; i++) {
        context.fillRect(i * 100 + 100, i * 100 + 100, 80, 80);
      }

      if (event) {
        const x = event.clientX,
          y = event.clientY;

        context.globalCompositeOperation = "destination-in";

        context.drawImage(
          this.img,
          x - this.img.width / 2,
          y - this.img.height / 2
        );
      }
    });
  };

  drawElement(el, context) {
    const image = new Image();
    const svg = this.createSvgFromElement(el);
    image.src = svg;
    context.drawImage(image, el.clientX, el.clientY);
  }

  createSvgFromElement(el) {
    const svg = document.createElement("svg");
    const foreignObject = document.createElement("foreignObject");
    const elClone = el.cloneNode();
    elClone.style.border = "1px solid #000";
    foreignObject.appendChild(elClone);
    svg.appendChild(foreignObject);
    return "data:image/svg+xml," + encodeURIComponent(svg.outerHTML);
  }

  render() {
    return ReactDOM.createPortal(
      <canvas
        ref={this.canvas}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#0000",
          // opacity: "",
          pointerEvents: "none",
          zIndex: 10000000
        }}
      />,
      document.body
    );
  }
}
