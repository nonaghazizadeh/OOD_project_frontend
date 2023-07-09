<template>
    <div>
        <div dir="rtl" class="channel-page container-fluid">
            <div class="row">
                <div class="col-1 info">
                    <img src = "../assets/images/avatar.png" class = "rounded-circle avatar" width = "40" height = "40">
                    <div class="position-absolute exit-icon-container" >
                        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="exit-icon" />
                    </div> 
                </div>
                <div class="col-2 sidebar no-float">
                    <div class="mt-4 sidebar-top">
                        <span>
                            لیست‌کانال‌ها
                        </span>
                        <span>
                            <font-awesome-icon icon="fa-solid fa-plus" class="add-icon"/>
                        </span>
                    </div>
                    <div class="input-group mb-3  mt-3">
                        <b-input-group class="mt-3">
                        <template #append>
                        <b-input-group-text>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </b-input-group-text>
                        </template>
                        <b-form-input></b-form-input>
                        </b-input-group>
                    </div>
                    <div class="list-group mt-3 w-100 channel-list">
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
                            <div class="d-flex w-100 justify-content-between">
                                <img src = "../assets/images/ISNA.jpeg" class = "rounded-circle" width = "25" height = "25">
                                <h5 class="mb-1 ">کانال ایسنا</h5>
                                <small>سه روز پیش</small>
                            </div>
                            <small>
                                بازگشایی مدارس در تهران ...
                            </small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <img src = "../assets/images/currency.png" class = "rounded-circle" width = "25" height = "25">
                                <h5 class="mb-1">کانال ارز</h5>
                                <small>چهار روز پیش</small>
                            </div>
                            <small>
                                قیمت دلار امروز ۲۰۰۰۰ تومان ...
                            </small>
                        </a>
                    </div>
                </div>
                <div class="col content no-float">
                    <div class="row top-content">
                        <div class="col-1">
                            <img src = "../assets/images/ISNA.jpeg" class = "rounded-circle channel-image" width = "35" height = "35">
                        </div>
                        <div class="col-2 text-right">
                            <h5 class="channel-info">کانال ایسنا</h5>        
                        </div>
                        <div class="col">
                        </div>
                        <div v-show="!isJoin && isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-user-plus" class="channel-info-icon" />
                        </div>
                        <div v-show="isJoin && isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-user-minus" class="channel-info-icon" />
                        </div>
                        <div v-show="!isUser" class="col-1">
                            <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="channel-info-icon" />
                        </div>
                        <div class="col-1">
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="channel-info-icon" />
                        </div>
                        <div class="col-1">
                            <font-awesome-icon icon="fa-solid fa-circle-info" class="channel-info-icon"/>
                        </div>
                    </div>
                    <div :class="[isUser ? 'row center-content-user':'row center-content']">
                        <div class="col-8">
                            <div class="card mt-3">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <span class="card-title" >
                                            خبر مدارس
                                        </span>
                                        <span class="edit-icon" v-show="!isUser">
                                            <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                                        </span>
                                        <span class="trash-icon" v-show="!isUser">
                                            <font-awesome-icon icon="fa-solid fa-trash"/>
                                        </span>
                                    </div>
                                    <p v-if="isUser" class="card-text">
                                        تعطیلی مدارس به علت برودت هوا
                                        <span v-show="isUser" class="card-link-span">
                                            <a class="card-link" href="" @click.prevent="openModal" :class="{'fa-disabled': isNotJoin}">ادامه مطلب ...</a>
                                        </span>
                                    </p> 
                                    <p v-else class="card-text">
                                        مدارس در تهران به دلیل برودت هوا به مدت سه روز تعطیل شد. منتظر اعلام بازگشایی بعد از این بازه باشید.
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
                            <div class="card mt-3 mb-5">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <span class="card-title" >
                                            خبر جاده
                                        </span>
                                        <span class="edit icon" v-show="!isUser">
                                            <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
                                        </span>
                                        <span class="trash-icon" v-show="!isUser">
                                            <font-awesome-icon icon="fa-solid fa-trash"/>
                                        </span>
                                    </div>
                                    <p v-if="isUser" class="card-text">
                                        بازگشایی محور کرج - چالوس
                                        <span v-show="isUser" class="card-link-span">
                                            <a class="card-link" :class="{'fa-disabled': isNotJoin}">ادامه مطلب ...</a>
                                        </span>
                                    </p>
                                    <p v-else class="card-text">
                                        مهرداد بذرپاش وزیر راه و شهرسازی در توئیتر نوشت: پس از سه هفته تلاش شبانه‌روزی، محور کرج - چالوس (حدفاصل میدان امیرکبیر تا شهرستانک، مسیر رفت و برگشت) که به دلیل جاری شدن سیل مهیب مسدود شده بود، بازگشایی شد؛ سیلی که در ۳۰ سال اخیر بی سابقه بود.
                                    </p>
                                    <span class="card-link-span">
                                        <a class="card-link">۲۵\۳\۱۴۰۱</a>
                                    </span>
                                    <div>
                                        <font-awesome-icon :class="{'fa-disabled': isNotJoin}" icon="fa-solid fa-thumbs-down" class="mx-3 dislike-icon"/>
                                        <font-awesome-icon :class="{'fa-disabled': isNotJoin}" icon="fa-solid fa-thumbs-up"  class="like-icon"/>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col"></div>
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
        }
    },
    data(){
        return {
            isJoin: true,
            isNotJoin: false,
            isUser: true,
            modalShow: false,
            addChannelShow: false
        }
    },
    methods: {
        openModal() {
            this.modalShow = true
        },
        cancel() {
            this.modalShow = false
        }
    }

}
</script>

<style scoped>

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
.card-title{
    font-size: 22px;
    font-weight: bold;
}
.trash-icon{
    margin-right: 660px;
}
</style>