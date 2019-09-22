// triangle  script 
"use strict";

class Triangle {

  /**
   * 
   * @param {number} side1 
   * @param {number} side2 
   * @param {number} side3 
   */
  constructor(side1, side2, side3) {
    // simple and dummy error handling! power of types coercion(!) of Javascript!
    if (!(side1 > 0 && side2 > 0 && side3 > 0)) throw new Error('Fill all sides of triangle with valid number greather than zero');

    if(!(typeof side1 === 'number' && typeof side1 === 'number' && typeof side1 === 'number') ) throw new Error('Fill all sides of triangle with valid number greather than zero');
    // basic conditions for draw a triangle
    if(side1 + side2 <= side3 || side2 + side3 <= side1 || side1 + side3 <= side2) throw new Error('Size of sides is not valid!');
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  // determine type of a triangle
  get type() {
    if (this.side1 === this.side2 && this.side2 === this.side3) return 'Equilateral'; // if a = b && b = c then a = c ! 
    if (this.side1 === this.side2 || this.side2 === this.side3 || this.side1 === this.side3) return 'Isoseles';
    return 'Scalene';
  }

  // draw triangle in html canvas 
  /**
   * 
   * @param {object} context 
   * context of html canvas  
   * 
   */
  draw(context) {

    context.clearRect(0, 0, 100, 100);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.side1, 0);
    // get third point coordinate to draw a triangle
    const result = this.thirdPointCoordinates;
    context.lineTo(result.x, result.y);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = '#fff';
    context.stroke();
  }
  /**
   * getter method to obtain third point coordinate 
   */
  get thirdPointCoordinates() {
    var result = { x: 0, y: 0 };

    // math formula to obtain third coordinate point
    if (this.side1 > 0) {
      result.x = (this.side3 * this.side3 - this.side2 * this.side2 + this.side1 * this.side1) / (2 * this.side1);
    }
    result.y = Math.sqrt(this.side3 * this.side3 - result.x * result.x);
    return result;
  }
  /**
   * getter method to return size of sides in array
   */
  get sides() {
    return [this.side1, this.side2, this.side3];
  }
}

export default Triangle;
