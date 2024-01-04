import 'module-alias/register';

import { Server } from "./server/Server";

console.log(`

,-----.              ,------.                         ,--.     
|  |) /_,--. ,--.    |  .--. ' ,--,--.,--.  ,--.,---. |  |     
|  .-.  \\  '  /     |  '--'.'' ,-.  | \\  \`  /| .-. :|  |     
|  '--' / \\   '      |  |\\  \\ \\ '-'  | /  /.  \\|   --.|  |.--. 
\`------'.-'  /       \`--' '--' \`--\`--''--'  '--'\`----'\`--''--'  (2024)
        \`---'                                                  
Visit my github profile: https://github.com/AlbaSly

Starting the web service...

`);

/**Run the app */
const bootstrap = new Server();