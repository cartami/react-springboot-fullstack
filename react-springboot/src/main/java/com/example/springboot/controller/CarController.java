package com.example.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.exception.ResourceNotFoundException;
import com.example.springboot.model.Car;
import com.example.springboot.repository.CarRepository;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CarController {

	@Autowired
	private CarRepository carRepository;
	
	@GetMapping("/cars")
	public List<Car> getCars() {
		return carRepository.findAll();

	}
	//build create car REST API
	@PostMapping("/addcar")
    public Car newStudents(@RequestBody Car car)
    {
		
		return carRepository.save(car);
    }
	
	//get car by id REST API
	@GetMapping("/car/{id}")
	public ResponseEntity<Car> getCarById(@PathVariable int id)
	{
		Car car= carRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException("Vehicle not found"));
		return ResponseEntity.ok(car);                 
	}
	
	@GetMapping("/cars/{model}")
	public List<Car> getCarByModel(@PathVariable String model)
	{
		
		List <Car> cars=carRepository.findByModel(model);
		if(cars.isEmpty())
		{
			System.out.println(new ResourceNotFoundException("Car(s) with the model name: "+ model +" not found"));
		}
		
		return carRepository.findByModel(model);
	}
	
	//update car by REST API
	@PutMapping("/car/{id}")
	public ResponseEntity<Car> updateCar(@PathVariable int id, @RequestBody Car car)
	{
		Car s= carRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException("Car not found"));
	    s.setModel(car.getModel());
	    s.setManufacturer(car.getManufacturer());
	    s.setPicture(car.getPicture());
	    Car updatedCar=carRepository.save(s);
	    return ResponseEntity.ok(updatedCar);
	}
	

	
	@DeleteMapping("/car/{id}")
	public String deleteCar(@PathVariable int id)
	{
		carRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException("Car not found"));
		carRepository.deleteById(id);
	    return "The car with id: "+ id +" is removed from the database.";
	}

}
