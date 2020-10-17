const RedisService = require('./redis.service');

const redisService = new RedisService();

const run = async () => {
	try {
		let value;
		// Store a string in Redis
		const isSet = await redisService.set('software engineer', 'orel moshe');
		value = await redisService.get('software engineer');
		console.log(value);
		await redisService.remove('software engineer');

		// Store objects in Redis
		const isHmset = await redisService.hmset('programmer', { name: 'orel moshe', company: 'round trip' });
		value = await redisService.hgetall('programmer', { name: 'orel moshe', company: 'round trip' });
		console.log(value);
		await redisService.remove('programmer');

		//Store objects in Redis
		const isRpush = await redisService.rpush(['programmers', 'orel', 'daniel', 'sergei']);
		value = await redisService.lrange('programmers');
		console.log(value);
		await redisService.remove('programmers');

		await redisService.end(true);
	} catch (error) {
		console.error('error :>> ', error);
	}
};

run();
