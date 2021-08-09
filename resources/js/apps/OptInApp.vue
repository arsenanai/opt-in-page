<template>
<div class="subpixel-antialiased laptop:antialiased"> 
  <section id="hurry-timer"
    class="py-0 pl-4 pr-2 relative flex flex-row h-14 w-full justify-center" style="background-color:#675F5F"
  >
    <h1 class="laptop:h-7 my-auto font-medium text-sm leading-4 laptop:text-2xl laptop:leading-7 align-middle"
    style="color:#FDF0F0">
      {{msg.headerMessage}}
    </h1>
    <span class="ml-1 laptop:ml-2 w-16 h-8 my-auto rounded-md text-center align-middle text-sm leading-8 font-medium" 
    style='background: rgba(255, 79, 79, 0.6); color: #FDFDFD;'>
      {{convertTimer()}}
    </span> 
    <a class="hidden laptop:flex flex-row space-x-2 absolute right-16 top-2/4 transform -translate-y-1/2" :href="whatsappNumber">
      <img class="w-6 h-6" :src="getURL('icons/whatsapp green.svg')">
      <span class="h-6 underline text-gray-50 text-sm leading-6 align-middle">
        {{whatsappNumberDisplay}}
      </span>
    </a>
  </section>
  <section id="hero" class="pt-9 pb-9 px-0 laptop:pr-7 laptop:pl-16" style="background: #073B70">
    
      <div class="flex flex-col laptop:flex-row">
        <div class="flex flex-col flex-grow pt-2.5 px-4 laptop:px-0">
          <span class="text-white text-xl laptop:text-3xl leading-snug laptop:leading-9 font-normal" style="max-width:749px;">
            {{msg.heroMessage1}}
          </span>
          <span class="font-semibold text-3xl laptop:text-6xl text-white mt-2 laptop:mt-2.5" 
          style="max-width:808px;line-height: 110%;">
            {{msg.heroMessage2}}
          </span>
          <span class="font-medium text-xl laptop:text-3xl leading-6 laptop:leading-10 text-white mt-2 laptop:mt-0.5"
          style="max-width:763px;">
            {{msg.heroMessage3}}
          </span>
          <img class="block laptop:hidden mt-6 mx-auto" :src="getURL('images/mockup book.svg')" style="width:220px"/>
          <div v-if="!requestSucceeded" class="mt-6 laptop:mt-5" :class="{'laptop:mt-10':loading}">
            <span v-if="hasError" class=" mt-8 mb-11 flex flex-row">
              <img class="my-auto h-6 w-6" :src="getURL('icons/close red.svg')">
              <span class=" ml-2 text-white font-medium text-lg leading-6">{{msg.verificationCompletedUnsuccessfully}}</span>
            </span>
            <span class="font-normal text-base leading-5 laptop:text-2xl laptop:leading-7 text-white"
            style="max-width:722px;">
              {{procedure}}
            </span>
            
            <form @submit.prevent class="mt-4 mb-0 laptop:mt-8" style="max-width:416px;" v-if="!loading">
              <label for="instagram" class=" text-base leading-none font-normal text-white">
                {{msg.formLabel}}
              </label>
              <input type="text" id="instagram" v-model="instagram" placeholder="@username"
                class="w-full border my-2 p-3.5 rounded-md text-base leading-none" 
                :class="getInputClasses()"
                @keyup="isValidUsername(instagram)"/>
              <div v-if="hasError" class="w-full bg-errorColor px-1 py-1.5 rounded-md">
                <span class="w-full text-white font-normal text-base leading-tight">
                  {{responseMessage}}
                </span>
              </div>
              <button class="w-full h-14 text-center
              course-btn course-btn-blue" :class="{'mt-6': hasError,'mt-3.5': !hasError}"
              :disabled="instagram.length<3||hasError"
              @click="checkInstagram()">
              <img :src="getURL('icons/insta white.svg')" class="my-auto w-6 h-6">
                <span class="my-auto ml-4 text-white text-base leading-none font-medium">
                  {{msg.formSubmitLabel}}
                </span>
              </button>
            </form>
            <div v-else class="text-right text-white font-normal text-sm leading-none mt-6" style="max-width:528px;">
              <div class="w-full h-2 rounded-full mb-2" 
              style="background-color:#E7E7EC;">
                <div class="h-2 rounded-full transition-all duration-300 ease-in-out" :style="getProgressWidth()"> 
                </div>
              </div>
              {{msg.done}} {{progress}}%
            </div>
          </div>
          <div v-else>
            <span class=" mt-8 mb-11 flex flex-row">
              <img class="my-auto h-6 w-6" :src="getURL('icons/check mark.svg')">
              <span class=" ml-2 text-white font-medium text-2xl leading-tight">{{msg.verificationCompletedSuccessfully}}</span>
            </span>
            <span class=" text-white font-normal text-xl leading-normal" style="max-width:640px">
              {{msg.completeOptInLabel}}
            </span>
            <div style="max-width:416px">
              <a class=" h-14 mt-2 w-full course-btn course-btn-blue" >
                <img :src="getURL('icons/telegram white.svg')" class=" w-6 h-6 my-auto">
                <span class="my-auto ml-4 text-base leading-none font-medium text-white">{{msg.goTelegram}}</span>
              </a>
              <div class=" mt-4 w-full text-center text-white font-normal text-base leading-none">
                {{msg.or}}
              </div>
              <a class=" h-14 mt-4 w-full course-btn course-btn-green" >
                <img :src="getURL('icons/whatsapp white.svg')" class=" w-6 h-6 my-auto">
                <span class="my-auto ml-4 text-base leading-none font-medium text-white">{{msg.goWhatsapp}}</span>
              </a>
            </div>
          </div>
          <div class="flex flex-row mt-2"
          style="max-width: 416px" v-if="!loading">
            <img :src="getURL('icons/lock white.svg')" class=" w-6 h-6">
            <span class=" ml-2 text-base leading-normal font-normal text-white">
              {{msg.notSpamLabel}}
            </span>
          </div>
        </div>
        <div class="hidden laptop:block flex-grow-0 pt-2" style="min-width:557px;">
          <img class="hidden laptop:block mx-auto w-full" :src="getURL('images/mockup book.svg')"/>
        </div>
      </div>
  </section>
  <section id='testimonials' class=" bg-whiteBrand px-4 laptop:px-16 py-8 laptop:py-6 mt-2 laptop:mt-8">
    <div class="grid grid-cols-1 laptop:grid-cols-4 gap-10">
      <div class="flex flex-row space-x-2.5 items-end" v-for="i in 4">
        <img :src="getURL('images/testimonial'+i+'.svg')" class="w-12 h-12">
        <span class=" font-normal text-base leading-5 text-activeSecondary">
          {{msg['testimonial'+i]}}
        </span>
      </div>
    </div>
  </section>
  <section id="description" class="pt-4 laptop:pt-12 pb-16 laptop:pb-20 px-4">
    <div class="mx-auto font-normal text-lg laptop:text-2xl leading-snug laptop:leading-snug text-center text-greyText" style="max-width:637px">
      {{msg.descriptionTitle1}}
    </div>
    <div class="mx-auto mt-2 laptop:mt-5 font-medium text-3xl laptop:text-6xl leading-tight laptop:leading-tight text-center text-mainBlack" style="max-width:1220px">
      {{msg.descriptionTitle2}}
    </div>
    <div class="mx-auto mt-4 laptop:mt-12 flex flex-col" style="max-width:640px">
      <div class="font-normal text-xl laptop:text-xl leading-snug laptop:leading-snug text-center laptop:text-left text-greyText">
        {{msg.descriptionTitle3}}
      </div>
      <div class="flex flex-column space-x-2 items-start" v-for="i in 4"
        :class="{'mt-6 laptop:mt-8':i==1, 'mt-4 laptop:mt-10':i>1}">
        <img :src="getURL('images/check mark.svg')" class="w-10 h-10">
        <span class=" font-normal text-base leading-5 text-mainBlack"
        :style="">
          {{msg['description'+i]}}
        </span>
      </div>
      <a href="#hurry-timer" class="w-full mt-10 laptop:mt-14 rounded-lg course-btn-blue text-center align-middle text-xl leading-none py-4">
        {{msg.button}}
      </a>
    </div>
  </section>
  <section id="reviews" class="relative py-8 px-4 laptop:px-16 laptop:pt-9" style="background: #073B70">
    <h3 class="text-whiteBrand font-medium text-3xl leading-tight laptop:text-5xl laptop:leading-none laptop:text-center">
      {{msg.reviewsTitle}}
    </h3>
    <div class=" mt-6 laptop:mt-12 pb-6 laptop:pb-9 overflow-x-scroll overflow-y-hidden whitespace-nowrap overscroll-none"
    ref="reviewsSlider"
    id="reviews-slider">
      <div v-for="i in reviews"
      class="inline-block align-top bg-repeat"
      :class="{'ml-4 laptop:ml-8':i>1}"
      :style="getReviewStyles()"
      >
        <img :src="getURL('images/review'+i+'.jpg')"
        class="w-full"/>
      </div>
      
    </div>
  </section>
  <section id="cta" class="relative pt-8 pb-14 laptop:pt-14 laptop:pb-11 px-4 text-mainBlack"
  style='background:#ECF3FB'>
    <h3 class="text-center font-semibold text-3xl leading-tight laptop:text-6xl laptop:leading-tight mx-auto"
    style='max-width:1233px'>
      {{msg.ctaTitle}}
    </h3>
    <p class="mt-4 laptop:mt-11 text-center font-normal text-base leading-snug laptop:text-2xl mx-auto"
    style='max-width:1112px'>
      {{msg.ctaMessage1}}
    </p>
    <div class="mt-8 laptop:mt-16 laptop:pt-2 mx-auto flex flex-col space-y-4"
    style="max-width:472px">
      <a href="#hurry-timer" class="w-full rounded-lg course-btn-blue text-center align-middle text-xl leading-none py-4">
        {{msg.button}}
      </a>
      <p class="flex flex-row mt-2">
        <img :src="getURL('icons/lock black.svg')" class=" w-6 h-6">
        <span class="ml-2 font-normal text-sm leading-tight text-greyText laptop:text-base laptop:leading-tight">
          {{msg.ctaMessage2}}
        </span>
      </p>
    </div>
    <a :href="whatsappNumber"
    class="block laptop:hidden absolute right-2 bottom-3 w-10 h-10 rounded-full p-0.5 shadow-lg"
    style="background:linear-gradient(192.17deg, #15F73B 7.1%, #04AF22 116.85%);"
    >
      <img :src="getURL('icons/whatsapp white.svg')"
      class="w-9 h-9"/>
    </a>
  </section>
  <div class="block laptop:hidden" style="height:3px"></div>
  <div class="hidden laptop:block" style="height:1px"></div>
  <footer class=" bg-activeSecondary p-4 laptop:pl-16">
    <p class=" font-normal text-sm leading-tight text-whiteBrand">©{{new Date().getFullYear()}} {{msg.footerMessage}}</p> 
  </footer>
  <!--<div class="container mx-auto px-8 laptop:px-0">
  </div>-->
</div>
</template>

<script>
//import CourseCard from './../components/CourseCard'
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'opt-in',
  components: {
  },
  data() {
    return {
      timer: timer,
      whatsappNumber: whatsappNumber,
      whatsappNumberDisplay: whatsappNumberDisplay,
      msg: msg,
      instagram:'',
      hasError: false,
      responseMessage: '',
      procedure: msg.heroMessage4,
      progress: 0,
      loading: false,
      requestSucceeded:false,
      reviews:4,
      bus: new Vue(),
    }
  },
  created() {
    this.countdownTimer()
    //this.windowResizeHandler()
    //window.addEventListener("resize", this.windowResizeHandler);
    //console.log(common.cartItems)
  },
  destroyed() {
    //window.removeEventListener("resize", this.windowResizeHandler);
  },
  methods: {
    getURL: function(address){
        //console.log(templateDirectory +"/"+ address);
        return common.templateDirectory +"/assets/"+ address;
    },
    convertTimer: function(){
      var hours = (Math.floor(this.timer/60/60)+'').padStart(2,'0')
      var minutes = (Math.floor((this.timer/60)%60)+'').padStart(2,'0')
      var seconds = (Math.floor(this.timer%60)+'').padStart(2,'0')
      return hours+":"+minutes+":"+seconds;
    },
    getCheckButtonColor: function(){
      //var r = ''
      if(this.instagram && this.instagram.length>=3){
        return 'bg-mainColor hover:bg-activeSecondary active:bg-mainColor'
      }else{
        return 'bg-greySecondary'
      }
    },
    isValidUsername: function(username){
      /* 
        Usernames can only have: 
        - Lowercase Letters (a-z) 
        - Numbers (0-9)
        - Dots (.)
        - Underscores (_)
      */
      const res = /^[A-Za-z0-9_\.]+$/.exec(username);
      const valid = !!res;
      this.hasError = !valid;
      if(this.hasError)
        this.responseMessage=msg.usernameConstraints
      else
        this.responseMessage=''
      return valid;
    },
    getInputClasses: function(){
      var r = 'text-greyText focus:text-mainBlack border-greySecondary focus:border-mainColor'
      if(this.hasError)
        r = 'text-errorColor border-errorColor focus:border-red-700'
      return r
    },
    getProgressWidth: function(){
      return  'background-color:#196ECD;width:'+this.progress+'%'
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    checkInstagram: function(){
      if(this.instagram.length>=3){
        var a = this.instagram.substring(1,this.instagram.length)
        if(this.instagram[0]!=='@')
          a = this.instagram
        if(this.isValidUsername(a)){
          this.procedure = msg.loadingMessage
          this.responseMessage = ''
          this.loading = true
          let data = {
            userId: a,
          }
          let config = {
            onUploadProgress: progressEvent => {
              //console.log('upload: '+progressEvent.loaded+", "+progressEvent.total)
              if(this.progress<33 && progressEvent.total!=0)
                this.progress = Math.floor((progressEvent.loaded * 33) / progressEvent.total);
              else
                this.progress = 33
              //console.log('on upload: '+this.progress)
            },
            onDownloadProgress: (progressEvent) => {
              //console.log('download: '+progressEvent.loaded+", "+progressEvent.total)
              if(this.progress<100 && progressEvent.total!=0)
                this.progress = 33+Math.floor((progressEvent.loaded * 67) / progressEvent.total);
              else 
                this.progress = 100
              //console.log('on download: '+this.progress)
            }
          }
          axios.post(common.locale+'/wp-json/pine-promotion/v1/instagram/check_user',data,config)
            .then((response) => {
              this.hasError = !response.data.success
              this.responseMessage = response.data.data.message
            })
            .catch((error) => {
              // handle error
              console.log('error')
              console.log(error)
            })
            .then(async () => {
                await this.sleep(301);
                this.requestSucceeded = !this.hasError
                this.loading = false
                this.procedure = msg.heroMessage4
                this.progress=0
            });
        }
      }
    },
    getReviewStyles: function(){
      return 'width:290px;'
      +'min-height:290px;'
      //+'background-size:'
      +'background-image:url('+this.getURL('images/whatsapp%20texture.jpg')+');'
    },
    countdownTimer: function(){
      if(this.timer > 0) {
          setTimeout(() => {
              this.timer -= 1
              this.countdownTimer()
          }, 1000)
      }
    }
  },
}
</script>
