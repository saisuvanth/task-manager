import React, { useState, useRef } from 'react'
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import './components.css';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
	const name = useRef();
	const email = useRef();
	const password = useRef();
	const [message, setMessage] = useState({ message: '', type: '' });
	const [enable, setEnable] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const userEmail = email.current.value, userPassword = password.current.value, userName = name.current.value;
		createUserWithEmailAndPassword(auth, userEmail, userPassword).then(res => {
			if (res) {
				console.log(auth.currentUser);
				sendEmailVerification(auth.currentUser, { url: 'https://incomparable-travesseiro-b4de5b.netlify.app/login' }).then(res1 => {
					setMessage({ message: "Verification Email has been sent", type: 'sent' });
					console.log('database init')
					const mydoc = doc(firestore, `users/${res.user.uid}`);
					setDoc(mydoc, { username: userName, email: userEmail, tasks: [] });
				})
			}
		}).catch(err => {
			console.log(err);
			if (err.code === 'auth/email-already-in-use')
				setMessage({ message: 'Email already in Use', type: 'error' });
			else
				setMessage({ message: "Can't create a account right now", type: 'error' });
		})
	}
	return (
		<Container fluid className='main'>
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label> <h5>Username</h5></Form.Label>
					<Form.Control
						autoFocus
						type="text"
						ref={name}
						placeholder="Rick"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="email" className='mt-3'>
					<Form.Label> <h5>Email Address</h5></Form.Label>
					<Form.Control
						autoFocus
						type="email"
						ref={email}
						placeholder="example@gmail.com"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password" className='mt-3'>
					<Form.Label><h5>Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={password}
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group >
					<Form.Check
						inline
						type='checkbox'
						onChange={() => { setEnable(prev => !prev) }}
					/>
					<Form.Label className='mt-3'> <h5>I accept the terms & conditions</h5> </Form.Label>
				</Form.Group>
				{message ? <div className={message.type === 'error' ? 'errormsg' : 'informsg'}>{message.message}</div> : null}
				<div className='submit text-center'>
					<Button block size="lg" type="submit" disabled={!enable}>
						Sign Up
					</Button>
				</div>
				<Form.Text>
					Already have an account? <Link to={'/login'}>Log In</Link>
				</Form.Text>
			</Form>
		</Container>
	)
}

export default SignUp