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
                <div class="col content no-float">
                    <p class="mt-5 user-title">
                        حساب کاربری
                    </p>
                    <div class="delete-user-button">
                        <b-button v-show="editMode" variant="secondary">
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
                                        placeholder=" انتخاب عکس " 
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
                                <div class="col-6">
                                    <b-input-group append="تومان">
                                        <b-form-input placeholder=" موجودی کیف پول: ۲۰۰۰۰" disabled>
                                        </b-form-input>
                                    </b-input-group>
                                </div>
                                <div class="col-2">
                                    <b-button variant="secondary">
                                        شارژ کیف پول     
                                    </b-button>
                                </div>
                            </div>
                            <div class="row bottom-content">
                                <div class="col-10">
                                </div>
                                <div class="col-2">
                                    <b-button v-show="editMode" variant="secondary">
                                        ذخیره     
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
    methods: {}

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