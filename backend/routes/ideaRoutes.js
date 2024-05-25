const express=require('express');
const { getIdeas, getSingleIdea, createIdea, updateIdea, deleteIdea, likeIdea, dislikeIdea } = require('../controllers/ideaControllers');
const router=express.Router();
const authMiddleware= require('../middlewares/authMiddleware');


router.get('/',authMiddleware, getIdeas);
router.get('/:id', authMiddleware, getSingleIdea);
router.post('/', authMiddleware, createIdea);
router.put('/:id', authMiddleware, updateIdea);
router.delete('/:id',authMiddleware, deleteIdea);
router.post('/:ideaId/like', authMiddleware, likeIdea);
router.post('/:ideaId/dislike', authMiddleware, dislikeIdea);

module.exports=router;
