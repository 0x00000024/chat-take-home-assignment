import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { IndexRoute } from '@routes/index.route';
import { UsersRoute } from '@routes/users.route';
import { GroupsRoute } from '@routes/groups.route';
import { validateEnv } from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new GroupsRoute(), new AuthRoute()]);

app.listen();
