<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { add as addBookmark, update as updateBookmark } from '../stores/bookmarks.js';
  const emits = defineEmits(['close']);
  const props = defineProps({
    bookmark: {
      type: Object,
      required: false,
      default: () => ({
        label: '',
        url: '',
        tags: '',
      }),
    },
    mode: {
      type: String,
      required: false,
      default: 'add',
      validator: (value) => ['add', 'edit'].includes(value),
    }
  });
  const elLabel = ref(null);
  const label = ref(props.bookmark.label);
  const url = ref(props.bookmark.url);
  const tags = ref(props.bookmark.tags);
  function submit () {
    if (props.mode == 'edit') {
      updateBookmark(props.bookmark, {
        label: label.value,
        url: url.value,
        tags: tags.value,
      });
    } else {
      addBookmark({
        label: label.value,
        url: url.value,
        tags: tags.value,
      });
    }
    emits('close');
  }
  function cancel () {
    emits('close');
  }
  onMounted(() => {
    elLabel.value.focus();
  });
  // onUnmounted(() => {
  // });
</script>

<template>
  <!-- .prevent permet de NE PAS faire le comportement par défaut du browser-->
  <form @submit.prevent="submit()">
    <fieldset>
      <legend v-if="mode == 'add'">Add a bookmark</legend>
      <legend v-if="mode == 'edit'">Edit a bookmark</legend>
      <label>Label: </label>
      <input
        type="text"
        placeholder="label"
        v-model="label"
        ref="elLabel"
        required
      />
      <label>Url: </label>
      <input
        type="url"
        placeholder="url"
        v-model="url"
        required
      />
      <label>Tags: </label>
      <input
        type="text"
        placeholder="tags"
        v-model="tags"
        required
      />
      <button v-if="mode == 'add'">Add</button>
      <button v-if="mode == 'edit'">Save</button>
      <button @click.prevent="cancel()">Cancel</button>
    </fieldset>
  </form>
</template>

<style scoped>
  * {
    display: block;
  }
  fieldset > * {
    margin: 0.2rem auto;
  }
  button {
    margin: 1rem 1rem 0 0;
    display: inline-block;
    min-width: 33%;
  }
  form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.5);
    padding: 10px;
    /* center child */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  fieldset {
    background-color: #fff;
    border: 1px solid black;
    padding: .5rem;
    border-radius: .5rem;
  }
  legend {
    font-weight: bold;
    background-color: #ccc;
    border: 1px solid black;
    padding: .2rem .5rem;
    border-radius: .5rem;
  }
</style>