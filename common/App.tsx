import * as React from "react";
import Helmet from "react-helmet";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import faviconImage from "../assets/favicon.png";
import GlobalStyle from "./components/GlobalStyle";
import LocaleContext from "./contexts/LocaleContext";
import RepositoryContext from "./contexts/RepositoryContext";

const BlogPostRoute = React.lazy(() => import("./routes/BlogPostRoute"));
const IndexRoute = React.lazy(() => import("./routes/IndexRoute"));

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const { localeRepository } = React.useContext(RepositoryContext);
  const [
    [availableLocales, isAvailableLocalesLoading],
    setAvailableLocales
  ] = React.useState<[string[], boolean]>([[], true]);
  const currentLocale = new URLSearchParams(location.search).get("hl");

  React.useEffect(() => {
    localeRepository.getAllAvailableOnes().then(availableLocales => {
      if (currentLocale === null || !availableLocales.includes(currentLocale)) {
        const nextSearchParams = new URLSearchParams(location.search);

        nextSearchParams.set("hl", availableLocales[0]);

        history.replace({
          search: `${nextSearchParams}`
        });

        return;
      }

      setAvailableLocales([availableLocales, false]);
    });
  }, [currentLocale]);

  return (
    <LocaleContext.Provider
      value={{
        availableLocales,
        currentLocale: currentLocale ?? "en-US",
        isLoading: isAvailableLocalesLoading
      }}
    >
      <GlobalStyle />

      <Helmet>
        <link rel="shortcut icon" href={faviconImage} />
      </Helmet>

      <React.Suspense fallback={<div />}>
        <Switch>
          <Route path="/posts/:id" component={BlogPostRoute} />

          <Route path="/" component={IndexRoute} />
        </Switch>
      </React.Suspense>
    </LocaleContext.Provider>
  );
}
