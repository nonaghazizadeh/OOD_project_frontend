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
                        <div class="col-1">
                            <font-awesome-icon icon="fa-solid fa-close" class="channel-info-icon"/>
                        </div>
                    </div>
                    <div class="row center-add-content">
                        <div class="col">
                            <div class="row center-add-content px-5 py-3 mt-5">
                                <div class="col-6">
                                    <b-form-input type="text" placeholder="عنوان محتوا"></b-form-input>
                                </div>
                                <div class="col-6">
                                    <b-form-select v-model="selected" :options="categoryOptions"></b-form-select>
                                </div>
                            </div>
                            <div class="row center-2-add-content px-5 py-2">
                                <div class="col-2 py-3">
                                    محتوا به صوت رایگان است؟
                                </div>
                                <div class="col-1 py-3">
                                    <b-form-checkbox
                                    id="checkbox-1"
                                    v-model="yesStatus"
                                    class="mx-3"
                                    >
                                        بله
                                    </b-form-checkbox>
                                </div>
                                <div class="col-3 py-3">
                                    <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="noStatus"
                                        class="mx-3"
                                    >
                                    خیر
                                    </b-form-checkbox>
                                </div>
                                <div class="col-6">
                                    <b-form-input type="number" placeholder="هزینه محتوا"></b-form-input>
                                </div>
                            </div>
                            <div class="row center-2-add-content px-5 py-2">
                                <div class="col-2 py-3">
                                    محتوا از کدام یک است؟
                                </div>
                                <div class="col-1 py-3">
                                    <b-form-checkbox
                                    id="checkbox-1"
                                    v-model="yesStatus"
                                    class="mx-3"
                                    >
                                        متن
                                    </b-form-checkbox>
                                </div>
                                <div class="col-3 py-3">
                                    <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="noStatus"
                                        class="mx-3"
                                    >
                                        ویدیو، عکس، فایل صوتی
                                    </b-form-checkbox>
                                </div>
                                <div class="col-6">
                                    <b-form-file
                                        class=""
                                        v-model="file1"
                                        :disabled="editMode"
                                        placeholder=" انتخاب محتوا " 
                                    ></b-form-file>
                                </div>
                            </div>
                            <div class="row cetner-3-add-content px-5">
                                <div class="col-12">
                                    <b-form-textarea
                                        id="textarea-rows"
                                        placeholder="متن خود را وارد کنید"
                                        rows="5"
                                    ></b-form-textarea>  
                                </div>
                            </div>
                            <div class="row bottom-content">
                                <div class="col-10">

                                </div>
                                <div class="col-2">
                                    <b-button v-show="!editMode" variant="secondary">
                                        افزودن     
                                    </b-button>
                                    <b-button v-show="editMode" variant="secondary">
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
export default {
    data(){
        return {
            editMode: true,
            isJoin: true,
            isUser: false,
            modalShow: false,
            addChannelShow: false,
            categoryOptions: [
            { value: 1, text: 'خبر' },
            { value: 2, text: 'ورزش' },
            { value: 3, text: 'اقتصاد' },
            ]
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