import storage from '@/storage'
import FileTree from '@/ui/file-tree'
export const dynamic = 'force-dynamic'

export default async function Library() {
  const tabs = await storage()

  return <FileTree root={tabs} />
}
