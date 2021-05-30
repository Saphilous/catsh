import React, {useState, useEffect, useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'

import '../stylesheets/Navbar.css'
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai";
import AuthContext from '../store/authContext'

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const slidebarData = [
    {
        title: 'Catsh',
        path: '/',
        cNAme: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: `/dashboard/`,
        cNAme: 'nav-text'
    },
    {
        title: 'About Us',
        path: '/about',
        cNAme: 'nav-text'
    },
    {
        title: 'Sign Up',
        path: '/signup',
        cNAme: 'nav-text'
    }
]

const Navcomponent = (props) =>
{
	let [width]=useWindowSize()
	const [cookies, setcookies] = useState()
	const [sidebar, setSidebar]=useState(false)
	const showSidebar = () => setSidebar(!sidebar)
	const authContext = useContext(AuthContext)
	useEffect(() => {
		const uid = sessionStorage.getItem("uid")
		setcookies(uid)
	})
	const dashboardlink = '/dashboard?uid='.concat(cookies)
	if(width > 720)
	{
		return(
		<ul className='Nav-ul-main'>
			<NavLink to='/' className='Nav-li' activeClassName='selected' exact>
				Catsh
			</NavLink>
			<NavLink to= {dashboardlink} className='Nav-li' activeClassName='selected' exact>
				Dashboard
			</NavLink>
			<NavLink to='/about' className='Nav-li' activeClassName='selected' exact>
				About Us
			</NavLink>
			{authContext.isLoggedIn?<NavLink to='/Logout' className='Nav-li' activeClassName='selected' exact>
				Logout
			</NavLink>: <NavLink to='/signup' className='Nav-li' activeClassName='selected' exact>
				Sign In
			</NavLink>}
		</ul>
		)
	}
	else
	{
		return(
			<React.Fragment>
				<div className='nav-toggle-main'>
					<Link to='#' className='toggle-menu-bars'>
						<FaBars onClick={showSidebar} />
					</Link>
					<span className='nav-toggle-title'>Casth</span>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className='nav-menu-items' onClick={showSidebar}>
						<li className='navbar-toggle'>
							<Link to='#' className='menu-bars'>
								<AiOutlineClose />
							</Link>
						</li>
						{slidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cNAme}>
									<Link to={item.path}>
										<span>{item.title}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</React.Fragment>
		)
	}	
}

export default Navcomponent