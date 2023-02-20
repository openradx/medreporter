import { Options as PrettierOptions } from "prettier"

declare module "prettier" {
  interface Options extends PrettierOptions {
    xmlWhitespaceSensitivity: "strict" | "preserve" | "ignore"
  }
}
