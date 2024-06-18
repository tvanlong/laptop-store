import { useEffect, useMemo, useState } from 'react'
import { calculateTimeLeft } from '~/utils/util'

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const initialTimeLeft = calculateTimeLeft()
    return initialTimeLeft
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = useMemo(() => timeLeft.hours ?? 0, [timeLeft.hours])
  const minutes = useMemo(() => timeLeft.minutes ?? 0, [timeLeft.minutes])
  const seconds = useMemo(() => timeLeft.seconds ?? 0, [timeLeft.seconds])

  return (
    <div className='flex'>
      <div className='mr-3 flex text-xs md:text-base flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
        <span className='font-bold text-amber-400' id='hours'>
          {hours < 10 ? `0${hours}` : hours}
        </span>
        <span className='text-white'>giờ</span>
      </div>
      <div className='mr-3 flex text-xs md:text-base flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
        <span className='font-bold text-amber-400' id='minutes'>
          {minutes < 10 ? `0${minutes}` : minutes}
        </span>
        <span className='text-white'>phút</span>
      </div>
      <div className='flex text-xs md:text-base flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
        <span className='font-bold text-amber-400' id='seconds'>
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
        <span className='text-white'>giây</span>
      </div>
    </div>
  )
}

export default CountdownTimer
