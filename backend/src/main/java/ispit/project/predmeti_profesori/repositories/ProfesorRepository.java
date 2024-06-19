package ispit.project.predmeti_profesori.repositories;

import org.springframework.data.repository.CrudRepository;

import ispit.project.predmeti_profesori.entities.Profesor;

public interface ProfesorRepository extends CrudRepository<Profesor, Integer> {
    
}
