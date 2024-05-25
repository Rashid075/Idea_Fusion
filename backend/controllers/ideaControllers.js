const Idea=require('../Models/IdeaModel');

const getIdeas = async(req, res)=>{
    const {page=1, limit=5} = req.query
    try{
        const ideas= await Idea.find()
        .populate('createdBy', '_id')
        .sort({createdAt: -1})
        .skip((page-1)* limit)
        .limit(parseInt(limit));

        const total = await Idea.countDocuments();
        res.status(200).json({ideas, total, page: parseInt(page), pages:Math.ceil(total/limit)});
    }catch(error){
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

const getSingleIdea = async(req, res)=>{
    const {id} = req.params;
    try{
        const idea = await Idea.findById(id)
       .populate('createdBy', 'Email');
        if(!idea){
            return res.status(404).json({error:"Idea not found"});
        }
        res.status(200).json(idea);
    }catch(error){
        console.log("Error Occured while getting the single idea");
        res.status(500).json({error:"Internal Server Error"});
    }             
};

const createIdea = async(req, res)=>{
    const {title,domain, technologies, description,  linkedin}= req.body;
    try{
        const idea = new Idea({
            title,
            domain,
            technologies,
            description,
            linkedin,
            createdBy: req.user._id
        })
        await idea.save();
        res.status(201).json(idea);
    }catch(error){
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

const updateIdea = async (req, res) => {
    const { id } = req.params;
    const { title, domain, technologies, description } = req.body;
    try {
        const idea = await Idea.findById(id);
        if (!idea) {
            return res.status(404).json({ error: "Idea not found" });
        }
        if (idea.createdBy.toString() !== req.user.id.toString()) {
            return res.status(401).json({ error: "User not authorized to update this idea" });
        }
        idea.title = title;
        idea.domain = domain;
        idea.technologies = technologies;
        idea.description = description;
        await idea.save();
        return res.status(200).json(idea);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteIdea = async(req, res)=>{
    try{
        const {id} = req.params;
        const idea = await Idea.findById(id);
        if(!idea){
            return res.status(404).json({error:"Not Found"});
        }
        if (idea.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await Idea.findByIdAndDelete(id);
        res.status(200).json({message:"Idea Deleted Successfully"});
    }catch(error){
        console.log("Error Occured while deleting the idea");
        res.status(500).json({error:"Internal Server Error"});
    }
};

const likeIdea = async (req, res) => {
    const { ideaId } = req.params;
    const { userId } = req.user;
    try {
        const idea = await Idea.findById(ideaId);
        if (!idea) {
            return res.status(404).json({ error: "Idea not found" });
        }
        if (idea.likes.includes(userId)) {
            return res.status(400).json({ error: "You have already liked this idea" });
        }
        idea.likes.push(userId);
        await idea.save();
        res.status(200).json({ message: "Idea liked successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const dislikeIdea = async (req, res) => {
    const { ideaId } = req.params;
    const { userId } = req.user;
    try {
        const idea = await Idea.findById(ideaId);
        if (!idea) {
            return res.status(404).json({ error: "Idea not found" });
        }
        if (idea.dislikes.includes(userId)) {
            return res.status(400).json({ error: "You have already disliked this idea" });
        }
        idea.dislikes.push(userId);
        await idea.save();
        res.status(200).json({ message: "Idea disliked successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports={getIdeas, getSingleIdea, createIdea, updateIdea, deleteIdea, likeIdea, dislikeIdea};