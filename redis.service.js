const redis = require('redis');

class RedisService {
	static instance;
	client;
	constructor() {
		if (RedisService.instance) {
			return RedisService.instance;
		}
		RedisService.instance = this;
		this.client = redis.createClient();
		this.middlewareConnect();
		this.middlewareError();
	}
	middlewareConnect() {
		this.client.on('connect', () => {
			console.log('You are now connected redis');
		});
	}

	middlewareError() {
		this.client.on('error', (error) => {
			console.error(error);
		});
	}
	// Store a string in Redis
	get(key) {
		return new Promise((resolve, reject) => {
			try {
				this.client.get(key, (err, res) => {
					if (err) return reject(err);
					return resolve(res);
				});
			} catch (error) {
				throw 'get failed';
			}
		});
	}
	// Store a string in Redis
	set(key, value) {
		return new Promise((resolve, reject) => {
			try {
				this.client.set(key, value, (err, res) => {
					if (err) return reject(err);
					return resolve(res);
				});
			} catch (error) {
				throw 'set failed';
			}
		});
	}
	// Store a string in Redis
	remove(key) {
		return new Promise((resolve, reject) => {
			try {
				this.client.del(key, (err, res) => {
					if (res == 1) {
						console.log(`${key} deleted Successfully!`);
						return resolve(res);
					} else {
						console.log(`${key} cannot delete!`);
						return reject(err);
					}
				});
			} catch (error) {
				throw 'remove failed';
			}
		});
	}
	// Store objects in Redis
	hmset(key, value) {
		return new Promise((resolve, reject) => {
			try {
				this.client.hmset(key, value, (err, res) => {
					if (err) return reject(err);
					return resolve(res);
				});
			} catch (error) {
				throw 'hmset failed';
			}
		});
	}
	// Store objects in Redis
	hgetall(key) {
		return new Promise((resolve, reject) => {
			try {
				this.client.hgetall(key, (err, res) => {
					if (err) return reject(err);
					return resolve(res);
				});
			} catch (error) {
				throw 'hgetall failed';
			}
		});
	}
	// Store lists in Redis
	rpush(arr) {
		return new Promise((resolve, reject) => {
			try {
				this.client.rpush(arr, (err, res) => {
					if (err) return reject(err);
					return resolve(res);
				});
			} catch (error) {
				throw 'rpush failed';
			}
		});
	}
	// Store lists in Redis
	lrange(key) {
		return new Promise((resolve, reject) => {
			try {
				this.client.lrange(key, 0, -1, (err, res) => {
					if (err) return reject(err);
					return resolve(res);
				});
			} catch (error) {
				throw 'lrange failed';
			}
		});
	}

	end(flush) {
		return new Promise((resolve, reject) => {
			try {
				this.client.end(flush);
				console.log('logout from redis');
			} catch (error) {
				throw 'end failed';
			}
		});
	}
}

module.exports = RedisService;
