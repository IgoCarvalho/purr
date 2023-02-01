import { onMounted, onUnmounted, type Ref } from 'vue';

export function useInfinityScroll(
  callback: () => void,
  containerRef: Ref<HTMLElement | null>,
  bottomPad: number = 400
) {
  function handleScroll() {
    if (containerRef.value) {
      const { clientHeight: viewportHeight } = document.documentElement;
      const containerEndPosition =
        containerRef.value?.getBoundingClientRect().bottom;
      const viewportOffset = bottomPad;

      if (viewportHeight + viewportOffset - containerEndPosition > 0) {
        callback();
      }
    }
  }

  handleScroll();

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
}
