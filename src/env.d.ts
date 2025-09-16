export declare global {
  interface ImportMeta {
    version: string
    domain: string
    datadir: string
    pkgdatadir: string
    esbuild: string
  }

  declare module "*.css" {
    const content: string
    export default content
  }
}