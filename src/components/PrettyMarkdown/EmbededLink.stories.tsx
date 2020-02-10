import * as React from "react";
import { RepositoryContext } from "../../hooks/useRepository";
import MockWebpageSummaryApi from '../../repositories/MockWebpageSummaryApi';
import EmbededLink from "./EmbededLink";

export default {
  title: "Components/PrettyMarkdown/EmbededLink",
  parameters: { waitForFontLoading: true },
};

export const article = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ webpageSummaryApi: new MockWebpageSummaryApi() } as any}>
      <EmbededLink url="https://localhost:0/article" />
    </RepositoryContext.Provider>
  </div>
);

export const noImage = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ webpageSummaryApi: new MockWebpageSummaryApi() } as any}>
      <EmbededLink url="https://localhost:0/no-image" />
    </RepositoryContext.Provider>
  </div>
);

export const longValues = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ webpageSummaryApi: new MockWebpageSummaryApi() } as any}>
      <EmbededLink url="https://localhost:0/lorem-ipsum" />
    </RepositoryContext.Provider>
  </div>
);

export const loading = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ webpageSummaryApi: new MockWebpageSummaryApi() } as any}>
      <EmbededLink url="https://localhost:0/loading-forever" />
    </RepositoryContext.Provider>
  </div>
);

loading.story = {
  parameters: {
    looseImageSnapshot: true,
    waitForFontLoading: false,
  },
};

export const unavailable = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ webpageSummaryApi: new MockWebpageSummaryApi() } as any}>
      <EmbededLink url="https://localhost:0/unavailable" />
    </RepositoryContext.Provider>
  </div>
);

unavailable.story = {
  parameters: {
    looseImageSnapshot: true,
    waitForFontLoading: false,
  },
};
