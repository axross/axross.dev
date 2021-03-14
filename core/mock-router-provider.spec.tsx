import { useRouter } from "next/router";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import MockRouterProvider from "./mock-router-provider";

describe("<MockRouterProvider>", () => {
  it("calls props.push() when router.push() was called in the context", () => {
    const push = jest.fn().mockName("push()");
    const path: any = Symbol("DUMMY_PATH");
    const asPath: any = Symbol("DUMMY_AS_PATH");
    let router!: ReturnType<typeof useRouter>;

    function Component() {
      router = useRouter();

      return null;
    }

    TestRenderer.create(
      <MockRouterProvider push={push}>
        <Component />
      </MockRouterProvider>
    );

    router.push(path, asPath);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(path, asPath);
  });

  it("calls props.replace() when router.replace() was called in the context", () => {
    const replace = jest.fn().mockName("replace()");
    const path: any = Symbol("DUMMY_PATH");
    const asPath: any = Symbol("DUMMY_AS_PATH");
    let router!: ReturnType<typeof useRouter>;

    function Component() {
      router = useRouter();

      return null;
    }

    TestRenderer.create(
      <MockRouterProvider replace={replace}>
        <Component />
      </MockRouterProvider>
    );

    router.replace(path, asPath);

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith(path, asPath);
  });

  it("calls props.prefetch() when router.prefetch() was called in the context", () => {
    const prefetch = jest.fn().mockName("prefetch()");
    const path: any = Symbol("DUMMY_PATH");
    const asPath: any = Symbol("DUMMY_AS_PATH");
    let router!: ReturnType<typeof useRouter>;

    function Component() {
      router = useRouter();

      return null;
    }

    TestRenderer.create(
      <MockRouterProvider prefetch={prefetch}>
        <Component />
      </MockRouterProvider>
    );

    router.prefetch(path, asPath);

    expect(prefetch).toHaveBeenCalledTimes(1);
    expect(prefetch).toHaveBeenCalledWith(path, asPath);
  });

  it("calls props.beforePopState() when router.beforePopState() was called in the context", () => {
    const beforePopState = jest.fn().mockName("beforePopState()");
    const callback = () => false;
    let router!: ReturnType<typeof useRouter>;

    function Component() {
      router = useRouter();

      return null;
    }

    TestRenderer.create(
      <MockRouterProvider beforePopState={beforePopState}>
        <Component />
      </MockRouterProvider>
    );

    router.beforePopState(callback);

    expect(beforePopState).toHaveBeenCalledTimes(1);
    expect(beforePopState).toHaveBeenCalledWith(callback);
  });

  it("calls props.back() when router.back() was called in the context", () => {
    const back = jest.fn().mockName("back()");
    let router!: ReturnType<typeof useRouter>;

    function Component() {
      router = useRouter();

      return null;
    }

    TestRenderer.create(
      <MockRouterProvider back={back}>
        <Component />
      </MockRouterProvider>
    );

    router.back();

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("calls props.reload() when router.reload() was called in the context", () => {
    const reload = jest.fn().mockName("reload()");
    let router!: ReturnType<typeof useRouter>;

    function Component() {
      router = useRouter();

      return null;
    }

    TestRenderer.create(
      <MockRouterProvider reload={reload}>
        <Component />
      </MockRouterProvider>
    );

    router.reload();

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
