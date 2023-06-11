import {
  ComponentType,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

type ComponentWith3DHoverProps<T = unknown> = PropsWithChildren<T>

/**
 * HOC to wrap components with a 3d hover
 */
export function with3DHover<T>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWith3DHover = forwardRef<HTMLElement, T & ComponentWith3DHoverProps>((props, ref) => {
    const innerRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => innerRef.current!)

    useEffect(() => {
      let onMouseMove: EventListener = () => null
      let onMouseOut: EventListener = () => null

      const el = innerRef?.current
      if (el) {
        const { clientHeight: height, clientWidth: width } = el
        let transform: string
        onMouseMove = (evt) => {
          const { layerX, layerY } = evt as any
          if (layerX === undefined || layerY === undefined) return
          const yRotation = ((layerX - width / 2) / width) * 20
          const xRotation = ((layerY - height / 2) / height) * 20
          transform = el.style.transform
          el.style.transition = 'all 0.05s'
          el.style.transform = `
            perspective(500px)
            scale(1.1)
            rotateX(${xRotation}deg)
            rotateY(${yRotation}deg)
          `
        }
        onMouseOut = () => {
          if (transform) {
            el.style.transition = 'all 1s'
            el.style.transform = `
            perspective(500px)
            scale(1)
            rotateX(0deg)
            rotateY(0deg)
          `
            transform = ''
          }
        }

        el.addEventListener('mousemove', onMouseMove)
        el.addEventListener('mouseout', onMouseOut)
      }
      return () => {
        if (el) {
          el.removeEventListener('mousemove', onMouseMove)
          el.removeEventListener('mouseout', onMouseOut)
        }
      }
    }, [])

    return (
      <div ref={innerRef}>
        <WrappedComponent {...props} />
      </div>
    )
  })
  return ComponentWith3DHover
}
