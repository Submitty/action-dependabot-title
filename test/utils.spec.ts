import { expect } from "chai";

import { UserType } from "../src/types";
import { fixTitle, isDependabot, titleNeedsChange } from "../src/utils";

describe("isDependabot", (): void => {
  it("is not dependabot", (): void => {
    expect(
      isDependabot({
        id: 1,
        login: "MasterOdin",
        type: UserType.USER,
      })
    ).to.be.false;
  });

  it("is dependabot", (): void => {
    expect(
      isDependabot({
        login: "dependabot[bot]",
        id: 49699333,
        type: UserType.BOT,
      })
    ).to.be.true;
  });
});

describe("titleNeedsChange", (): void => {
  ["[DevDependency] foo", "[Dependency] bar"].forEach((title) => {
    it(`should return title "${title}" does not need changing`, (): void => {
      expect(titleNeedsChange(title)).to.be.false;
    });
  });

  ["[DevDependency]: foo", "[Dependency]: bar"].forEach((title) => {
    it(`should return title "${title}" does need changing`, (): void => {
      expect(titleNeedsChange(title)).to.be.true;
    });
  });
});

describe("fixTitle", (): void => {
  [
    ["[DevDependency]: foo", "[DevDependency] foo"],
    ["[Dependency]: bar", "[Dependency] bar"],
    ["[DevDependency] foo", "[DevDependency] foo"],
    ["[Dependency] bar", "[Dependency] bar"],
  ].forEach(([oldTitle, newTitle]) => {
    it(`should fix title "${oldTitle}" to "${newTitle}"`, (): void => {
      expect(fixTitle(oldTitle)).to.equal(newTitle);
    });
  });
});
