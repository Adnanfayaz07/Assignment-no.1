const { startWorker } = require('../src/controllers/workerController');

jest.mock('amqplib/callback_api', () => ({
  connect: (url, callback) => {
    callback(null, {
      createChannel: (channelCallback) => {
        channelCallback(null, {
          assertQueue: (queue, options) => {},
          consume: (queue, msgCallback) => {
    
            msgCallback({ content: Buffer.from('Test message') });
          }
        });
      }
    });
  }
}));

describe('Worker Process', () => {
  it('should start worker process and receive message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    startWorker('example_user');
    expect(consoleSpy).toHaveBeenCalledWith('Worker started for queue: example_user_queue');
    expect(consoleSpy).toHaveBeenCalledWith('Received: Test message');
    consoleSpy.mockRestore();
  });
});