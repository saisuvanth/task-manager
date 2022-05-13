import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './components.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
	const navigate = useNavigate();
	const email = useRef();
	const password = useRef();
	const [message, setMessage] = useState('');

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				navigate('/');
			}
		})
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		signInWithEmailAndPassword(auth, email.current.value, password.current.value).then(res => {
			if (res.user.emailVerified) {
				navigate('/', { replace: true });
			} else {
				setMessage('Email is not verified');
			}
		}).catch(err => {
			if (err.code === 'auth/wrong-password') setMessage('Password/Email are incorrect');
		})
	}

	return (
		<Container fluid className='main'>
			<Form onSubmit={handleSubmit} className='my-form'>
				<Form.Group controlId="email">
					<Form.Label> <h5 className='text-center'>Email Address</h5></Form.Label>
					<Form.Control
						autoFocus
						type="email"
						ref={email}
						placeholder="example@gmail.com"
					/>
				</Form.Group>
				<Form.Group controlId="password" className='pt-4'>
					<Form.Label ><h5 className='text-center'>Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={password}
						placeholder="Password"
					/>
					{message ? <div className='errormsg'>{message}</div> : null}
				</Form.Group>
				<Form.Group>
					<Form.Check
						inline
						type='checkbox'
					/>
					<Form.Label className='mt-3'> <h5>Remember me</h5> </Form.Label>
					<Link className='forgot-passwd' to={'/forgot-password'}>Forgot Password?</Link>
				</Form.Group>
				<div className='submit text-center'>
					<Button block='true' type="submit">
						Login
					</Button>
				</div>
				<Form.Text>
					Don't have an account? <Link to={'/register'}>Sign Up</Link>
				</Form.Text>
			</Form>
		</Container >
	)
}

export default Login