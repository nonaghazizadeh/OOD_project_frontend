<template>
    <div dir="rtl" class="signup-page">
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">ورود</h2>
                        <form class="register-form" id="register-form">
                            <b-input-group class="mt-3">
                                <template #prepend>
                                    <b-input-group-text>
                                        <font-awesome-icon icon="fa-solid fa-envelope"/>
                                    </b-input-group-text>
                                </template>
                                <b-form-input  placeholder="ایمیل" v-model="email"></b-form-input>
                            </b-input-group>
                            <b-input-group class="mt-3">
                                <template #prepend>
                                    <b-input-group-text>
                                        <font-awesome-icon icon="fa-solid fa-phone"/>
                                    </b-input-group-text>
                                </template>
                                <b-form-input placeholder="تلفن همراه" v-model="phone"></b-form-input>
                            </b-input-group>
                            <b-input-group class="mt-3">
                                <template #prepend>
                                    <b-input-group-text>
                                        <font-awesome-icon icon="fa-solid fa-lock"/>
                                    </b-input-group-text>
                                </template>
                                <b-form-input type="password" placeholder="رمزعبور" v-model="password"></b-form-input>
                            </b-input-group>
                            <div class="form-group form-button mt-5">
                                <b-button variant="secondary" @click="signin()">
                                    <b-spinner v-if="loading" label="Spinning"></b-spinner>
                                    <span v-else>
                                    ورود     
                                    </span>
                                </b-button>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="../../images/signup-image.jpg" alt="sign up image"></figure>
                        <router-link class="signup-image-link" to="/">ساخت حساب کاربری</router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import {BVToastPlugin } from "bootstrap-vue";
Vue.use(BVToastPlugin);


export default {
	data(){
		return{
			email: "",
			phone: "",
			password: "",
			loading: false,
		}
	},
	methods:{
		signin(){
			this.loading = true;
			let api = "http://79.127.54.112:5000/User/SignIn";
			if (this.email == ""){
				const data = {
					PhoneNumber: this.phone,
					Password: this.password,
				}
				Vue.axios.post(api, data)
				.then(response => {
					localStorage.removeItem('token');
					localStorage.setItem('token', response.data.message)
					this.phone = ''
					this.password = ''
					this.loading = false;
					this.$router.push('/channel')
				}).catch((e) => {
					console.log(e.response.data.message)
					this.$bvToast.toast(e.response.data.message, {title: 'پیام خطا',autoHideDelay: 5000, appendToast: true})
					this.phone = ''
					this.password = ''
					this.loading = false;
				})
			}
			else if(this.phone == "" || (this.phone != "" && this.email != "")){
				const data = {
					Email: this.email,
					Password: this.password,
				}
				Vue.axios.post(api, data)
				.then(response => {
					localStorage.removeItem('token');
					localStorage.setItem('token', response.data.message)
					this.email = ''
					this.password = ''
					this.loading = false;
					this.$router.push('/channel')
				}).catch((e) => {
					this.$bvToast.toast(e.response.data.message, {title: 'پیام خطا',autoHideDelay: 5000, appendToast: true})
					this.email = ''
					this.password = ''
					this.loading = false;
				})
			}
		}
	}
}
</script>

<style scoped>
.login-button,
.login-button:hover {
	color: white !important;
}

.signup-page {
	padding-top: 80px;
}

.signup-content {
	display: flex;
	display: -webkit-flex;
}

a {
	color: black !important;
}

a:hover {
	color: black !important;
	text-decoration: none !important;
}

img {
	max-width: 100%;
	height: auto;
}

figure {
	margin: 0;
}

p {
	margin-bottom: 0px;
	font-size: 15px;
	color: #777;
}

h2 {
	line-height: 1.66;
	margin: 0;
	padding: 0;
	font-weight: bold;
	color: #222;
	font-family: Poppins;
	font-size: 36px;
}

body {
	font-size: 13px;
	line-height: 1.8;
	color: #222;
	background: #f8f8f8;
	font-weight: 400;
	font-family: Poppins;
}

.container {
	width: 900px;
	background: #fff;
	margin: 0 auto;
	box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
	-moz-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
	-webkit-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
	-o-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
	-ms-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
	border-radius: 20px;
	-moz-border-radius: 20px;
	-webkit-border-radius: 20px;
	-o-border-radius: 20px;
	-ms-border-radius: 20px;
}

.input-group-text {
	border-top-left-radius: 0px !important;
	border-top-right-radius: 5px !important;
	border-bottom-right-radius: 5px !important;
	border-bottom-left-radius: 0px !important;
}

.form-control {
	border-top-left-radius: 5px !important;
	border-top-right-radius: 0px !important;
	border-bottom-right-radius: 0px !important;
	border-bottom-left-radius: 5px !important;

}

.signup {
	margin-bottom: 150px;
}

.signup-content {
	padding: 75px 0;
}

.signup-image {
	margin: 0 55px;
}

.form-title {
	margin-bottom: 33px;
}

.signup-image {
	margin-top: 45px;
}

figure {
	margin-bottom: 50px;
	text-align: center;
}

#signin {
	margin-top: 16px;
}

.signup-image-link {
	font-size: 14px;
	color: #222;
	display: block;
	text-align: center;
}


.signup-form {
	margin-left: 75px;
	margin-right: 75px;
	padding-left: 34px;
}

.register-form {
	width: 100%;
}

.form-group {
	position: relative;
	margin-bottom: 25px;
	overflow: hidden;
}

.form-group:last-child {
	margin-bottom: 0px;
}
</style>
  