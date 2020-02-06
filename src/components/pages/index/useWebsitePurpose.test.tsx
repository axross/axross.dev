import * as React from "react";
import { ReactTestRenderer, act, create } from "react-test-renderer";
import { LocaleContext } from "../../../hooks/useLocale";
import { RepositoryContext } from "../../../hooks/useRepository";
import useWebsitePurpose from "./useWebsitePurpose";

describe("useWebsitePurpose()", () => {
  const repository = {
    websitePurposeApi: {
      getByLocale: jest.fn(),
    },
    websitePurposeCache: {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    },
  };

  beforeEach(() => {
    repository.websitePurposeApi.getByLocale.mockReturnValue(Promise.resolve());
  });

  afterEach(() => {
    repository.websitePurposeApi.getByLocale.mockClear();
    repository.websitePurposeCache.has.mockClear();
    repository.websitePurposeCache.get.mockClear();
    repository.websitePurposeCache.set.mockClear();
  });

  describe("when called in the first rendering", () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");

    it("checks if the cache contains the requested website purpose", async () => {
      const Component = () => useWebsitePurpose() && null;
  
      await act(async () => {
        create(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.websitePurposeCache.has).toHaveBeenCalledWith(currentLocale);
    });

    describe("when the requested website purpose is not cached", () => {
      beforeEach(() => {
        repository.websitePurposeCache.has.mockReturnValue(false);
        repository.websitePurposeCache.get.mockReturnValue(null);
      });

      afterEach(() => {
        repository.websitePurposeCache.has.mockReset();
        repository.websitePurposeCache.get.mockReset();
      });

      it("fetches the website purpose through the API", async () => {
        const Component = () => useWebsitePurpose() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeApi.getByLocale).toHaveBeenCalledWith(currentLocale);
      });

      describe("when the API succeeds fetching", () => {
        const websitePurpose = Symbol("WEBSITE_PURPOSE");

        beforeEach(() => {
          repository.websitePurposeApi.getByLocale.mockReturnValue(Promise.resolve(websitePurpose));
        });

        afterEach(() => {
          repository.websitePurposeApi.getByLocale.mockReset();
        });

        it("stores the fetched website purpose to the cache", async () => {
          const Component = () => useWebsitePurpose() && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.websitePurposeCache.set).toHaveBeenCalledWith(currentLocale, websitePurpose);
        });

        it("triggers rendering twice with returning values [null, true] -> [the website purpose, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useWebsitePurpose());

            return null;
          };
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(2);
          expect(returnValues[0]).toEqual([null, true]);
          expect(returnValues[1]).toEqual([websitePurpose, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.websitePurposeApi.getByLocale.mockRejectedValue(new Error("not found."));
        });

        afterEach(() => {
          repository.websitePurposeApi.getByLocale.mockReset();
        });

        it("doesn't store the fetched website purpose to the cache", async () => {
          const Component = () => useWebsitePurpose() && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.websitePurposeCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering twice with returning values [null, true] -> [the website purpose, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useWebsitePurpose());

            return null;
          };
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(2);
          expect(returnValues[0]).toEqual([null, true]);
          expect(returnValues[1]).toEqual([null, false]);
        });
      });
    });

    describe("when the requested website purpose is cached", () => {
      const websitePurpose = Symbol("WEBSITE_PURPOSE");

      beforeEach(() => {
        repository.websitePurposeCache.has.mockReturnValue(true);
        repository.websitePurposeCache.get.mockReturnValue(websitePurpose);
      });

      afterEach(() => {
        repository.websitePurposeCache.has.mockReset();
        repository.websitePurposeCache.get.mockReset();
      })

      it("gets the requested website purpose from the cache", async () => {
        const Component = () => useWebsitePurpose() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeCache.get).toHaveBeenCalledWith(currentLocale);
      });

      it("doesn't try fetching the website purpose through the API", async () => {
        const Component = () => useWebsitePurpose() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeApi.getByLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the website purpose to the cache", async () => {
        const Component = () => useWebsitePurpose() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering once with returning values [the website purpose, false]", async () => {
        const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useWebsitePurpose());

            return null;
          };
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(1);
          expect(returnValues[0]).toEqual([websitePurpose, false]);
      });
    });
  });

  describe("when the requested locale for the website purpose is updated", () => {
    const oldLocale: any = Symbol("OLD_LOCALE");
    const newLocale: any = Symbol("NEW_LOCALE");

    it("checks if the cache contains the requested website purpose", async () => {
      const Component = () => useWebsitePurpose() && null;
      let testRenderer: ReactTestRenderer;

      await act(async () => {
        testRenderer = create(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      repository.websitePurposeCache.has.mockClear();

      await act(async () => {
        testRenderer.update(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.websitePurposeCache.has).toHaveBeenCalledWith(newLocale);
    });

    describe("when the requested website purpose is not cached", () => {
      const oldWebsitePurpose = Symbol("OLD_WEBSITE_PURPOSE");

      beforeEach(() => {
        repository.websitePurposeCache.has.mockImplementation(locale => {
          if (locale === oldLocale) return true;
          if (locale === newLocale) return false;

          throw new Error("unreachable here.");
        });
        repository.websitePurposeCache.get.mockImplementation(locale => {
          if (locale === oldLocale) return oldWebsitePurpose;
          if (locale === newLocale) return null;

          throw new Error("unreachable here.");
        });
      });

      it("fetches the website purpose through the API", async () => {
        const Component = () => useWebsitePurpose() && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.websitePurposeApi.getByLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeApi.getByLocale).toHaveBeenCalledWith(newLocale);
      });

      describe("when the API succeeds fetching", () => {
        const newWebsitePurpose = Symbol("NEW_WEBSITE_PURPOSE");

        beforeEach(() => {
          repository.websitePurposeApi.getByLocale.mockImplementation(locale => {
            if (locale === oldLocale) return Promise.resolve(oldWebsitePurpose);
            if (locale === newLocale) return Promise.resolve(newWebsitePurpose);

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.websitePurposeApi.getByLocale.mockReset();
        });

        it("stores the fetched website purpose to the cache", async () => {
          const Component = () => useWebsitePurpose() && null;
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          repository.websitePurposeCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.websitePurposeCache.set).toHaveBeenCalledWith(newLocale, newWebsitePurpose);
        });

        it("triggers rendering three times with returning values [the old website purpose, false] -> [the old website purpose, true] -> [the next website purpose, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useWebsitePurpose());

            return null;
          };
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          returnValues = [];

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(3);
          expect(returnValues[0]).toEqual([oldWebsitePurpose, false]);
          expect(returnValues[1]).toEqual([oldWebsitePurpose, true]);
          expect(returnValues[2]).toEqual([newWebsitePurpose, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.websitePurposeApi.getByLocale.mockImplementation(locale => {
            if (locale === oldLocale) return Promise.resolve(oldWebsitePurpose);
            if (locale === newLocale) return Promise.reject(new Error("not found."));

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.websitePurposeApi.getByLocale.mockReset();
        });

        it("doesn't store the fetched website purpose to the cache", async () => {
          const Component = () => useWebsitePurpose() && null;
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          repository.websitePurposeCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.websitePurposeCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering three times with returning values [the old website purpose, false] -> [the old website purpose, true] -> [the new website purpose, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useWebsitePurpose());

            return null;
          };
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          returnValues = [];

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(3);
          expect(returnValues[0]).toEqual([oldWebsitePurpose, false]);
          expect(returnValues[1]).toEqual([oldWebsitePurpose, true]);
          expect(returnValues[2]).toEqual([null, false]);
        });
      });
    });

    describe("when the requested website purpose is cached", () => {
      const oldWebsitePurpose = Symbol("OLD_WEBSITE_PURPOSE");
      const newWebsitePurpose = Symbol("NEW_WEBSITE_PURPOSE");

      beforeEach(() => {
        repository.websitePurposeCache.has.mockReturnValue(true);
        repository.websitePurposeCache.get.mockImplementation(locale => {
          if (locale === oldLocale) return oldWebsitePurpose;
          if (locale === newLocale) return newWebsitePurpose;

          throw new Error("unreachable here.");
        });
      });

      it("gets the requested website purpose from the cache", async () => {
        const Component = () => useWebsitePurpose() && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.websitePurposeCache.get.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeCache.get).toHaveBeenCalledWith(newLocale);
      });

      it("doesn't try fetching the website purpose through the API", async () => {
        const Component = () => useWebsitePurpose() && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.websitePurposeApi.getByLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeApi.getByLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the website purpose to the cache", async () => {
        const Component = () => useWebsitePurpose() && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.websitePurposeCache.set.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.websitePurposeCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering twice with returning values [the old website purpose, false] -> [the new website purpose, false]", async () => {
        let returnValues: any[] = [];
        const Component = () => {
          returnValues.push(useWebsitePurpose());

          return null;
        };
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: oldLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        returnValues = [];

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(returnValues.length).toBe(2);
        expect(returnValues[0]).toEqual([oldWebsitePurpose, false]);
        expect(returnValues[1]).toEqual([newWebsitePurpose, false]);
      });
    });
  });
});
