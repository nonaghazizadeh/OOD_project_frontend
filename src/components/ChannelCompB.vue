<template>
    <div>
        <b-spinner class="channel-loader" v-if="channelLoading" label="Spinning"></b-spinner>

        <div v-else dir="rtl" class="channel-page container-fluid">
            <div class="row">
                <div class="col-1 info">
                    <img src = "../assets/images/avatar.png" class = "rounded-circle avatar" width = "40" height = "40" @click="goProfile()">
                    <div class="position-absolute exit-icon-container" >
                        <router-link class="exit-link" to="/">
                            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="exit-icon" />
                        </router-link>
                    </div> 
                </div>
                <div class="col-2 sidebar no-float">
                    <div class="mt-4 sidebar-top">
                        <span>
                            لیست‌کانال‌ها
                            <router-link to="/add-channel" class="add-channel-icon">
                                <font-awesome-icon icon="fa-solid fa-plus" class="add-icon"/>
                            </router-link>
                        </span>
                    </div>
                    <div class="input-group mb-3  mt-3">
                        <b-input-group class="mt-3">
                        <template #append>
                        <b-input-group-text>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" @click="searchInChannels()"/>
                        </b-input-group-text>
                        </template>
                        <b-form-input v-model="searchedChannelName"></b-form-input>
                        </b-input-group>
                    </div>
                    <div v-if="channelSearchMode" class="list-group mt-3 w-100 channel-list">
                        <div v-for="channel in searchedChannelList" :key="channel.id">
                            <a class="list-group-item list-group-item-action flex-column align-items-start" 
                            :class="{active: activeTag === channel.id }" @click="selectChannel(channel.id, channel)">
                                <div class="d-flex w-100 channel-list-name">
                                    <img src="../assets/images/channelimg.jpeg" class = "rounded-circle" width = "25" height = "25">
                                    <h5 class="mb-1 channel-list-name">{{channel.name}}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div v-else class="list-group mt-3 w-100 channel-list">
                        <div v-for="channel in channels" :key="channel.id" >
                            <a v-if="channel.isJoin" class="list-group-item list-group-item-action flex-column align-items-start" 
                            :class="{active: activeTag === channel.id }" @click="selectChannel(channel.id, channel)">
                                <div class="d-flex w-100 channel-list-name">
                                    <img src="../assets/images/channelimg.jpeg" class = "rounded-circle ml-3" width = "25" height = "25">
                                    <h5 class="mb-1 channel-list-name ">{{channel.name}}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-if="activeTag===null" class="col content no-float"></div>
                <div class="col content no-float" v-else-if="contentLoading">
                    <b-spinner class="channel-loader" label="Spinning"></b-spinner>
                </div>
                <div v-else-if="activeTag!==null && !contentLoading" class="col content no-float">
                    <div class="row top-content">
                        <div class="col-1">
                            <img src="../assets/images/channelimg.jpeg" class = "rounded-circle channel-image" width = "35" height = "35">
                        </div>
                        <div class="col-2 text-right">
                            <h5 class="channel-info">{{ currentChannel.name }}</h5>        
                        </div>
                        <div class="col">
                        </div>
                        <div v-show="!currentChannel.isJoin" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-user-plus" class="channel-info-icon" @click="joinChannel(currentChannel.joinLink)"/>
                        </div>
                        <div v-show="currentChannel.isJoin && isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-user-minus" class="channel-info-icon"/>
                        </div>               
                        <div v-show="!isUser && currentChannel.isJoin" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="channel-info-icon" @click="goToAddContent()"/>
                        </div>
                        <div class="col-1">
                            <router-link :to="{name: 'infochannel', query: {id : currentChannel.id}}" class="info-channel-router">
                                <font-awesome-icon icon="fa-solid fa-circle-info" class="channel-info-icon"/>
                            </router-link>
                        </div>
                    </div>
                    <b-input-group class="mt-3" disabled>
                        <template #append>
                        <b-input-group-text>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" @click="searchInContents()" />
                        </b-input-group-text>
                        </template>
                        <b-form-input v-model="searchContentTitle" disabled></b-form-input>
                    </b-input-group>
                    <div :class="[isUser ? 'row center-content-user':'row center-content']">
                        <div class="col-8">
                            <b-spinner class="channel-loader" v-if="contentLoading" label="Spinning"></b-spinner>
                        </div>
                        <div v-if="contentSearchMode && !contentLoading" class="col-8">
                            <div v-for="item in searchedContentList" :key="item.contentId">
                                <div class="card mt-3">
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <span class="card-title" >
                                                    {{item.title}}
                                            </span>
                                            <span class="edit-icon" v-show="!isUser">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" @click="goToEditContent()"/>
                                            </span>
                                            <span class="trash-icon" v-show="!isUser" @click="removeContent(item.contentId)">
                                                <font-awesome-icon icon="fa-solid fa-trash"/>
                                            </span>
                                        </div>
                                        <p class="card-text">
                                            <a :href="`http://79.127.54.112:5000/${item.fileName}`" target="_blank">
                                            {{ item.description }}
                                            </a>
                                        </p>

                                        <span class="card-link-span">
                                            <a class="card-link">{{ new Date(item.createdAt).toLocaleDateString() }}</a>
                                        </span>
                                        <div>
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-down" 
                                            class="mx-3 dislike-icon fa-disabled"
                                            />
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-up"  
                                            class="like-icon fa-disabled"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>
                        <div v-else-if="!contentSearchMode && !contentLoading" class="col-8">
                            <div v-for="item in contents" :key="item.contentId">
                                <div class="card mt-3">
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <span class="card-title" >
                                                    {{item.title}}
                                            </span>
                                            <span class="edit-icon fa-disabled" v-show="!isUser">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                                            </span>
                                            <span class="trash-icon" v-show="!isUser" @click="removeContent(item.contentId)">
                                                <font-awesome-icon icon="fa-solid fa-trash"/>
                                            </span>
                                        </div>
                                        <p class="card-text">
                                            <span>
                                            {{ item.description }}
                                            </span>
                                            <span  class="card-link-span mr-3">
                                            <a v-show="item.isPremium" class="card-link" @click.prevent="openModal(item.price, item.contentId)">
                                                <font-awesome-icon icon="fa-solid fa-money-check"/>
                                            </a>
                                            </span>
                                            <span class="card-link-show mt-1">
                                                <font-awesome-icon icon="fa-solid fa-ellipsis"/>
                                            </span>
                                        </p> 

                                        <span class="card-link-span">
                                            <a class="card-link">{{ new Date(item.createdAt).toLocaleDateString() }}</a>
                                        </span>
                                        <div>
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-down" 
                                            class="mx-3 dislike-icon fa-disabled"
                                            />
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-up"  
                                            class="like-icon fa-disabled"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal dir="rtl" v-model="modalShow" hide-header-close no-close-on-esc no-close-on-backdrop>
            <template #default>
                <p class="modal-text">
                     برای مشاهده کامل محتوا می‌توانید هزینه آن را پرداخت کنید و یا با رفتن به بخش اطلاعات کانال حق‌عضویت خریداری کنید. آیا می‌خواهید این محتوا را بخرید؟ 
                     (هزینه محتوا {{contentPrice}} تومان است)
                </p>
            </template>

            <template #modal-footer="{cancel}">
                <b-button pill size="sm" variant="outline-secondary" @click="ok()">
                    بله، می‌خواهم.          
                </b-button>
                <b-button pill size="sm" variant="outline-dark" @click="cancel()">
                    خیر، نمی‌خواهم.
                </b-button>
            </template>
        </b-modal> 
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    watch:{
        isJoin(){
            this.isNotJoin = !this.isJoin
        },         
        activeTag(){
        for (let i = 0; i < this.channels.length; i++) {
                if (this.channels[i].id === this.activeTag) {
                    this.channelIndex = i
                    break
                }
            }
        },
        seaerchedChannelName(){
            if (this.searchedChannelName === ''){
                this.channelSearchMode = false
            }
        },
        searchContentTitle(){
            if (this.searchContentTitle === ''){
                this.contentSearchMode = false
            }
        }
    },
    created(){
        this.getChannels()
    },

    data(){
        return {
            channelLoading: false,
            contentLoading: false,
            isJoin: true,
            isNotJoin: false,
            isUser: false,
            accessToAddContent: false,
            modalShow: false,
            addChannelShow: false,
            activeTag: null,
            channelIndex: null,
            searchedChannelName: '',
            searchContentTitle: '',
            searchedChannelList: [],
            searchedContentList: [],
            channelSearchMode: false,
            contentSearchMode: false,
            channels: [],
            allChannels: [],
            contents: [],
            contentPrice: 0,
            contentId: null,
            currentChannel: {
                id: null,
                name: null,
                isJoin: null,
                joinLink: null,
            },
        }
    },
    methods: {
        openModal(price, id) {
            this.modalShow = true
            this.contentPrice = price;
            this.contentId = id;
        },
        cancel() {
            this.modalShow = false
        },
        ok(){
            console.log(this.contentId)
            let api = "http://79.127.54.112:5000/Subscription/BuyContent/" + this.contentId
            Vue.axios.post(api, null, {
                headers: {
                    'X-Auth-Token': localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
                this.modalShow = false
                this.$bvToast.toast(error.response.data.message, {title: 'پیام خطا',autoHideDelay: 5000, appendToast: true})
            })
        },
        selectChannel(id, cchannel){
            this.contentLoading = true
            this.activeTag = id
            this.currentChannel.id = id
            this.currentChannel.name = cchannel.name
            this.currentChannel.joinLink = cchannel.joinLink
            this.currentChannel.isJoin = cchannel.isJoin
            let api = 'http://79.127.54.112:5000/Content/GetContentsMetaData/' + id
            Vue.axios.get(api, {
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
            })
            .then(response => {
                console.log(response)
                this.contents = response.data.message;
                let roleApi = "http://79.127.54.112:5000/Channel/GetRole/" + id
                Vue.axios.get(roleApi, {
                    headers: {
                    'X-Auth-Token': localStorage.getItem('token')
                }
                })
                .then(response => {
                    console.log(response.data.messsage)
                    if (response.data.messsage == "MEMBER"){
                        this.isUser = true
                    }
                    else{
                        this.isUser = false

                    }
                    console.log(this.isUser)
                    this.contentLoading = false
                })
            }) 
            .catch(error => {
                console.log(error)
                this.contentLoading = false
            })
        },
        removeFromChannel(channelId){
            this.isJoin = false
            for (let i = 0; i < this.channels.length; i++) {
                if (this.channels[i].id === channelId) {
                    this.channels[i].isJoin = false
                    this.channels.splice(i, 1)
                    break
                }
            }
            this.activeTag = null 
        },
        removeContent(dataId){
            this.contentLoading = true
            let api = "http://79.127.54.112:5000/Content/RemoveContent/" + dataId
            Vue.axios.delete(api, {
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
            })
            .then(response => {
                console.log(response)
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
        },
        goProfile(){
            this.$router.push({name: 'user'})
        },
        goToAddContent(){
            this.$router.push({name: 'addcontent', query:{edit: false, id: this.channels[this.channelIndex].id, name: this.channels[this.channelIndex].name}})
        },
        goToEditContent(){
            this.$router.push({name: 'addcontent', query:{edit: true}})
        },
        searchInChannels(){
            for (let i = 0; i < this.allChannels.length; i++) {

                if (this.allChannels[i].name === this.searchedChannelName) {
                    this.searchedChannelList.push(this.allChannels[i])   
                }
            }
            this.channelSearchMode = true;
        },
        searchInContents(){
            let currentData = this.channels[this.channelIndex].data
            for (let j = 0; j < currentData.length; j++) {
                
                if (currentData[j].title === this.searchContentTitle) {
                    this.searchedContentList.push(currentData[j])   
                }
            }
            this.contentSearchMode = true;
        },
        getChannels(){
            this.channelLoading = true
            let api = "http://79.127.54.112:5000/Channel/GetJoinedChannels";
            Vue.axios.get(api, {
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
            })
            .then(response => {
                console.log(response)
                this.channels = response.data.message;
                for (let i = 0; i < this.channels.length; i++) {
                    this.channels[i].isJoin = true
                }
                let allChannlesApi = "http://79.127.54.112:5000/Channel/AllChannels";
                Vue.axios.get(allChannlesApi, {
                headers: {
                    'X-Auth-Token': localStorage.getItem('token')
                }
                })
                .then(response => {
                    console.log(response)
                    this.allChannels = response.data.message;
                    for(let i = 0; i < this.allChannels.length; i++){
                        for(let j = 0; j < this.channels.length; j++){
                            if(this.allChannels[i].id === this.channels[j].id){
                                this.allChannels[i].isJoin = true
                            }
                            else{
                                this.allChannels[i].isJoin = false
                            }
                        }
                    }
                    this.channelLoading = false;
                })
                .catch((e) => {
                    console.log(e)
                    this.channelLoading = false
                })
            })
            .catch((e) => {
                console.log(e)
                this.channelLoading = false
            })
        },
        joinChannel(joinLink){
            console.log(joinLink)
            let api = "http://79.127.54.112:5000/Channel/Join/" + joinLink
            this.channelLoading = true
            Vue.axios.post(api, null, {
                headers: {
                    'X-Auth-Token': localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch((e) => {
                console.log(e)
                this.channelLoading = false
            })

        }
    }
}
</script>

<style scoped>
.channel-loader{
  position: fixed;
  z-index: 1031;
  top: 50%;
  left: 50%;
}
.info-channel-router{
    color: black !important;
}
.add-channel-icon{
    color:black !important;
}
.exit-link{
    color: black !important;
}

.fa-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.modal-text{
    text-align: right !important;
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
    height: 100vh;
}
.sidebar{
    height: 100vh;
    overflow-y: scroll;
    background-color: white;
}
.channel-list{
    height: 100vh;
    overflow-y: scroll;
}
.content{
    background-color: rgb(226, 226, 226);
}
.row{
    height: 100%;
}
.card-text a{
    color:black !important;
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
    height: 80px;
    background-color: white;
}
.center-content{
    height: 70%;
}
.center-content-user{
    height: 90%;
}
.bottom-content {
    height: 20%;

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
.channel-info-icon:hover{
    cursor: pointer;
}
.card-link{
    font-size: 13px;
    color: black;
    text-decoration: none;
    text-align: left !important;
    direction: ltr !important;
}
.card-body{
    text-align: right;
}
.card-link-span{
    float: left;
}
.card-link-show, .card-link-show:hover{
    float:left;
    font-size: 10px;
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.card{
    border-radius: 20px;
}
.channel-textarea{
    border-radius: 20px;
}
.send-icon{
    margin-top: 40px;
}
.sidebar-top {
    font-size: 20px;
    text-align: right;
    margin-right: 5px;
    font-weight: bold;
}
.add-icon{
    margin-right: 70px;
}
.add-icon:hover{
    cursor: pointer;
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
.card-title{
    font-size: 22px;
    font-weight: bold;
}
.trash-icon{
    margin-right: 5px;
    cursor: pointer;
}
.channel-list-name{
    text-align: right !important;
}
</style>