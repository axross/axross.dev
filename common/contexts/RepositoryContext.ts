import * as React from "react";
import BioRepository from "../repositories/BioRepository";
import BlogPostCache from "../repositories/BlogPostCache";
import BlogPostRepository from "../repositories/BlogPostRepository";
import LocaleRepository from "../repositories/LocaleRepository";
import WebpageSummaryRepository from "../repositories/WebpageSummaryRepository";
import WebsitePurposeRepository from "../repositories/WebsitePurposeRepository";

interface Repositories {
  bioRepository: BioRepository;
  blogPostCache: BlogPostCache;
  blogPostRepository: BlogPostRepository;
  localeRepository: LocaleRepository;
  webpageSummaryRepository: WebpageSummaryRepository,
  websitePurposeRepository: WebsitePurposeRepository,
}

export default React.createContext<Repositories>(null as any);
