import { ForwardedRef, useEffect, useRef } from 'react'

export function useForwardedRef<T>(ref: ForwardedRef<T>) {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
    return () => {
      typeof ref === 'function' ? ref(null) : (ref.current = null)
    }
  }, [ref, innerRef])

  return innerRef
}
