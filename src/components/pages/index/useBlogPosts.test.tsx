import * as React from "react";
import { ReactTestRenderer, act, create } from "react-test-renderer";
import LocaleContext from "../../../contexts/LocaleContext";
import RepositoryContext from "../../../contexts/RepositoryContext";
import useBlogPosts from "./useBlogPosts";

describe("useBlogPosts()", () => {
  const repository = {
    blogPostApi: {
      getAllByLocale: jest.fn(),
    },
    blogPostListCache: {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    },
  };

  beforeEach(() => {
    repository.blogPostApi.getAllByLocale.mockReturnValue(Promise.resolve());
  });

  afterEach(() => {
    repository.blogPostApi.getAllByLocale.mockClear();
    repository.blogPostListCache.has.mockClear();
    repository.blogPostListCache.get.mockClear();
    repository.blogPostListCache.set.mockClear();
  });

  describe("when called in the first rendering", () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");

    it("checks if the cache contains the requested blog posts", async () => {
      const Component = () => useBlogPosts() && null;
  
      await act(async () => {
        create(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.blogPostListCache.has).toHaveBeenCalledWith(currentLocale);
    });

    describe("when the requested blog posts is not cached", () => {
      beforeEach(() => {
        repository.blogPostListCache.has.mockReturnValue(false);
        repository.blogPostListCache.get.mockReturnValue(null);
      });

      afterEach(() => {
        repository.blogPostListCache.has.mockReset();
        repository.blogPostListCache.get.mockReset();
      });

      it("fetches the blog posts through the API", async () => {
        const Component = () => useBlogPosts() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getAllByLocale).toHaveBeenCalledWith(currentLocale);
      });

      describe("when the API succeeds fetching", () => {
        const blogPosts = Symbol("BLOG_POSTS");

        beforeEach(() => {
          repository.blogPostApi.getAllByLocale.mockReturnValue(Promise.resolve(blogPosts));
        });

        afterEach(() => {
          repository.blogPostApi.getAllByLocale.mockReset();
        });

        it("stores the fetched blog posts to the cache", async () => {
          const Component = () => useBlogPosts() && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostListCache.set).toHaveBeenCalledWith(currentLocale, blogPosts);
        });

        it("triggers rendering twice with returning values [an empty array, true] -> [the blog posts, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPosts());

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
          expect(returnValues[0]).toEqual([[], true]);
          expect(returnValues[1]).toEqual([blogPosts, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.blogPostApi.getAllByLocale.mockRejectedValue(new Error("not found."));
        });

        afterEach(() => {
          repository.blogPostApi.getAllByLocale.mockReset();
        });

        it("doesn't store the fetched blog posts to the cache", async () => {
          const Component = () => useBlogPosts() && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostListCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering twice with returning values [an empty array, true] -> [the blog posts, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPosts());

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
          expect(returnValues[0]).toEqual([[], true]);
          expect(returnValues[1]).toEqual([[], false]);
        });
      });
    });

    describe("when the requested blog posts is cached", () => {
      const blogPosts = Symbol("BLOG_POSTS");

      beforeEach(() => {
        repository.blogPostListCache.has.mockReturnValue(true);
        repository.blogPostListCache.get.mockReturnValue(blogPosts);
      });

      afterEach(() => {
        repository.blogPostListCache.has.mockReset();
        repository.blogPostListCache.get.mockReset();
      })

      it("gets the requested blog posts from the cache", async () => {
        const Component = () => useBlogPosts() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostListCache.get).toHaveBeenCalledWith(currentLocale);
      });

      it("doesn't try fetching the blog posts through the API", async () => {
        const Component = () => useBlogPosts() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getAllByLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the blog posts to the cache", async () => {
        const Component = () => useBlogPosts() && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostListCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering once with returning values [the blog posts, false]", async () => {
        const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPosts());

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
          expect(returnValues[0]).toEqual([blogPosts, false]);
      });
    });
  });

  describe("when the requested locale for the blog posts is updated", () => {
    const oldLocale: any = Symbol("OLD_LOCALE");
    const newLocale: any = Symbol("NEW_LOCALE");

    it("checks if the cache contains the requested blog posts", async () => {
      const Component = () => useBlogPosts() && null;
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

      repository.blogPostListCache.has.mockClear();

      await act(async () => {
        testRenderer.update(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.blogPostListCache.has).toHaveBeenCalledWith(newLocale);
    });

    describe("when the requested blog posts is not cached", () => {
      const oldBio = Symbol("OLD_BLOG_POSTS");

      beforeEach(() => {
        repository.blogPostListCache.has.mockImplementation(locale => {
          if (locale === oldLocale) return true;
          if (locale === newLocale) return false;

          throw new Error("unreachable here.");
        });
        repository.blogPostListCache.get.mockImplementation(locale => {
          if (locale === oldLocale) return oldBio;
          if (locale === newLocale) return null;

          throw new Error("unreachable here.");
        });
      });

      it("fetches the blog posts through the API", async () => {
        const Component = () => useBlogPosts() && null;
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

        repository.blogPostApi.getAllByLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getAllByLocale).toHaveBeenCalledWith(newLocale);
      });

      describe("when the API succeeds fetching", () => {
        const newBio = Symbol("NEW_BLOG_POSTS");

        beforeEach(() => {
          repository.blogPostApi.getAllByLocale.mockImplementation(locale => {
            if (locale === oldLocale) return Promise.resolve(oldBio);
            if (locale === newLocale) return Promise.resolve(newBio);

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.blogPostApi.getAllByLocale.mockReset();
        });

        it("stores the fetched blog posts to the cache", async () => {
          const Component = () => useBlogPosts() && null;
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

          repository.blogPostListCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostListCache.set).toHaveBeenCalledWith(newLocale, newBio);
        });

        it("triggers rendering three times with returning values [the old blog posts, false] -> [the old blog posts, true] -> [the new blog posts, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPosts());

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
          repository.blogPostApi.getAllByLocale.mockImplementation(locale => {
            if (locale === oldLocale) return Promise.resolve(oldBio);
            if (locale === newLocale) return Promise.reject(new Error("not found."));

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.blogPostApi.getAllByLocale.mockReset();
        });

        it("doesn't store the fetched blog posts to the cache", async () => {
          const Component = () => useBlogPosts() && null;
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

          repository.blogPostListCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostListCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering three times with returning values [the old blog posts, false] -> [the old blog posts, true] -> [the new blog posts, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPosts());

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
          expect(returnValues[2]).toEqual([[], false]);
        });
      });
    });

    describe("when the requested blog posts is cached", () => {
      const oldBio = Symbol("OLD_BLOG_POSTS");
      const newBio = Symbol("NEW_BLOG_POSTS");

      beforeEach(() => {
        repository.blogPostListCache.has.mockReturnValue(true);
        repository.blogPostListCache.get.mockImplementation(locale => {
          if (locale === oldLocale) return oldBio;
          if (locale === newLocale) return newBio;

          throw new Error("unreachable here.");
        });
      });

      it("gets the requested blog posts from the cache", async () => {
        const Component = () => useBlogPosts() && null;
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

        repository.blogPostListCache.get.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostListCache.get).toHaveBeenCalledWith(newLocale);
      });

      it("doesn't try fetching the blog posts through the API", async () => {
        const Component = () => useBlogPosts() && null;
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

        repository.blogPostApi.getAllByLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getAllByLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the blog posts to the cache", async () => {
        const Component = () => useBlogPosts() && null;
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

        repository.blogPostListCache.set.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostListCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering twice with returning values [the old blog posts, false] -> [the new blog posts, false]", async () => {
        let returnValues: any[] = [];
        const Component = () => {
          returnValues.push(useBlogPosts());

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
