import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Team, TeamResponse } from '../interfaces/team.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class TeamsService {

  private url: string = environments.url;
  private authorization: string = environments.authorization;
  private teamsService: Team[] = [];

  constructor(private httpClient: HttpClient) {
    // this.loadTeams();
  }

  public async loadTeams(): Promise<void> {
    let httpOptions = {
      headers: new HttpHeaders({Authorization: this.authorization})
    };
    let teamsResponse: Team[] = (await this.httpClient.get<TeamResponse>(`${this.url}`, httpOptions).toPromise())?.data ?? [];
    this.teamsService = teamsResponse;
  }

  public get teams(): Team[] {
    return this.teamsService;
  }

  public set team(team: Team) {
    this.teamsService = this.teamsService.map( teamFind => {
      if (teamFind.id === team.id) {
        return team;
      } else {
        return teamFind;
      }
    });
  }

  public removeTeam(team: Team): void {
    this.teamsService = this.teamsService.filter(teamFind => teamFind.id !== team.id);
  }

  public putTeam(team: Team): void {
    let newId = this.teamsService.reduce((maxId, team) => Math.max(maxId, team.id), 0) + 1;
    let newTeam = {...team, id: newId};
    this.teamsService.unshift(newTeam);
  }

}
