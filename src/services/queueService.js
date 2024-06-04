const amqp = require('amqplib');

class QueueService {
    constructor() {
        this.channel = null;
    }

    async connect() {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        this.channel = await connection.createChannel();
        await this.channel.assertQueue('request_queue', { durable: true });
    }

    async enqueueRequest(request) {
        if (!this.channel) await this.connect();
        this.channel.sendToQueue('request_queue', Buffer.from(JSON.stringify(request)), { persistent: true });
    }

    async consumeRequests(callback) {
        if (!this.channel) await this.connect();
        this.channel.consume('request_queue', async (msg) => {
            const request = JSON.parse(msg.content.toString());
            await callback(request);
            this.channel.ack(msg);
        });
    }
}

module.exports = new QueueService();