import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type JSX } from "react";
import chaos from "~/assets/chaos.svg";
import { Button } from "~/components/button";
import { getConfig } from "~/helpers/config";
import css from "./not-found.module.css";

function generateMetadata(): Metadata {
  const config = getConfig();

  return {
    title: "404 Not Found",
    description: "",
    applicationName: config.website.title,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

function NotFound(): JSX.Element {
  return (
    <div className={css.root}>
      <div className={css["eyecatch-front"]}>{"404"}</div>

      <div className={css["eyecatch-back"]}>{"Not Found"}</div>

      <Link href="/">
        <Button
          intent="neutral"
          variant="solid"
          size="md"
          className={css.button}
        >
          {"Go to home"}
        </Button>
      </Link>

      <Image src={chaos as never} alt="Background" className={css.background} />
    </div>
  );
}

export { generateMetadata };
export default NotFound;
