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
                <div v-show="!isUser" class="col content no-float">
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
                            <font-awesome-icon icon="fa-solid fa-trash" class="channel-info-icon" />
                        </div>
                        <div class="col-1">
                            <font-awesome-icon icon="fa-solid fa-close" class="channel-info-icon" />
                        </div>
                    </div>
                    <div class="row master-center-content mt-5">
                        <div class="col-12">
                            <div class="row master-center-content">
                                <div class="col-6">
                                    <b-table :fields="fields" :items="items" sticky-header="200px">
                                    </b-table>
                                </div>
                                 <div class="col-6">
                                    <b-table :fields="userFields" :items="userItems" sticky-header="200px">
                                    </b-table>
                                </div>
                            </div>
                            <div class="row master-center-2-content">
                                <div class="col-3">
                                    <b-form-select v-model="selected" :options="options"></b-form-select>
                                </div>
                                <div class="col-2">
                                    <b-form-input type="number" placeholder="هزینه اشتراک"></b-form-input>
                                </div>
                                <div class="col-1">
                                    <b-button pill>تغییر</b-button>
                                </div>
                                <div class="col-5">
                                    <b-form-select v-model="selected" :options="userOptions"></b-form-select>
                                </div>
                                <div class="col-1">
                                    <b-button pill>حذف</b-button>
                                </div>
                            </div>
                            <div class="row master-center-3-content">
                                <div class="col-3">
                                    <b-form-select v-model="selected" :options="userOptions"></b-form-select>
                                </div>
                                <div class="col-2">
                                    <b-form-input type="number" placeholder="درصد سود"></b-form-input>
                                </div>
                                <div class="col-1">
                                    <b-button pill>افزودن</b-button>
                                </div>
                            </div>
                            <div class="row master-center-4-content">
                                <div class="col-6">
                                    <b-table :fields="categoryFields" :items="categoryItems" sticky-header="200px">
                                    </b-table>
                                </div>
                                <div class="col-5">
                                    <b-form-input type="text" placeholder="نام دسته‌بندی"></b-form-input>
                                </div>
                                <div class="col-1">
                                    <b-button pill>افزودن</b-button>
                                </div>
                            </div>
                            <div class="row master-bottom-content">
                                <div class="col-5">
                                    <b-form-select v-model="selected" :options="categoryOptions"></b-form-select>
                                </div>
                                <div class="col-1">
                                    <b-button pill>حذف</b-button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div v-show="isUser" class="col content no-float">
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
                            <font-awesome-icon icon="fa-solid fa-close" class="channel-info-icon" />
                        </div>
                    </div>
                    <div class="row center-content mt-5">
                        <div class="col-6">
                            <div class="mb-3">
                                از اشتراک شما ۲۰ روز باقی مانده است. برای خرید اشتراک تعرفه‌ها به صورت زیر می‌باشد.
                            </div>
                            <b-table :fields="fields" :items="items" caption-top>
                            </b-table>
                        </div>
                        <div class="col-6">
                            <div class="top-category-table"></div>
                            <b-table :fields="categoryFields" :items="categoryItems">
                            </b-table>
                        </div>
                    </div>
                    <div class="row bottom-content mt-5">

                        <div class="col-5">
                            <b-form-select v-model="selected" :options="options"></b-form-select>
                        </div>
                        <div class="col-1"><b-button pill>خرید</b-button></div>
                        <div class="col"></div>
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
            isUser: true,
            addChannelShow: false,
            fields: [
            { key: 'time', label: 'مدت زمان' },
            { key: 'price', label: 'قیمت' },
            ],
            items: [
            { time: 'یک ماه', price: 'ده هزار تومان' },
            { time: 'سه ماه', price: 'بیست هزار تومان' },
            { time: 'شش ماه', price: 'پنجاه هزار تومان' },
            { time: 'دوازده ماه', price: 'صد و ده هزار تومان' },
            ] ,
            userFields: [
            { key: 'user', label: 'نام کاربر' },
            { key: 'state', label: 'نوع کاربر' },
            { key: 'profit', label: 'درصد درآمد/تعداد روزهای باقی از اشتراک' },
            ],
            userItems: [
            { user: 'نونا', state: 'عادی' ,profit: '.' },
            { user: 'علی', state: 'دارای حق اشتراک' ,profit: '۲۵'},
            { user: 'علیرضا', state: 'مدیر' ,profit: '۵۰'},
            { user: 'محمد', state: 'دارای حق اشتراک' ,profit: '۲۱'},
            { user: 'فاطمه', state: 'عادی',profit: '.' },
            ] ,
            categoryFields: [
            { key: 'name', label: 'نام دسته‌بندی' },
            { key: 'count', label: 'تعداد محتوا' },
            ],
            categoryItems: [
            { name: 'خبر', count: '۲۳'},
            { name: 'ورزش', count: '۱۰'},
            { name: 'اقتصاد', count: '۱۳'},
            ] ,
            options: [
            { value: 1, text: 'یک ماه' },
            { value: 3, text: 'سه ماه' },
            { value: 6, text: 'شش ماه' },
            { value: 12, text: 'دوازده ماه' },
            ],
            userOptions: [
            { value: 1, text: 'نونا' },
            { value: 2, text: 'علی' },
            { value: 3, text: 'علیرضا' },
            { value: 4, text: 'محمد' },
            { value: 5, text: 'فاطمه' },
            ],
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
.table{
    background-color: white !important;
    border-radius: 20px !important;
}
.b-table-sticky-header{
    background-color: white !important;
    border-radius: 20px !important;
}
.custom-select{
    border-radius: 20px !important;
}
.exit-icon-container{
    bottom:0;
}
.exit-icon{
    margin-right: 35px;
}
.form-control{
    border-radius: 20px !important;
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
.master-center-content{
    height: 45%;
}
.master-center-2-content{
    height: 15%;
}
.master-center-3-content{
    height: 25%;
}
.master-center-4-content{
    height: 45%;
}
.master-bottom-content{
    height: 15%;
}
.search-icon {
    padding: 0.8rem 0.75rem !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;

}
.top-category-table{
    margin-bottom: 2.5rem;
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
    height: 40%;
}
.bottom-content {
    height: 30%;
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
caption{
    text-align: center !important;
}
</style>