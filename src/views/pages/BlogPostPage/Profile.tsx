import styled from "@emotion/styled";
import * as React from "react";
import { ThemedColor } from "../../../entities/ColorTheme";
import Person from "../../../entities/Person";
import ExternalLink from "../../components/ExternalLink";
import KeepLocaleLink from "../../components/KeepLocaleLink";
import Text, { TextType } from "../../components/Text";
import Icon, { IconName } from "../../components/Icon";

interface Props extends React.Attributes {
  person: Person;
  className?: string;
}

export default function Profile({ person, ...props }: Props) {
  return (
    <Root {...props}>
      <Myself href="/" as="/" passHref>
        <Image
          src="/static/profile.jpg"
          alt={person.name}
          {...{ loading: "lazy" }}
        />

        <Name>
          <Text type={TextType.logo} color={ThemedColor.emphasizedForeground}>
            {person.name}
          </Text>
        </Name>
      </Myself>

      <LinkList>
        {person.socialLinks.map(item => (
          <LinkListItem key={item.name}>
            <LinkIcon
              name={ICON_NAMES.get(item.name)!}
              fill={ThemedColor.secondaryForeground}
            />

            <ExternalLink href={item.url.href}>
              <Text>{item.username}</Text>
            </ExternalLink>
          </LinkListItem>
        ))}
      </LinkList>
    </Root>
  );
}

const ICON_NAMES = new Map<string, IconName>([
  ["GitHub", IconName.github],
  ["LinkedIn", IconName.linkedIn],
  ["Facebook", IconName.facebook],
  ["Instagram", IconName.instagram]
]);

const Root = styled.div`
  display: grid;
  grid-template-areas: "myself" "links";
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  justify-items: center;
`;

const Myself = styled(KeepLocaleLink)`
  grid-area: myself;
  display: grid;
  grid-template-areas: "image" "name";
  row-gap: 12px;
  justify-items: center;
  margin-block: -12px;
  margin-inline: -12px;
  padding-block: 12px;
  padding-inline: 12px;
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
