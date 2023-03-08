import {useQuery} from '@apollo/client'
import ClientRow from './ClientRow'
import {BiUser} from 'react-icons/bi'
import { GET_CLIENTS } from '../queries/clientQuery'
import Spinner from './Spinner'
import { useState } from 'react'
import Modal from './Modal'
const Clients = () => {
    const [showModal,setShowModal]= useState(false)
    const {loading,error,data} = useQuery(GET_CLIENTS)
   
    if(loading) return <Spinner/>
    if(error) return <p>Some thing went wrong</p>
  return (
    <>
    {
        !showModal ? (
            
            
            <div className='py-15 mt-3 mx-0 lg:mx-28 lg:mt-8 '>
        <button className='bg-blue-500 rounded-lg px-4 py-2 text-white font-semibold my-3 flex justify-center items-center' onClick={()=>setShowModal(true)}> <BiUser className='text-base mr-1'/> Add client</button>

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
          <Modal setShowModal={setShowModal}/>
          )
        }

        </>
  )
}

export default Clients