import { FeedbackFish } from "@feedback-fish/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useIntl } from "react-intl";
import { ParrotAnchor } from "./anchor";

export interface FeedbackLinkProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export const FeedbackLink: React.FC<FeedbackLinkProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();
  const intl = useIntl();

  if (process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID) {
    const path = router.asPath.split("?")[0];
    const searchParams = new URLSearchParams(router.asPath.split("?")[1]);
    searchParams.delete("hl");
    const search =
      searchParams.toString().length >= 1 ? `?${searchParams}` : "";

    return (
      <FeedbackFish
        projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID}
        metadata={{
          path: `${path}${search}`,
          locale: intl.locale,
        }}
      >
        <ParrotAnchor {...props}>{children}</ParrotAnchor>
      </FeedbackFish>
    );
  }

  return <ParrotAnchor {...props}>{children}</ParrotAnchor>;
};
