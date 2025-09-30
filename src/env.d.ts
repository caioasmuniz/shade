export declare global {
  interface ImportMeta {
    name: string
    version: string
    domain: string
    datadir: string
  }

  declare module "*.css" {
    const content: string
    export default content
  }
}