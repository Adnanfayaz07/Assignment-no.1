const QueueService = require('../services/queueService');

exports.processRequests = async () => {
    await QueueService.consumeRequests(async (request) => {
        // Process the request here
        console.log('Processing request:', request);
    });
};