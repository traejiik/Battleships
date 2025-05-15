import Ship from '../src/modules/ship';

const testShip = new Ship(4);

describe('Testing ship', () => {
  test('Check length', () => {
    expect(testShip.length).toBe(4);
  });

  test('Check hit counter', () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(2);
  });

  test('Check hit counter', () => {
    testShip.hit();
    testShip.hit();
    expect(testShip.sunk).toBe(true);
  });
});
