import * as React from "react";
import { ReactTestRenderer, act, create } from "react-test-renderer";
import { LocaleContext } from "../../hooks/useLocale";
import { RepositoryContext } from "../../hooks/useRepository";
import useBlogPost from "./useBlogPost";

describe("useBlogPost()", () => {
  const repository = {
    blogPostApi: {
      getByIdAndLocale: jest.fn(),
    },
    blogPostCache: {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    },
  };

  beforeEach(() => {
    repository.blogPostApi.getByIdAndLocale.mockReturnValue(Promise.resolve());
  });

  afterEach(() => {
    repository.blogPostApi.getByIdAndLocale.mockClear();
    repository.blogPostCache.has.mockClear();
    repository.blogPostCache.get.mockClear();
    repository.blogPostCache.set.mockClear();
  });

  describe("when called in the first rendering", () => {
    const blogPostId: any = Symbol("BLOG_POST_ID");
    const currentLocale: any = Symbol("CURRENT_LOCALE");

    it("checks if the cache contains the requested blog post", async () => {
      const Component = () => useBlogPost(blogPostId) && null;
  
      await act(async () => {
        create(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.blogPostCache.has).toHaveBeenCalledWith(blogPostId, currentLocale);
    });

    describe("when the requested blog post is not cached", () => {
      beforeEach(() => {
        repository.blogPostCache.has.mockReturnValue(false);
        repository.blogPostCache.get.mockReturnValue(null);
      });

      afterEach(() => {
        repository.blogPostCache.has.mockReset();
        repository.blogPostCache.get.mockReset();
      });

      it("fetches the blog post through the API", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getByIdAndLocale).toHaveBeenCalledWith(blogPostId, currentLocale);
      });

      describe("when the API succeeds fetching", () => {
        const blogPost = Symbol("BLOG_POST");

        beforeEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReturnValue(Promise.resolve(blogPost));
        });

        afterEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReset();
        });

        it("stores the fetched blog post to the cache", async () => {
          const Component = () => useBlogPost(blogPostId) && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostCache.set).toHaveBeenCalledWith(blogPostId, currentLocale, blogPost);
        });

        it("triggers rendering twice with returning values [null, true] -> [the blog post, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPost(blogPostId));

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
          expect(returnValues[1]).toEqual([blogPost, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockRejectedValue(new Error("not found."));
        });

        afterEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReset();
        });

        it("doesn't store the fetched blog post to the cache", async () => {
          const Component = () => useBlogPost(blogPostId) && null;
  
          await act(async () => {
            create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering twice with returning values [null, true] -> [the blog post, false]", async () => {
          const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPost(blogPostId));

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

    describe("when the requested blog post is cached", () => {
      const blogPost = Symbol("BLOG_POST");

      beforeEach(() => {
        repository.blogPostCache.has.mockReturnValue(true);
        repository.blogPostCache.get.mockReturnValue(blogPost);
      });

      afterEach(() => {
        repository.blogPostCache.has.mockReset();
        repository.blogPostCache.get.mockReset();
      })

      it("gets the requested blog post from the cache", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostCache.get).toHaveBeenCalledWith(blogPostId, currentLocale);
      });

      it("doesn't try fetching the blog post through the API", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getByIdAndLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the blog post to the cache", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
  
        await act(async () => {
          create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering once with returning values [the blog post, false]", async () => {
        const returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPost(blogPostId));

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
          expect(returnValues[0]).toEqual([blogPost, false]);
      });
    });
  });

  describe("when the requested blog post is updated", () => {
    const oldBlogPostId: any = Symbol("OLD_BLOG_POST_ID");
    const newBlogPostId: any = Symbol("NEW_BLOG_POST_ID");
    const currentLocale: any = Symbol("CURRENT_LOCALE");

    it("checks if the cache contains the requested blog post", async () => {
      const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
      let testRenderer: ReactTestRenderer;

      await act(async () => {
        testRenderer = create(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale } as any}>
              <Component blogPostId={oldBlogPostId} />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      repository.blogPostCache.has.mockClear();

      await act(async () => {
        testRenderer.update(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale } as any}>
              <Component blogPostId={newBlogPostId} />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.blogPostCache.has).toHaveBeenCalledWith(newBlogPostId, currentLocale);
    });

    describe("when the requested blog post is not cached", () => {
      const oldBlogPost = Symbol("OLD_BLOG_POST");

      beforeEach(() => {
        repository.blogPostCache.has.mockImplementation((id, _) => {
          if (id === oldBlogPostId) return true;
          if (id === newBlogPostId) return false;

          throw new Error("unreachable here.");
        });
        repository.blogPostCache.get.mockImplementation((id, _) => {
          if (id === oldBlogPostId) return oldBlogPost;
          if (id === newBlogPostId) return null;

          throw new Error("unreachable here.");
        });
      });

      afterEach(() => {
        repository.blogPostCache.has.mockReset();
        repository.blogPostCache.get.mockReset();
      });

      it("fetches the blog post through the API", async () => {
        const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={oldBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.blogPostApi.getByIdAndLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={newBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getByIdAndLocale).toHaveBeenCalledWith(newBlogPostId, currentLocale);
      });

      describe("when the API succeeds fetching", () => {
        const newBlogPost = Symbol("NEW_BLOG_POST");

        beforeEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockImplementation((id, _) => {
            if (id === oldBlogPostId) return Promise.resolve(oldBlogPost);
            if (id === newBlogPostId) return Promise.resolve(newBlogPost);

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReset();
        });

        it("stores the fetched blog post to the cache", async () => {
          const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={oldBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          repository.blogPostCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={newBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostCache.set).toHaveBeenCalledWith(newBlogPostId, currentLocale, newBlogPost);
        });

        it("triggers rendering three times with returning values [the old blog post, false] -> [the old blog post, true] -> [the blog post, false]", async () => {
          let returnValues: any[] = [];
          const Component = ({ blogPostId }: { blogPostId: any }) => {
            returnValues.push(useBlogPost(blogPostId));

            return null;
          };
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={oldBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          returnValues = [];

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={newBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(3);
          expect(returnValues[0]).toEqual([oldBlogPost, false]);
          expect(returnValues[1]).toEqual([oldBlogPost, true]);
          expect(returnValues[2]).toEqual([newBlogPost, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockImplementation((id, _) => {
            if (id === oldBlogPostId) return Promise.resolve(oldBlogPost);
            if (id === newBlogPostId) return Promise.reject(new Error("not found."));

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReset();
        });

        it("doesn't store the fetched blog post to the cache", async () => {
          const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={oldBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          repository.blogPostCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={newBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering three times with returning values [the old blog post, false] -> [the old blog post, true] -> [null, false]", async () => {
          let returnValues: any[] = [];
          const Component = ({ blogPostId }: { blogPostId: any }) => {
            returnValues.push(useBlogPost(blogPostId));

            return null;
          };
          let testRenderer: ReactTestRenderer;

          await act(async () => {
            testRenderer = create(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={oldBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          returnValues = [];

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale } as any}>
                  <Component blogPostId={newBlogPostId} />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(returnValues.length).toBe(3);
          expect(returnValues[0]).toEqual([oldBlogPost, false]);
          expect(returnValues[1]).toEqual([oldBlogPost, true]);
          expect(returnValues[2]).toEqual([null, false]);
        });
      });
    });

    describe("when the requested blog post is cached", () => {
      const oldBlogPost = Symbol("OLD_BLOG_POST");
      const newBlogPost = Symbol("NEW_BLOG_POST");

      beforeEach(() => {
        repository.blogPostCache.has.mockReturnValue(true);
        repository.blogPostCache.get.mockImplementation((id, _) => {
          if (id === oldBlogPostId) return oldBlogPost;
          if (id === newBlogPostId) return newBlogPost;

          throw new Error("unreachable here.");
        });
      });

      afterEach(() => {
        repository.blogPostCache.has.mockReset();
        repository.blogPostCache.get.mockReset();
      })

      it("gets the requested blog post from the cache", async () => {
        const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={oldBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.blogPostCache.get.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={newBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostCache.get).toHaveBeenCalledWith(newBlogPostId, currentLocale);
      });

      it("doesn't try fetching the blog post through the API", async () => {
        const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={oldBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.blogPostApi.getByIdAndLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={newBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getByIdAndLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the blog post to the cache", async () => {
        const Component = ({ blogPostId }: { blogPostId: any }) => useBlogPost(blogPostId) && null;
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={oldBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        repository.blogPostCache.set.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={newBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering twice with returning values [the old blog post, false] -> [null, false]", async () => {
        let returnValues: any[] = [];
        const Component = ({ blogPostId }: { blogPostId: any }) => {
          returnValues.push(useBlogPost(blogPostId));

          return null;
        };
        let testRenderer: ReactTestRenderer;

        await act(async () => {
          testRenderer = create(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={oldBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        returnValues = [];

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale } as any}>
                <Component blogPostId={newBlogPostId} />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(returnValues.length).toBe(2);
        expect(returnValues[0]).toEqual([oldBlogPost, false]);
        expect(returnValues[1]).toEqual([newBlogPost, false]);
      });
    });
  });

  describe("when the requested locale for the blog post is updated", () => {
    const blogPostId: any = Symbol("BLOG_POST_ID");
    const oldLocale: any = Symbol("OLD_LOCALE");
    const newLocale: any = Symbol("NEW_LOCALE");

    it("checks if the cache contains the requested blog post", async () => {
      const Component = () => useBlogPost(blogPostId) && null;
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

      repository.blogPostCache.has.mockClear();

      await act(async () => {
        testRenderer.update(
          <RepositoryContext.Provider value={repository as any}>
            <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
              <Component />
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        );
      });

      expect(repository.blogPostCache.has).toHaveBeenCalledWith(blogPostId, newLocale);
    });

    describe("when the requested blog post is not cached", () => {
      const oldBlogPost = Symbol("OLD_BLOG_POST");

      beforeEach(() => {
        repository.blogPostCache.has.mockImplementation((_, locale) => {
          if (locale === oldLocale) return true;
          if (locale === newLocale) return false;

          throw new Error("unreachable here.");
        });
        repository.blogPostCache.get.mockImplementation((_, locale) => {
          if (locale === oldLocale) return oldBlogPost;
          if (locale === newLocale) return null;

          throw new Error("unreachable here.");
        });
      });

      it("fetches the blog post through the API", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
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

        repository.blogPostApi.getByIdAndLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getByIdAndLocale).toHaveBeenCalledWith(blogPostId, newLocale);
      });

      describe("when the API succeeds fetching", () => {
        const newBlogPost = Symbol("NEW_BLOG_POST");

        beforeEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockImplementation((_, locale) => {
            if (locale === oldLocale) return Promise.resolve(oldBlogPost);
            if (locale === newLocale) return Promise.resolve(newBlogPost);

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReset();
        });

        it("stores the fetched blog post to the cache", async () => {
          const Component = () => useBlogPost(blogPostId) && null;
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

          repository.blogPostCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostCache.set).toHaveBeenCalledWith(blogPostId, newLocale, newBlogPost);
        });

        it("triggers rendering three times with returning values [the old blog post, false] -> [the old blog post, true] -> [the blog post, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPost(blogPostId));

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
          expect(returnValues[0]).toEqual([oldBlogPost, false]);
          expect(returnValues[1]).toEqual([oldBlogPost, true]);
          expect(returnValues[2]).toEqual([newBlogPost, false]);
        });
      });

      describe("when the API throws", () => {
        beforeEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockImplementation((_, locale) => {
            if (locale === oldLocale) return Promise.resolve(oldBlogPost);
            if (locale === newLocale) return Promise.reject(new Error("not found."));

            throw new Error("unreachable here.");
          });
        });

        afterEach(() => {
          repository.blogPostApi.getByIdAndLocale.mockReset();
        });

        it("doesn't store the fetched blog post to the cache", async () => {
          const Component = () => useBlogPost(blogPostId) && null;
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

          repository.blogPostCache.set.mockClear();

          await act(async () => {
            testRenderer.update(
              <RepositoryContext.Provider value={repository as any}>
                <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                  <Component />
                </LocaleContext.Provider>
              </RepositoryContext.Provider>
            );
          });

          expect(repository.blogPostCache.set).not.toHaveBeenCalled();
        });

        it("triggers rendering three times with returning values [the old blog post, false] -> [the old blog post, true] -> [the new blog post, false]", async () => {
          let returnValues: any[] = [];
          const Component = () => {
            returnValues.push(useBlogPost(blogPostId));

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
          expect(returnValues[0]).toEqual([oldBlogPost, false]);
          expect(returnValues[1]).toEqual([oldBlogPost, true]);
          expect(returnValues[2]).toEqual([null, false]);
        });
      });
    });

    describe("when the requested blog post is cached", () => {
      const oldBlogPost = Symbol("OLD_BLOG_POST");
      const newBlogPost = Symbol("NEW_BLOG_POST");

      beforeEach(() => {
        repository.blogPostCache.has.mockReturnValue(true);
        repository.blogPostCache.get.mockImplementation((_, locale) => {
          if (locale === oldLocale) return oldBlogPost;
          if (locale === newLocale) return newBlogPost;

          throw new Error("unreachable here.");
        });
      });

      it("gets the requested blog post from the cache", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
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

        repository.blogPostCache.get.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostCache.get).toHaveBeenCalledWith(blogPostId, newLocale);
      });

      it("doesn't try fetching the blog post through the API", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
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

        repository.blogPostApi.getByIdAndLocale.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostApi.getByIdAndLocale).not.toHaveBeenCalled();
      });

      it("doesn't store the blog post to the cache", async () => {
        const Component = () => useBlogPost(blogPostId) && null;
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

        repository.blogPostCache.set.mockClear();

        await act(async () => {
          testRenderer.update(
            <RepositoryContext.Provider value={repository as any}>
              <LocaleContext.Provider value={{ currentLocale: newLocale } as any}>
                <Component />
              </LocaleContext.Provider>
            </RepositoryContext.Provider>
          );
        });

        expect(repository.blogPostCache.set).not.toHaveBeenCalled();
      });

      it("triggers rendering twice with returning values [the old blog post, false] -> [the new blog post, false]", async () => {
        let returnValues: any[] = [];
        const Component = () => {
          returnValues.push(useBlogPost(blogPostId));

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
        expect(returnValues[0]).toEqual([oldBlogPost, false]);
        expect(returnValues[1]).toEqual([newBlogPost, false]);
      });
    });
  });
});
