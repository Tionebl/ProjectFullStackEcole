
import express, { Router, Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import sha256 from 'crypto-js/sha256'

const router: Router = express.Router();

export interface userDocument extends Document {
  name: string;
  password: string;
  email: string;
  toekn: string;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email:  { type: String, required: true },
    token: { type: String, required: true },
});

const userModel = mongoose.model<userDocument>('user', userSchema);

router.get('/login/:name', async (req: Request, res: Response) => {
    try {
        const userName = req.params.name;
        const users = await userModel.findOne({ email: userName });
        const token = `${userName}-${Number(new Date()).toString(36)}`;
        const updatedUser = await userModel.findByIdAndUpdate(users._id, { token }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la récupération des personnages :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

router.post('/user', async (req: Request, res: Response) => {
  try {

    const userToAdd = {
        name: req.body.name,
        password: sha256(req.body.password).toString(),
        email: req.body.email,
        token: `${req.body.name}-${Number(new Date()).toString(36)}`,
    }
    const newUser = await userModel.create(userToAdd);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du personnage :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

router.post('/logout', async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      const updatedUser = await userModel.findByIdAndUpdate(userId, { token: null }, { new: true });
  
      if (!updatedUser) {
        res.status(404).send('Utilisateur non trouvé');
      } else {
        res.send('Déconnecté');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion de l\'utilisateur :', error);
      res.status(500).send('Erreur de déconnexion');
    }
  });

// router.delete('/char/:id', async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const deletedChar = await CharModel.findByIdAndDelete(id);
//     res.status(200).json(deletedChar);
//   } catch (error) {
//     console.error('Erreur lors de la suppression du personnage :', error);
//     res.status(500).json({ message: 'Erreur interne du serveur' });
//   }
// });

// router.put('/char/:id', async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const updatedChar = await CharModel.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(updatedChar);
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour du personnage :', error);
//     res.status(500).json({ message: 'Erreur interne du serveur' });
//   }
// })




export default router;

