import {
  Outfit,
  Fira_Code,
  Rampart_One as Kana,
  Noto_Color_Emoji as Emoji
} from 'next/font/google'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin']
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin']
})

const kana = Kana({
  variable: '--font-kana',
  subsets: ['latin'],
  weight: '400'
})

const emoji = Emoji({
  variable: '--font-emoji',
  subsets: ['emoji'],
  weight: '400'
})

export const fonts = `${outfit.variable} ${firaCode.variable} ${kana.variable} ${emoji.variable}`
export default fonts
