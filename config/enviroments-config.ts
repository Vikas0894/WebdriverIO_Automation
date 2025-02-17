import { config as baseconfig } from '../wdio.conf';

export const configs = Object.assign(baseconfig, {
   environments: 'dev',
   productStore: 'https://www.demoblaze.com/',
   windowHandle: 'https://demo.automationtesting.in/Windows.html',
   hrms: 'https://account.superworks.com/login/',
   reqresBaseURL: 'https://reqres.in/'
});

export const getPathAndriodApp = (): string => {
   let path = '/app/android/Android_Demo_App.apk';
   return path;
}

export const getPathWDIOApp = (): string => {
   let path = 'app/android/android.wdio.native.app.v1.0.8.apk';
   return path;
}