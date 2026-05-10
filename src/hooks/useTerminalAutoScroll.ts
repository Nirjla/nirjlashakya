import { useEffect, useRef } from 'react'

/**
 * Hook for managing terminal auto-scroll to latest message
 * @param dependencies - Array of dependencies to trigger scroll
 * @param ref - Reference to the scrollable container
 */
export function useTerminalAutoScroll(
  dependencies: any[] = [],
  ref?: React.RefObject<HTMLDivElement>
) {
  const lastScrollHeightRef = useRef<number>(0)

  useEffect(() => {
    if (!ref?.current) return

    // Use requestAnimationFrame for smooth scrolling
    const scrollToBottom = () => {
      if (ref.current) {
        const element = ref.current
        // Check if we're already near the bottom (within 100px)
        const isNearBottom =
          element.scrollHeight - element.clientHeight - element.scrollTop < 100

        if (isNearBottom || element.scrollHeight > lastScrollHeightRef.current) {
          // Queue scroll for next frame
          requestAnimationFrame(() => {
            if (ref.current) {
              ref.current.scrollTop = ref.current.scrollHeight
              lastScrollHeightRef.current = ref.current.scrollHeight
            }
          })
        }
      }
    }

    scrollToBottom()
  }, dependencies)

  return ref
}
