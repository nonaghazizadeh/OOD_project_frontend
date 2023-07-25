<template>
    <div>
        <div dir="rtl" class="channel-page container-fluid">
            <div class="row">
                <div class="col-1 info">
                    <img src = "../assets/images/avatar.png" class = "rounded-circle avatar" width = "40" height = "40" @click="goProfile()">
                    <div class="position-absolute exit-icon-container" >
                        <router-link to="/">
                            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="exit-icon" />
                        </router-link>
                    </div> 
                </div>
                <div v-show="!isUser" class="col content no-float">
                    <div class="row top-content">
                        <div class="col-1">
                            <img src="../assets/images/channelimg.jpeg" class = "rounded-circle channel-image" width = "35" height = "35">
                        </div>
                        <div class="col-2 text-right">
                            <h5 class="channel-info">نام کانال</h5>        
                        </div>
                        <div class="col">
                        </div>
                        <div class="col-1">
                            <font-awesome-icon icon="fa-solid fa-trash" class="channel-info-icon" @click="removeChannel()"/>
                        </div>
                        <div class="col-1">
                            <router-link to="/channel" class="close-icon">
                                <font-awesome-icon icon="fa-solid fa-close" class="channel-info-icon close-icon" />
                            </router-link>
                        </div>
                    </div>
                    <div class="tabs my-5 py-5 ">
                        <b-tabs content-class="mt-5">
                            <b-tab title="ویرایش اطلاعات کانال" active :disabled="!isAdmin">
                                <div class="row">
                                    <div class="col"></div>
                                    <div class="col-3  py-3">
                                        <b-form-input type="text" placeholder="نام کانال"></b-form-input>
                                    </div>
                                    <div class="col-3 py-3">
                                        <b-form-file
                                        v-model="file1"
                                        placeholder=""
                                        ></b-form-file>
                                    </div>
            
                                    <div class="col"></div>
                                </div>
                                <div class="row master-center-content">
                                    <div class="col-3"></div>
                                    <div class="col">
                                        <b-textarea
                                        placeholder="توضیحات کانال"
                                        rows="3"
                                        max-rows="6"
                                        ></b-textarea>
                                    </div>
                                    <div class="col-3"></div>
                                </div>
                                <div class="row">
                                    <b-button variant="secondary" class="add-channel-button" @click="addChannel()">
                                        ویرایش کانال
                                    </b-button>
                                </div>
                            </b-tab>
                            <b-tab title="حق اشتراک">
                                <div class="row">
                                    <div class="col"></div>
                                    <div class="col-4 px-5 py-3">
                                    محتوا‌های کانال به صورت رایگان در اختیار مخاطبین قرار بگیرد؟
                                    </div>
                                    <div class="col-1 py-3">
                                        <b-form-checkbox
                                        id="checkbox-1"
                                        v-model="yesStatus"
                                        class="mx-3"
                                        :disabled="!isAdmin"
                                        >
                                            بله
                                        </b-form-checkbox>
                                    </div>
                                    <div class="col-1 py-3">
                                        <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="noStatus"
                                        class="mx-3"
                                        :disabled="!isAdmin">
                                            خیر
                                        </b-form-checkbox>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="row master-center-content">
                                    <div class="col-1"></div>
                                    <div class="col">
                                        <b-table :fields="fields" :items="items" sticky-header="200px">
                                        </b-table>
                                    </div>
                                    <div class="col-1"></div>
                                </div>

                                <div class="row master-center-2-content">
                                    <div class="col"></div>
                                    <div class="col-3">
                                        <b-form-select 
                                        v-model="feeSelected"
                                        :disabled="yesStatus || !isAdmin"
                                        :options="options">
                                        </b-form-select>
                                    </div>
                                    <div class="col-2">
                                        <b-form-input 
                                            type="number" 
                                            placeholder="هزینه اشتراک"
                                            :disabled="yesStatus || !isAdmin"
                                        ></b-form-input>
                                    </div>
                                    <div class="col-1">
                                        <b-button pill :disabled="yesStatus || !isAdmin">تغییر</b-button>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </b-tab>
                            <b-tab title="حذف کاربر">
                                
                                <div class="row master-center-content">
                                    <div class="col-1"></div>
                                    <div class="col">
                                        <b-table :fields="userFields" :items="userItems" sticky-header="200px">
                                    </b-table>
                                    </div>
                                    <div class="col-1"></div>
                                </div>

                                <div class="row master-center-2-content">
                                    <div class="col"></div>
                                    <div class="col-5">
                                        <b-form-select 
                                        v-model="userSelected"
                                    
                                        :options="userOptions">
                                        </b-form-select>
                                    </div>
                                    <div class="col-1">
                                        <b-button pill>حذف</b-button>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </b-tab>
                            <b-tab title="افزودن مدیر">
                                <div class="row master-center-content">
                                    <div class="col-1"></div>
                                    <div class="col">
                                        <b-table :fields="userFields" :items="userItems" sticky-header="200px">
                                    </b-table>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                                <div class="row master-center-3-content">
                                    <div class="col"></div>
                                    <div class="col-3">
                                        <b-form-select 
                                        v-model="userSelected" 
                                        :disabled="!isAdmin"
                                        :options="userOptions"></b-form-select>
                                    </div>
                                    <div class="col-2">
                                        <b-form-input 
                                        :disabled="!isAdmin"
                                        type="number" placeholder="درصد سود"></b-form-input>
                                    </div>
                                <div class="col-1">
                                    <b-button pill :disabled="!isAdmin">افزودن</b-button>
                                </div>
                                <div class="col"></div>
                                </div>
                            </b-tab>
                            <b-tab title="افزودن دسته‌بندی">
                                <div class="row master-center-content">
                                    <div class="col-1"></div>
                                    <div class="col">
                                        <b-table :fields="categoryFields" :items="categoryItems" sticky-header="200px">
                                        </b-table>
                                    </div>
                                    <div class="col-1"></div>
                                </div>

                                <div class="row master-center-2-content">
                                    <div class="col"></div>
                                    <div class="col-5">
                                        <b-form-input type="text" placeholder="نام دسته‌بندی"></b-form-input>
                                    </div>
                                    <div class="col-1">
                                        <b-button pill>افزودن</b-button>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </b-tab>
                            <b-tab title="حذف دسته‌بندی">
                                <div class="row master-center-content">
                                    <div class="col-1"></div>
                                    <div class="col">
                                        <b-table :fields="categoryFields" :items="categoryItems" sticky-header="200px">
                                        </b-table>
                                    </div>
                                    <div class="col-1"></div>
                                </div>

                                <div class="row master-center-2-content">
                                    <div class="col"></div>
                                    <div class="col-5">
                                        <b-form-select 
                                            v-model="categorySelected" 
                                            :options="categoryOptions"
                                            :disabled="!isAdmin"
                                            ></b-form-select>
                                    </div>
                                    <div class="col-1">
                                        <b-button pill :disabled="!isAdmin">حذف</b-button>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </b-tab>
                            <b-tab title="ویرایش دسته‌بندی">
                                <div class="row master-center-content">
                                    <div class="col-1"></div>
                                    <div class="col">
                                        <b-table :fields="categoryFields" :items="categoryItems" sticky-header="200px">
                                        </b-table>
                                    </div>
                                    <div class="col-1"></div>
                                </div>

                                <div class="row master-center-2-content">
                                    <div class="col"></div>
                                    <div class="col-3">
                                        <b-form-select 
                                            v-model="categorySelected" 
                                            :options="categoryOptions"
                                            :disabled="!isAdmin"
                                            ></b-form-select>
                                    </div>
                                    <div class="col-2">
                                        <b-form-input 
                                        type="text" 
                                        placeholder="نام تغییر یافته دسته‌بندی"
                                        :disabled="!isAdmin"
                                    ></b-form-input>
                                    </div>
                                    <div class="col-1">
                                        <b-button pill :disabled="!isAdmin">تغییر</b-button>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </b-tab>
                        </b-tabs>
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
                            <router-link to="/channel">
                                <font-awesome-icon icon="fa-solid fa-close" class="channel-info-icon close-icon" />
                            </router-link>
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
                            <b-form-select v-model="feeSelected" :options="options"></b-form-select>
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
    watch: {
        yesStatus: function (val) {
            if (val) {
                this.noStatus = false;
            }
        },
        noStatus: function (val) {
            if (val) {
                this.yesStatus = false;
            }
        }
    },
    data(){
        return {
            isUser: false,
            addChannelShow: false,
            feeSelected: null,
            userSelected: null,
            categorySelected: null,
            yesStatus: false,
            noStatus:false,
            isAdmin:false,
            channelId: this.$route.query.id,
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
            { value: null, text: 'انتخاب نوع حق عضویت' },
            { value: 1, text: 'یک ماه' },
            { value: 3, text: 'سه ماه' },
            { value: 6, text: 'شش ماه' },
            { value: 12, text: 'دوازده ماه' },
            ],
            percentageOptions:[
            { value: 1, text: '۱۰' },
            { value: 2, text: '۵' },
            { value: 3, text: '۲۰' },
            ],
            userOptions: [
            { value: null, text: 'نام کاربر' },
            { value: 1, text: 'نونا' },
            { value: 2, text: 'علی' },
            { value: 3, text: 'علیرضا' },
            { value: 4, text: 'محمد' },
            { value: 5, text: 'فاطمه' },
            ],
            categoryOptions: [
            { value: null, text: 'نام دسته‌بندی' },
            { value: 1, text: 'خبر' },
            { value: 2, text: 'ورزش' },
            { value: 3, text: 'اقتصاد' },
            ]
        }

    },
    methods: {
        removeChannel(){
            this.$router.push('/channel');
        },
        goProfile(){
            this.$router.push({name: 'user'})
        }
    },


}
</script>
<style>
.nav-link{
    color: black !important;
}

</style>

<style scoped>
.close-icon{
    color: black !important;
}
.tabs{
    background-color: #f0f1f2;
    border-radius: 10px;

}
.table{
    background-color: rgb(237, 234, 234) !important;
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
    color: black !important;
}
.exit-icon{
    margin-right: 35px;
    color: black !important;
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
    background-color: white;
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
    border-bottom: 1px solid black;
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