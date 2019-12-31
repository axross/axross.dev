document.addEventListener("DOMContentLoaded", async () => {
  const [
    React,
    ReactDOM,
    { BrowserRouter },
    { default: App }
  ] = await Promise.all<any, any, any, any>([
    import("react"),
    import("react-dom"),
    import("react-router-dom"),
    import("./App")
  ]);

  ReactDOM.render(
    React.createElement(BrowserRouter, {}, React.createElement(App, {})),
    document.getElementById("app")
  );
});
