<template>
  <div class="container">
    <form @submit.prevent="onCreatePost" id="new-post-form">
      <input type="text" placeholder="Post Title" v-model="title">
      <textarea name="body" placeholder="Content" v-model="content"></textarea>
      <input type="text" placeholder="Main Image" v-model="image">
      <img :src="image" alt="">
      <input type="text" placeholder="Description" v-model="meta.description">
      <input type="text" placeholder="Author" v-model="meta.author">
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      image: '',
      meta: {
        description: '',
        published: new Date().toISOString(),
        author: ''
      }
    }
  },
  methods: {
    onCreatePost() {
      let content = window.editor.getData();
      const postData = {
        title: this.title,
        content: content,
        image: this.image,
        meta: this.meta
      }
      // let content = document.querySelectorAll('.cke_wysiwyg_frame.cke_reset')
      console.log(content, postData)
      this.$store.dispatch('createPost', postData)
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #new-post-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
  }

  input, textarea {
    width: 400px;
    border: 1px solid gray;
    padding: 1em;
  }

  img {
    max-height: 300px;
    max-width: 250px;
  }
</style>
