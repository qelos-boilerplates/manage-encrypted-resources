import {addMicroFrontend, addGroupedMicroFrontends} from '@qelos/plugin-play'
import { resourceName, resourceNameCapitalized, resourceNamePlural, routeParamKey } from "./shared/config";

addMicroFrontend({
  name: 'Edit ' + resourceNameCapitalized,
  description: `Edit ${resourceName}`,
  url: '/entries/edit.html',
  roles: ['*'],
  route: {
    name: 'edit-' + resourceName,
    path: `edit-${resourceName}/:${routeParamKey}`,
    // @ts-ignore
    navBarPosition: false
  }
});

addGroupedMicroFrontends({
  key: resourceNamePlural,
  iconName: 'box',
  name: resourceNamePlural[0].toUpperCase() + resourceNamePlural.substring(1),
  priority: 1
}, [
  {
    name: 'Show all',
    description: 'List of managed ' + resourceNamePlural,
    url: '/entries/list.html',
    roles: ['*'],
    route: {
      name: resourceNamePlural,
      path: resourceNamePlural,
      navBarPosition: 'top'
    }
  },
  {
    name: 'Create',
    description: 'Add ' + resourceName,
    url: '/entries/create.html',
    roles: ['*'],
    route: {
      name: 'create-' + resourceName,
      path: 'create-' + resourceName,
      navBarPosition: 'top'
    }
  }
])