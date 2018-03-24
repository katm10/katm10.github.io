function finalVelocity(initialVel, accel, time) {
	return (initialVel+accel*time);
}

function distanceGA(initialVel, time, accel){
	return initialVel*time +(.5)*accel*time*time;
}

function distanceGV(initialVel, finalVel, time){
	avgVel = (finalVel + initialVel)/2;
	return avgVel*time;
}

