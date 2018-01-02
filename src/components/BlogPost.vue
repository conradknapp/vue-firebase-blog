<template>
  <transition name="post">
    <article v-if="post && !loading" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ loadedPost.title }}</h2>
        <h3 class="post__meta">by <router-link class="post__author"
          :to="`/by/${kebabify(loadedPost.meta.author)}`">{{ loadedPost.meta.author }}</router-link>
          <span class="post__sep"></span>
          <time>{{ prettyDate(loadedPost.meta.published) }}</time>
        </h3>

        <blockquote class="post__subtitle">{{ loadedPost.meta.description }}</blockquote>
      </header>

      <section class="post__body rte" v-html="loadedPost.content"></section>

      <footer class="post__footer">
        <!-- <vue-disqus v-if="commentsReady" shortname="vue-blog-demo"
          :key="post" :identifier="post" :url="`https://vue-blog-demo.netlify.com/read/${post}`"/> -->
      </footer>
    </article>
  </transition>
</template>

<script>
import { kebabify, prettyDate } from '../helpers'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  props: ['post'],

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      commentsReady: false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    loadedPost() {
      return this.$store.getters.loadedPost(this.post)
    }
  },
  // watch: {
  //   post(to, from) {
  //     if (to === from || !this.post) return;

  //     this.commentsReady = false
  //     this.$getResource('post', to)
  //   }
  // },

  methods: {
    kebabify,
    prettyDate
    // showComments() {
    //   setTimeout(() => {
    //     this.commentsReady = true
    //   }, 1000)
    // }
  },

  beforeMount() {
    // if (!this.post) return;
    // this.$getResource('post', this.post)
    //   .then(this.showComments)
  }
}
</script>