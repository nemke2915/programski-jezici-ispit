package ispit.project.predmeti_profesori.repositories;

import org.springframework.data.repository.CrudRepository;

import ispit.project.predmeti_profesori.entities.Predmet;

public interface PredmetRepository extends CrudRepository<Predmet, Integer> {
    
}
