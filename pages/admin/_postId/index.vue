<template>
  <PostForm 
  @submit='update($event)'
  :is-update="true"
   :post="loadedPost" />
</template>
<script>
import PostForm from "@/components/admin/PostForm";
export default {
  components: {
    PostForm,
  },
  asyncData(context) {
    return context.app.$axios.get(
      "https://products-29fbf-default-rtdb.firebaseio.com/posts/" +
        context.params.postId +
        ".json"
    )
    .then(response=>{

      return{
        loadedPost:response.data
      }
    })
  },
 methods:{
   update(event){
   this.$store.dispatch('updatePost', {...event, id:this.$route.params.postId})
   .then(()=>{
     this.$router.push('/admin')
   })
  }
 }
};
</script>
