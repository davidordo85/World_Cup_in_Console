import { teams } from './teams/teams.js';
import PointsBasedLeague from './league/PointsBasedLeague.js';
import ShowInConsole from './ShowInConsole/ShowInConsole.js';

const group = new PointsBasedLeague('group', teams);

group.scheduleMatchDays();
group.start();

const show = new ShowInConsole(group.summaries);
