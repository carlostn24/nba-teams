import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '../commons/interfaces/team.interface';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css'
})
export class TeamFormComponent implements OnInit {

  public teamFormaTitle: string = 'EDITAR EQUIPO';

  public teamFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    @Inject(MAT_DIALOG_DATA) public team: Team,
    private formBuilder: FormBuilder) {
      this.teamFormGroup = this.formBuilder.group({
        id: [null, Validators.required],
        conference: [null],
        division: [null],
        city: [null, Validators.required],
        name: [null, Validators.required],
        full_name: [null],
        abbreviation: [null]
      });

  }

  public ngOnInit(): void {
    this.teamFormGroup.get('id')?.setValue(this.team.id);
    this.teamFormGroup.get('id')?.setValue(this.team.id);
    this.teamFormGroup.get('conference')?.setValue(this.team.conference);
    this.teamFormGroup.get('division')?.setValue(this.team.division);
    this.teamFormGroup.get('city')?.setValue(this.team.city);
    this.teamFormGroup.get('name')?.setValue(this.team.name);
    this.teamFormGroup.get('full_name')?.setValue(this.team.full_name);
    this.teamFormGroup.get('abbreviation')?.setValue(this.team.abbreviation);
    if ( this.team.id === -1 ) {
      this.teamFormaTitle = 'AGREGAR EQUIPO';
      this.teamFormGroup.get('id')?.disable();
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onClickGuardar(): void {
    this.teamFormGroup.markAllAsTouched();
    if(this.teamFormGroup.valid){
      let teamResult: Team = {
        id: this.teamFormGroup.get('id')?.value,
        conference : this.teamFormGroup.get('conference')?.value,
        division : this.teamFormGroup.get('division')?.value,
        city : this.teamFormGroup.get('city')?.value,
        name : this.teamFormGroup.get('name')?.value,
        full_name : this.teamFormGroup.get('full_name')?.value,
        abbreviation : this.teamFormGroup.get('abbreviation')?.value,

      }
      this.dialogRef.close(teamResult);
    }
  }

}
