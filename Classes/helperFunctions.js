


        function dist(x1, y1, x2, y2) {

            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);

            var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            return d;

        }

        function lerp(a, b, t) {
            var x = a + t * (b - a);
            return x;
        }

        function radians(degrees) {
            return degrees * Math.PI / 180;
        };

        function degrees(radians) {
            return radians * 180 / Math.PI;
        };

        function canvasReset(context) {
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
        
    function compareNumbers(a, b) {
                    return a - b;
                }



function runBeat() {
    beatTracker++;
    
    if (beatTracker>=15) {
     beatTracker=0;
        beat++;
        beatStart=true;
    }
    
    
    if (beatStart==true) {
    if (beat>=32) {
     beat=0;   
    }
    
    if (beat%8==0 || beat%8==7 || beat%8==2) {
     bassDrumHit();   
    }
    
   beatStart=false;
    }
}



function bassDrumHit() {
    
bG.bassDrumHit();
    
}




function fmSynth(noteName, oscType, oscType2, oscType3, oscType4, oscType5, oscType6, interv, freqSpeed, gainLerp, synthVersion) {
       
    
    function impulseResponse( duration, decay, reverse ) {
    var sampleRate = audioCtx.sampleRate;
    var length = sampleRate * duration;
    var impulse = audioCtx.createBuffer(2, length, sampleRate);
    var impulseL = impulse.getChannelData(0);
    var impulseR = impulse.getChannelData(1);

    if (!decay)
        decay = 0.2;
    for (var i = 0; i < length; i++){
      var n = reverse ? length - i : i;
      impulseL[i] = (Math.random() * .5 - .5) * Math.pow(1 - n / length, decay);
      impulseR[i] = (Math.random() * .5 - .5) * Math.pow(1 - n / length, decay);
    }
    return impulse;
}
            this.convolveBuffer = impulseResponse(8,10,false,true);
            this.convolve = audioCtx.createConvolver();
            this.convolve.buffer = this.convolveBuffer;
            
            
            var bufferSize = 4096;
            this.bitCrush = (function() {
    var node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
    node.bits = 16; // between 1 and 16
    node.normfreq = 0.6; // between 0.0 and 1.0
    var step = Math.pow(1/2, node.bits);
    var phaser = 0;
    var last = 0;
    node.onaudioprocess = function(e) {
        var input = e.inputBuffer.getChannelData(0);
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            phaser += node.normfreq;
            if (phaser >= 1.0) {
                phaser -= 1.0;
                last = step * Math.floor(input[i] / step + 0.5);
            }
            output[i] = last;
        }
    };
    return node;
})();
    
    
    
    
   this.n = Note.fromLatin(noteName);
      
    if (synthVersion=="simpleFM") {  
       this.osc = audioCtx.createOscillator();
            this.osc2 = audioCtx.createOscillator();
           /* this.osc2.type="square";
            this.osc.type = "triangle";
        */
            this.osc2.type=oscType;
            this.osc.type = oscType2;
        
        this.gain = audioCtx.createGain();
        this.gain.gain.value = 0;
        this.gain2 = audioCtx.createGain();
            
            this.gain2.gain.value = 1;
            
            this.osc.connect(this.osc2.frequency);
            this.osc2.connect(this.gain);
        this.gain.connect(this.gain2);
        this.gain2.connect(audioCtx.destination);
        
        this.osc.frequency.value = this.n.frequency();
        this.osc2.frequency.value = this.n.add(Interval.fromName(interv)).frequency();
        
        this.osc.start();
        this.osc2.start();
      } else {
          
          
          this.osc = audioCtx.createOscillator();
            this.osc2 = audioCtx.createOscillator();
            this.osc3 = audioCtx.createOscillator();
              this.osc4 = audioCtx.createOscillator();
            this.osc5 = audioCtx.createOscillator();
            this.osc6 = audioCtx.createOscillator();

          
           this.gain = audioCtx.createGain();
            this.gain2 = audioCtx.createGain();
            this.gainMaster = audioCtx.createGain();
            
            
            this.osc.type = oscType;
            this.osc.frequency.value = 20;
            this.osc.start();
            
            
            this.osc2.type = oscType;
            this.osc2.frequency.value = this.osc.frequency.value/6.4;
            this.osc2.start();
            
            console.log(this.osc);
            
            this.osc3.type = "sawtooth";
            this.osc3.frequency.value = this.osc.frequency.value/1.5;
            this.osc3.start();
            
            
            this.osc4.type = "square";
            this.osc4.frequency.value = 20;
            this.osc4.start();
            
            
            this.osc5.type = "square";
            this.osc5.frequency.value = this.osc.frequency.value/6.4;
            this.osc5.start();
            
            this.osc6.type = "sawtooth";
            this.osc6.frequency.value = this.osc.frequency.value/1.5;
            this.osc6.start();
            
            this.osc.connect(this.gain);
            //this.osc2.connect(this.gain);
            this.osc2.connect(this.osc.frequency);
            this.osc3.connect(this.osc.frequency);
            this.gain.connect(this.convolve);
            this.convolve.connect(this.gainMaster);
            this.gainMaster.connect(audioCtx.destination);
          //  this.convolve.connect(this.bitCrush);
            //this.bitCrush.connect(audioCtx.destination);
            
            this.osc4.connect(this.gain2);
            //this.osc2.connect(this.gain);
            this.osc5.connect(this.osc4.frequency);
            this.osc6.connect(this.osc4.frequency);
            this.gain2.connect(this.convolve);
            
            
           
            
          
          
          
          
      }
    
    this.freqSpeed = freqSpeed;
    this.gainLerp = gainLerp;
    this.synthVersion = synthVersion;
    
    this.update = function() {
        if (this.synthVersion=="simpleFM") {
          this.osc2.frequency.value+= this.freqSpeed;
        this.gain.gain.value=lerp(this.gain.gain.value,0,this.gainLerp);
        } else if(this.synthVersion=="platforms") {
            if (this.gain.gain.value>=.001) {
                this.gain.gain.value = lerp(this.gain.gain.value, 0, .05);
                        this.osc.frequency.value = this.osc.frequency.value; 
                        this.osc2.frequency.value = this.osc.frequency.value;
                         this.osc3.frequency.value = this.osc.frequency.value;
                        
                       
                    }
                
                 if (this.gain2.gain.value>=.001) {
                  this.gain2.gain.value = lerp(this.gain2.gain.value, 0, .05);
                     this.osc4.frequency.value = this.osc.frequency.value; 
                        this.osc5.frequency.value = this.osc.frequency.value;
                         this.osc6.frequency.value = this.osc.frequency.value; 
                 }   
        }
    }
    
    
      this.playSound = function(volume, xPos, yPos) {
          
          if (this.synthVersion=="simpleFM") {
             this.osc2.frequency.value= this.n.frequency();
                this.gain.gain.value+=volume;
        
            this.osc.frequency.value = this.n.frequency();
          // this.osc2.frequency.value = this.n.add(Interval.fromName('fifth')).frequency();
        
          
          
          
          } else if (this.synthVersion=="platforms") {
              
              
              if (this.gain.gain.value< this.gain2.gain.value) {
                this.osc.frequency.linearRampToValueAtTime(dMinorScale[ Math.floor( lerp(dMinorScale.length*.5, dMinorScale.length, dist(xPos,yPos,person.xPos,person.yPos) / window.innerWidth) ) ], audioCtx.currentTime + .05);
                } else {
                  this.osc4.frequency.linearRampToValueAtTime(dMinorScale[ Math.floor( lerp(dMinorScale.length*.5, dMinorScale.length, dist(xPos,yPos,person.xPos,person.yPos) / window.innerWidth) ) ], audioCtx.currentTime + .05);
                }
              
              
              
               if (this.gain.gain.value< this.gain2.gain.value) {
                this.gain.gain.value = volume;
                } else {
                    this.gain2.gain.value = volume;  
                }
              
              
              
          }
                
                
            };
    
    

    
}