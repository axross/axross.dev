import * as React from "react";
import styled from "styled-components";
import profileImage from "../../../assets/profile.jpg";
import ExternalLink from "../../components/ExternalLink";
import Icon, { IconName } from "../../components/Icon";
import PrettyMarkdown from "../../components/PrettyMarkdown";
import UIText, { UITextType } from "../../components/UIText";
import { MY_NAME, MY_SOCIAL_MEDIA_LINKS } from "../../constant/data";
import { MOBILE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  bio: string;
  className?: string;
}

export default function Whoami({ bio, ...props }: Props) {
  return (
    <Root {...props}>
      <Avatar src={profileImage} alt="Kohei Asai" />

      <Name type={UITextType.subtitle2}>
        {MY_NAME}
      </Name>

      <SocialLinkList>
        {MY_SOCIAL_MEDIA_LINKS.map(link => (
          <SocialLinkListItem key={`${link.url}`}>
            <SocialLinkListItemIcon
              name={detectIconNameByURL(link.url)}
              fill={ThemedColor.secondaryForeground}
            />

            <SocialLinkListItemLabel href={`${link.url}`}>
              <UIText>{link.username}</UIText>
            </SocialLinkListItemLabel>
          </SocialLinkListItem>
        ))}
      </SocialLinkList>

      <Bio>
        <PrettyMarkdown>
          {bio!}
        </PrettyMarkdown>
      </Bio>
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
  grid-template-columns: 96px 32px calc(100% - 96px - 32px);
  grid-template-rows: 96px 16px auto 32px auto;
  grid-template-areas: "avatar . name" ". . ." "social-links social-links social-links" ". . ." "bio bio bio";

  ${MOBILE} {
    grid-template-columns: 48px 16px calc(100% - 48px - 16px);
    grid-template-rows: 48px 12px auto 24px auto;
  }
`;

const Avatar = styled.img`
  grid-area: avatar;
  width: 96px;
  height: 96px;
  border-radius: 50%;

  ${MOBILE} {
    width: 48px;
    height: 48px;
  }
`;

const Name = styled(UIText)`
  grid-area: name;
  align-self: center;
`;

const Bio = styled.div`
  grid-area: bio;
`;

const SocialLinkList = styled.ul`
  grid-area: social-links;
  display: flex;
  flex-wrap: wrap;
  margin-block-end: -16px;

  ${MOBILE} {
    margin-block-end: -8px;
  }
`;

const SocialLinkListItem = styled.li`
  flex-basis: 120px;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 20px auto;
  grid-template-areas: "icon label";
  column-gap: 8px;
  align-items: center;
  margin-block-end: 16px;

  ${MOBILE} {
    margin-block-end: 8px;
  }
`;

const SocialLinkListItemIcon = styled(Icon)`
  grid-area: icon;
  width: 20px;
  height: 20px;
`;

const SocialLinkListItemLabel = styled(ExternalLink)`
  grid-area: label;
  justify-self: start;
`;
