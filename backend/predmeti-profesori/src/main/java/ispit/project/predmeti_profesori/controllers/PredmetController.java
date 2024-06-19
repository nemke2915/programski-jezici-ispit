package ispit.project.predmeti_profesori.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import ispit.project.predmeti_profesori.repositories.PredmetRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PredmetController {
    
    @Autowired
	private PredmetRepository repository;
	
	@GetMapping("/predmeti")
	public List<Predmet> getAll(){
		return(List<Predmet>) repository.findAll();
	}
	
	@GetMapping("/predmeti/{id}")
	public Predmet getOne(@PathVariable int id) {
		return repository.findById(id).orElse(null);
	}
	
	@PostMapping("/predmeti")
	public Predmet addOne(@RequestBody Predmet predmet){
		return repository.save(predmet);
	}
	
	@PutMapping("/predmeti/{id}")
	public Predmet updateOne(@PathVariable int id, @RequestBody Predmet predmet) {
		return repository.save(predmet);
	}
	
	@DeleteMapping("/predmeti/{id}")
	public void deleteOne(@PathVariable int id) {
		repository.deleteById(id);
	}
}
