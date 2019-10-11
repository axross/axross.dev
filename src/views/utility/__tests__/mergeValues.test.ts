import mergeValues from "../mergeValues";

describe("mergeValues()", () => {
  test("reutrns any one of the given values by the condition", () => {
    expect(mergeValues<number>(1, 2, 3)).toBe(1);
    expect(mergeValues<number>(1, undefined, 3)).toBe(1);
    expect(mergeValues<number>(undefined, 2, 3)).toBe(2);
    expect(mergeValues<number>(undefined, undefined, 3)).toBe(3);
  });
});
