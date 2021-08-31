import express from 'express';
import UserModel from './UserModel.js';

const router = express.Router();

// get all users
router.get('/', (req, res) => {
    UserModel.find()
        .then(data => res.send(data))
                  
});

// get one user
router.get('/:id', (req, res) => {
    UserModel.findById(req.params)
        .then(data => res.send(data))     
});

// create user 
router.post('/', (req, res) => {
    const { first_name, last_name, sex, age, password } = req.body;
    const newUserModel = new UserModel({ first_name, last_name, sex, age, password });
    newUserModel.save()
        .then(data => res.send({ message: "User created successfully." }));     
});

// update user
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, sex, age, password } = req.body;
    const updatedUser = { first_name, last_name, sex, age, password, _id: id };

    UserModel.findByIdAndUpdate(id, updatedUser, { new: true })
        .then(data => res.send({ message: "User updated successfully." }));
})

// delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndRemove(id)
     .then(data => res.send({ message: "User deleted successfully." }));
})

export default router;