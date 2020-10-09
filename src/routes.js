import React from 'react';
import DefaultLayout from './Containers'

import Dashboard from './Components/Dashboard/Dashboard';

const routes = [
	{path: "/", exact: true, name:"Default", component: DefaultLayout},
	{path: "/dashboard", exact: true, name:"Default", component: Dashboard}
]

export default routes;