import { useRouter } from 'next/router'
import React from 'react'

const Collection = () => {
  const router = useRouter() // ! it has access to query id
  console.log(router.query)
  return <div>{/* <h1>{router.query}</h1> */}</div>
}

export default Collection
