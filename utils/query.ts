export const objectToQueryParams = (params: Record<any, any> | undefined): string => {
  if (!params)
    return ''

  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
}