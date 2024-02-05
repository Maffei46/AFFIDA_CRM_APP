<template>
    <div id="inputDate">
        <div class="label" v-if="label">{{ label }} <span v-if="required">*</span></div>
        <div class="inputDate">
            <input type="date" class="requiredInput" v-model="requiredInput" :required="required">
            <div class="calendar" v-if="showCalendar">
                <input type="date" v-if="showCalendar" class="dateInput" v-model="calendar_date" @change="calendar_date_changed" :disabled="disabled">
                <i class="material-icons icon">calendar_month</i>
            </div>
            
            
            <div class="effectiveInput">
                <input class="day" type="number" placeholder="DD" min="1" max="31" 
                    v-model="day" 
                    @change="dayChanged($event)" 
                    @focus="selectAllText" 
                    :disabled="disabled">

                <span class="divider">/</span>

                <input class="month" type="number" placeholder="MM" min="1" max="12" 
                    v-model="month" 
                    @change="monthChanged($event)" 
                    @focus="selectAllText" 
                    :disabled="disabled">

                <span class="divider">/</span>

                <input class="year" type="number" placeholder="YYYY" min="1900" max="2900" 
                    v-model="year" 
                    @change="yearChanged($event)" 
                    @focus="selectAllText" 
                    :disabled="disabled">

                <span class="divider" v-if="datetime">-</span>

                <input class="hours" type="number" placeholder="hh" min="0" max="23" 
                    v-if="datetime" 
                    v-model="hours" 
                    @change="hoursChanged($event)" 
                    @focus="selectAllText" 
                    :disabled="disabled">

                <span class="divider" v-if="datetime">:</span>

                <input class="minutes" type="number" placeholder="mm" min="0" max="59" 
                    v-if="datetime" 
                    v-model="minutes" 
                    @change="minutesChanged($event)" 
                    @focus="selectAllText" 
                    :disabled="disabled">

                <span class="divider" v-if="datetime">:</span>

                <input class="seconds" type="number" placeholder="ss" min="0" max="59" 
                    v-if="datetime" 
                    v-model="seconds" 
                    @change="secondsChanged($event)" 
                    @focus="selectAllText" 
                    :disabled="disabled"
                >
            </div>
            <div class="clear" v-if="showClear && !disabled" @click="clear">X</div>
            <div class="status" v-if="showStatus && !disabled" :class="status==0?'pending':'good'"></div>
            
            <div class="onlyText" v-if="disabled">
                {{ modelValue?datetime?new Date(modelValue).toLocaleString():new Date(modelValue).toLocaleDateString():'' }}
            </div>
        </div>

        <div class="debug" v-if="debug">
            <p>{{ modelValue?modelValue.toLocaleString():'' }}</p>
            <p v-if="showCalendar">{{ calendar_date }}</p>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        modelValue: {
            type: [String, Date, Number],
            default: undefined,
        },
        label:{
            type: String,
            default:''
        },
        required:{
            type: Boolean,
            default: false
        },
        disabled:{
            type: Boolean,
            default: false
        },
        datetime:{
            type: Boolean,
            default: false
        },
        showStatus:{
            type: Boolean,
            default: true
        },
        showCalendar:{
            type: Boolean,
            default: true
        },
        showClear:{
            type: Boolean,
            default: true
        },
        debug:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            day:null,
            month:null,
            year:null,
            hours:null,
            minutes:null,
            seconds:null,
            calendar_date:null,
            requiredInput:null,
            status:0,
        }
    },
    watch: {
        modelValue() {
            this.setup();
        }
    },
    methods:{
        setup(){
            if(!this.modelValue) return;
            var d = new Date(this.modelValue);
            if(this.debug) console.log('Received',this.modelValue);
            this.day = d.getDate();
            this.month = d.getMonth() + 1;
            this.year = d.getFullYear();
            this.hours = d.getHours();
            this.minutes = d.getMinutes();
            this.seconds = d.getSeconds();
            this.calendar_date = d.toISOString().split('T')[0];
            this.requiredInput = this.calendar_date;
            this.status = 1;
        },
        checkModel(){
            try{
                if(this.year==null || this.month==null || this.day==null) throw new Error();
                if(this.datetime){
                    if(this.hours==null || this.minutes==null || this.seconds==null) throw new Error();
                    var dt = new Date(this.year, this.month-1, this.day,this.hours,this.minutes,this.seconds);
                    this.calendar_date = dt.toISOString().split('T')[0];
                    this.requiredInput = this.calendar_date;
                    this.$emit('update:modelValue', dt);
                    this.status = 1;
                    if(this.debug) console.log('Emitted',dt);
                }else{
                    var d = new Date(this.year, this.month-1, this.day,8,0,0);
                    this.calendar_date = d.toISOString().split('T')[0];
                    this.requiredInput = this.calendar_date;
                    this.$emit('update:modelValue', d);
                    this.status = 1;
                    if(this.debug) console.log('Emitted',d);
                }
                
                
            }catch{
                this.$emit('update:modelValue', null);
                this.status = 0;
                this.requiredInput = null;
                this.calendar_date = null;
                if(this.debug) console.log('Emitted',null);
            }
        },
        checkMaxDay(){
            const maxDay = new Date(this.year, this.month, 0).getDate();
            if(this.day > maxDay) this.day = maxDay;
            if(this.day <= 1) this.day = 1;
        },
        dayChanged(event){
            this.day = event.target.value;
            this.checkMaxDay();
            this.checkModel();
        },
        monthChanged(event){
            const maxMonth = 12;
            var newMonth = event.target.value;
            if(newMonth > maxMonth) newMonth = maxMonth;
            if(newMonth <= 1) newMonth = 1;
            this.month = newMonth;
            this.checkMaxDay();
            this.checkModel();
        },
        yearChanged(event){
            this.year = event.target.value?event.target.value:null;
            this.checkMaxDay();
            this.checkModel();
        },
        hoursChanged(event){
            var newHour = event.target.value?event.target.value:0;
            if(newHour < 0) newHour = 0;
            if(newHour >= 23) newHour = 23;
            this.hours = newHour;
            this.checkModel();
        },
        minutesChanged(event){
            var newMinutes = event.target.value?event.target.value:0;
            if(newMinutes < 0) newMinutes = 0;
            if(newMinutes >= 59) newMinutes = 59;
            this.minutes = newMinutes;
            this.checkModel();
        },
        secondsChanged(event){
            var newSeconds = event.target.value?event.target.value:0;
            if(newSeconds < 0) newSeconds = 0;
            if(newSeconds >= 59) newSeconds = 59;
            this.seconds = newSeconds;
            this.checkModel();
        },
        calendar_date_changed(){
            var selectedDate = new Date(this.calendar_date);
            this.day = selectedDate.getDate();
            this.month = selectedDate.getMonth() + 1;
            this.year = selectedDate.getFullYear();
            this.hours = 8;
            this.minutes = 0;
            this.seconds = 0;
            this.checkModel();
        },
        clear(){
            this.day = null;
            this.month = null;
            this.year = null;
            this.hours = null;
            this.minutes = null;
            this.seconds = null;
            this.calendar_date = null;
            this.checkModel();
        },
        selectAllText(event) {
            event.target.select();
        },
    },
    mounted(){
        this.setup();
    }
}
</script>

<style lang="scss" scoped>
$padding-tb: 8px;
$padding-lr: 10px;
$roundness: 5px;
$gap:1px;
$font-size: 10pt;
$pendingColor: grey;
$bgColor: white;
$goodColor: rgb(78, 255, 78);
$margin-bottom: 10px;

#inputDate{
    margin-bottom: $margin-bottom;
    width: 100%;
}
.label{
    font-size: $font-size;
    padding-left: 5px;
    margin-bottom: 0px;
    font-weight: bold;
    text-align: left;
    span{
        color: var(--linkHoverColor);
        font-weight: bold;
    }
}
.inputDate{
    width: 100%;
    background-color: $bgColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $padding-tb $padding-lr;
    border-radius: $roundness;
    gap: $gap;
    position: relative;
    overflow: hidden;
    .effectiveInput{
        display: flex;
    }
    input{
        min-width: 0px;
        margin: 0;
        width: 20px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        font-size: $font-size;
        text-align: center;
        transition-duration: 0.1s;
        border-radius: 0;
        padding: 0;
        &::-webkit-outer-spin-button,&::-webkit-inner-spin-button{
            -webkit-appearance: none;
        }
        &:focus-visible {
            outline: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.7);
            transition-duration: 0.7s;
        }
    }

    .calendar{
        position: relative;
        height: 20px;
        overflow: hidden;
        user-select: none;
        .icon{
            color: black;
            position: absolute;
            left:0;
            top:-2px;
            pointer-events: none;
        }
    }
    .dateInput{
        border:none;
        width: 25px;
        margin-right: 0px;
        background: blue;
        opacity: 0;
        &::-webkit-outer-spin-button,&::-webkit-inner-spin-button{
            -webkit-appearance: none;
        }
        &:focus-visible {
            outline: none;
            border:none;
        }

        
    }
    .year{
        width: 34px;
    }
    span{
        color: black;
        opacity: 0.3;
        font-weight: bold;
    }
    .clear{
        color: rgba(0, 0, 0, 0.479);
        font-weight: bold;
        margin-left: 2px;
        font-size: 11pt;
        padding: 0px 4px;
        cursor: pointer;
        z-index: 2;
        transition-duration: 0.2s;
        &:hover{
            color: rgba(0, 0, 0, 0.8);
            transition-duration: 0.2s;
        }
    }
    .status{
        width: 20px;
        height: 10px;
        background-color: $pendingColor;
        position: absolute;
        bottom:0;right:0;
        rotate: -45deg;
        transform: translateY(70%) translateX(18%);
        z-index: 1;
        &.good{
            background: $goodColor;
        }
    }

    .requiredInput{
        opacity: 0;
        width: 100%;
        z-index: -1;
        position: absolute;
        top:0;left:0;bottom:0;right:0;
        border-radius: 0;
    }
    .onlyText{
        color: rgba(0, 0, 0, 0.8);
        position: absolute;
        left:0;right:0;top:0;bottom:0;
        display: flex;
        align-items: center;
        font-size: $font-size;
        padding-left: $padding-lr;
        background: $bgColor;
    }
    
}


</style>