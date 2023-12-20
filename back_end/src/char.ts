
import express, { Router, Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

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

router.get('/char', async (req: Request, res: Response) => {
  try {
    const characters = await CharModel.find({});
    res.status(200).json(characters);
  } catch (error) {
    console.error('Erreur lors de la récupération des personnages :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

router.post('/char', async (req: Request, res: Response) => {
  try {
    const newChar = await CharModel.create(req.body);
    res.status(201).json(newChar);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du personnage :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

router.delete('/char/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedChar = await CharModel.findByIdAndDelete(id);
    res.status(200).json(deletedChar);
  } catch (error) {
    console.error('Erreur lors de la suppression du personnage :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

router.put('/char/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedChar = await CharModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedChar);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du personnage :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
})
export default router;

