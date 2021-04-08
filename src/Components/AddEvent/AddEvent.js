import { FormControl } from '@material-ui/core';
import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { Link , NavLink } from 'react-router-dom';
import logo from '../../images/logo.png'
import './AddEvent.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddEvent = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null)

    const onSubmit = data => {
        console.log(data)
        const eventData = {
            price: data.price,
            name: data.name,
            imageURL: imageURL
        }
        const url = `http://localhost:8080/addBook`;
        console.log(eventData)
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(res => console.log('server site connection', res))
    };
    const handleImageUpload = event =>{
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '9eb8469986008dbd92cc7242185ff612')
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <>
            <div 
            style={{width:'100%', height:'auto' , padding : '10px 0', background:'#E5E5E5'}}>
                <div className="container">
                    <div className='d-flex'>
                        <Link to='/home'>
                            <img style={{ height:'70px', lineHeight:'20px'}} src={logo} alt="logo"/>
                        </Link>
                        <h4 style={{lineHeight:'60px', marginLeft:'50px'}}>Add Events</h4>
                    </div>
                </div>
                <div>
                    <div style={{width:'20%', float: 'left',
                        background:'#E5E5E5' , height:'100vh', marginTop:'10px',}}>
                        <div style={{marginLeft:'20%', marginTop:'30px'}}>
                            <NavLink className="nav_list" activeClassName='text-primary' to='/admin'>Volunteer register list</NavLink> <br/><br/>
                            <NavLink className="nav_list" activeClassName='text-primary' to='/addEvent'>Add event</NavLink>
                        </div>
                    </div>
                    <div style={{width:'66%', float: 'left', background:'#ffffff',  marginTop:'50px',marginLeft:'20px'}}>
                        
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <input className="input" type="text" name="name" defaultValue="New Book Collection" {...register("name")}/>
                        <br></br>
                        <input className="input" type="text" name="price" defaultValue="1000" {...register("price")}/>
                        <br></br>
                        <input className="input" type="file" onChange={handleImageUpload}/>
                        <br></br>
                        <button className='btn btn-success' type="submit">Submit</button>
                        </form>
                    </div>
                    


                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEvent;