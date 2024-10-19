import { kartuliAlphabet } from "@/consts/kartuliAlphabet";

export const isKartuliString = (str: string) => kartuliAlphabet.split("").some((v) => str.includes(v));
