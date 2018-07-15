window.onload = function() {
	var steps = 0;
	
	var puzzle = {
    MassOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() { return Math.random()-.5; }).concat(0),
    randHole: 15,
    isCompleted: function() { 
	return !this.MassOrder.some(function(item, i) { return item > 0 && item-1 !== i; }); 
	},
    Move: {up: 4, left: 1, down: -4, right: -1},
    go: function(move) {
      var index = this.randHole + move;
      if (!this.MassOrder[index]) return false;
      if (move === this.Move.left || move === this.Move.right)
        if (Math.floor(this.randHole/4) !== Math.floor(index/4)) return false;
      this.swap(index, this.randHole);
	  steps++;
	  calc_numb.innerHTML = steps;
	  if(steps%10 == 0) alert("Between every turn there should be a breaker over the game where I can place an advertisement (place for advertisement)");
      this.randHole = index;
      return true; },
    swap: function(k1, k2) { var t = this.MassOrder[k1]; this.MassOrder[k1] = this.MassOrder[k2]; this.MassOrder[k2] = t; },
    solvable: function(a) {
      for (var kDisMassOrder = 0, i = 1, len = a.length-1; i < len; i++)
        for (var j = i-1; j >= 0; j--) if (a[j] > a[i]) kDisMassOrder++;
      return !(kDisMassOrder % 2); } 
	  };	  
	  
	  
  if (!puzzle.solvable(puzzle.MassOrder)) puzzle.swap(0, 1);
  var calc = document.body.appendChild(document.createElement('div'));
  calc.className = "calc";
  var calc_text = calc.appendChild(document.createElement('div'));
  calc_text.className = "calc_text";
  calc_text.innerHTML = "Your turns : ";
  var calc_numb = calc.appendChild(document.createElement('div'));
  calc_numb.className = "calc_numb";
  calc_numb.innerHTML = steps;
  var box = document.body.appendChild(document.createElement('div'));
  box.className = "main";
  for (var i = 0; i < 16; i++) {
	  var puzz = box.appendChild(document.createElement('div'));
	  puzz.className = "puzz";
	  puzz.id = i;
	  puzz.onclick = function(){
    if (!puzzle.isCompleted()) {
	if(this.id == (puzzle.randHole-1)){
	if (puzzle.go(puzzle.Move['right'])) draw();
	}
	if(this.id == (puzzle.randHole+1)){
	if (puzzle.go(puzzle.Move['left'])) draw();
	}
	if(this.id == (puzzle.randHole+4)){
	if (puzzle.go(puzzle.Move['up'])) draw();
	}
	if(this.id == (puzzle.randHole-4)){
	if (puzzle.go(puzzle.Move['down'])) draw();
	}
	if (puzzle.isCompleted()) {
        box.style.backgroundColor = "green";
		window.removeEventListener('keydown', arguments.callee); 
	}
	}
  };
  }
  window.addEventListener('keydown', function(e) {
    if (puzzle.go(puzzle.Move[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {
      draw(); if (puzzle.isCompleted()) {
        box.style.backgroundColor = "green";
        window.removeEventListener('keydown', arguments.callee); 
		}}});

  draw();
  function draw() {
    for (var i = 0, tile; tile = box.childNodes[i], i < 16; i++) { 
	  tile.textContent = puzzle.MassOrder[i];
      tile.style.visibility = puzzle.MassOrder[i] ? 'visible' : 'hidden';} 
	  };  	
  };
  