const redis = require('redis');

class RedisService {
	static instance;
	client;
	defaultTTL = 20; // minutes
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

	expire(key,minutes){
		return new Promise((resolve, reject) => {
			try {
				const ttl = minutes || this.defaultTTL;
				this.client.expire(key, ttl * 60 * 1000);
			} catch (error) {
				throw `expire ${key} failed`;
			}
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

  // ttl = minutes
	setWithTTL(key, value,minutes) {
			return new Promise((resolve, reject) => {
				try {
					const ttl = minutes || this.defaultTTL;
					this.client.set(key, value,'EX', 1000 * 60 * ttl, (err, res) => {
						if (err) return reject(err);
						return resolve(res);
					});
				} catch (error) {
					throw 'set with ttl failed';
				}
			});
		}
	
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
