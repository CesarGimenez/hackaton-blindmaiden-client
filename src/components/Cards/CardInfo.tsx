import { SvgIconComponent } from '@mui/icons-material'

interface Props {
  title: string,
  content: string,
  message?: string,
  Icon: SvgIconComponent,
  action: () => void
}

const CardInfo = ({ title, content, message, Icon, action }: Props) => {
  return (
    <div className='p-5 bg-white rounded-lg text-black flex flex-col border-gray-300'>
      <div className='flex flex-row justify-between items-center'>
         <div className='flex flex-col gap-2'>
            <h1 className='text-lg text-purple-600'>{title}</h1>
            <span className='text-2xl font-bold'>{content}</span>
            {message && <span className='text-gray-600 w-60'>{message}</span>}
        </div>
        <div className=' flex flex-col items-end gap-2'>
          <span className='text-purple-600'><Icon onClick={action} fontSize='large'/> </span>
          <span className='text-gray-600 cursor-pointer hover:text-purple-600'>Ver mas</span>
        </div>
      </div>
    </div>
  )
}

export default CardInfo
