import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { type Blog, type WithContext } from "schema-dts";
import { getConfig } from "~/helpers/config";
import { type Bio } from "~/models/bio";

function buildJsonLd({ bio }: { bio: Bio }): WithContext<Blog> {
  const config = getConfig();

  const jsonLd: WithContext<Blog> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@context": "https://schema.org",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@type": "Blog",
    url: `${config.website.urlOrigin}/`,
    name: config.website.title,
    description: bio.summary,
    thumbnailUrl: `${config.website.urlOrigin}/opengraph-image`,
  };

  return jsonLd;
}

const JsonLd = forwardRef<
  ElementRef<"script">,
  Omit<
    ComponentPropsWithoutRef<"script">,
    "dangerouslySetInnerHTML" | "type"
  > & { readonly bio: Bio }
>(({ bio, ...props }, ref) => {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __html: JSON.stringify(buildJsonLd({ bio })),
      }}
      ref={ref}
      {...props}
    />
  );
});

JsonLd.displayName = "JsonLd";

export { JsonLd };
