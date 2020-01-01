import * as React from "react";
import BioRepository from "../../common/repositories/BioRepository";
import BlogPostRepository from "../../common/repositories/BlogPostRepository";
import LocaleRepository from "../../common/repositories/LocaleRepository";

interface Repositories {
  bioRepository: BioRepository;
  blogPostRepository: BlogPostRepository;
  localeRepository: LocaleRepository;
}

export default React.createContext<Repositories>(null as any);
