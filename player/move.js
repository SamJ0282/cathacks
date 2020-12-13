//
let enabled = false;
let direction = 0;

let speed;
let speedIncPerSec; //additive
let speedIncPerPoint; //multiplicative
let speedTimeFac = 1;
let speedPointFac = 1;
let speedMaxFac;

let lastPoints = 0;

let followRot;

let phys;

function init() {
	speed = this.attribute('Speed');
	followRot = this.attribute('Follow Rotation');

	speedIncPerSec = this.attribute('Speed % Increase Per Second') / 100;
	speedIncPerPoint = this.attribute('Speed % Increase Per Point') / 100;
	speedMaxFac = this.attribute('Maximum Speed Multiplier');
	if(speedMaxFac == null) speedMaxFac = 9999999;

	phys = this.entity().physics();
	if (phys && phys.type() != 'kDynamic') {
		phys = null;
	}
}


function update(dt) {
	if (!enabled) return;

	speedTimeFac += dt * speedIncPerSec;

	let curPoints = this.scene().currentPoints();
	if (curPoints > lastPoints) {
		speedPointFac *= 1 + speedIncPerPoint * (curPoints - lastPoints);
		lastPoints = curPoints;
	}

	let adjustedSpeed = speed.scale(Math.min(speedMaxFac, speedTimeFac * speedPointFac));

	dt = direction / 60.0; // fixed delta time

	if (!phys) {
		//Get the current position
		let pos = this.entity().position();


		//If following the rotation then adjust the speed vector 
		//along the current rotation
		if (followRot) {
			let quat = this.entity().rotationQuat();
			let mat = Mat4.createRotation(quat);
			adjustedSpeed = Mat4.transformPoint(mat, adjustedSpeed);
		}

		//Calculate the new position	
		let npos = new Vec3(
			pos.x + adjustedSpeed.x * dt,
			pos.y + adjustedSpeed.y * dt,
			pos.z + adjustedSpeed.z * dt
		)

		//Set the new position
		this.entity().setPosition(
			npos.x,
			npos.y,
			npos.z);

	}
	else {
		//get the current velocity  
		let vel = phys.linearVelocity();

		//adjust the velocity based on the speed attribute
		vel.x = speed.x != null ? speed.x : vel.x;
		vel.y = speed.y != null ? speed.y : vel.y;
		vel.z = speed.z != null ? speed.z : vel.z;

		//If following the rotation then adjust the speed vector 
		//along the current rotation
		if (followRot) {
			let quat = this.entity().rotationQuat();
			let mat = Mat4.createRotation(quat);
			vel = Mat4.transformPoint(mat, vel);
		}

		//set the new velocity
		phys.setLinearVelocity(vel.x, vel.y, vel.z);
	}

}


function signal(name, value) {
	//Check the incoming signals
	if (name == 'Enabled') {
		enabled = Math.abs(value) == 1;
		direction = value;
	}
}


	