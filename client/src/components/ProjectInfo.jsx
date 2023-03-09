import {TiContacts} from 'react-icons/ti'
import {GrMail} from 'react-icons/gr'
import {BsTelephoneFill} from 'react-icons/bs'
const ProjectInfo = ({project}) => {
  return (
    <div>
        <h2 className='text-lg font-semibold  mt-10 mb-2'>Client Inforamtion</h2>
        <div className='flex flex-col border-2 border-gray-400 rounded-lg px-4 py-4 lg:py-10 lg:px-6'>
            <span className='text-lg font-semibold text-gray-800 flex  items-center'><TiContacts className='mr-3'/>{project.name}</span>
            <span className='text-lg font-semibold text-gray-800 flex  items-center'><GrMail className='mr-3'/>{project.email}</span>
            <span className='text-lg font-semibold text-gray-800 flex  items-center'><BsTelephoneFill className='mr-3'/>{project.phone}</span>
        </div>
    </div>
  )
}

export default ProjectInfo