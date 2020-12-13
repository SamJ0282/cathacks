    
//Input Signal variables
let _enabled = true;

//Node attribute variables
let _jumpLimit;
let _jumpForce;

//working variables
let _physics;
let _jumpCount = 0;


function init(){
	//get the node attributes
    _jumpForce = this.attribute('Jump Force');
    _jumpLimit = this.attribute('Jump Limit');
 
 
	//Get and check the Physics status of this entity
    _physics = this.entity().physics();
    if(_physics && _physics.type() != 'kDynamic'){
        warning('Jump Node only works with [Dynamic] bodies. Enabling by default');

        _physics.setPhysics(true);
        _physics.setType('kDynamic');
    }

}


function start(){

}


function update(dt){

}


function signal(name, value){
	//Check the incoming signals
    if(name == 'Jump' && value){
        //check we have dynamic physics on the entity
        if(_physics){
            //check here if the signal to jump again is valid
            //we need to check we are with the jump limit
            if(_jumpLimit == 0 || _jumpCount < _jumpLimit){
                //calculate the jump force to be applied
                let vel = _physics.linearVelocity();
                if(_jumpForce.x != null){
                	vel.x = _jumpForce.x;
                }
                if(_jumpForce.y != null){
                	vel.y = _jumpForce.y;
                }
                if(_jumpForce.z != null){
                	vel.z = _jumpForce.z;
                }
                
                //apply the jump velocity
                _physics.setLinearVelocity( vel.x, vel.y, vel.z );

				//track the jump count
                _jumpCount++;
            }
        }
    }
    else if(name == 'Reset' && value){
        //Signal to reset the jump so we just reset the 
        //jumpcount variable
    	_jumpCount = 0;
    }
}
	
	