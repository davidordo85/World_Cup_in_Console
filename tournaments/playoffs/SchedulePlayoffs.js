import CustomizeTeams from '../../teams/customizeTeams/CustomizeTeams.js';
import {
  LOCAL_TEAM,
  AWAY_TEAM,
} from '../../teams/customizeTeams/CustomizeTeams.js';

export default class SchedulePlayoffs extends CustomizeTeams {
  constructor(name, teams = []) {
    super(name, teams);
    this.matchDaySchedule = [];
    this.scheduleMatchDays();
  }

  initSchedule() {
    const matchDay = [];
    const numberMatchPerRound = this.teams.length / 2;
    for (let i = 0; i < numberMatchPerRound; i++) {
      const match = ['Local team', 'away team'];
      matchDay.push(match);
    }
    this.matchDaySchedule.push(matchDay);
  }

  setLocalTeams() {
    const teamNames = this.getTeamNames();
    const maxHomeTeams = this.teams.length - 2;
    let teamIndex = 0;
    this.matchDaySchedule.forEach(matchDay => {
      matchDay.forEach(match => {
        if (teamIndex % 2 === 0) {
          match[LOCAL_TEAM] = teamNames[teamIndex];
        }
        teamIndex += 2;
        if (teamIndex > maxHomeTeams) {
          teamIndex = 0;
        }
      });
    });
  }

  setAwayTeams() {
    const teamNames = this.getTeamNames();
    const maxAwayTeams = this.teams.length - 2;
    const numberAway = this.teams.length - 1;
    let teamIndex = numberAway;
    this.matchDaySchedule.forEach(matchDay => {
      let firstMatchFound = false;
      matchDay.forEach(match => {
        if (!firstMatchFound) {
          firstMatchFound = true;
        }
        if (teamIndex % 2 != 0) {
          match[AWAY_TEAM] = teamNames[teamIndex];
        }
        teamIndex -= 2;
        if (teamIndex < 0) {
          teamIndex = maxAwayTeams;
        }
      });
    });
  }

  setSecondRound() {
    const teamNames = this.getTeamNames();
    const maxTeams = this.teams.length;
    let teamIndex = 0;
    this.matchDaySchedule.forEach(matchDay => {
      matchDay.forEach(match => {
        match[LOCAL_TEAM] = teamNames[teamIndex];
        teamIndex++;
        match[AWAY_TEAM] = teamNames[teamIndex];
        teamIndex++;
        if (teamIndex > maxTeams) {
          teamIndex = 0;
        }
      });
    });
  }

  scheduleMatchDays() {
    this.initSchedule();
    if (this.teams.length >= 16) {
      this.setLocalTeams();
      this.setAwayTeams();
    } else {
      this.setSecondRound();
    }
  }
}
