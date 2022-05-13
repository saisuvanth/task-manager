import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import './components.css';

const MyNavbar = () => {
	const [url, setUrl] = useState('');

	useEffect(() => {
		fetch(`https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/info`).then(res => res.json()).then(data => setUrl(data.download_url)).catch(err => console.log(err));
	}, [])
	return (
		<Navbar className='my-navbar' variant="dark">
			<Container fluid className='mx-4'>
				<Navbar.Brand href="#home" className='d-flex align-items-center'>
					<img
						alt=""
						src={logo}
						width="70px"
						height="60px"
						className="d-inline-block align-top"
					/>{' '}
					<span className='navbar-title'>TasksBoard</span>
				</Navbar.Brand>
				<Nav className='justify-content-end'>
					<img src={url} alt=""
						className="d-inline-block align-top avatar"
					/>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default MyNavbar