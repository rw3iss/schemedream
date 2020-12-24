/* 

Usage:
-can use the color utitilies standalone:
SchemeDream.colors.desaturate(Color or string/hex, amount);

or can utilize backend library:
let sd = new SchemeDream();
sd.projects.getMostRecent();

*/

import Projects from './Projects';
import Schemes from './Schemes';
import Colors from './Colors';

export default {

    // work with projects
    projects: new Projects(),

    // work with schemes
    schemes: new Schemes(),

    // work with colors
    colors: new Colors()

}
