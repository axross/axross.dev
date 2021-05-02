import { FeedbackFish } from "@feedback-fish/react";
import * as React from "react";
import { useRouter } from "../hooks/router";
import { ParrotAnchor } from "./anchor";

export interface FeedbackLinkProps extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export const FeedbackLink: React.FC<FeedbackLinkProps> = ({
  children,
  ...props
}) => {
  const { url, locale } = useRouter();

  if (process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID) {
    return (
      <FeedbackFish
        projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_PROJECT_ID}
        metadata={{
          path: url.pathname,
          locale,
        }}
      >
        <ParrotAnchor {...props}>{children}</ParrotAnchor>
      </FeedbackFish>
    );
  }

  return <ParrotAnchor {...props}>{children}</ParrotAnchor>;
};
