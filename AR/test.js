		var baseballMass = .145;
		var gravity = -9.80665;

		function finalVelocity(initialVel, accel, time) {
			return (initialVel + accel * time);
		}

		//calculates distance given accel
		function distanceGA(initialVel, time, accel) {
			return initialVel * time + (.5) * accel * time * time;
		}

		//calc dist given velocity
		function distanceGV(initialVel, finalVel, time) {
			var avgVel = (finalVel + initialVel) / 2;
			return avgVel * time;
		}

		//will give position in Aframe's weird int things, gravity  for 
		function findPosition(accel, initVel, initCoor, elapTime) {

			return accel * elapTime * elapTime + initVel * elapTime + initCoor;
		}

		//force applied from phone,  will need to be used separately for x, y and z
		function findForce(accel) {
			var phoneMass = .13;
			return accel * phoneMass;
		}

		//will get acceleration for projectile, pass in force calculated from phone's mass 
		//and the mass of that projectile (ex: pingpong ball, baseball)
		function findAcc(force, mass) {
			return force / mass;
		}

		//calcs projectile's initial velocity given phone's acc, time intvl of acc, mass of proj
		function findProjInitVel(phoneAcc, time, projMass) {
			var initForce = findForce(phoneAcc);
			var accNoGravity = findAcc(initForce, projMass);
			var projInitVel = finalVelocity(0, accNoGravity, time);
			return projInitVel;
		}

		//currently for floating parabolas, will need to overload or otherwise add in phoneHeight for true time
		function findTimeFromYAcc(yAcc, time) {
			var baseballInitVel = findProjInitVel(yAcc, time, baseballMass);
			//assuming floating parabola for now, 
			var timeHitFloor = -baseballInitVel * 2 / gravity;
			//if raised platform initially
			//for reference, eqn is 0 = .5gravity*t^2 + initVel*t + phoneHeight
			/*
			var timeHitFloor1 = (-baseballInitVel+Math.sqrt(baseballInitVel*baseballInitVel-2gravity*phoneHeight))/gravity;
			var timeHitFloor2 = (-baseballInitVel-Math.sqrt(baseballInitVel*baseballInitVel-2gravity*phoneHeight))/gravity;
			var timeHitFloor;
			if(timeHitFloor1 > 0) {
				timeHitFloor = timeHitFloor1;
			} 
			else {
				timeHitFloor = timeHitFloor2;
			}
			*/
			return timeHitFloor;
		}

		//pass in phone's xAcc, yAcc, time intvl of acc
		function findTotXDisp(xAcc, yAcc, time) {
			var initXVel = findProjInitVel(xAcc, time, baseballMass);
			var timeHitFloor = findTimeFromYAcc(yAcc, time);
			var dispX = initXVel * timeHitFloor
			return dispX;
		}


		//function for getting scaled x and y values
		function getValues(xAcc, yAcc, time) {
			var tenth = findTotXDisp(xAcc, yAcc, time) / 10;
			var xvals = new Array(10);
			var yvals = new Array(10);
			var scaledx = new Array(10);
			var scaledy = new Array(10);
			for (var i = 1; i <= 10; i++) {
				scaledx[i] = i;
				xvals[i] = tenth * i
				var xInitVel = findProjInitVel(xAcc, time, baseballMass)
				var yInitVel = findProjInitVel(yAcc, time, baseballMass)
				var tVal = getTfromX(xvals[i], xInitVel)
				yvals[i] = distanceGA(yInitVel, tVal, yAcc)
				scaledy[i] = yvals[i] / tenth
			}
			return [scaledx, scaledy]
		}

		function getTfromX(xval, velocity) {
			return xval / velocity;
		}