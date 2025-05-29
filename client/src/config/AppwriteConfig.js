import { Client } from 'appwrite';
import { endpoint, project_id } from './ParamConfig.js';

const client = new Client();
client
    .setEndpoint(endpoint)
    .setProject(project_id)
    
export default client;
 