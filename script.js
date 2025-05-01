// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all drum pads and audio elements
    const drumPads = document.querySelectorAll('.drum-pad');
    const audioElements = document.querySelectorAll('audio');
    
    // Function to play sound
    function playSound(keyCode) {
        const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        const pad = document.querySelector(`.drum-pad[data-key="${keyCode}"]`);
        
        if (!audio || !pad) return;
        
        try {
            // Reset and play the sound
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
            });
            
            // Add playing class for visual feedback
            pad.classList.add('playing');
        } catch (error) {
            console.error('Error with audio:', error);
        }
    }
    
    // Remove playing class after transition ends
    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        this.classList.remove('playing');
    }
    
    // Handle keyboard events
    window.addEventListener('keydown', (e) => {
        playSound(e.keyCode);
    });
    
    // Handle click events
    document.querySelector('.drums').addEventListener('click', (e) => {
        const pad = e.target.closest('.drum-pad');
        if (pad) {
            const keyCode = pad.getAttribute('data-key');
            playSound(keyCode);
        }
    });
    
    // Add transition end listeners to all pads
    drumPads.forEach(pad => {
        pad.addEventListener('transitionend', removeTransition);
    });
    
    // Preload all audio files
    audioElements.forEach(audio => {
        audio.load();
    });
}); 