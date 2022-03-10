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
        <div className = "container table-responsive">
            <h2 className = "text-center display-5"> JDM Vehicles </h2>
            <p className = "text-center h5"> Japanese domestic market (JDM) refers to Japan's home market for vehicles. 
            Japanese domestic market vehicles may differ greatly from the cars that Japanese manufacturers build for export 
            and vehicles derived from the same platforms built in other countries. The Japanese car owner looks more toward innovation 
            than long-term ownership which forces Japanese carmakers to refine new technologies and designs first in domestic vehicles. </p>
            <Link to = "/add-car" className = "btn btn-primary mb-2" > Add Car </Link>
            <table 
            className=
            "table table-hover table-secondary table-bordered border-dark align-middle table-striped">
                <thead class="table-light">
                <tr>
                    
                    <th> Car Model </th>
                    <th> Car Manufacturer </th>
                    <th> Car picture </th>
                    <th> Options </th>
                </tr>
                </thead>
                <tbody className='table-success'>
                    {
                        cars.map(
                            car =>
                            <tr key = {car.id}> 
                                
                                <td> {car.model} </td>
                                <td>{car.manufacturer}</td>
                                <td>{car.id && <img src={car.picture} 
                                class="img-fluid" 
                                width='200'
                                alt="car"
                                />}</td>
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
