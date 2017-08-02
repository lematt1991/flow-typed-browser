
export type GHResponse = {
  type: "file" | "dir",
  encoding: ?string,
  size: number,
  name: string,
  path: string,
  content: ?string,
  sha: string,
  url: string,
  git_url: string,
  html_url: string,
  download_url: string,
  _links: {
    git: string,
    self: string,
    html: string
  }
}