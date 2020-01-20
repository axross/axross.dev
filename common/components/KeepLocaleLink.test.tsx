import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import KeepLocaleLink from "./KeepLocaleLink";
import Link from "./Link";

describe("<KeepLocaleLink>", () => {
  it("adds current locale to the given URL and passes it to <Link> inside", async () => {
    const renderer = TestRenderer.create(
      <MemoryRouter>
        <LocaleContext.Provider value={{ currentLocale: "en-CA", availableLocales: [], isLoading: false }}>
          <KeepLocaleLink to="/path/to/page?query=foo">
            <span />
          </KeepLocaleLink>
        </LocaleContext.Provider>
      </MemoryRouter>
    );

    const link = renderer.root.findByType(Link);

    expect(link.props.to).toBe("/path/to/page?query=foo&hl=en-CA");
  });
});
