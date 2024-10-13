import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { SvgIconComponent } from '@mui/icons-material';


interface Props {
  title: string;
  content: string;
  date: string;
  Icon: SvgIconComponent;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return formatDistance(date, new Date(), { addSuffix: true, locale: es })
}

const CardInfoTwo = ({ title, date }: Props) => {
  console.log(date)
  return (
    <div className='p-5 bg-white rounded-lg text-black flex flex-row justify-between items-center border-gray-300 w-full mb-5 px-5'>
      <div className='flex flex-row justify-between items-center'>
        <WorkspacePremiumIcon className='text-purple-600' />
        <div className='flex flex-col ml-10'>
          <h1 className='text-lg text-purple-600'>{title}</h1>
        </div>
      </div>
      <span className='text-gray-600'>{formatDate(date)}</span>
     
    </div>
  )
}

export default CardInfoTwo
