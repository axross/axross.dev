import * as nextImageModule from "next/image";

Object.defineProperty(nextImageModule, "default", {
  configurable: true,
  value: ({ src, title, alt, width, height, layout, style, ...props }: any) => {
    const aspectRatio = parseInt(`${height}`) / parseInt(`${width}`);
    const paddingTop = isNaN(aspectRatio) ? "100%" : `${aspectRatio * 100}%`;
    let wrapperStyle!: any;
    let sizerStyle!: any;
    let sizerSvg!: any;
    let toBase64!: any;

    if (width !== undefined && height !== undefined && layout !== "fill") {
      if (layout === "responsive") {
        wrapperStyle = {
          display: "block",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          margin: 0,
        };
        sizerStyle = {
          display: "block",
          boxSizing: "border-box",
          paddingTop,
        };
      } else if (layout === "intrinsic" || layout === undefined) {
        wrapperStyle = {
          display: "inline-block",
          maxWidth: "100%",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          margin: 0,
        };
        sizerStyle = {
          boxSizing: "border-box",
          display: "block",
          maxWidth: "100%",
        };
        sizerSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
        toBase64 = Buffer.from(sizerSvg).toString("base64");
      } else if (layout === "fixed") {
        wrapperStyle = {
          overflow: "hidden",
          boxSizing: "border-box",
          display: "inline-block",
          position: "relative",
          width,
          height,
        };
      }
    } else if (
      width === undefined &&
      height === undefined &&
      layout === "fill"
    ) {
      wrapperStyle = {
        display: "block",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxSizing: "border-box",
        margin: 0,
      };
    } else {
      throw new Error(
        `Image with src "${props.src}" must use "width" and "height" properties or "layout='fill'" property.`
      );
    }

    return (
      <div style={{ ...wrapperStyle, ...style }} {...props}>
        {sizerStyle ? (
          <div style={sizerStyle}>
            {sizerSvg ? (
              <img
                style={{ maxWidth: "100%", display: "block" }}
                alt={props.alt}
                aria-hidden={true}
                role="presentation"
                src={`data:image/svg+xml;base64,${toBase64}`}
              />
            ) : null}
          </div>
        ) : null}
        <img
          src={src}
          title={title}
          alt={alt}
          decoding="async"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            boxSizing: "border-box",
            padding: 0,
            border: "none",
            margin: "auto",
            display: "block",
            width: 0,
            height: 0,
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            maxHeight: "100%",
            objectFit: props.objectFit ? props.objectFit : undefined,
            objectPosition: props.objectPosition
              ? props.objectPosition
              : undefined,
          }}
        />
      </div>
    );
  },
});
