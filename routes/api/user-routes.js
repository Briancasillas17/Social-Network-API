const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

//set up get and post routes

router
    .route('/')
    .get(getAllUsers)
    .post(createUser); 

//set up get and post routes for Id specific routes

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// add friends delete friend
router
    .route('/:userId/friends/:friendId')
        .post(addFriend)
        .delete(removeFriend);

module.exports = router;