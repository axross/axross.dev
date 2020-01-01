import styled from "@emotion/styled";
import * as React from "react";
import { MY_NAME, MY_SOCIAL_MEDIA_LINKS } from "../../constant/data";
import Link from "../../components/Link";
import KeepLocaleLink from "../../components/KeepLocaleLink";
import Text, { TextType } from "../../components/Text";
import Icon, { IconName } from "../../components/Icon";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  className?: string;
}

export default function Profile({ ...props }: Props) {
  return (
    <Root {...props}>
      <Myself to="/">
        <Image src="/profile.jpg" alt="Kohei" {...{ loading: "lazy" }} />

        <Name>
          <Text type={TextType.logo} color={ThemedColor.emphasizedForeground}>
            {MY_NAME}
          </Text>
        </Name>
      </Myself>

      <LinkList>
        {MY_SOCIAL_MEDIA_LINKS.map(link => (
          <LinkListItem>
            <LinkIcon
              name={detectIconNameByURL(link.url)}
              fill={ThemedColor.secondaryForeground}
            />

            <Link to={`${link.url}`}>
              <Text>{link.username}</Text>
            </Link>
          </LinkListItem>
        ))}
      </LinkList>
    </Root>
  );
}

function detectIconNameByURL(url: URL): IconName {
  if (url.hostname.includes("github.com")) return IconName.github;
  if (url.hostname.includes("linkedin.com")) return IconName.linkedIn;
  if (url.hostname.includes("facebook.com")) return IconName.facebook;
  if (url.hostname.includes("instagram.com")) return IconName.instagram;

  throw new Error("unreachable here.");
}

const Root = styled.div`
  display: grid;
  grid-template-areas: "myself" "links";
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  align-content: flex-start;
  justify-items: center;
`;

const Myself = styled(KeepLocaleLink)`
  grid-area: myself;
  display: grid;
  grid-template-areas: "image" "name";
  row-gap: 12px;
  justify-items: center;
  margin-block-start: -12px;
  margin-block-end: -12px;
  margin-inline-start: -12px;
  margin-inline-end: -12px;
  padding-block-start: 12px;
  padding-block-end: 12px;
  padding-inline-start: 12px;
  padding-inline-end: 12px;
`;

const Image = styled.img`
  grid-area: image;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  transition: width 150ms ease-in-out 0ms, height 150ms ease-in-out 0ms;
`;

const Name = styled.h1`
  grid-area: name;
`;

const LinkList = styled.ul`
  grid-area: links;
  display: flex;
  flex-direction: column;
  margin-block-start: 32px;
`;

const LinkListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  column-gap: 16px;
  align-items: center;
  margin-block-start: 16px;

  &:first-of-type {
    margin-block-start: 0;
  }
`;

const LinkIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;
