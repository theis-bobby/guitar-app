//disregard this file

function getDiagram(chord){

	fret.push(chord.fingering.sixth.fret);
	fret.push(chord.fingering.fifth.fret);
	fret.push(chord.fingering.fourth.fret);
	fret.push(chord.fingering.third.fret);
	fret.push(chord.fingering.second.fret);
	fret.push(chord.fingering.first.fret);
	

	var lowest_played_fret = Math.min.apply(null, fret);
	var highest_played_fret = Math.max.apply(null, fret);
	var fret_spaceing = highest_played_fret - lowest_played_fret;
	var col_spaceing = 12 / fret_spaceing;
	var output = '';

	console.log(lowest_played_fret + '      ' + highest_played_fret + '     ' + fret_spaceing + '     ' + col_spaceing);


	for(var i = 0; i < 6; i++){
		var index = 0;
		output += '<div class="row">';

		for(var i = lowest_played_fret; i < highest_played_fret; i++ ){
			if(fret[index] == i && fret[index] == 0){
				output += '<div class=col-xs-'+ col_spaceing +'>0</div>';
			}else if(fret[index] == i && fret[index] == x){
				output += '<div class=col-xs-'+ col_spaceing +'>X</div>';
			}else if(fret[index] == i){
				output += '<div class=col-xs-'+ col_spaceing +'>D</div>';
			}else{
				output += '<div class=col-xs-'+ col_spaceing +'></div>';
			}

			index++;
		}
		output += '</div>';
	}

	return output;
}











