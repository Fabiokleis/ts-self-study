import 'reflect-metadata';
import 'dotenv/config'
import '@shared/container';
import { app } from './app';
import { dataSource } from '../typeorm';


dataSource.initialize().then(() => {
  const server = app.listen(8080, () => { 
    console.log('Server started on port 8080!') 
  });
});

