import { isRef, ref, unref, watch } from 'vue';

export function useFetchJson(url) {

  const data = ref(null);

  async function fetchJson(url) {
    const response = await fetch(unref(url),  {
      credentials: 'include'
    });
    const json = await response.json();
    // TODO manage errors
    data.value = json;
  }

  fetchJson(url);
  if (isRef(url)) watch(url, () => fetchJson(url));

  return {data};
}