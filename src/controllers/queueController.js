const QueueService = require('../services/queueService');

exports.enqueueRequest = async (req, res) => {
    try {
        const { request } = req.body;
        await QueueService.enqueueRequest({ userId: req.user.id, request });
        res.status(200).json({ message: 'Request enqueued successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};