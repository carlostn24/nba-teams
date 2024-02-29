import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Team } from './commons/interfaces/team.interface';
import { TeamsService } from './commons/services/teams.service';
import { interval } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TeamFormComponent } from './team-form/team-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title: string = 'nba-teams';

  public tableHeaders: string[] = ['id', 'conference', 'division', 'city', 'name', 'full_name', 'abbreviation', 'options'];
  public dataSource = new MatTableDataSource<Team>(this.teams);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog){
  }

  public async ngOnInit(): Promise<void> {
    await this.teamsService.loadTeams();
    this.dataSource.data = this.teams;
    this.dataSource.paginator = this.paginator;
  }

  public get teams(): Team[]{
    return this.teamsService.teams;
  }

  public deleteTeam(team: Team): void {
    this.teamsService.removeTeam(team);
    this.dataSource.data = this.teams;
  }

  public editTeam(team: Team): void {
    let dialogEditTeamRef = this.dialog.open(TeamFormComponent, {
      enterAnimationDuration: '500ms',
      data: team,
    });
    dialogEditTeamRef.afterClosed().subscribe(teamResult => {
      if (teamResult) {
        this.teamsService.team = teamResult;
        this.dataSource.data = this.teams;
      }
    });
  }

  public putTeam(): void{
    let dialogEditTeamRef = this.dialog.open(TeamFormComponent, {
      enterAnimationDuration: '500ms',
      data: {
        id : -1,
        conference: '',
        division: '',
        city: '',
        name: '',
        full_name: '',
        abbreviation: ''
      },
    });
    dialogEditTeamRef.afterClosed().subscribe(teamResult => {
      if (teamResult){
        this.teamsService.putTeam(teamResult);
        this.dataSource.data = this.teams;
      }
    });
  }
}
