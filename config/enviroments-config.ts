import { config as baseconfig } from '../wdio.conf';

export const config = Object.assign(baseconfig, {
   environments: 'dev',
   productStore: 'https://www.demoblaze.com/',
   windowHandle: 'https://demo.automationtesting.in/Windows.html',
   hrms: 'https://account.superworks.com/login/',
   reqresBaseURL: 'https://reqres.in/'
});