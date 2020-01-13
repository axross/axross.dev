import * as React from "react";
import styled from "@emotion/styled";
import { DARK_COLOR, LIGHT_COLOR } from "../../constant/color";
import { DARK_MODE, MOBILE } from "../../constant/mediaQuery";
import RepositoryContext from "../../contexts/RepositoryContext";
import WebpageSummary from "../../entities/WebpageSummary";
import ThemedColor from "../../types/ThemedColor";
import ExternalLink from "../ExternalLink";
import RawText from "../RawText";
import EmbededLinkLoader from './EmbededLink/EmbededLinkLoader';
import FallbackImage from "./EmbededLink/FallbackImage";

interface Props extends React.Attributes {
  url: string;
  className?: string;
}

export default function EmbededLink({ url, ...props }: Props) {
  const { webpageSummaryRepository } = React.useContext(RepositoryContext);
  const [[webpageSummary, isWebpageSummaryLoading], setWebpageSummary] = React.useState<[WebpageSummary | null, boolean]>([null, true]);

  React.useEffect(() => {
    webpageSummaryRepository.getByURL(new URL(url))
      .then(webpageSummary => {
        console.log(webpageSummary);

        setWebpageSummary([webpageSummary, false]);
      })
      .catch(err => {
        console.log(err);

        setWebpageSummary([null, false]);
      });
  }, [url]);

  // show the loader even if retrieving the webpage summary failed
  // and report to sentry.io
  if (isWebpageSummaryLoading || !webpageSummary) {
    return <EmbededLinkLoader {...props} />;
  }

  return (
    <Root {...props}>
      {webpageSummary.imageURL
        ? <Image _src={`${webpageSummary!.imageURL}`} />
        : <_FallbackImage></_FallbackImage>
      }

      <TitleLink href={url}>
        <RawText bold maxLines={2}>
          {webpageSummary.title}
        </RawText>
      </TitleLink>

      <Description color={ThemedColor.secondaryForeground} maxLines={2}>
        {webpageSummary.description ?? ""}
      </Description>

      <Url color={ThemedColor.secondaryForeground} italic maxLines={1}>
        {webpageSummary.url.host.startsWith("www.")
          ? webpageSummary.url.host.substring(4)
          : webpageSummary.url.host
        }
      </Url>
    </Root>
  );
}

const Root = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 160px 32px auto;
  grid-template-rows: auto 16px auto 16px 1fr;
  grid-template-areas: "image . title" "image . ." "image . description" "image . ." "image . url";
  margin-block-start: 32px;
  margin-block-end: 32px;
  margin-inline-start: -32px;
  margin-inline-end: -32px;
  padding-block-start: 32px;
  padding-block-end: 32px;
  padding-inline-start: 32px;
  padding-inline-end: 32px;
  background-color: ${LIGHT_COLOR[ThemedColor.secondaryBackground]};
  border-radius: 8px;

  ${DARK_MODE} {
    background-color: ${DARK_COLOR[ThemedColor.secondaryBackground]};
  }

  ${MOBILE} {
    grid-template-columns: 64px 20px auto;
    grid-template-rows: auto 12px 1fr;
    grid-template-areas: "image . title" "image . ." "image . url";
    width: 100vw;
    margin-block-start: 20px;
    margin-block-end: 20px;
    margin-inline-start: calc(-1 * (100vw - 100%) / 2);
    margin-inline-end: calc(-1 * (100vw - 100%) / 2);
    padding-block-start: 20px;
    padding-block-end: 20px;
    padding-inline-start: calc((100vw - 100%) / 2);
    padding-inline-end: calc((100vw - 100%) / 2);
    border-radius: 0;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;

const Image = styled.div<{ _src: string }>`
  grid-area: image;
  width: 160px;
  height: 160px;
  background-image: url(${({ _src }) => _src});
  background-size cover;
  background-position: center;
  border-radius: 4px;

  ${MOBILE} {
    width: 64px;
    height: 64px;
  }
`;

const _FallbackImage = styled(FallbackImage)`
  grid-area: image;
  width: 160px;
  height: 160px;

  ${MOBILE} {
    width: 64px;
    height: 64px;
  }
`

const TitleLink = styled(ExternalLink)`
  grid-area: title;
`;

const Description = styled(RawText)`
  grid-area: description;

  ${MOBILE} {
    display: none;
  }
`;

const Url = styled(RawText)`
  grid-area: url;
`;

