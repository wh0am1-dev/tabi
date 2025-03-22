import { Outfit, Rampart_One as Kana, Fira_Code } from 'next/font/google'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin']
})

const kana = Kana({
  variable: '--font-kana',
  subsets: ['latin'],
  weight: '400'
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin']
})

export const fonts = `${outfit.variable} ${kana.variable} ${firaCode.variable}`
export default fonts
