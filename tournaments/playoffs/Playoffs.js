import SchedulePlayoffs from './SchedulePlayoffs.js';
import {
  LOCAL_TEAM,
  AWAY_TEAM,
} from '../../teams/customizeTeams/CustomizeTeams.js';

export default class Playoffs extends SchedulePlayoffs {
  constructor(name, teams = []) {
    super(name, teams);
    this.summariesPlayoffs = [];
    this.filteredTeamsWin = [];
    this.filteredTeamsLoss = [];
  }

  play(match) {
    const homeGoals = this.generateGoals();
    const awayGoals = this.generateGoals();
    if (homeGoals > awayGoals) {
      return {
        homeTeam: match[LOCAL_TEAM],
        homeGoals,
        awayTeam: match[AWAY_TEAM],
        awayGoals,
        teamWin: match[LOCAL_TEAM],
        teamLose: match[AWAY_TEAM],
      };
    } else {
      if (homeGoals < awayGoals) {
        return {
          homeTeam: match[LOCAL_TEAM],
          homeGoals,
          awayTeam: match[AWAY_TEAM],
          awayGoals,
          teamWin: match[AWAY_TEAM],
          teamLose: match[LOCAL_TEAM],
        };
      } else {
        return this.play(match);
      }
    }
  }

  start() {
    for (const matchDay of this.matchDaySchedule) {
      const matchDaySummary = {
        result: [],
      };
      for (const match of matchDay) {
        const result = this.play(match);
        this.teamsChangeRound(result);
        matchDaySummary.result.push(result);
      }
      this.summariesPlayoffs.push(matchDaySummary);
    }
  }

  teamsChangeRound(result) {
    const teamPassRound = result.teamWin;
    const teamNotPassRound = result.teamLose;
    this.filteredTeamsWin.push(teamPassRound);
    this.filteredTeamsLoss.push(teamNotPassRound);
  }
}
