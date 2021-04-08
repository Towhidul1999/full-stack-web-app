import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Card, Container } from 'react-bootstrap';
import './HeroArea.css';
import {Link} from "react-router-dom";


const HeroArea = () => {
    const [events , setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/event')
        .then(res => res.json())
        .then(data =>{
            setEvents(data)})
    },[events])
    return (
        <div>
            <Header />
            <div className="body_area">
                <div className="body_title text-center">
                    <h1>Search Your Books Here</h1>
                    <div className="search_input my-4 d-flex justify-content-center">
                        <input type="text" style={{width:'470px'}}
                         className='form-control'/>
                        <button
                        className='btn btn-info mx-1'
                        >Search</button>
                    </div>

                </div>
                <div className="body_text">
                    <Container>
                    <div className="row">
                        {
                        events.map(event => 
                            <div className="col-md-3">
                                <Link className='body_content' to={`/register/${event.key}`}>
                                    <Card 
                                    style={{width:'270px' , height:'390px', marginTop:'30px',borderRadius:'10px',border:'none', overflow:'hidden'}}>
                                        <div style={{overflow:'hidden'}}>
                                            <Card.Img variant="top" src={event.imageURL} 
                                            style={{height:'310px'}} className='card_img'
                                            />
                                        </div>
                                        
                                        <Card.Body className='bg-secondary card_text'>
                                            <Card.Title col-md-6>{event.name}</Card.Title>
                                            <Card.Title col-md-6>${event.price}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        )
                        }
                    </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};
export default HeroArea;