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

  public teamFormaTitle: string = 'AGREGAR EQUIPO';

  public teamFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    @Inject(MAT_DIALOG_DATA) public team: Team,
    private formBuilder: FormBuilder) {
      this.teamFormGroup = this.formBuilder.group({
        id: [team.id, Validators.required],
        conference: [team.conference],
        division: [team.division],
        city: [team.city, Validators.required],
        name: [team.name, Validators.required],
        full_name: [team.full_name],
        abbreviation: [team.abbreviation]
      });
      if ( team.id === -1 ) {
        this.teamFormaTitle = 'EDITAR EQUIPO';
        this.teamFormGroup.get('id')?.disable();
      }
  }

  public ngOnInit(): void {
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
