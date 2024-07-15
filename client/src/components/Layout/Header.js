import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';




const Header = () => {
  const [auth,setAuth] = useAuth()
  const [cart] = useCart()
  const categories = useCategory()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout succesfully")
  
  };

  return (
    <>
    
     <nav style={{backgroundColor:'#343a40'}} className="navbar navbar-expand-lg  p-2 w-100   ">
  <div className="container-fluid">
   <h2 >
     <Link to={'/'} className="heading navbar-brand text-light  p-3  " >easybuy</Link>
   </h2>
    <button className="navbar-toggler bg-light  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon " />
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">

      <ul  className="navbar-nav ms-auto mb-2 mb-lg-0 me-lg-5 ">
        <SearchInput />
        <li className="nav-item">
          <NavLink to={'/'} className="nav-link text-light   " aria-current="page" >Home</NavLink>
        </li>

        <li className="nav-item dropdown">
                <Link
                  className="nav-link text-light dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu rounded-1    " style={{ minWidth: '250px' }}>
                  <li >
                    <Link className="dropdown-item  " to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item  "
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>



        {
          !auth.user?(
            <>
            <li className="nav-item">
          <NavLink to={'/register'} className="nav-link text-light  " >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/login'} className="nav-link text-light " >Login</NavLink>
        </li>
            </>
          ):(
            < >
            {/* Dropdown */}
                   <li className="nav-item dropdown">
  <NavLink className="nav-link text-light  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${auth?.user?.role === 1?'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink></li>
    <li>
    <NavLink to={'/login'} 
            onClick={handleLogout}
            className="
            dropdown-item  " >Logout</NavLink>
    </li>
   
    
  </ul>
</li>


           
            </>
            
          )
        }
        <li className="nav-item">
          <NavLink to={'/cart'} className="nav-link text-light     " ><HiOutlineShoppingBag size={25} />
          <span className="badge bg-white text-black rounded-circle  top-0 start-100 translate-middle">
          {cart?.length}
                  </span>
          
         
         
        
          </NavLink>
        </li>
       
        
      </ul>
      
    </div>
  </div>
</nav>

    </>
  )
}

export default Header