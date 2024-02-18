import { Noto_Sans_JP as getNotoSansJp } from "next/font/google";

const baseFont = getNotoSansJp({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export { baseFont };
