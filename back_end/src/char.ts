// routes/charRoutes.ts
import express, { Router, Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const API_BASE_URL = 'http://localhost:3000/api/char'

const router: Router = express.Router();

export interface CharDocument extends Document {
  realm: string;
  name: string;
  charClass: string;
  level: number;
  region: string;
}

const CharSchema: Schema = new Schema({
  realm: { type: String, required: true },
  name: { type: String, required: true },
  charClass: { type: String, required: true },
  level: { type: Number, required: true },
  region: { type: String, required: true },
});

const CharModel = mongoose.model<CharDocument>('characters', CharSchema);
// Route pour obtenir un personnage par ID
router.get(API_BASE_URL, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const char = await CharModel.find({ });
    res.status(200).json(char);
  } catch (error) {
    console.error('Erreur lors de la récupération du personnage :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

export default router;
