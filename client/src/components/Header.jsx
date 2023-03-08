import Logo from './assets/logo.png'
const Header = () => {
  return (
    <div className="flex  bg-slate-200 items-center p-4 w-screen">
        
            <img src={Logo} alt="logo" className="mx-4 w-8 h-8"/>
            <h1 className="text-pink-600 font-bold text-xl">Project Managment</h1>
    </div>
  )
}

export default Header