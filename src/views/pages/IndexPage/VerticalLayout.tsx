import styled from '@emotion/styled';
import * as React from 'react';
import BlogPost from '../../../entities/BlogPost';
import HeadBar from '../../components/HeadBar';
import Person from '../../../entities/Person';
import PrettyMarkdown from '../../components/PrettyMarkdown';
import FirstNBlogPosts from "./FirstNBlogPosts";
import FirstNBlogPostsHeading from "./FirstNBlogPostsHeading";
import WhoamiHeading from "./WhoamiHeading";

interface Props extends React.Attributes {
  person: Person;
  blogPosts: BlogPost[];
  className?: string;
}

export default function VerticalLayout({ person, blogPosts, ...props }: Props) {
  return <Root {...props}>
    <HeadBar />

    <Section>
      <WhoamiHeading />

      <_Whoami>
        <PrettyMarkdown {...props}>{person.description}</PrettyMarkdown>
      </_Whoami>

      <_FirstNBlogPostsHeading />

      <_FirstNBlogPosts blogPosts={blogPosts} />
    </Section>
  </Root>;
}

const Root = styled.div`
  max-width: 400px;
  margin-inline: auto;
`;

const Section = styled.section`
  margin-block-start: 16px;
  padding-block-end: 48px;
  padding-inline: 20px;
`;

const _Whoami = styled.div`
  margin-block-start: 24px;
`;

const _FirstNBlogPostsHeading = styled(FirstNBlogPostsHeading)`
  margin-block-start: 48px;
`;

const _FirstNBlogPosts = styled(FirstNBlogPosts)`
  margin-block-start: 24px;
`;
