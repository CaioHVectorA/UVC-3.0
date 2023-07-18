import { setCSSVar } from "./setCSSVar";
const colors = {
  main: "#B140A6",
  mainclaro: "#DF5FD3",
  mainescuro: "#8D3184",
  secundario: "#F8BC22",
  light: {
    textMain: "#080808",
    textSecundary: "rgba(0,0,0,.6)",
    textTerciary: "rgba(0,0,0,.35)",
    background: "#e7e7e7",
  },
  dark: {
    textMain: "#e7e7e7",
    textSecundary: "rgba(255,255,255,.6)",
    textTerciary: "rgba(255,255,255,.35)",
    background: "#202020",
  },
};
const keys = {
  textMain: "--color-textmain",
  textSecundary: "--color-textsecundary",
  textTerciary: "--color-textterciary",
  background: "--color-background",
};
export function ChangeTheme() {
  const whiteTheme =
    getComputedStyle(document.documentElement)
      .getPropertyValue(keys.background)
      .trim() === "#e7e7e7";
  // const whiteTheme =
  //   getComputedStyle(document.documentElement)
  //     .getPropertyValue(keys.background)
  //     .trim() === "#e7e7e7";
  if (whiteTheme) {
    setCSSVar(keys.textMain, colors.dark.textMain);
    setCSSVar(keys.textSecundary, colors.dark.textSecundary);
    setCSSVar(keys.textTerciary, colors.dark.textTerciary);
    setCSSVar(keys.background, colors.dark.background);
    window.localStorage.setItem("UVC_USER_THEME", "DARK");
  } else {
    setCSSVar(keys.textMain, colors.light.textMain);
    setCSSVar(keys.textSecundary, colors.light.textSecundary);
    setCSSVar(keys.textTerciary, colors.light.textTerciary);
    setCSSVar(keys.background, colors.light.background);
    window.localStorage.setItem("UVC_USER_THEME", "LIGHT");
  }
}

