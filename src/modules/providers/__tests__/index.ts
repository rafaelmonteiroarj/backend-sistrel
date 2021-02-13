function sum5(a: number, b: number): number {
  return a + b;
}

it("adds 1 + 2 to equal 3", () => {
  expect(sum5(1, 2)).toBe(3);
});
