import * as React from "react";
import { RepositoryContext } from "../../../hooks/useRepository";
import getWebpageSummary from '../../../repositories/webpageSummary/stub/getWebpageSummary';
import EmbededLink from "./EmbededLink";

export default { title: "Components/PrettyMarkdown/EmbededLink" };

export const article = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ getWebpageSummary } as any}>
      <EmbededLink url="https://localhost:0/article" />
    </RepositoryContext.Provider>
  </div>
);

export const noImage = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ getWebpageSummary } as any}>
      <EmbededLink url="https://localhost:0/no-image" />
    </RepositoryContext.Provider>
  </div>
);

export const longValues = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ getWebpageSummary } as any}>
      <EmbededLink url="https://localhost:0/lorem-ipsum" />
    </RepositoryContext.Provider>
  </div>
);

export const loading = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ getWebpageSummary } as any}>
      <EmbededLink url="https://localhost:0/loading-forever" />
    </RepositoryContext.Provider>
  </div>
);

export const unavailable = () => (
  <div style={{ padding: "0 48px" }}>
    <RepositoryContext.Provider value={{ getWebpageSummary } as any}>
      <EmbededLink url="https://localhost:0/unavailable" />
    </RepositoryContext.Provider>
  </div>
);