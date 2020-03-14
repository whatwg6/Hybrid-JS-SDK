function handleCallBack() {
  setTimeout(() =>
    global.webApp
      .dispatch("base/networkChange", {
        currentNetwork: "4G"
      })
      .then(console.log)
  );

  setTimeout(
    () =>
      global.webApp
        .dispatch("base/networkChange", "3G")
        .then(console.log),
    2 * 1000
  );
}

export default handleCallBack;
