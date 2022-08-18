export const createSlug = ( artist: string, name: string) => {
  const slug = `${
    artist
      .trim()
      .toLowerCase()
      .replace(/\./g, '') // . for empty string
      .replace(/\s+/g, '-') // space for -
      .replace(/[\])}[{(]/g, '') // parentheses, brackets and braces for empty string
  }-${name
    .trim()
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[\])}[{(]/g, '')}`

  return slug
}
