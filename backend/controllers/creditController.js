import Credit from '../models/Credit.js'


export const giveCredit = async (req, res) => {
    const { assignTo_id, user_id, problemId, creditScore ,feedback,isSolved} = req.body;

    try {
        // Find the representative's existing credit record
        const representative = await Credit.findOne({ representative_id: assignTo_id, problem_id: problemId });

        // If no record exists, create a new one
        if (!representative) {
            const credit = new Credit({
                representative_id: assignTo_id,
                user_id,
                problem_id: problemId,
                credit_score: creditScore,
                feedback
            });
            await credit.save();
            return res.json({ representative: credit, success: true, error: false });
        }

        // If record exists, update the credit score
        const prevCreditScore = representative.credit_score || 0;
        if(Number(creditScore) > 10 || Number(creditScore)<0) {
            return res.status(500).json({ message: "credit score b/w (0-10)", success: false, error: true });
        }
        if(!isSolved) {
            return res.status(500).json({ message: "problem is not solved", success: false, error: true });
        }
        const updatedCreditScore = prevCreditScore + Number(creditScore);

        // Update the credit score
        await Credit.updateOne(
            { _id: representative._id },
            { $set: { credit_score: updatedCreditScore } }
        );

        return res.json({ representative: { ...representative.toObject(), credit_score: updatedCreditScore }, success: true, error: false });

    } catch (error) {
        console.error("Error in giveCredit:", error);
        return res.status(500).json({ message: error.message, success: false, error: true });
    }
};

export const getSimilarRep = async (req, res) => {

    try {
        const AllRepresentative = await Credit.find({representative_id : req.params.id})
        return res.json({ AllRepresentative: AllRepresentative, success: true, error: false });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false, error: true });
    }
};