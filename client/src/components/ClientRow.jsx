import {BsTrash} from 'react-icons/bs'
import { DELETE_CLIENT } from '../mutations/clientMutation'
import {useMutation} from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQuery'
import { GET_CLIENTS } from '../queries/clientQuery'
const ClientRow = ({client}) => {
    const [deleteClient] = useMutation(DELETE_CLIENT,{
        variables:{id:client.id},
        refetchQueries:[{query:GET_PROJECTS},{query:GET_CLIENTS}],
        
        // update(cache,{data:{deleteClient}}){
        //     const {clients} = cache.readQuery({
        //         query:GET_CLIENTS});
        //         cache.writeQuery({
        //         query:GET_CLIENTS,
        //         data:{clients:clients.filter(client=>client.id !== deleteClient.id)}
        //     })
        // }
    })
  return (
   <tr className='border-b bg-neutral-200' >
    <td className=' px-6 py-4 border-b-2 border-slate-300 border-x-2 border-spacing-2 '>{client.name}</td>
    <td className=' px-6 py-4 border-b-2 border-slate-300 border-x-2 border-spacing-2'>{client.email}</td>
    <td className=' px-6 py-4 border-b-2 border-slate-300 border-x-2 border-spacing-2'>{client.phone}</td>
    <td className=' px-6 py-4 border-b-2 border-slate-300 border-x-2 border-spacing-2'>
        <button onClick={deleteClient}>
         <BsTrash className='text-red-600 cursor-pointer'/>
        </button>
    </td>
   </tr>
  )
}

export default ClientRow