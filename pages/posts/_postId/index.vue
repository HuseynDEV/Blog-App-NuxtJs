<template>
  <div>
    <PostDetail :post="fetchedPost" />
  </div>
</template>
<script>
import PostDetail from "@/components/post/PostDetail";

export default {
  components: {
    PostDetail,
  },

  async asyncData(context) {
    return await context.app.$axios
      .$get(
        "https://products-29fbf-default-rtdb.firebaseio.com/posts/" +
          context.params.postId +
          ".json"
      )
      .then((response) => {
        return {
          fetchedPost: response,
        };
      });
  },
};
</script>
