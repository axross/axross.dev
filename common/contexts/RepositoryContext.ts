import * as React from "react";
import BioRepository from "../repositories/BioRepository";
import BlogPostRepository from "../repositories/BlogPostRepository";
import LocaleRepository from "../repositories/LocaleRepository";

interface Repositories {
  bioRepository: BioRepository;
  blogPostRepository: BlogPostRepository;
  localeRepository: LocaleRepository;
}

export default React.createContext<Repositories>(null as any);
