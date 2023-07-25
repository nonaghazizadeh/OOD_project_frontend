<template>
    <div>
        <div dir="rtl" class="channel-page container-fluid">
            <div class="row">
                <div class="col-1 info">
                    <img src = "../assets/images/avatar.png" class = "rounded-circle avatar" width = "40" height = "40" @click="goProfile()">
                    <div class="position-absolute exit-icon-container" >
                        <router-link class="exit-link" to="/">
                            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="exit-icon" />
                        </router-link>
                    </div> 
                </div>
                <div class="col content no-float">
                    <div class="row top-content">
                        <div class="col-1">
                            <img src = "../assets/images/channelimg.jpeg" class = "rounded-circle channel-image" width = "35" height = "35">
                        </div>
                        <div class="col-2 text-right">
                            <h5 class="channel-info">{{channelName}}</h5>        
                        </div>
                        <div class="col">
                        </div>
                        <div class="col-1">
                            <font-awesome-icon v-show="!loading" icon="fa-solid fa-close" class="channel-info-icon" @click="close()"/>
                        </div>
                    </div>
                    <div class="row center-add-content">
                        <div class="col">
                            <div class="row center-add-content px-5 py-3 mt-5">
                                <div class="col-6">
                                    <b-form-input type="text" placeholder="عنوان محتوا" v-model="contentTitle"></b-form-input>
                                </div>
                                <div class="col-6">
                                    <b-form-select v-model="selected" :options="categoryOptions" disabled></b-form-select>
                                </div>
                            </div>
                            <div class="row center-add-content px-5 py-2">
                                <div class="col-6">
                                    <b-form-input type="text" placeholder="توضیحات" v-model="contentDescription"></b-form-input>
                                </div>
                            </div>
                            <div class="row center-2-add-content px-5 py-2">
                                <div class="col-2 py-3">
                                    محتوا به صوت رایگان است؟
                                </div>
                                <div class="col-1 py-3">
                                    <b-form-checkbox
                                    id="checkbox-1"
                                    button-variant="secondary"
                                    v-model="yesStatus"
                                    disabled
                                    class="mx-3"
                                    >
                                        بله
                                    </b-form-checkbox>
                                </div>
                                <div class="col-3 py-3">
                                    <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="noStatus"
                                        disabled
                                        class="mx-3"
                                    >
                                    خیر
                                    </b-form-checkbox>
                                </div>
                                <div class="col-6">
                                    <b-form-input type="number" placeholder="هزینه محتوا" :disabled="yesStatus">
                                    </b-form-input>
                                </div>
                            </div>
                            <div class="row center-2-add-content px-5 py-2">
                                <div class="col-2 py-3">
                                    محتوا از کدام یک است؟
                                </div>
                                <div class="col-1 py-3">
                                    <b-form-checkbox
                                    id="checkbox-3"
                                    v-model="isText"
                                    disabled
                                    class="mx-3"
                                    >
                                        متن
                                    </b-form-checkbox>
                                </div>
                                <div class="col-3 py-3">
                                    <b-form-checkbox
                                        id="checkbox-4"
                                        v-model="isMedia"
                                        disabled
                                        class="mx-3 success"
                                    >
                                        ویدیو، عکس، فایل صوتی
                                    </b-form-checkbox>
                                </div>
                                <div class="col-6">
                                    <b-form-file
                                        class="input-content-file"
                                        v-model="file"
                                        :disabled="editMode || !isMedia"
                                        placeholder="" 
                                        @change="handleFileUpload( $event )"
                                    ></b-form-file>
                                </div>
                            </div>
                            <div class="row cetner-3-add-content px-5">
                                <div class="col-12">
                                    <b-form-textarea
                                        id="textarea-rows"
                                        v-model="contentText"
                                        placeholder="متن خود را وارد کنید"
                                        rows="5"
                                        :disabled="!isText"
                                    ></b-form-textarea>  
                                </div>
                            </div>
                            <div class="row bottom-content">
                                <div class="col-10">

                                </div>
                                <div class="col-2">
                                    <b-button v-show="!editMode" variant="secondary" @click="addContent()">
                                        <b-spinner v-if="loading" label="Spinning"></b-spinner>
                                        <span v-else>
                                            افزودن 
                                        </span>
                                    </b-button>
                                    <b-button v-show="editMode" variant="secondary" @click="editContent()">
                                        تغییر     
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
    created(){

        console.log(this.$router.query.edit)
    },
    watch: {
        yesStatus: function (val) {
            if (val) {
                this.noStatus = false
            }
        },
        noStatus: function (val) {
            if (val) {
                this.yesStatus = false
            }
        },
        isText: function (val) {
            if (val) {
                this.isMedia = false
            }
        },
        isMedia: function (val) {
            if (val) {
                this.isText = false
            }
        }
    },
    data(){
        return {
            yesStatus: true,
            noStatus: false,
            isText: false,
            isMedia: true,
            editMode: (this.$route.query.edit === "true"),
            channelId: this.$route.query.id,
            contentTitle: '',
            contentDescription:'',
            contentText:'',
            file:'',
            channelName:this.$route.query.name,
            isJoin: true,
            isUser: false,
            modalShow: false,
            addChannelShow: false,
            selected: null,
            loading: false,
            categoryOptions: [
            { value: null, text: 'انتخاب دسته‌بندی' },
            { value: 'a', text: 'خبر' },
            { value: 2, text: 'ورزش' },
            { value: 3, text: 'اقتصاد' },
            ]
        }
    },

    methods: {
        goProfile(){
            this.$router.push({name: 'user'})
        },
        addContent(){
            this.loading = true;
            let api= "http://79.127.54.112:5000/Content/Add/" + this.channelId
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('Title', this.contentTitle);
            if (this.isText === true){
                formData.append('Type', 'Text')
            }
            else{
                formData.append('Type', 'Music')
            }
            formData.append('Description', this.contentDescription);
            console.log(formData)
            Vue.axios.post(api, formData,{
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
            })
			.then(response => {
                console.log(response)
                setTimeout(() => {
                    this.loading = false;
                    this.$router.push('/channel')
                }, 2000);

            }).catch((e) => {
                console.log(e)
                this.$bvToast.toast(e, {title: 'پیام خطا',autoHideDelay: 5000, appendToast: true})
                this.loading = false;
            })
        },
        editContent(){
            this.$router.push('/channel')
        },
        close(){
            this.$router.push('/channel')
        },
        handleFileUpload(event){
            this.file = event.target.files[0];
        },
    }

}
</script>

<style scoped>

.input-content-file{
    text-align-last: left !important;
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
    border-bottom: 1px solid black;
}
.center-add-content{
    height: 25%;
}
.center-2-add-content{
    height: 30%;
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

</style>