package com.example.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.model.Car;


@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
	//all crud database methods
	List<Car> findByModel(String model);

}
