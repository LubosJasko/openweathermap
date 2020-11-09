import {Router} from 'next/router'
import {some, none, Option, isNone} from 'fp-ts/Option'
import {useRouter} from 'next/router'
import {useEffect} from 'react'


interface GenericDetailRouterQuery {
    id: string
}

function isGenericDetailRouterQuery(x: unknown): x is GenericDetailRouterQuery {
  if (typeof x !== 'object') {
    return false
  }

  return (x as GenericDetailRouterQuery).id !== undefined
}

export const parseGenericDetailRouterQuery = (query: Router['query']): Option<string> => {
  if (isGenericDetailRouterQuery(query)) {
    return some(query.id)
  }

  return none
}

export const useRequiredRouterQueryVariables = (
    parsedQueryVariables: Option<unknown>,
    successCallback?: () => void,
): void => {
  const router = useRouter()
  useEffect(() => {
    if (isNone(parsedQueryVariables)) {
      router.back()
      console.error('Missing required router query parameters', {pathname: router.pathname, query: router.query})
    } else {
      successCallback?.()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
