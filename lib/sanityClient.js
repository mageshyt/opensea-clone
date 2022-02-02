import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'fs4cifh6',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skZj4CsskGC6q8ydSFKfZb6LYkWi11o6ZwvkkHLsg36Ye7Sa6Yn9hOKuJ9fxjMw1yWSkFF9ztEVhRVcKDLirrT1Gt94cVQOccKLB0KpxxQgCOMJTmu9BcwJqlnPbScHBWshOJZZHDjzR5uj3Z72wnP12RBKIZ0OaTtjHggQix7dtkhMAZjEo',
  useCdn: false,
})
