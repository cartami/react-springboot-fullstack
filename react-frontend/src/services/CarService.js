import axios from "axios";

const CAR_API_BASE_URL = "http://localhost:8080/api";
class CarService{
    getCars(){
        return axios.get(CAR_API_BASE_URL+"/cars");
     }
 
     addCar(car){
         return axios.post(CAR_API_BASE_URL+"/addcar",car);
     }
 
     getCarById(id){
         return axios.get(CAR_API_BASE_URL+"/car/"+id);
     }
 
     updateCar(car,id){
         return axios.put(CAR_API_BASE_URL+"/car/"+id,car);
     }
 
     deleteCar(id){
         return axios.delete(CAR_API_BASE_URL+"/car/"+id);
     }
}

export default new CarService();