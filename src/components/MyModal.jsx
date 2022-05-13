import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { BsClipboard } from 'react-icons/bs';
import { auth, firestore } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const MyModal = ({ show, setShow, tasks, flag, setTasks }) => {
	const [change, setChange] = useState(false);

	const handleClose = () => setShow(false)

	useEffect(() => {
		setChange(false)
	}, [flag]);


	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const data = new FormData(form);
		const d = { title: data.get('title'), details: data.get('details'), date: new Date(data.get('date')), completed: false }
		if (flag.length === 2) {
			if (change) {
				const chIndex = data.get('chIndex');
				setTasks(tsk => {
					const newTsk = [...tsk];
					console.log(newTsk);
					newTsk[chIndex]?.task.push(d);
					newTsk[parseInt(flag[0])]?.task.splice(parseInt(flag[1]), 1);
					console.log(newTsk);
					return newTsk;
				})
			} else
				setTasks(prev => {
					const newPrev = [...prev];
					console.log(newPrev);
					newPrev[parseInt(flag[0])].task[parseInt(flag[1])] = d;
					return newPrev;
				});
		} else {
			setTasks(prev => {
				const newPrev = [...prev];
				console.log(newPrev);
				newPrev[flag].task.push(d);
				return newPrev;
			})
		}
		const mydoc = doc(firestore, `users/${auth?.currentUser?.uid}`);
		updateDoc(mydoc, { tasks: tasks });
		console.log(tasks);
		setShow(false);
	}

	function makeDate(date) {
		const d = new Date(date);
		const mdate = d?.getDate() < 10 ? '0' + d?.getDate() : d?.getDate();
		const month = d?.getMonth() < 10 ? '0' + d?.getMonth() : d?.getMonth();
		return `${d?.getFullYear()}-${month}-${mdate}`;
	}

	return (
		<Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title><BsClipboard /></Modal.Title>
			</Modal.Header>
			<Form onSubmit={(event) => handleSubmit(event)}>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Control type="text" name='title' placeholder="Enter Title" defaultValue={flag?.length === 2 ? tasks[parseInt(flag[0])]?.task[parseInt(flag[1])]?.title : ''} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Control type="text" name='details' placeholder="Enter Details" defaultValue={flag?.length === 2 ? tasks[parseInt(flag[0])]?.task[parseInt(flag[1])]?.details : ''} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Control type="date" name='date' placeholder="Enter Date" defaultValue={flag?.length === 2 ? makeDate(tasks[parseInt(flag[0])]?.task[parseInt(flag[1])]?.date) : ''} />
					</Form.Group>
					{
						flag?.length === 2 ?
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Check inline type="checkbox" name='change' onChange={() => setChange(prev => !prev)} />
								<Form.Label>Move to Another list</Form.Label>
							</Form.Group> : null
					}
					{change ?
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Select aria-label="Default select example" name='chIndex'>
								{
									tasks?.map((otask, ind) => {
										if (ind !== parseInt(flag[0])) {
											return <option value={ind} key={ind}>{otask.name}</option>
										}
									})
								}
							</Form.Select>
						</Form.Group> : null
					}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default MyModal