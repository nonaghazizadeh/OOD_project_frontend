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
        const headers = {
          'X-Auth-Token': "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzOTQwNzRjMS1kZDgwLTRjOTctOTNhMy1kNTQzNWRiNWE4ZDYiLCJ1aWQiOiIzIiwiZXhwIjoxNjkxMzQ3ODE1fQ.j6ExXo9T3GpWpp0Q4AJ5HKjLKHVJRZGazJFwmOuLUgw",
        }
        Vue.axios.get("http://79.127.54.112:5000/Content/ShowContent/2",{
            headers: headers,
            data: null
            })
            .then(response => {
                this.videoSource = response.data
                // const blob = new Blob([response.data], { type: 'audio/mpeg' });
                // const url = URL.createObjectURL(blob);
                // console.log(url);
                // this.videoSource = response.request.responseURL
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