import NextImage from "next/image";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";
import { getConfig } from "~/helpers/config";
import { hash } from "~/helpers/hash";
import { imageLoader } from "./image-loader";

const Image = forwardRef<
  ElementRef<typeof NextImage>,
  ComponentPropsWithRef<typeof NextImage>
>(async ({ src, loader, ...props }, ref) => {
  const config = getConfig();

  if (typeof src === "string") {
    const encodedUrl = encodeURIComponent(src);
    const token = await hash(`${src}@${config.image.secret}`);
    const url = `/images/${encodedUrl}?token=${token}`;

    return (
      <NextImage
        src={url}
        loader={loader ?? imageLoader}
        ref={ref}
        {...props}
      />
    );
  }

  return <NextImage src={src} loader={loader} ref={ref} {...props} />;
});

Image.displayName = NextImage.displayName;

export { Image };
