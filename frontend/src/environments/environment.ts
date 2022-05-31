import EnvironmentInterface from './environment-interface';


export const environment: EnvironmentInterface = {
    production: false,
    serverUrl: 'http://localhost:5000',
    delayBetweenRequestsToCrb: 2 * 1000
};
