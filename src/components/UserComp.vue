<template>
    <div>
        <div dir="rtl" class="channel-page container-fluid">
            <div class="row">
                <div class="col-1 info">
                    <img src = "../assets/images/avatar.png" class = "rounded-circle avatar" width = "40" height = "40">
                    <div class="position-absolute exit-icon-container" >
                        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="exit-icon" @click="exit()" />
                    </div> 
                </div>
                <div class="col content no-float">
                    <div class="row top-content">
                        <div class="col-2 text-right">
                            <h5 class="channel-info">حساب کاربری</h5>        
                        </div>
                        <div class="col">
                        </div>
                        <div class="col-1">
                            <router-link to="/channel" class="close-icon">
                                <font-awesome-icon icon="fa-solid fa-close" class="channel-info-icon close-icon" />
                            </router-link>
                        </div>
                    </div>

                    <div class="delete-user-button mt-5">
                        <b-button v-show="editMode" variant="secondary" @click="deleteUser()">
                            حذف حساب کاربری     
                        </b-button>
                    </div>
                    <div class="row center-add-content">
                        <div class="col">
                            <div class="row center-add-content px-5 py-3 mt-2">
                                <div class="col-6">
                                    <b-form-input type="text" placeholder="نام و نام خانوادگی"></b-form-input>
                                </div>
                                <div class="col-6">
                                    <b-form-file
                                        class=""
                                        v-model="file1"
                                        placeholder="" 
                                    ></b-form-file>
                                </div>
                            </div>
                            <div class="row center-2-add-content px-5 py-2">
                                <div class="col-12">
                                    <b-form-textarea
                                        id="textarea-rows"
                                        placeholder="بیوگرافی خود را وارد کنید"
                                        rows="4"
                                    ></b-form-textarea>  
                                </div>
                            </div>
                            <div class="row cetner-3-add-content px-5">
                                <div class="col-4">
                                    <b-input-group append="تومان">
                                        <b-form-input placeholder=" موجودی کیف پول: ۲۰۰۰۰" disabled>
                                        </b-form-input>
                                    </b-input-group>
                                </div>
                                <div class="col-2">
                                    <b-button variant="secondary">
                                        <b-spinner v-if="loading" label="Spinning"></b-spinner>
                                        <span v-else>
                                            شارژ کیف پول   
                                        </span>   
                                    </b-button>
                                </div>
                                <div class="col-3">
                                        <b-form-input type="number" placeholder="مبلغ برداشتی" v-model="walletMoney"></b-form-input>
                                    </div>
                                <div class="col-2">
                                    <b-button variant="secondary" @click="withDraw()">
                                        <b-spinner v-if="loading" label="Spinning"></b-spinner>
                                        <span v-else>
                                            برداشت کیف پول   
                                        </span>
                                    </b-button>
                                </div>
                            </div>
                            <div class="row bottom-content">
                                <div class="col-10">
                                </div>
                                <div class="col-2">
                                    <b-button v-show="editMode" variant="secondary" @click="updateUser()">
                                        <b-spinner v-if="loading" label="Spinning"></b-spinner>
                                        <span v-else>
                                            ذخیره   
                                        </span>  
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
    data(){
        return {
            loading: false,
            editMode: true,
            isJoin: true,
            isUser: false,
            modalShow: false,
            addChannelShow: false,
            walletMoney: '',
            categoryOptions: [
            { value: 1, text: 'خبر' },
            { value: 2, text: 'ورزش' },
            { value: 3, text: 'اقتصاد' },
            ]
        }
    },
    methods: {
        deleteUser(){
            this.$router.push('/')
        },
        updateUser(){
            this.$router.push('/channel')
        },
        exit(){
            
            this.$router.push('/')
        },
        withDraw(){
            this.loading = true;
            let api = "http://79.127.54.112:5000/Wallet/Withdraw/"+ this.walletMoney;
            const data = null;
            Vue.axios.put(api, data,{
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
            })
			.then(response => {
                console.log(response)
                this.$bvToast.toast(response.data.message, {title: 'پیام',autoHideDelay: 5000, appendToast: true})
                this.walletMoney = ''
                this.loading = false;
            }).catch((e) => {
                console.log(e)
                this.$bvToast.toast(e, {title: 'پیام خطا',autoHideDelay: 5000, appendToast: true})
                this.walletMoney = ''
                this.loading = false;
            })

        }
    }

}
</script>

<style scoped>
.input-content-file{
    margin-right: 50px !important;
}
.exit-icon-container{
    bottom:0;
}
.exit-icon{
    margin-right: 35px;
}
.avatar {
    margin-top: 20px;
}
.channel-page{
    height: 100vh;
}
.info{
    background-color: rgb(226, 226, 226);
}
.sidebar{
    background-color: white;
}
.content{
    background-color: white;
}
.row{
    height: 100%;
}
.search-icon {
    padding: 0.8rem 0.75rem !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;

}
.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
}
.channel-list{
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
}
.list-group-item.active {
    background-color: rgb(226, 226, 226);
    border-color: rgb(226, 226, 226);
    color: black;
}
.top-content{
    height: 10%;
    background-color: white;
}
.center-add-content{
    height: 30%;
}
.center-2-add-content{
    height: 55%;
}
.cetner-3-add-content{
    height: 35%;
}
.bottom-content {
    height: 10%;

}
.channel-image{
    margin-top: 20px;
}
.channel-info {
    margin-top: 25px;
}
.channel-info-icon {
    margin-top: 25px;
}
.sidebar-top {
    font-size: 20px;
    text-align: right;
    margin-right: 5px;
    font-weight: bold;
}
.add-icon{
    margin-right: 110px;
}
.input-group-text{
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
}
.like-icon{
    padding-bottom:0.09rem;
}
.user-title{
    font-weight: bold;
    font-size: 25px;
}
.delete-user-button{
    margin-left: 70px;
    text-align: left;
}
</style>