// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
// nextjs-routes version: 1.0.7
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  export type Route =
    | StaticRoute<"/admin">
    | StaticRoute<"/admin/manage-institutes">
    | StaticRoute<"/admin/manage-users">
    | DynamicRoute<"/api/auth/[...nextauth]", { "nextauth": string[] }>
    | StaticRoute<"/api/locales">
    | DynamicRoute<"/api/trpc/[trpc]", { "trpc": string }>
    | StaticRoute<"/auth/forgot-password">
    | StaticRoute<"/auth/login">
    | StaticRoute<"/auth/reset-password">
    | StaticRoute<"/auth/signup">
    | DynamicRoute<"/figures/[username]/[imageName]/edit", { "username": string; "imageName": string }>
    | DynamicRoute<"/figures/[username]/[imageName]", { "username": string; "imageName": string }>
    | StaticRoute<"/">
    | DynamicRoute<"/modules/[username]/[moduleName]/edit", { "username": string; "moduleName": string }>
    | DynamicRoute<"/modules/[username]/[moduleName]", { "username": string; "moduleName": string }>
    | StaticRoute<"/modules">
    | StaticRoute<"/modules/new">
    | StaticRoute<"/tools/adrenal-mri">
    | StaticRoute<"/tools/adrenal-washout">
    | StaticRoute<"/tools/fleischner2017">
    | StaticRoute<"/tools/gfr">
    | StaticRoute<"/tools">
    | StaticRoute<"/tools/kidney-volume">
    | StaticRoute<"/tools/measurements-table">
    | StaticRoute<"/tools/sandbox">;

  interface StaticRoute<Pathname> {
    pathname: Pathname;
    query?: Query | undefined;
    hash?: string | null | undefined;
  }

  interface DynamicRoute<Pathname, Parameters> {
    pathname: Pathname;
    query: Parameters & Query;
    hash?: string | null | undefined;
  }

  interface Query {
    [key: string]: string | string[] | undefined;
  };

  export type RoutedQuery<P extends Route["pathname"]> = Extract<
    Route,
    { pathname: P }
  >["query"];

  export type Locale = 
    | "de"
    | "en";

  /**
   * A typesafe utility function for generating paths in your application.
   *
   * route({ pathname: "/foos/[foo]", query: { foo: "bar" }}) will produce "/foos/bar".
   */
  export declare function route(r: Route): string;
}

// prettier-ignore
declare module "next/link" {
  import type { Route } from "nextjs-routes";
  import type { LinkProps as NextLinkProps } from "next/dist/client/link";
  import type {
    AnchorHTMLAttributes,
    DetailedReactHTMLElement,
    MouseEventHandler,
    PropsWithChildren,
  } from "react";
  export * from "next/dist/client/link";

  type Query = { query?: { [key: string]: string | string[] | undefined } };
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  export interface LinkProps
    extends Omit<NextLinkProps, "href" | "locale">,
      AnchorHTMLAttributes<HTMLAnchorElement> {
    href: Route | StaticRoute | Query;
    locale?: Locale | false;
  }

  type LinkReactElement = DetailedReactHTMLElement<
    {
      onMouseEnter?: MouseEventHandler<Element> | undefined;
      onClick: MouseEventHandler;
      href?: string | undefined;
      ref?: any;
    },
    HTMLElement
  >;

  declare function Link(props: PropsWithChildren<LinkProps>): LinkReactElement;

  export default Link;
}

// prettier-ignore
declare module "next/router" {
  import type { Locale, Route, RoutedQuery } from "nextjs-routes";
  import type { NextRouter as Router } from "next/dist/client/router";
  export * from "next/dist/client/router";
  export { default } from "next/dist/client/router";

  type NextTransitionOptions = NonNullable<Parameters<Router["push"]>[2]>;
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];
  type Query = { query?: { [key: string]: string | string[] | undefined } };

  interface TransitionOptions extends Omit<NextTransitionOptions, "locale"> {
    locale?: Locale | false;
  }

  export type NextRouter<P extends Route["pathname"] = Route["pathname"]> =
    Extract<Route, { pathname: P }> &
      Omit<
        Router,
        | "push"
        | "replace"
        | "locale"
        | "locales"
        | "defaultLocale"
        | "domainLocales"
      > & {
        defaultLocale: "en";
        domainLocales?: undefined;
        locale: Locale;
        locales: [
          "de",
          "en"
        ];
        push(
          url: Route | StaticRoute | Query,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        replace(
          url: Route | StaticRoute | Query,
          as?: string,
          options?: TransitionOptions
        ): Promise<boolean>;
        route: P;
      };

  export function useRouter<P extends Route["pathname"]>(): NextRouter<P>;
}
