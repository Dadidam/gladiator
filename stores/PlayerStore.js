import {observable, computed, reaction} from 'mobx';


export default class PlayerStore {
	@observable player = {
	    name: 'Willy'
    };
	@observable level = 1;

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	@computed get levelCount() {
	    return this.level;
    }

	subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			todos => fetch('/api/todos', {
				method: 'post',
				body: JSON.stringify({ todos }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}

	subscribeLocalstorageToStore() {
		reaction(
			() => this.toJS(),
			todos => localStorage.setItem('mobx-react-todomvc-todos', JSON.stringify({ todos }))
		);
	}

	addTodo (title) {
		this.todos.push(new TodoModel(this, Utils.uuid(), title, false));
	}

	changeName(name) {
	    player.name = name;
    }

    changeLevel(level) {
	    this.level = level;
    }
}