export class Observable {
	constructor() {
		this.observers = []
	}
	subscribe(f) {
		this.observers.push(f)
	}
	notify(data) {
		this.observers.forEach(function (observer) {
			observer(data)
		})
	}
}
