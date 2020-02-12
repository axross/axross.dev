import * as React from "react";
import GetBio from "../repositories/bio/GetBio";
import GetAllBlogPosts from "../repositories/blogPost/GetAllBlogPosts";
import GetBlogPost from "../repositories/blogPost/GetBlogPost";
import GetWebpageSummary from "../repositories/webpageSummary/GetWebpageSummary";
import GetWebsitePurpose from "../repositories/websitePurpose/GetWebsitePurpose";

export interface Repositories {
  getAllBlogPosts: GetAllBlogPosts;
  getBio: GetBio;
  getBlogPost: GetBlogPost;
  getWebpageSummary: GetWebpageSummary;
  getWebsitePurpose: GetWebsitePurpose;
}

export const RepositoryContext = React.createContext<Repositories>(null as any);

export default function useRepository(): Repositories {
  return React.useContext(RepositoryContext);
}
