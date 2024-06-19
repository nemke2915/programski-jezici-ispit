// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent implements OnInit {
  predmeti: any[] = [];
  profesori: any[] = [];

  showPredmetForm = false;
  showProfesorForm = false;

  predmetForm: FormGroup;
  profesorForm: FormGroup;

  selectedPredmet: any;
  selectedProfesor: any;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.predmetForm = this.fb.group({
      id: [''],
      imePredmeta: [''],
      profesor: [null]
    });

    this.profesorForm = this.fb.group({
      id: [''],
      ime: [''],
      prezime: ['']
    });
  }

  ngOnInit(): void {
    this.fetchPredmeti();
    this.fetchProfesori();
  }

  fetchPredmeti(): void {
    this.dataService.getPredmeti().subscribe(
      (response) => {
        this.predmeti = response;
      },
      (error) => {
        console.error('Error fetching predmeti', error);
      }
    );
  }

  fetchProfesori(): void {
    this.dataService.getProfesori().subscribe(
      (response) => {
        this.profesori = response;
      },
      (error) => {
        console.error('Error fetching profesori', error);
      }
    );
  }

  openPredmetForm(predmet: any = null): void {
    this.selectedPredmet = predmet;
    this.predmetForm.reset({
      id: predmet ? predmet.id : '',
      imePredmeta: predmet ? predmet.imePredmeta : '',
      profesor: predmet ? predmet.profesor : null
    });
    this.showPredmetForm = true;
  }

  closePredmetForm(): void {
    this.showPredmetForm = false;
    this.selectedPredmet = null;
  }

  onSubmitPredmet(): void {
    if (this.selectedPredmet) {
      const updatedPredmet = {
        ...this.predmetForm.value,
        id: this.selectedPredmet.id
      };
      this.dataService.updatePredmet(this.selectedPredmet.id, updatedPredmet).subscribe(
        (response) => {
          const index = this.predmeti.findIndex(p => p.id === response.id);
          if (index !== -1) {
            this.predmeti[index] = response;
          }
          this.closePredmetForm();
        },
        (error) => {
          console.error('Error updating predmet', error);
        }
      );
    } else {
      this.dataService.createPredmet(this.predmetForm.value).subscribe(
        (response) => {
          this.predmeti.push(response);
          this.closePredmetForm();
        },
        (error) => {
          console.error('Error creating predmet', error);
        }
      );
    }
  }

  deletePredmet(id: number): void {
    this.dataService.deletePredmet(id).subscribe(
      () => {
        this.predmeti = this.predmeti.filter(p => p.id !== id);
      },
      (error) => {
        console.error('Error deleting predmet', error);
      }
    );
  }

  openProfesorForm(profesor: any = null): void {
    this.selectedProfesor = profesor;
    this.profesorForm.reset({
      id: profesor ? profesor.id : '',
      ime: profesor ? profesor.ime : '',
      prezime: profesor ? profesor.prezime : ''
    });
    this.showProfesorForm = true;
  }

  closeProfesorForm(): void {
    this.showProfesorForm = false;
    this.selectedProfesor = null;
  }

  onSubmitProfesor(): void {
    if (this.selectedProfesor) {
      const updatedProfesor = {
        ...this.profesorForm.value,
        id: this.selectedProfesor.id
      };
      this.dataService.updateProfesor(this.selectedProfesor.id, updatedProfesor).subscribe(
        (response) => {
          const index = this.profesori.findIndex(p => p.id === response.id);
          if (index !== -1) {
            this.profesori[index] = response;
          }
          this.fetchPredmeti();
          this.closeProfesorForm();
        },
        (error) => {
          console.error('Error updating profesor', error);
        }
      );
    } else {
      this.dataService.createProfesor(this.profesorForm.value).subscribe(
        (response) => {
          this.profesori.push(response);
          this.closeProfesorForm();
        },
        (error) => {
          console.error('Error creating profesor', error);
        }
      );
    }
  }
  deleteProfesor(id: number): void {
    this.dataService.deleteProfesor(id).subscribe(
      () => {
        this.profesori = this.profesori.filter(p => p.id !== id);
        this.fetchPredmeti();
      },
      (error) => {
        console.error('Error deleting profesor', error);
      }
    );
  }
}