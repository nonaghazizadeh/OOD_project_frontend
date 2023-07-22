<template>
  <div>
    <div dir="rtl" class="channel-page container-fluid">
            <div class="row channel-container">
                <div class="col-1 info">
                    <img src = "../assets/images/avatar.png" class = "rounded-circle avatar" width = "40" height = "40">
                    <div class="position-absolute exit-icon-container" >
                        <router-link class="exit-link" to="/">
                            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="exit-icon" />
                        </router-link>
                    </div> 
                </div>
                <div class="col-1"></div>
                <div class="col content no-float">
                    <div class="mt-4 add-channel-title-container">
                        <span class="add-channel-title">ایجاد کانال</span>
                    </div>
                    <div class="row px-5 py-3 mt-5">
                        <div class="col-5">
                            <b-form-input type="text" placeholder="نام کانال"></b-form-input>
                        </div>
                        <div class="col-5">
                            <b-form-file
                                v-model="file1"
                                placeholder=""
                            ></b-form-file>
                        </div>
                    </div>
                    <div class="row px-5 py-3">
                        <div class="col-5">
                            <b-form-input type="text" placeholder="نام مدیر"></b-form-input>
                        </div>
                        <div class="col-5">
                            <b-form-input type="number" placeholder="درصد سود"></b-form-input>
                        </div>
                        <div class="col-2">
                            <b-button variant="secondary"  class="add-manager-first-button" @click="addManagerField()">
                                <font-awesome-icon icon="fa-solid fa-plus"/>
                            </b-button>
                        </div>
                    </div>
                    <div v-if="managers.length !== 1" >
                        <div v-for="manager in managers.slice(1)" :key="manager.id" class="row px-5 py-3">
                        <div class="col-5">
                            <b-form-input type="text" placeholder="نام مدیر" v-model="manager.name"></b-form-input>
                        </div>
                        <div class="col-5">
                            <b-form-input type="number" placeholder="درصد سود" v-model="manager.profit" ></b-form-input>
                        </div>
                        <div class="col-2">
                            <b-button variant="danger" class="remove-manager-button" @click="removeManagerField(manager.id)">
                                <font-awesome-icon icon="fa-solid fa-minus"/>
                            </b-button>
                            <b-button variant="secondary" @click="addManagerField()">
                                <font-awesome-icon icon="fa-solid fa-plus"/>
                            </b-button>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 px-5 py-3">
                            محتوا‌های کانال به صورت رایگان در اختیار مخاطبین قرار بگیرد؟
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
                        <div class="col-1 py-3">
                            <b-form-checkbox
                                id="checkbox-2"
                                v-model="noStatus"
                                class="mx-3"
                            >
                                خیر
                            </b-form-checkbox>
                        </div>
                    </div>
                    <div class="row py-3 px-5">
                        <div class="col-5">
                            <b-form-input 
                            :disabled="yesStatus"
                            type="number" placeholder="هزینه اشتراک یک‌ ماه"></b-form-input>
                        </div>
                        <div class="col-5">
                            <b-form-input 
                            :disabled="yesStatus"
                            type="number" placeholder="هزینه اشتراک سه‌ ماه"></b-form-input>
                        </div>
                    </div>
                    <div class="row py-3 px-5">
                        <div class="col-5">
                            <b-form-input 
                            :disabled="yesStatus"
                            type="number" placeholder="هزینه اشتراک شش ماه"></b-form-input>
                        </div>
                        <div class="col-5">
                            <b-form-input 
                            :disabled="yesStatus"
                            type="number" placeholder="هزینه اشتراک دوازده ماه"></b-form-input>
                        </div>
                    </div>
                    <div>
                        <b-button variant="secondary" class="add-channel-button" @click="addChannel()">
                            ایجاد کانال
                        </b-button>
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
    data() {
        return {
            yesStatus: true,
            noStatus: false,
            file1: null,
            managers:[
                {
                    id: 1,
                    name: "",
                    profit: ""
                }
            ]
        }
    },
    methods:{
        addManagerField(){
            this.managers.push({
                id: this.managers.length + 1,
                name: "",
                profit: ""
            })
        },
        removeManagerField(managerId){
            for (let i = 0; i < this.managers.length; i++) {
                if (this.managers[i].id === managerId) {
                    this.managers.splice(i, 1);
                }
            }
            
        },
        addChannel(){
            this.$router.push('/channel');
        }
    }

}
</script>

<style>
.add-channel-button{
    margin-top: 20px;
    margin-right: 930px;
}
.exit-link{
    color: black !important;
}
.add-channel-title{
    margin-right: -250px;
}
.avatar {
    margin-top: 20px;
}
.channel-page{
    height: 100vh;
}
.content{
    background-color: white;
    overflow-y: scroll;
}
.info{
    background-color: rgb(226, 226, 226);
    /* position: fixed !important; */
}
.channel-container{
    height: 100%;
}
.exit-icon{
    margin-right: 55px;
}
.add-channel-title{
    font-weight: bold;
    font-size: 25px;
}
.remove-manager-button{
    margin-left: 5px;
}
.add-manager-first-button{
    margin-right: 44px;
}

.exit-icon-container {
    bottom:0;
}
.custom-file-label::after{
    content: "آپلود تصویر " !important;
}
.custom-file-label{
    text-align: right !important;
}
</style>