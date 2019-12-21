import styled from "@emotion/styled";
import * as React from "react";
import Person from "../../../entities/Person";
import ExternalLink from "../../components/ExternalLink";
import KeepLocaleLink from "../../components/KeepLocaleLink";
import Text, { TextSize } from "../../components/Text";
import Icon, { IconColor, IconName } from "../../components/Icon";
import { DARK_MODE, MOBILE } from "../../constant/mediaquery";
import {
  MOBILE_MINOR_PADDING_SIZE,
  MOBILE_PADDING_SIZE,
  LAPTOP_MINOR_PADDING_SIZE,
  LAPTOP_PADDING_SIZE,
  LAPTOP_SECTION_MARGIN_SIZE
} from "../../constant/size";

interface Props extends React.Attributes {
  person: Person;
  className?: string;
}

export default function Profile({ person, ...props }: Props) {
  return (
    <Root {...props}>
      <KeepLocaleLink href="/" as="/" passHref>
        <Myself>
          <Image
            src="/static/profile.jpg"
            alt={person.name}
            {...{ loading: "lazy" }}
          />

          <Name>
            <Text size={TextSize.subtitle2} bold>
              {person.name}
            </Text>
          </Name>
        </Myself>
      </KeepLocaleLink>

      <LinkList>
        {person.socialLinks.map(item => (
          <LinkListItem key={item.name}>
            <LinkIcon
              name={ICON_NAMES.get(item.name)!}
              fill={IconColor.secondary}
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
  justify-items: center;
`;

const Myself = styled.a`
  display: grid;
  grid-template-areas: "image" "name";
  row-gap: ${LAPTOP_MINOR_PADDING_SIZE}px;
  justify-items: center;
  margin-block-start: -${LAPTOP_MINOR_PADDING_SIZE}px;
  margin-block-end: -${LAPTOP_MINOR_PADDING_SIZE}px;
  margin-inline-start: -${LAPTOP_MINOR_PADDING_SIZE}px;
  margin-inline-end: -${LAPTOP_MINOR_PADDING_SIZE}px;
  padding-block-start: ${LAPTOP_MINOR_PADDING_SIZE}px;
  padding-block-end: ${LAPTOP_MINOR_PADDING_SIZE}px;
  padding-inline-start: ${LAPTOP_MINOR_PADDING_SIZE}px;
  padding-inline-end: ${LAPTOP_MINOR_PADDING_SIZE}px;

  ${MOBILE} {
    grid-template-columns: 64px 1fr;
    grid-template-areas: "image name";
    column-gap: ${MOBILE_MINOR_PADDING_SIZE}px;
    row-gap: 0;
    align-items: center;
    margin-block-start: -${MOBILE_PADDING_SIZE}px;
    margin-block-end: -${MOBILE_PADDING_SIZE}px;
    margin-inline-start: -${MOBILE_PADDING_SIZE}px;
    margin-inline-end: -${MOBILE_PADDING_SIZE}px;
    padding-block-start: ${MOBILE_PADDING_SIZE}px;
    padding-block-end: ${MOBILE_PADDING_SIZE}px;
    padding-inline-start: ${MOBILE_PADDING_SIZE}px;
    padding-inline-end: ${MOBILE_PADDING_SIZE}px;
  }
`;

const Image = styled.img`
  grid-area: image;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  transition: width 150ms ease-in-out 0ms, height 150ms ease-in-out 0ms;

  ${MOBILE} {
    width: 48px;
    height: 48px;
  }

  ${DARK_MODE} {
    filter: grayscale(25%);
  }
`;

const Name = styled.h1`
  grid-area: name;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-block-start: ${LAPTOP_SECTION_MARGIN_SIZE}px;

  ${MOBILE} {
    display: none;
  }
`;

const LinkListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  column-gap: ${LAPTOP_MINOR_PADDING_SIZE}px;
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;

  &:first-of-type {
    margin-block-start: 0;
  }
`;

const LinkIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;
