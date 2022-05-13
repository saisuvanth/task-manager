import React, { useState } from 'react'
import { Container, Card, Row, Button, Col, Accordion, useAccordionButton } from 'react-bootstrap';
import './components.css'
import { BsCircle, BsThreeDotsVertical, BsBell, BsPlusLg, BsPencil } from 'react-icons/bs';

const Tasks = ({ task, flag, setShow, setIndex }) => {
	const [active, setActive] = useState(null);

	const handleShow = () => {
		setIndex(flag);
		setShow(true);
	}

	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			setActive(prev => prev === eventKey ? null : eventKey)
		);

		return (
			<Row onClick={decoratedOnClick} className='py-2 align-items-center'>
				{children}
			</Row>
		);
	}

	function handleClick(event, index, whtFlag) {
		event.stopPropagation();
		if (whtFlag === 'notif') {

		} else if (whtFlag === 'edit') {
			setIndex(flag + '' + index);
			setShow(true);
		}
	}


	return (
		<Card className='mx-1 my-card'>
			<Card.Header>
				<Container fluid className='task-head'>
					<h5 className='task-heading'>{task.name}</h5>
					<span className='d-flex justify-content-end'>
						<button className='btn'><BsThreeDotsVertical /></button>
					</span>
				</Container>
				<div className='pt-3'>
					<Accordion>
						<>
							<Row className='align-items-center pb-2'>
								<div className='add-button' onClick={handleShow}>
									<BsPlusLg size={15} />
								</div>
								<Col className='mx-2 details'>
									Add Task
								</Col>
							</Row>
						</>
						{
							task.task?.map((tas, index) =>
								<>
									{console.log(tas)}
									{!tas.completed ?
										<>
											<CustomToggle eventKey={index}>
												<div style={{ width: 'fit-content' }}>
													<BsCircle size={25} />
												</div>
												<Col style={{ flex: '1 1 50%', cursor: 'pointer' }}>
													{tas.title}
												</Col>
												<Col>
													{
														active === index ? <Button><BsBell onClick={event => handleClick(event, index, 'notif')} /></Button>
															: <Button variant='light'><BsPencil onClick={event => handleClick(event, index, 'edit')} /></Button>
													}
												</Col>
											</CustomToggle>
											<Accordion.Collapse eventKey={index}>
												<Row className='px-5'>
													<Col sm='12' md='12' className='details'>{tas.details}</Col>
													<Col sm='12' md='12' className='date'>{new Date(tas.date).toDateString()}</Col>
												</Row>
											</Accordion.Collapse>
										</> : null}
								</>
							)
						}
						<Row style={{ color: 'green', marginLeft: '5px' }}>Completed (&nbsp;
							{task.task?.filter(tas => tas.completed).length} )
						</Row>
						{
							task?.task?.filter(tas => tas.completed).map((tas, index) =>
								<>
									<CustomToggle eventKey={index}>
										<div style={{ width: 'fit-content' }}>
											<BsCircle size={25} />
										</div>
										<Col style={{ flex: '1 1 50%', cursor: 'pointer' }}>
											{tas.title}
										</Col>
										<Col>
											{
												active === index ? <Button><BsBell onClick={event => handleClick(event, index, 'notif')} /></Button>
													: <Button variant='light'><BsPencil onClick={event => handleClick(event, index, 'edit')} /></Button>
											}
										</Col>
									</CustomToggle>
									<Accordion.Collapse eventKey={index}>
										<Row className='px-5'>
											<Col sm='12' md='12' className='details'>{tas.details}</Col>
											<Col sm='12' md='12' className='date'>{new Date(tas.date).toDateString()}</Col>
										</Row>
									</Accordion.Collapse>
								</>
							)
						}
					</Accordion>
				</div>
			</Card.Header>
		</Card>
	)
}

export default Tasks