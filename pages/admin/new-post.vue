<template>
  <PostForm @submit="savePost($event)" />
</template>
<script>
import PostForm from "@/components/admin/PostForm";
export default {
  components: {
    PostForm,
  },
  methods: {
    savePost(post) {
     this.$store.dispatch('addPost', post)
     .then(()=>{
      this.$router.push("/admin");
     })
     
    },
  },
};
</script>
