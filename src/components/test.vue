<template>
  <div>
    <b-spinner v-if="loading">

    </b-spinner>
    <video v-else ref="videoPlayer" controls>
      <source :src="videoSource" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      videoSource: '',
      loading: false,
    };
  },
  mounted() {
    this.fetchVideo();
  },
  methods: {
    fetchVideo() {
        this.loading = true;

        Vue.axios.get("http://79.127.54.112:5000/Content/ShowContent/2", {
            headers: {
                'X-Auth-Token': "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMDg5MWIyYi03YjlhLTQ3NjAtYjE1YS05OGJjYjA1MmRhMTAiLCJ1aWQiOiIyIiwiZXhwIjoxNjkxMzM0MTI1fQ.UEMRijdVNbcl3MdlX5n8262Ko9e-Hf_8GNk8KENF0gY"
            }
            })
            .then(response => {
                console.log(response)
                this.videoSource = response.request.responseURL
                this.loading= false
            })
            .catch((e) => {
                console.log(e);
                this.loading = false;
            })
    },
  },
};
</script>


<style>

</style>