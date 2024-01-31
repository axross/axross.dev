import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type JSX,
  forwardRef,
} from "react";
import classes from "./prose.module.css";

const Prose = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & {
    readonly asChild?: boolean;
  }
>(({ asChild = false, className, children }, ref): JSX.Element => {
  const Component = asChild ? Slot : "div";

  return (
    <Component className={clsx(classes.prose, className)} ref={ref}>
      {children}
    </Component>
  );
});

Prose.displayName = "Prose";

function ProseH1({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h1">): JSX.Element {
  return (
    <h1 className={clsx(classes.h1, className)} {...props}>
      {children}
    </h1>
  );
}

function ProseH2({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">): JSX.Element {
  return (
    <h2 className={clsx(classes.h2, className)} {...props}>
      {children}
    </h2>
  );
}

function ProseH3({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">): JSX.Element {
  return (
    <h3 className={clsx(classes.h3, className)} {...props}>
      {children}
    </h3>
  );
}

function ProseOrderedList({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ul">): JSX.Element {
  return (
    <ul className={clsx(classes.ol, className)} {...props}>
      {children}
    </ul>
  );
}

function ProseUnorderedList({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ul">): JSX.Element {
  return (
    <ul className={clsx(classes.ul, className)} {...props}>
      {children}
    </ul>
  );
}

function ProseListItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"li">): JSX.Element {
  return (
    <li className={clsx(classes.li, className)} {...props}>
      {children}
    </li>
  );
}

function ProseParagraph({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">): JSX.Element {
  return (
    <p className={clsx(classes.p, className)} {...props}>
      {children}
    </p>
  );
}

function ProseBlockquote({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">): JSX.Element {
  return (
    <blockquote className={clsx(classes.blockquote, className)} {...props}>
      {children}
    </blockquote>
  );
}

function ProseStrong({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"strong">): JSX.Element {
  return (
    <strong className={clsx(classes.strong, className)} {...props}>
      {children}
    </strong>
  );
}

function ProseAnchorLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">): JSX.Element {
  return (
    <a className={clsx(classes.a, className)} {...props}>
      {children}
    </a>
  );
}

function ProseDescriptionTerm({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"dt">): JSX.Element {
  return (
    <dt className={clsx(classes.dt, className)} {...props}>
      {children}
    </dt>
  );
}

function ProseHorizontalRuler({
  className,
  ...props
}: ComponentPropsWithoutRef<"hr">): JSX.Element {
  return <hr className={clsx(classes.hr, className)} {...props} />;
}

function ProseImage({
  className,
  ...props
}: ComponentPropsWithoutRef<"img">): JSX.Element {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className={clsx(classes.img, className)} {...props} />;
}

export {
  Prose,
  ProseAnchorLink,
  ProseBlockquote,
  ProseDescriptionTerm,
  ProseH1,
  ProseH2,
  ProseH3,
  ProseHorizontalRuler,
  ProseListItem,
  ProseOrderedList,
  ProseParagraph,
  ProseStrong,
  ProseImage,
  ProseUnorderedList,
};
