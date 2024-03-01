import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormComponent } from './team-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Team } from '../commons/interfaces/team.interface';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TeamFormComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;
  let dialogRef: MatDialogRef<TeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamFormComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        FormsModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            conference: 'East',
            division: 'Southeast',
            city: 'Atlanta',
            name: 'Hawks',
            full_name: 'Atlanta Hawks',
            abbreviation: 'ATL'
          }
        },
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close')
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form when team has id', () => {
    const mockTeam: Team = {
      id: 1,
      conference: 'East',
      division: 'Southeast',
      city: 'Atlanta',
      name: 'Hawks',
      full_name: 'Atlanta Hawks',
      abbreviation: 'ATL'
    };
    component.team = mockTeam;
    component.ngOnInit();
    expect(component.teamFormaTitle).toBe('EDITAR EQUIPO');
    expect(component.teamFormGroup.value).toEqual(mockTeam);
  });

  it('should disable id field when team has id -1', () => {
    const mockTeam: Team = {
      id: -1,
      conference: '',
      division: '',
      city: '',
      name: '',
      full_name: '',
      abbreviation: ''
    };
    component.team = mockTeam;
    component.ngOnInit();
    expect(component.teamFormaTitle).toBe('AGREGAR EQUIPO');
    expect(component.teamFormGroup.get('id')?.disabled).toBeTrue();
  });

  it('should close modal when onClickGuardar is called and form is valid', () => {
    const mockTeam: Team = {
      id: 1,
      conference: 'East',
      division: 'Southeast',
      city: 'Atlanta',
      name: 'Hawks',
      full_name: 'Atlanta Hawks',
      abbreviation: 'ATL'
    };
    component.team = mockTeam;
    component.ngOnInit();
    component.onClickGuardar();
    expect(dialogRef.close).toHaveBeenCalledWith(mockTeam);
  });

  it('should not close modal when onClickGuardar is called and form is invalid', () => {
    const mockTeam: Team = {
      id: 1,
      conference: 'East',
      division: 'Southeast',
      city: 'Atlanta',
      name: '',
      full_name: 'Atlanta Hawks',
      abbreviation: 'ATL'
    };
    component.team = mockTeam;
    component.ngOnInit();
    component.onClickGuardar();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
