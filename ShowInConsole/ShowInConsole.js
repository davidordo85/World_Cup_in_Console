import { teams } from '../teams/teams.js';
import PointsBasedLeague from '../league/PointsBasedLeague.js';
import Letter from '../utils/numberToLetter.js';
import shuffle from '../utils/shuffle.js';

export default class ShowInConsole {
  constructor(name) {
    this.name = name;
    this.groups = [];
    this.roundGroups = [];
    this.startTournament();
  }

  organizeTeams() {
    const teamsForGroup = 4;
    teams.shuffle();
    for (var i = 0; i < teams.length; i = i + teamsForGroup) {
      this.groups.push(teams.slice(i, i + teamsForGroup));
    }
  }

  createGroup() {
    this.organizeTeams();
    this.groups.forEach((group, index) => {
      var group = new PointsBasedLeague(`Group ${Letter(index)}`, group);
      this.roundGroups.push(group);
    });
  }

  scheduleTournament() {
    this.createGroup();
    this.roundGroups.forEach(group => {
      group.scheduleMatchDays();
      const teamNames = group.teams.map(team => team.name);
      console.log('                           ');
      console.log(group.name);
      console.log('----------------');
      teamNames.forEach(function (team) {
        console.log(team);
      });
      console.log('                           ');
      group.matchDaySchedule.forEach((matchDay, index = 1) => {
        console.log(`Match day ${index}:`);
        matchDay.forEach(match => {
          const home = match[0];
          const away = match[1];
          console.log(` -${home} vs ${away}`);
        });
        console.log('                           ');
      });
    });
  }

  startTournament() {
    this.scheduleTournament();
    console.log('=====================================');
    console.log('=========== Start WorldCup ==========');
    console.log('=====================================');
    console.log('                           ');
    this.roundGroups.map(group => {
      console.log(group);
    });
  }
}
