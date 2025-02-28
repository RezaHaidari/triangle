import Terminal from './terminal';
import Triangle from './triangle';

// Create commands object to pass to terminal!
let commands = {
  triangle: {
    draw: {
      input: {
        title: 'Side one',
        input: {
          title: 'Side Two',
          input: {
            title: 'Side Three',
            action: {
              method: (state) => {
                let triangleCanvas = document.querySelector('#triangle');
                let convasContext = triangleCanvas.getContext("2d");
                let triangleType = document.querySelector('.triangle > h3');
                // to ensure sides is integer and not string number
                let triangle = new Triangle(...state.map(side => parseInt(side)));
                triangle.draw(convasContext);
                triangleType.innerHTML = triangle.type;
              }
            }
          }
        }
      },
    }
  }
}

let terminal = new Terminal(commands);

// initial terminal ui
terminal.init();
