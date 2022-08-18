export const createSlug = ( artist: string, name: string, id: string) => {
  const slug = `${
    artist
      .trim()
      .toLowerCase()
      .replace(/\./g, '') // . for empty string
      .replace(/\s+/g, '') // space for empty string
      .replace(/[\])}[{(]/g, '') // parentheses, brackets and braces for empty string
  }-${name
    .trim()
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, '-') // space for -
    .replace(/[\])}[{(]/g, '')
  }-${id}`

  return slug
}
