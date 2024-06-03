import { Spinner } from 'flowbite-react'

function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <Spinner size='xl' aria-label='Center-aligned spinner example' />
      </div>
    </div>
  )
}

export default Loading
