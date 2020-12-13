

var speed;
var enabled = false;
function init(){
	speed = this.attribute('Speed');
	phys = this.entity().physics();
	if (phys && phys.type() != 'kDynamic') {
		phys = null;
	}else{
		speed = speed.scale(Math.PI/180);
	}
}

function update(dt){
	if(!enabled) return;
	dt = 1 / 60.0; // fixed delta time
	if (!phys) {
		let rot = this.entity().rotation();
		this.entity().setRotation( rot.x + speed.x*dt,
									rot.y + speed.y*dt,
									rot.z + speed.z*dt );	
	}else{
		let vel = phys.angularVelocity();
		vel.x = speed.x != null ? speed.x : vel.x;
		vel.y = speed.y != null ? speed.y : vel.y;
		vel.z = speed.z != null ? speed.z : vel.z;
		phys.setAngularVelocity(vel.x, vel.y, vel.z);
	}
}

function signal(name, value){
	enabled = value;
}
	
	