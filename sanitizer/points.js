
function init(){
}

function update(dt){
}

function signal(name, value){
	if(value){
		let amount = this.attribute('Amount');
		this.scene().addScorePoint( amount );
	}
}
	