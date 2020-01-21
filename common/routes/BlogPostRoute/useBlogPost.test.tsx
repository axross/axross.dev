import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../contexts/LocaleContext";
import useBlogPost from "./useBlogPost";
import RepositoryContext from "../../contexts/RepositoryContext";

describe("useBlogPost()", () => {
  it("triggers rendering twice with the values [null, true] -> [BlogPost, false] after checking the cache, getting the blog post from API and caching it", async () => {
    const blogPost = Symbol();
    const currentLocale: any = Symbol();
    const blogPostId: any = Symbol();
    const blogPostApi = { getByIdAndLocale: jest.fn(() => Promise.resolve(blogPost)) };
    const blogPostCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPost(blogPostId));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostApi, blogPostCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([blogPost, false]);
    expect(blogPostApi.getByIdAndLocale).toHaveBeenCalledWith(blogPostId, currentLocale);
    expect(blogPostCache.has).toHaveBeenCalledWith(blogPostId, currentLocale);
    expect(blogPostCache.get).not.toHaveBeenCalled();
    expect(blogPostCache.set).toHaveBeenCalledWith(blogPostId, currentLocale, blogPost);
  });

  it("triggers rendering twice with the values [null, true] -> [null, false] after checking the cache and the API thrown", async () => {
    const currentLocale: any = Symbol();
    const blogPostId: any = Symbol();
    const blogPostApi = { getByIdAndLocale: jest.fn(() => Promise.reject(new Error())) };
    const blogPostCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPost(blogPostId));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostApi, blogPostCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
    expect(blogPostApi.getByIdAndLocale).toHaveBeenCalledWith(blogPostId, currentLocale);
    expect(blogPostCache.has).toHaveBeenCalledWith(blogPostId, currentLocale);
    expect(blogPostCache.get).not.toHaveBeenCalled();
    expect(blogPostCache.set).not.toHaveBeenCalled();
  });

  it("triggers rendering once with the values [BlogPost, false] after checking the cache and getting the blog post from the cache", async () => {
    const blogPost = Symbol();
    const currentLocale: any = Symbol();
    const blogPostId: any = Symbol();
    const blogPostApi = { getByIdAndLocale: jest.fn() };
    const blogPostCache = { has: jest.fn(() => true), get: jest.fn(() => blogPost), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBlogPost(blogPostId));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ blogPostApi, blogPostCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(1);
    expect(returnValues[0]).toEqual([blogPost, false]);
    expect(blogPostApi.getByIdAndLocale).not.toHaveBeenCalled();
    expect(blogPostCache.has).toHaveBeenCalledWith(blogPostId, currentLocale);
    expect(blogPostCache.get).toHaveBeenCalledWith(blogPostId, currentLocale);
    expect(blogPostCache.set).not.toHaveBeenCalled();
  });  
});
