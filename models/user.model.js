class User {
	User() {
		this.name = '';
	}

	getInfo() {
		return { name: this.name };
	}
}

module.exports = User;
