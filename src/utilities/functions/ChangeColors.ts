import { setCSSVar } from "./setCSSVar";
export type IColors = {
  identifier: string;
  colors: string[];
};
export const Colors = [
  { identifier: "GUARDIÕES", colors: ["#B140A6", "#912987", "#da4ecc"] },
  { identifier: "CIECON", colors: ["#149ecc", "#237c99", "#5accf2"] },
  { identifier: "RRH", colors: ["#a60711", "#7d0b12", "#e6000e"] },
  { identifier: "MR", colors: ["#702b00", "#4d1d00", "#853c10"] },
  { identifier: "LICH", colors: ["#6e125e", "#5c054d", "#911f7e"] },
  { identifier: "NETUNO", colors: ["#260073", "#1f0259", "#371085"] },
];
export function ChangeColor(identifier: string) {
  const keys = {
    colorMain: "--color-main",
    colorMainclaro: "--color-mainclaro",
    colorMainescuro: "--color-mainescuro",
    colorSecundario: "--color-secundario",
  };
  //   @ts-ignore
  const ColorFound: IColors = Colors.find(
    (color) => color.identifier === identifier
  );
  console.log(ColorFound);
  setCSSVar(keys.colorMain, ColorFound.colors[0]);
  setCSSVar(keys.colorMainescuro, ColorFound.colors[1]);
  setCSSVar(keys.colorMainclaro, ColorFound.colors[2]);
}

export function findColor(identifier: string) {
  const colorFound = Colors.find(
    (color) => color.identifier === identifier
  )
  if (!colorFound) throw new Error('DEU MERDA NA COR')
  return colorFound.colors
}
