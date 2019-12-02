import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import Person from "../../../entities/Person";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import Profile from "../BlogPostPage/Profile";
import TwoPaneView, { LeftPane, RightPane } from "../../components/TwoPaneView";
import { MOBILE } from "../../constant/mediaquery";
import {
  MOBILE_MINOR_PADDING_SIZE,
  MOBILE_PADDING_SIZE,
  MOBILE_SECTION_MARGIN_SIZE,
  LAPTOP_PADDING_SIZE,
  LAPTOP_SECTION_MARGIN_SIZE
} from "../../constant/size";
import FirstNBlogPosts from "./FirstNBlogPosts";
import FirstNBlogPostsHeading from "./FirstNBlogPostsHeading";
import Whoami from "./Whoami";
import WhoamiHeading from "./WhoamiHeading";

export interface Props {
  myself: Person;
  blogPosts: BlogPost[];
}

export default function IndexPage({ myself, blogPosts }: Props) {
  return (
    <TwoPaneView>
      <LeftPane>
        <Profile person={myself} />
      </LeftPane>

      <_RightPane>
        <_LocaleSwitcher />

        <_WhoamiHeading />

        <_Whoami person={myself} />

        <_FirstNBlogPostsHeading />

        <_FirstNBlogPosts blogPosts={blogPosts} />
      </_RightPane>
    </TwoPaneView>
  );
}

const _RightPane = styled(RightPane)`
  display: grid;
  grid-template-rows: auto ${LAPTOP_PADDING_SIZE}px auto ${LAPTOP_PADDING_SIZE}px auto ${LAPTOP_SECTION_MARGIN_SIZE}px auto ${LAPTOP_PADDING_SIZE}px auto;
  grid-template-areas:
    "localeSwitcher" "." "whoamiHeading" "." "whoami" "."
    "firstNBlogPostsHeading" "." "firstNBlogPosts";

  ${MOBILE} {
    grid-template-rows: auto ${MOBILE_MINOR_PADDING_SIZE}px auto ${MOBILE_PADDING_SIZE}px auto ${MOBILE_SECTION_MARGIN_SIZE}px auto ${MOBILE_PADDING_SIZE}px auto;
    grid-template-areas: "localeSwitcher", ".",
      "whoamiHeading" "." "whoami" "." "firstNBlogPostsHeading" "."
        "firstNBlogPosts";
  }
`;

const _LocaleSwitcher = styled(LocaleSwitcher)`
  grid-area: localeSwitcher;
  justify-self: flex-end;
`;

const _WhoamiHeading = styled(WhoamiHeading)`
  grid-area: whoamiHeading;
`;

const _Whoami = styled(Whoami)`
  grid-area: whoami;
`;

const _FirstNBlogPostsHeading = styled(FirstNBlogPostsHeading)`
  grid-area: firstNBlogPostsHeading;
`;

const _FirstNBlogPosts = styled(FirstNBlogPosts)`
  grid-area: firstNBlogPosts;
`;
