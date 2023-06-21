import { ref } from "vue";
import { useLocalStorage } from "../composables/localStorage.js";

export const { value: bookmarks }= useLocalStorage('bookmarks', []);

export function add({label, url, tags}) {
  // TODO: validate
  bookmarks.value.push({ label, url, tags });
}

export function removeByIndex(index) {
  bookmarks.value.splice(index, 1);
}

export function remove(bookmark) {
  const index = bookmarks.value.indexOf(bookmark);
  removeByIndex(index);
}

export function update(bookmark, newBookmark) {
  const index = bookmarks.value.indexOf(bookmark);
  bookmarks.value.splice(index, 1, newBookmark);
}

export function validate(bookmark) {
  return true;
}