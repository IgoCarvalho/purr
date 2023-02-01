import { onMounted, onUnmounted, ref } from 'vue';

export function useMediaQuery() {
  const match = ref(false);

  function updateMatch() {
    const media = window.matchMedia('(max-width: 600px)');

    match.value = media.matches;
  }

  onMounted(() => {
    updateMatch();

    window.addEventListener('resize', updateMatch);
  });

  onUnmounted(() => window.removeEventListener('resize', updateMatch));

  return match;
}
