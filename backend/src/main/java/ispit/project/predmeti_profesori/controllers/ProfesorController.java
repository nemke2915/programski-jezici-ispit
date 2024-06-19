package ispit.project.predmeti_profesori.controllers;

import java.util.List;
import java.util.Optional;

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

import ispit.project.predmeti_profesori.entities.Predmet;
import ispit.project.predmeti_profesori.entities.Profesor;
import ispit.project.predmeti_profesori.repositories.ProfesorRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProfesorController {
    
    @Autowired
	private ProfesorRepository repository;
	
	@GetMapping("/profesori")
	public List<Profesor> getAll(){
		return (List<Profesor>) repository.findAll();
	}
	
	@GetMapping("/profesori/{id}")
	public Profesor getOne(@PathVariable int id) {
		return repository.findById(id).orElse(null);
	}
	
	@PostMapping("/profesori")
	public Profesor addOne(@RequestBody Profesor profesor){
		return repository.save(profesor);
	}
	
	@PutMapping("/profesori/{id}")
    public ResponseEntity<Profesor> updateProfesor(@PathVariable Integer id, @RequestBody Profesor profesorDetails) {
        Optional<Profesor> optionalProfesor = repository.findById(id);
        if (optionalProfesor.isPresent()) {
            Profesor existingProfesor = optionalProfesor.get();
            existingProfesor.setIme(profesorDetails.getIme());
            existingProfesor.setPrezime(profesorDetails.getPrezime());
            if (profesorDetails.getPredmeti() != null) {
                existingProfesor.getPredmeti().clear();
                existingProfesor.getPredmeti().addAll(profesorDetails.getPredmeti());
            }
            repository.save(existingProfesor);
            return ResponseEntity.ok(existingProfesor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@DeleteMapping("/profesori/{id}")
	public void deleteOne(@PathVariable int id) {
		repository.deleteById(id);
	}
}
