import Triangle from '../lib/triangle';

test('Triangle has three side', () => {
  let triangle = new Triangle(1, 2, 2);
  expect(triangle).toHaveProperty('sides', [1, 2, 2]);
});

test('Handle triangle sides incorrect value error', () => {
  try {
    let triangle = new Triangle(1, '', 2);
  } catch (error) {
    expect(error.message).toBe('Fill all sides of triangle with valid number greather than zero');
  }
});

test('Ensure triangle size sides is not equal or less than zero ', () => {
  try {
    let triangle = new Triangle(0, -1, 2);
  } catch (error) {
    expect(error.message).toBe('Fill all sides of triangle with valid number greather than zero');
  }
});

test('Determine triangle is Equilateral', () => {
    let triangle = new Triangle(3, 3, 3);
    expect(triangle.type).toBe('Equilateral');
});

test('Determine triangle is Isoseles', () => {
  let triangle = new Triangle(3, 3, 5);
  expect(triangle.type).toBe('Isoseles');
});

test('Determine triangle is Scalene', () => {
  let triangle = new Triangle(3, 4, 5);
  expect(triangle.type).toBe('Scalene');
});



