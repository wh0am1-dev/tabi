import storage from '@/storage'
import FileTree from '@/ui/FileTree'
export const dynamic = 'force-dynamic'

export default async function Home({}) {
  const tabs = await storage()

  return <FileTree root={tabs} />
}
