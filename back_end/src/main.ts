
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import charRoutes from './char';
import AuthRoutes from './user';

import cors from 'cors';

// ...

// Activez CORS

const API_BASE_URL = 'mongodb+srv://blavoine:test@cluster0.54fdrky.mongodb.net/'
dotenv.config();

const app: Application = express();

// app.use(cors());
app.use(cors()); 
app.use(bodyParser.json());

app.use(AuthRoutes);
app.use(charRoutes);

// mongodb+srv://blavoine:test@cluster0.54fdrky.mongodb.net/

mongoose.connect(API_BASE_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}as mongoose.ConnectOptions);


mongoose.connection.on('open', () => {
  console.log('Connexion à MongoDB établie avec succès');
});

mongoose.connection.on('error', (err) => {
  console.error(`Erreur de connexion à MongoDB : ${err}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route introuvable' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
