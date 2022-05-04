const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

 // router for get and create thoughts
router
    .route('/')
        .get(getThoughts)
        .post(createThought);

// get thought by id and either get update or delete
router
    .route('/:thoughtId')
        .get(getSingleThought)
        .put(updateThought)
        .delete(deleteThought);

//get reactions
router
    .route('/:thoughtId/reactions')
        .post(addReaction);

//remove reactions 
router
    .route('/:thoughtId/reactions/:reactionId')
        .delete(removeReaction);

module.exports = router;