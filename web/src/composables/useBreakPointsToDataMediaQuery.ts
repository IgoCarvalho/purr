import { onMounted, onUnmounted, readonly, ref } from 'vue';

const SIZES = {
  '2xl': '1536px',
  xl: '1280px',
  lg: '1024px',
  md: '768px',
  sm: '640px',
};

type BreakPointsData<T> = Partial<Record<keyof typeof SIZES, T>>;

export function useBreakPointsToDataMediaQuery<T>(
  breakPoints: BreakPointsData<T>,
  defaultValue: T
) {
  const matchData = ref<T>();
  let oldValue: T | undefined;

  function checkMatchMedia() {
    let hasMatched = false;

    let sizeIterator: keyof typeof SIZES;
    for (sizeIterator in SIZES) {
      if (sizeIterator in breakPoints) {
        const media = window.matchMedia(`(min-width: ${SIZES[sizeIterator]})`);

        if (media.matches) {
          hasMatched = true;

          if (oldValue === breakPoints[sizeIterator]) {
            break;
          }

          matchData.value = breakPoints[sizeIterator];
          oldValue = breakPoints[sizeIterator];
          break;
        }
      }
    }

    if (!hasMatched) {
      matchData.value = defaultValue;
      oldValue = defaultValue;
    }
  }

  checkMatchMedia();

  onMounted(() => {
    window.addEventListener('resize', checkMatchMedia);
  });

  onUnmounted(() => window.removeEventListener('resize', checkMatchMedia));

  return readonly(matchData);
}
