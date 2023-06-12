import { ChangeColor } from '@/utilities/functions/ChangeColors'
import { ChangeTheme } from '@/utilities/functions/ChangeTheme'
import Image from 'next/image'

export default async function Home() {
  const Data = await fetch('https://uynngk-7000.csb.app')
  const jsonData = await Data.json() 
  return (
    <p className=' w-20'>{JSON.stringify(jsonData,null,2)}</p>
  )
}
