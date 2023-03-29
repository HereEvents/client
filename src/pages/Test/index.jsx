import React from 'react'
import styles from './style.module.css'
import SelectIcon from '../../components/SelectIcon'
import { GiLightBackpack } from 'react-icons/gi'
import RoundButton from '../../components/RoundButton'

const categories=[
  {icon: 'https://cdn-icons-png.flaticon.com/512/3058/3058890.png',
  name: 'כיף'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/685/685352.png',
  name: 'אוכל'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/103/103461.png',
  name: 'יצירה'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/199/199478.png',
  name: 'הופעות'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/2556/2556640.png',
  name: 'טיולים'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/1489/1489413.png',
  name: 'הרצאות'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/36/36486.png',
  name: 'הפגנות'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/4893/4893592.png',
  name: 'ספורט'},
] 
function Test() {

  return (
    <div className={styles.main}>
      <SelectIcon array={categories} header={'קטגוריה'} />
    </div>
  )
}

export default Test