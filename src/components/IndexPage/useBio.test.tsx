import * as React from "react";
import { ReactTestRenderer, act, create } from "react-test-renderer";
import { LocaleContext } from "../../hooks/useLocale";
import { RepositoryContext } from "../../hooks/useRepository";
import useBio from "./useBio";

describe("useBio()", () => {
  const repository = {
    bioApi: {
      getByLocale: jest.fn(),
    },
    bioCache: {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    },
  };

  beforeEach(() => {
    repository.bioApi.getByLocale.mockReturnValue(Promise.resolve());
  });

  afterEach(() => {
    repository.bioApi.getByLocale.mockClear();
    repository.bioCache.has.mockClear();
    repository.bioCache.get.mockClear();
    repository.bioCache.set.mockClear();
  });

  describe("when called in the first rendering", () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");

    it("checks if the cache contains the requested bio", async () => {
      const Component = () => useBio() && null;
  
      await act(async () => {
        create(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.bioCache.has).toHaveBeenCalledWith(currentLocale);
    });

    describe("when the requested bio is not cached", () => {
      beforeEach(() => {
        repository.bioCache.has.mockReturnValue(false);
        repository.bioCache.get.mockReturnValue(null);
      });

      afterEach(() => {
        repository.bioCache.has.mockReset();
        repository.bioCache.get.mockReset();
      });

      it("fetches the bio through the API", async () => {
        const Component = () => useBio() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioApi.getByLocale).toHaveBeenCalledWith(currentLocale);
      });

      describe("when the API succeeds fetching", () => {
        const bio = Symbol("BIO");

        beforeEach(() => {
          repository.bioApi.getByLocale.mockReturnValue(Promise.resolve(bio));
        });

        afterEach(() => {
          repository.bioApi.getByLocale.mockReset();
        });

        it("stores the fetched bio to the cache", async () => {
          const Component = () => useBio() && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.bioCache.set).toHaveBeenCalledWith(currentLocale, bio);
        });

        it("triggers rendering twice with returning values [null, true] -> [the bio, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBio());

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
          expect(returnValues[1]).toEqual([bio, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.bioApi.getByLocale.mockRejectedValue(new Error("not found."));
        });

        afterEach(() => {
          repository.bioApi.getByLocale.mockReset();
        });

        it("doesn't store the fetched bio to the cache", async () => {
          const Component = () => useBio() && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.bioCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering twice with returning values [null, true] -> [the bio, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBio());

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

    describe("when the requested bio is cached", () => {
      const bio = Symbol("BIO");

      beforeEach(() => {
        repository.bioCache.has.mockReturnValue(true);
        repository.bioCache.get.mockReturnValue(bio);
      });

      afterEach(() => {
        repository.bioCache.has.mockReset();
        repository.bioCache.get.mockReset();
      })

      it("gets the requested bio from the cache", async () => {
        const Component = () => useBio() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioCache.get).toHaveBeenCalledWith(currentLocale);
      });

      it("doesn't try fetching the bio through the API", async () => {
        const Component = () => useBio() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioApi.getByLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the bio to the cache", async () => {
        const Component = () => useBio() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering once with returning values [the bio, false]", async () => {
        const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBio());

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
          expect(returnValues[0]).toEqual([bio, false]);
      });
    });
  });

  describe("when the requested locale for the bio is updated", () => {
    const oldLocale: any = Symbol("OLD_LOCALE");
    const newLocale: any = Symbol("NEW_LOCALE");

    it("checks if the cache contains the requested bio", async () => {
      const Component = () => useBio() && null;
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

      repository.bioCache.has.mockClear();

      await act(async () => {
        testRenderer.update(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.bioCache.has).toHaveBeenCalledWith(newLocale);
    });

    describe("when the requested bio is not cached", () => {
      const oldBio = Symbol("OLD_BIO");

      beforeEach(() => {
        repository.bioCache.has.mockImplementation(locale => {
          if (locale === oldLocale) return true;
          if (locale === newLocale) return false;

          throw new Error("unreachable here.");
        });
        repository.bioCache.get.mockImplementation(locale => {
          if (locale === oldLocale) return oldBio;
          if (locale === newLocale) return null;

          throw new Error("unreachable here.");
        });
      });

      it("fetches the bio through the API", async () => {
        const Component = () => useBio() && null;
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

        repository.bioApi.getByLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioApi.getByLocale).toHaveBeenCalledWith(newLocale);
      });

      describe("when the API succeeds fetching", () => {
        const newBio = Symbol("NEW_BIO");

        beforeEach(() => {
          repository.bioApi.getByLocale.mockImplementation(locale => {
            if (locale === oldLocale) return Promise.resolve(oldBio);
            if (locale === newLocale) return Promise.resolve(newBio);

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.bioApi.getByLocale.mockReset();
        });

        it("stores the fetched bio to the cache", async () => {
          const Component = () => useBio() && null;
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

          repository.bioCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.bioCache.set).toHaveBeenCalledWith(newLocale, newBio);
        });

        it("triggers rendering three times with returning values [the old bio, false] -> [the old bio, true] -> [the next bio, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBio());

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
          expect(returnValues[0]).toEqual([oldBio, false]);
          expect(returnValues[1]).toEqual([oldBio, true]);
          expect(returnValues[2]).toEqual([newBio, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.bioApi.getByLocale.mockImplementation(locale => {
            if (locale === oldLocale) return Promise.resolve(oldBio);
            if (locale === newLocale) return Promise.reject(new Error("not found."));

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.bioApi.getByLocale.mockReset();
        });

        it("doesn't store the fetched bio to the cache", async () => {
          const Component = () => useBio() && null;
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

          repository.bioCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.bioCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering three times with returning values [the old bio, false] -> [the old bio, true] -> [the new bio, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBio());

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
          expect(returnValues[0]).toEqual([oldBio, false]);
          expect(returnValues[1]).toEqual([oldBio, true]);
          expect(returnValues[2]).toEqual([null, false]);
        });
      });
    });

    describe("when the requested bio is cached", () => {
      const oldBio = Symbol("OLD_BIO");
      const newBio = Symbol("NEW_BIO");

      beforeEach(() => {
        repository.bioCache.has.mockReturnValue(true);
        repository.bioCache.get.mockImplementation(locale => {
          if (locale === oldLocale) return oldBio;
          if (locale === newLocale) return newBio;

          throw new Error("unreachable here.");
        });
      });

      it("gets the requested bio from the cache", async () => {
        const Component = () => useBio() && null;
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

        repository.bioCache.get.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioCache.get).toHaveBeenCalledWith(newLocale);
      });

      it("doesn't try fetching the bio through the API", async () => {
        const Component = () => useBio() && null;
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

        repository.bioApi.getByLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioApi.getByLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the bio to the cache", async () => {
        const Component = () => useBio() && null;
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

        repository.bioCache.set.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.bioCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering twice with returning values [the old bio, false] -> [the new bio, false]", async () => {
        let returnValues: any[] = [];
        const Component = () => {
          returnValues.push(useBio());

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
        expect(returnValues[0]).toEqual([oldBio, false]);
        expect(returnValues[1]).toEqual([newBio, false]);
      });
    });
  });
});
