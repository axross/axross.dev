document.addEventListener("DOMContentLoaded", async () => {
  const [
    React,
    ReactDOM,
    { BrowserRouter, useHistory },
    { default: App },
    {
      BioRepository,
      BlogPostCache,
      BlogPostRepository,
      LocaleRepository,
      WebsitePurposeRepository,
      WebpageSummaryRepository,
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
    bioRepository: new BioRepository(contentful),
    blogPostCache: new BlogPostCache(),
    blogPostRepository: new BlogPostRepository(contentful),
    localeRepository: new LocaleRepository(contentful),
    webpageSummaryRepository: new WebpageSummaryRepository(),
    websitePurposeRepository: new WebsitePurposeRepository(contentful),
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


