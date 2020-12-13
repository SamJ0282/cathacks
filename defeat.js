//
let remove;
function init(){
	remove = this.attribute('Remove');
}

function update(dt){
}

function signal(name, value){
	if(value){
		this.emitSignal('Defeat', true);
		let start = this.entity().component('Start');
		start.setCreated(false);
		if(remove){
			this.entity().remove();
		}
	}
}	
	