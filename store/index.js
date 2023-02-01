import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      fetchedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.fetchedPosts = posts;
        console.log(posts)
      },
      addPost(state, post) {
        state.fetchedPosts.push(post);
      },
      updatePost(state, editedPost) {
        // console.log(post)
      let post_item=  state.fetchedPosts.findIndex(item=>item.id==editedPost.id)
    if(post_item){
      state.fetchedPosts[post_item]=editedPost
    }
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        if (!process.client) {
          console.log("Server uzerinde calisiriq");
        }
        return this.$axios
          .get("https://products-29fbf-default-rtdb.firebaseio.com/posts.json")
          .then((response) => {
            console.log(response.data)
            let data = response.data;
            let postArray = [];
            for (let key in data) {
              postArray.push({ id: key, ...data[key] });
            }
            vuexContext.commit("setPosts", postArray);
          });
      },
      // setPosts(vuexContext, posts) {
      //   vuexContext.commit("setPosts", posts);
      // },
      addPost(vuexContext, post) {
        return this.$axios
          .post(
            "https://products-29fbf-default-rtdb.firebaseio.com/posts.json",
            post
          )
          .then((response) => {
            vuexContext.commit("addPost", { ...post, id: response.data.name });
          });
      },
      updatePost(vuexContext, editedPost) {
        return this.$axios
          .put(
            "https://products-29fbf-default-rtdb.firebaseio.com/posts/" +
              editedPost.id +
              ".json",
            editedPost
          )
          .then((response) => {
            vuexContext.commit("updatePost", editedPost);
          });
      },
    },
    getters: {
      getPosts(state) {
        return state.fetchedPosts;
      },
    },
  });
};

export default createStore;
