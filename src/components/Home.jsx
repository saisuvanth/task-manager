import React, { useState, useEffect, useRef } from 'react'
import './components.css';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import MyNavbar from './MyNavbar';
import Tasks from './Tasks';
import { BsPlusLg } from 'react-icons/bs';
import MyModal from './MyModal';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = ({ uid }) => {
	const list = useRef();
	const [tasks, setTasks] = useState([]);
	const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);
	const [index, setIndex] = useState(null);

	function handleSubmit(event) {
		event.preventDefault();
		setTasks(prev => {
			const tempPrev = [...prev];
			return [...tempPrev, { name: list.current.value, task: [] }]
		});
		setShow1(false);
	}

	useEffect(() => {
		async function getData() {
			console.log(uid);
			const mydoc = doc(firestore, `users/${uid}`);
			const data = await getDoc(mydoc);
			console.log(data.data());
			if (data.data().tasks)
				setTasks(data.data().tasks);
		}
		getData().then(res => console.log('hola'));
	}, [uid])


	return (
		<>
			<MyNavbar />
			<Container className='mt-5'>
				<Row>
					{
						tasks?.map((task, i) =>
							<Col xs='12' sm='6' md='6' lg='4' xl='3' className='my-3' key={i}>
								<Tasks task={task} flag={i} setShow={setShow} setIndex={setIndex} />
							</Col>
						)
					}
				</Row>
			</Container>
			<MyModal show={show} setShow={setShow} tasks={tasks} flag={index} setTasks={setTasks} />
			<Button className='super-add-button' variant='primary' onClick={() => setShow1(true)}><BsPlusLg size={25} /></Button>
			<Modal show={show1} onHide={() => setShow1(false)} aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title>Add Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={event => handleSubmit(event)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label className='my-2'>List Name</Form.Label>
							<Form.Control ref={list} type="text" placeholder="Enter Task List Name" />
						</Form.Group>
						<Form.Group className='d-flex justify-content-center mt-3'>
							<Button type='submit' variant='primary'>Add</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Home