import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TeamsService } from './commons/services/teams.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';

describe('AppComponent', () => {

  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockTeamsService: jasmine.SpyObj<TeamsService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockTeamsService = jasmine.createSpyObj('TeamsService', ['loadTeams', 'removeTeam', 'putTeam']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TeamsService, useValue: mockTeamsService },
        { provide: MatDialog, useValue: mockDialog }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'nba-teams'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nba-teams');
  });

});
