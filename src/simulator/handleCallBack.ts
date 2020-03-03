function handleCallBack() {
  setTimeout(() =>
    global.webApp.dispatch("base/networkChange", {
      currentNetwork: "4G"
    })
  );

  setTimeout(
    () =>
      global.webApp.dispatch("base/networkChange", {
        currentNetwork: "3G"
      }),
    2 * 1000
  );
}

export default handleCallBack;
