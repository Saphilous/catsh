import React, {Component} from 'react'

//import components here
import Navcomponent from '../components/navbar'
import '../stylesheets/Navbar.css'

function Navbar(props)
{
	return(
		<div className= 'Nav-Div-Main'>
			<Navcomponent userinfo = {props.userinfo}/>
		</div>
	)
}


export default Navbar