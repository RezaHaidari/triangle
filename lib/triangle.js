"use strict";

class Triangle {

  constructor(side1, side2, side3) {
    if (!(side1 > 0 && side2 > 0 && side3 > 0)) throw new Error('Fill all sides of triangle with valid number greather than zero');
    if(!(typeof side1 === 'number' && typeof side2 === 'number' && typeof side3 === 'number') ) throw new Error('Fill all sides of triangle with valid number greather than zero');
    if(side1 + side2 <= side3 || side2 + side3 <= side1 || side1 + side3 <= side2) throw new Error('Size of sides is not valid!');
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  get type() {
    if (this.side1 === this.side2 && this.side2 === this.side3) return 'Equilateral';
    if (this.side1 === this.side2 || this.side2 === this.side3 || this.side1 === this.side3) return 'Isoseles';
    return 'Scalene';
  }

  draw(context) {
    context.clearRect(0, 0, 100, 100);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.side1, 0);
    const result = this.thirdPointCoordinates;
    context.lineTo(result.x, result.y);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    context.stroke();

    // Add CSS animation
    const canvas = context.canvas;
    canvas.classList.add('animate-triangle');
  }

  get thirdPointCoordinates() {
    var result = { x: 0, y: 0 };
    if (this.side1 > 0) {
      result.x = (this.side3 * this.side3 - this.side2 * this.side2 + this.side1 * this.side1) / (2 * this.side1);
    }
    result.y = Math.sqrt(this.side3 * this.side3 - result.x * result.x);
    return result;
  }

  get sides() {
    return [this.side1, this.side2, this.side3];
  }
}

export default Triangle;
