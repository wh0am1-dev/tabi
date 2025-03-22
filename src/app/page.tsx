import storage from '@/storage'
export const dynamic = 'force-dynamic'

export default async function Home({}) {
  const tabs = await storage()

  return (
    <code>
      <pre>{JSON.stringify(tabs, null, 2)}</pre>
    </code>
  )
}
