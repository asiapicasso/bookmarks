import { ref, watch } from "vue";

function saveInStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function  useLocalStorage(key, defaultValue = null) {
  let data = localStorage.getItem(key);

  // if the key does not exist, create it with the default value
  if (data === null) {
    data = defaultValue;
    saveInStorage(key, data);
  } else {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.warn("Value in localStorage is not valid JSON, falling back to default value");
      data = defaultValue;
      saveInStorage(key, data);
    }
  }

  const value = ref(data);

  watch(value, () => saveInStorage(key, value.value), { deep: true });

  return {value};
}