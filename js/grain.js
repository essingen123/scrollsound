/**
 * Grain constructor - instantly plays a grain using the settings passed
 * @param {AudioContext} Audio Context object
 * @param {AudioBuffer} audioBuffer
 * @param {AudioNode} destination
 * @param {Number} attack TODO
 * @param {Number} release TODO
 * @param {Number} offset TODO
 */
function grain(context, buffer, destination, attack, release, offset) {

	var source = context.createBufferSource();
	var gain = context.createGain();
	source.buffer = buffer;

	source.connect(gain);
	gain.connect(destination);

	var now = context.currentTime;
	var randomisedOffset = offset + ((Math.random() * 0.3) - 0.15);
	if(randomisedOffset > buffer.duration){
		randomisedOffset = offset - 0.1;
	}else if( randomisedOffset < 0){
		randomisedOffset = 0;
	}
	source.start(now, randomisedOffset, now + attack + release);
	gain.gain.setValueAtTime(0, now);
	gain.gain.linearRampToValueAtTime(1, now + attack);
	gain.gain.linearRampToValueAtTime(0, now + attack + release);
	source.stop(now + attack + release);

	setTimeout(function() {
		gain.disconnect();
	}, (attack + release) * 1000);

}