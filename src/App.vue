<script setup>
  import TheHeader from './components/TheHeader.vue';
  import BookmarkEntry from './components/BookmarkEntry.vue';
  import BookmarkForm from './components/BookmarkForm.vue';
   import { bookmarks } from './stores/bookmarks.js';
   import { computed, ref } from 'vue';
  const showForm = ref(false);
  // console.log(bookmarks.value);
  // addBookmark({
  //   url: 'https://vuejs.org/',
  //   tags: 'javascript framework',
  //   label: 'Vue.js',
  // });
  // const entry2 = {
  //   label: 'Ex',
  //   url: 'https://example.com/',
  //   tags: 'example',
  // };
  // addBookmark(entry2);
  // console.log(JSON.stringify(bookmarks.value));
  // remove(entry2);
  // console.log(bookmarks.value);
  const filterBy = ref('');
  const filteredBookmarks = computed(() => bookmarks.value.filter(bookmark => {
      return bookmark.tags.toLowerCase().includes(filterBy.value.toLowerCase());
  }));
  const orderedBookmarks = computed(() => filteredBookmarks.value.sort((a, b) => {
    return a.label.localeCompare(b.label);
  }));
</script>

<template>
  <the-header>Bookmarks</the-header>
  <div>
    <label>Filter by: </label>
    <input type="text" v-model="filterBy" autofocus/>
  </div>
  <button @click="showForm = true">Add</button>
  <bookmark-form
    v-if="showForm"
    @close="showForm = false"
  />
  <bookmark-entry
    v-for="bookmark of orderedBookmarks"
    :bookmark="bookmark"
  />


</template>