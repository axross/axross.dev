import { type ComponentPropsWithoutRef, type JSX } from "react";

function JapaneseFlag(props: ComponentPropsWithoutRef<"svg">): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        fill="#f3f4f6"
        d="M400 0H112C50.144 0 0 50.144 0 112v288c0 61.856 50.144 112 112 112h288c61.856 0 112-50.144 112-112V112C512 50.144 461.856 0 400 0z"
      />

      <circle cx="256" cy="256" r="97.1" fill="#f43f5e" />
    </svg>
  );
}

export { JapaneseFlag };
