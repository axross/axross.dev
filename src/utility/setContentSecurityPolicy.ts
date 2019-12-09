import { NextPageContext } from "next";
import { CONTENT_SECURITY_POLICY, CONTENT_SECURITY_POLICY_REPORT_URL, CONTENT_SECURITY_POLICY_REPORT_TO } from '../settings';
import getURL from "./getURL";

export default function setContentSecurityPolicy(context: NextPageContext): void {
  if (!context.res) throw new Error("context.res is required.");

  const url = getURL(context);
  let contentSecurityPolicy = "";
  
  for (const [key, values] of CONTENT_SECURITY_POLICY) {
    contentSecurityPolicy += `${key}`;
    
    for (const value of values) {
      if (value === "{SELF_URL}") {
        contentSecurityPolicy += ` ${url.protocol}//${url.host}`;

        continue;
      }

      contentSecurityPolicy += ` ${value}`;
    }

    contentSecurityPolicy += "; ";
  }

  contentSecurityPolicy += `report-uri ${CONTENT_SECURITY_POLICY_REPORT_URL}; `;
  contentSecurityPolicy += `report-to default`;

  context.res.setHeader(
    "content-security-policy-report-only",
    contentSecurityPolicy,
  );
  context.res.setHeader(
    "report-to",
    CONTENT_SECURITY_POLICY_REPORT_TO,
  );
}
