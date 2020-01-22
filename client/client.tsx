document.addEventListener("DOMContentLoaded", async () => {
  const [
    React,
    ReactDOM,
    { BrowserRouter, useHistory },
    { default: App },
    {
      BioApi,
      BioCache,
      BlogPostApi,
      BlogPostCache,
      BlogPostListCache,
      LocaleApi,
      WebsitePurposeApi,
      WebsitePurposeCache,
      WebpageSummaryApi,
      RepositoryContext,
      createClient
    }
  ] = await Promise.all<any, any, any, any, any>([
    import("react"),
    import("react-dom"),
    import("react-router-dom"),
    import("../common/App"),
    import("./repository")
  ]);

  const searchParams = new URLSearchParams(window.location.search);
  const contentful = createClient(
    searchParams.get("preview")
      ? {
          host: "preview.contentful.com",
          space: process.env.CONTENTFUL_SPACE!,
          accessToken: searchParams.get("preview")!
        }
      : {
          space: process.env.CONTENTFUL_SPACE!,
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
        }
  );
  const repositories = {
    bioCache: new BioCache(),
    bioApi: new BioApi(contentful),
    blogPostApi: new BlogPostApi(contentful),
    blogPostCache: new BlogPostCache(),
    blogPostListCache: new BlogPostListCache(),
    localeApi: new LocaleApi(contentful),
    webpageSummaryApi: new WebpageSummaryApi(),
    websitePurposeApi: new WebsitePurposeApi(contentful),
    websitePurposeCache: new WebsitePurposeCache(),
  };

  function Scroll() {
    const history = useHistory();

    React.useEffect(() => {
      const unlisten = history.listen((_: any, action: any) => {
        if (action === "PUSH") {
          window.scrollTo(0, 0);
        }
      });

      return unlisten;
    }, []);

    return (
      <App />
    );
  }

  ReactDOM.render(
    <BrowserRouter>
      <RepositoryContext.Provider value={repositories}>
        <Scroll />
      </RepositoryContext.Provider>
    </BrowserRouter>,
    document.getElementById("app")
  );
});


