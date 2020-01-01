document.addEventListener("DOMContentLoaded", async () => {
  const [
    React,
    ReactDOM,
    { BrowserRouter },
    { default: App },
    {
      ContentfulBioRepository,
      ContentfulBlogPostRepository,
      ContentfulLocaleRepository,
      RepositoryContext,
      createClient
    }
  ] = await Promise.all<any, any, any, any, any>([
    import("react"),
    import("react-dom"),
    import("react-router-dom"),
    import("./App"),
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
    bioRepository: new ContentfulBioRepository(contentful),
    blogPostRepository: new ContentfulBlogPostRepository(contentful),
    localeRepository: new ContentfulLocaleRepository(contentful)
  };

  ReactDOM.render(
    <BrowserRouter>
      <RepositoryContext.Provider value={repositories}>
        <App />
      </RepositoryContext.Provider>
    </BrowserRouter>,
    document.getElementById("app")
  );
});
