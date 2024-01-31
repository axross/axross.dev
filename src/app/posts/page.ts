import { redirect } from "next/navigation";
import { type JSX } from "react";

function Page(): JSX.Element {
  redirect("/");
}

export default Page;
