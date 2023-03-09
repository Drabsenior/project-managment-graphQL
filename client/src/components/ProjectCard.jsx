import { Link } from "react-router-dom"

const ProjectCard = ({project}) => {
  return (
  

    <div className="border-2 rounded-lg border-slate-300 shadow-md  px-8 py-6 w-auto m-4">
       <div className="flex justify-between items-start">
        <div>
        <h2 className="text-2xl pb-4">{project.name}</h2>
        <p className="font-semibold text-slate-500">Status:<span className="font-semibold ml-1 text-black">{project.status}</span></p>
        </div>
        <Link to={`/project/${project.id}`} className="bg-gray-200 rounded-lg px-3 py-1 text-gray-600 font-semibold border-2 border-gray-200 ml-3">View</Link>
       </div>
       
        
    </div>
  )
}

export default ProjectCard