import {useQuery} from '@apollo/client'
import ClientRow from './ClientRow'
import {BiUser} from 'react-icons/bi'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import { GET_CLIENTS } from '../queries/clientQuery'
import Spinner from './Spinner'
import { useState } from 'react'
import Modal from './Modal'
import ProjectModal from './ProjectModal'
const Clients = () => {
    const [showModal,setShowModal]= useState(false)
    const [showModalProject,setShowModalProject] = useState(false)
    const {loading,error,data} = useQuery(GET_CLIENTS)
   
    if(loading) return <Spinner/>
    if(error) return <p>Some thing went wrong</p>
    console.log(showModalProject)
    console.log(showModal)
  return (
    <>
    {
        !showModal && !showModalProject ? (
            
            
            <div className='py-15 mt-3 mx-0 lg:mx-28 lg:mt-8 '>
                <div className='flex space-x-3 items-center justify-start '>

        <button className='bg-blue-500 rounded-lg px-4 py-2 text-white font-semibold my-3 flex justify-center items-center' onClick={()=>setShowModal(true)}> <BiUser className='text-base mr-1'/> Add client</button>
        <button className='bg-pink-600 text-white font-semibold px-3 py-2  rounded-lg flex items-center' onClick={()=>setShowModalProject(true)

        }> <AiOutlineUnorderedList className='mr-2 text-lg' /> Add Project</button>
                </div>

        {
            
            !loading && !error && (
                <table className=' min-w-full px-10 ' >
                    <thead>
                        <tr className=' border-b bg-slate-300 '>
                        <th  className="text-start px-6 py-4 border-x-2 border-slate-200">Name</th>
                        <th  className=" text-start px-6 py-4 border-x-2 border-slate-200">Email</th>
                        <th  className=" text-start px-6 py-4 border-x-2 border-slate-200">Phone</th>
                        <th  className=" text-start px-6 py-4 border-x-2 border-slate-200"></th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.clients.map((client=>(
                        <ClientRow key={client.id} client={client}/>
                        )))}
                    </tbody>
                </table>
            )
        }
    </div>
      ):(
        <>
          {showModalProject ? (

              <ProjectModal setShowModalProject={setShowModalProject}/>
              ):(
                  <Modal setShowModal={setShowModal}/>
              )
            }
            </>
          )
        }

        </>
  )
}

export default Clients