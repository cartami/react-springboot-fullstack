import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CarService from '../services/CarService'

const ListCarsComponent = () => {

    const [cars, setCars] = useState([]) //use hook to set state

    //use hook for life cycle methods
    useEffect(() => {

        getAllCars();
    }, [])

    const getAllCars = () => {
        CarService.getCars().then((response) => {
          setCars(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteCar = (carId) => {
       CarService.deleteCar(carId).then((response) =>{
        getAllCars();

       }).catch(error =>{
           console.log(error);
       })
        
    }

    return (
        <div className = "container">
            <h2 className = "text-center"> Available Vehicles </h2>
            <Link to = "/add-car" className = "btn btn-primary mb-2" > Add Car </Link>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th> Car Id </th>
                    <th> Car Model </th>
                    <th> Car Manufacturer </th>
                    <th> Car picture </th>
                </tr>
                </thead>
                <tbody>
                    {
                        cars.map(
                            car =>
                            <tr key = {car.id}> 
                                <td> {car.id} </td>
                                <td> {car.model} </td>
                                <td>{car.manufacturer}</td>
                                <td>{car.id && <img src={car.picture} width='200'/>}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-car/${car.id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteCar(car.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListCarsComponent
