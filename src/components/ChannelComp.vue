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
                <div class="col-2 sidebar no-float">
                    <div class="mt-4 sidebar-top">
                        <span>
                            لیست‌کانال‌ها
                        </span>
                        <span class="mr-1 pr-2">
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
                            :class="{active: activeTag === channel.id }" @click="selectChannel(channel.id)">
                                <div class="d-flex w-100 justify-content-between">
                                    <img :src="channel.image" class = "rounded-circle" width = "25" height = "25">
                                    <h5 class="mb-1 ">{{channel.name}}</h5>
                                    <small>{{channel.date}}</small>
                                </div>
                                <small>
                                    {{channel.description}}
                                </small>
                            </a>
                        </div>
                    </div>
                    <div v-else class="list-group mt-3 w-100 channel-list">
                        <div v-for="channel in channels" :key="channel.id">
                            <a v-if="channel.isJoin" class="list-group-item list-group-item-action flex-column align-items-start" 
                            :class="{active: activeTag === channel.id }" @click="selectChannel(channel.id)">
                                <div class="d-flex w-100 justify-content-between">
                                    <img :src="channel.image" class = "rounded-circle" width = "25" height = "25">
                                    <h5 class="mb-1 ">{{channel.name}}</h5>
                                    <small>{{channel.date}}</small>
                                </div>
                                <small>
                                    {{channel.description}}
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-if="activeTag===null" class="col content no-float"></div>
                <div v-else-if="activeTag!==null" class="col content no-float">
                    <div class="row top-content">
                        <div class="col-1">
                            <img :src="channels[channelIndex].image" class = "rounded-circle channel-image" width = "35" height = "35">
                        </div>
                        <div class="col-2 text-right">
                            <h5 class="channel-info">{{ channels[channelIndex].name }}</h5>        
                        </div>
                        <div class="col">
                        </div>
                        <div v-show="!channels[channelIndex].isJoin && isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-user-plus" class="channel-info-icon"/>
                        </div>
                        <div v-show="channels[channelIndex].isJoin && isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-user-minus" class="channel-info-icon" @click="removeFromChannel(channels[channelIndex].id)"/>
                        </div>
                        <div v-show="!isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="channel-info-icon" @click="goToAddContent()"/>
                        </div>
                        <div class="col-1">
                            <router-link :to="{name: 'infochannel', query: {id : channels[channelIndex].id}}" class="info-channel-router">
                                <font-awesome-icon icon="fa-solid fa-circle-info" class="channel-info-icon"/>
                            </router-link>
                        </div>
                    </div>
                    <b-input-group class="mt-3">
                        <template #append>
                        <b-input-group-text>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" @click="searchInContents()" />
                        </b-input-group-text>
                        </template>
                        <b-form-input v-model="searchContentTitle"></b-form-input>
                    </b-input-group>
                    <div :class="[isUser ? 'row center-content-user':'row center-content']">
                        <div v-if="contentSearchMode" class="col-8">
                            <div v-for="item in searchedContentList" :key="item.id">
                                <div class="card mt-3">
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <span class="card-title" >
                                                    {{item.title}}
                                            </span>
                                            <span class="edit-icon" v-show="!isUser">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" @click="goToEditContent()"/>
                                            </span>
                                            <span class="trash-icon" v-show="!isUser" @click="removeContent(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-trash"/>
                                            </span>
                                        </div>
                                        <p v-if="isUser" class="card-text">
                                            {{ item.summary }}
                                        <span v-show="isUser" class="card-link-span">
                                            <a class="card-link" href="" @click.prevent="openModal" :class="{'fa-disabled': isNotJoin}">ادامه مطلب ...</a>
                                        </span>
                                        </p> 
                                        <p v-else class="card-text">
                                            {{ item.content }}
                                        </p>

                                        <span class="card-link-span">
                                            <a class="card-link">۲۳\۳\۱۴۰۱</a>
                                        </span>
                                        <div>
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-down" 
                                            class="mx-3 dislike-icon"
                                            :class="{'fa-disabled': isNotJoin}"
                                            />
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-up"  
                                            class="like-icon"
                                            :class="{'fa-disabled': isNotJoin}"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>
                        <div v-else class="col-8">
                            <div v-for="item in channels[channelIndex].data" :key="item.id">
                                <div class="card mt-3">
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <span class="card-title" >
                                                    {{item.title}}
                                            </span>
                                            <span class="edit-icon" v-show="!isUser">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" @click="goToEditContent()"/>
                                            </span>
                                            <span class="trash-icon" v-show="!isUser" @click="removeContent(item.id)">
                                                <font-awesome-icon icon="fa-solid fa-trash"/>
                                            </span>
                                        </div>
                                        <p v-if="isUser" class="card-text">
                                            {{ item.summary }}
                                        <span v-show="isUser" class="card-link-span">
                                            <a class="card-link" href="" @click.prevent="openModal" :class="{'fa-disabled': isNotJoin}">ادامه مطلب ...</a>
                                        </span>
                                        </p> 
                                        <p v-else class="card-text">
                                            {{ item.content }}
                                        </p>

                                        <span class="card-link-span">
                                            <a class="card-link">۲۳\۳\۱۴۰۱</a>
                                        </span>
                                        <div>
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-down" 
                                            class="mx-3 dislike-icon"
                                            :class="{'fa-disabled': isNotJoin}"
                                            />
                                            <font-awesome-icon 
                                            icon="fa-solid fa-thumbs-up"  
                                            class="like-icon"
                                            :class="{'fa-disabled': isNotJoin}"
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
                     (هزینه محتوا ۱۰۰۰ تومان است)
                </p>
            </template>

            <template #modal-footer="{ ok, cancel}">
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

    data(){
        return {
            isJoin: true,
            isNotJoin: false,
            isUser: true,
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
            channels: [
                {
                    id: '1',
                    name: 'کانال ایسنا',
                    image: '/img/ISNA.39ae5b64.jpeg',
                    date: 'سه روز پیش',
                    description: 'بازگشایی مدارس در تهران ...',
                    isJoin: true,
                    data:[{
                        id:1,
                        title: 'خبر مدارس',
                        summary: 'بازگشایی مدارس در تهران',
                        content: 'مدارس در تهران به دلیل برودت هوا به مدت سه روز تعطیل شد. منتظر اعلام بازگشایی بعد از این بازه باشید.',
                    },
                    {
                        id:2,
                        title: 'خبر جاده',
                        summary: 'بازگشایی محور کرج - چالوس',
                        content: 'مهرداد بذرپاش وزیر راه و شهرسازی در توئیتر نوشت: پس از سه هفته تلاش شبانه‌روزی، محور کرج - چالوس (حدفاصل میدان امیرکبیر تا شهرستانک، مسیر رفت و برگشت) که به دلیل جاری شدن سیل مهیب مسدود شده بود، بازگشایی شد؛ سیلی که در ۳۰ سال اخیر بی سابقه بود.',
                    },

                    ]

                },
                {
                    id: '2',
                    isJoin: true,
                    name: 'کانال ارز',
                    image: '/img/currency.4ab05000.png',
                    date: 'چهار روز پیش',
                    description: 'قیمت دلار امروز ۲۰۰۰۰ تومان ...'
                },
                {
                    id: '3',
                    isJoin: false,
                    name: 'کانال ورزش',
                    image: '/img/currency.4ab05000.png',
                    date: 'چهار روز پیش',
                    description: 'قیمت دلار امروز ۲۰۰۰۰ تومان ...'
                }
            ]
        }
    },
    methods: {
        openModal() {
            this.modalShow = true
        },
        cancel() {
            this.modalShow = false
        },
        selectChannel(id){
            this.activeTag = id
            for (let i = 0; i < this.channels.length; i++) {
                if (this.channels[i].id === id) {
                    this.channelIndex = i
                    break
                }
            }
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
            for (let i = 0; i < this.channels[this.channelIndex].data.length; i++) {
                if (this.channels[this.channelIndex].data[i].id === dataId) {
                    this.channels[this.channelIndex].data.splice(i, 1)
                    break
                }
            }
        },
        goProfile(){
            this.$router.push({name: 'user'})
        },
        goToAddContent(){
            this.$router.push({name: 'addcontent', query:{edit: false}})
        },
        goToEditContent(){
            this.$router.push({name: 'addcontent', query:{edit: true}})
        },
        searchInChannels(){
            for (let i = 0; i < this.channels.length; i++) {
                if (this.channels[i].name === this.searchedChannelName) {
                    this.searchedChannelList.push(this.channels[i])   
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
        }
        
    }
}
</script>

<style scoped>
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
    margin-right: 55px;
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
    background-color: rgb(226, 226, 226);
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
.card-link{
    font-size: 13px;
    color: black;
    text-decoration: none;
}
.card-body{
    text-align: right;
}
.card-link-span{
    float: left;
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
    margin-right: 140px;
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
}
</style>