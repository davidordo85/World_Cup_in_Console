import { teams } from './teams/teams.js';
import League from './league/League.js';

const group = new League('group', teams);
console.log(group);
