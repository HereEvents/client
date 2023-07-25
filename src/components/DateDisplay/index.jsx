import style from "./style.module.css";
import {FiRotateCw} from 'react-icons/fi'

export default function DateDisplay({returnType, values, startDate,viewEvent}){

    let personalType="ימים, "
    if(values.personalRepeatType!=="days"&&values.personalRepeat!="days"
    ||values.personalRepeat=="weeks"&&values.personalRepeat!="days"){
        personalType="שבועות"}
    else if(values.personalRepeat=="days"){
        personalType="ימים)"
    }
    


    let end= values.repeatTimesEnd+ " פעמים"

if(values.repeatTimesEnd==1){
    end="פעם אחת"
}
if(values.repeatTimesEnd==2){
    end="פעמיים"
}


    if(!values.personalRepeat){
    let finishDate = new Date(values.repeatDateEnd.date);
    const startDate= new Date (values.date);

    finishDate<new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())?finishDate=finishDate:
    finishDate=new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      };
      const formattedDate = finishDate.toLocaleDateString('he-IL', options);

if(values.repeatSettingsEnd=="endDate"){
    end="עד " + formattedDate
}
    }
    else if(values.personalRepeat){
    end=""};

let stringDays="";
const filteredArray = values.days.filter((obj) => Object.keys(obj).length !== 0);
const daysOfWeek =["ראשון","שני", "שלישי", "רביעי","חמישי","שישי","שבת"]
filteredArray.sort((a,b)=>{

const dayIndexA = daysOfWeek.indexOf(a.nameDay);
const dayIndexB = daysOfWeek.indexOf(b.nameDay);
return dayIndexA - dayIndexB;

})
if(filteredArray.length>0){
    stringDays="ב";
    // for(const i of filteredArray)
   for(let i=0; i<filteredArray.length-1; i++) {
        stringDays+=filteredArray[i].nameDay+", ";
    }
    if (values.personalRepeat){
        stringDays+=(filteredArray[filteredArray.length-1]).nameDay+ ") ";
    }
    else{
        stringDays+=(filteredArray[filteredArray.length-1]).nameDay+ ", ";
    }
}

let repeatTimes=values.repeatTimes

if(repeatTimes==1){
    if(personalType!="שבועות"){
       repeatTimes="";
       personalType="יום" 
    }
else{
    repeatTimes="";
       personalType="שבוע" 
}
}

if(repeatTimes==2){
    if(personalType!="שבועות"){
       repeatTimes="";
       personalType="יומיים" 
    }
else{
    repeatTimes="";
       personalType="שבועיים"
}
}


let text= `כל ${repeatTimes} ${personalType} ${stringDays} ${end} `

    
return(
    <div>
{!viewEvent?
    <div className={style.date}>
        <div className={style.icon}><FiRotateCw/></div>
        {returnType!="בהתאמה אישית" ? <div className={style.returnType}>{returnType}</div>: 
        <div className={style.text}>{text}</div>}
    </div>:
    
    <div>
<div className={values.days.length<2? style.date: style.long}>
        <span className={style.startDate}>{startDate}</span>
        {(returnType!="customized")? <div className={style.returnType}>{returnType}</div>: 
        <div className={style.space}><div className={style.text}>(<span>{text}</span></div></div>}
    </div>
    </div>
}
    </div>
)
}
