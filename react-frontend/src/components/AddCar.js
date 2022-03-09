import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import CarService from '../services/CarService';

const AddCar = () => {

    const [model, setModel] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [picture, setPicture] = useState('')
    const navigate = useNavigate(); //use for to navigate to routes
    const {id} = useParams();

    const saveOrUpdateCar = (e) => {
        e.preventDefault();

        const car = {id, model, manufacturer, picture}

        if(id){ /// if the path is edit-car/:id which has params id
            CarService.updateCar(car, id).then((response) => {
                navigate('/cars');
            }).catch(error => {
                console.log(error)
            })

        }else{
          CarService.addCar(car).then((response) =>{

                console.log(response.data)
    
                navigate('/cars');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }
    //fetches the data needed to auto-fill form information when using the update button
    useEffect(() => {

        CarService.getCarById(id).then((response) =>{
          setModel(response.data.model)
            setManufacturer(response.data.manufacturer)
            setPicture(response.data.picture)
        }).catch(error => {
            console.log(error)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Car</h2>
        }else{
            return <h2 className = "text-center">Add Car</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Car Model :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Car Model"
                                        name = "model"
                                        className = "form-control"
                                        value = {model}
                                        onChange = {(e) => setModel(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Manufacturer :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter manufacturer"
                                        name = "manufacturer"
                                        className = "form-control"
                                        value = {manufacturer}
                                        onChange = {(e) => setManufacturer(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Picture URL :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter picture URL"
                                        name = "picture"
                                        className = "form-control"
                                        value = {picture}
                                        onChange = {(e) => setPicture(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateCar(e)} >Submit </button>
                                <Link to="/cars" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddCar
