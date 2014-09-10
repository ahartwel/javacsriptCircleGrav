
        function Player(x, y) {
            
            this.osc = audioCtx.createOscillator();
            this.osc2 = audioCtx.createOscillator();
            this.osc3 = audioCtx.createOscillator();
              this.osc4 = audioCtx.createOscillator();
            this.osc5 = audioCtx.createOscillator();
            this.osc6 = audioCtx.createOscillator();
            
            
            
                
                
                
                
                
                function impulseResponse( duration, decay, reverse ) {
    var sampleRate = audioCtx.sampleRate;
    var length = sampleRate * duration;
    var impulse = audioCtx.createBuffer(2, length, sampleRate);
    var impulseL = impulse.getChannelData(0);
    var impulseR = impulse.getChannelData(1);

    if (!decay)
        decay = 2.0;
    for (var i = 0; i < length; i++){
      var n = reverse ? length - i : i;
      impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
      impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    }
    return impulse;
}
            this.convolveBuffer = impulseResponse(15,10,false);
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
            
            this.gain = audioCtx.createGain();
            this.gain2 = audioCtx.createGain();
            this.gainMaster = audioCtx.createGain();
            
            
            this.osc.type = "sawtooth";
            this.osc.frequency.value = 700;
            this.osc.start();
            
            
            this.osc2.type = "sin";
            this.osc2.frequency.value = this.osc.frequency.value/6.4;
            this.osc2.start();
            
            console.log(this.osc);
            
            this.osc3.type = "sawtooth";
            this.osc3.frequency.value = this.osc.frequency.value/1.5;
            this.osc3.start();
            
            
            this.osc4.type = "sawtooth";
            this.osc4.frequency.value = 700;
            this.osc4.start();
            
            
            this.osc5.type = "sin";
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
            
            
           
            
            
            this.mute = function() {
           this.gainMaster.gain.value=0;
            }
            
            
            this.xPos = x;
            this.yPos = y;
            
            
            
            this.activeG = 0;
            this.d = Math.sqrt(Math.pow(Math.abs(this.xPos - GravClusters[this.activeG].cX), 2) + Math.pow(Math.abs(this.yPos - GravClusters[this.activeG].cY), 2));

            this.r = degrees(Math.atan((GravClusters[this.activeG].cY - this.yPos) / (GravClusters[this.activeG].cX - this.xPos)));
            console.log(this.r);
            this.gravity = .05;
            this.dAcc = 0;
            this.rAcc = .003;
            this.rSpeed = 0;
            this.canvas = document.createElement('canvas');
            this.canvas.width = .045 * window.innerWidth;
            this.canvas.height = this.canvas.width;
            this.falling = false;
            this.context = this.canvas.getContext('2d');

            this.w = (.09 * window.innerWidth) * .3;

            this.halfW = .5 * window.innerWidth;
            this.halfH = .5 * window.innerHeight;

            this.timer = 0;

            this.jumpCounter = 0;

            this.context.fillStyle = "rgb(32,190,154)";
            this.context.arc(.5 * this.canvas.width, .5 * this.canvas.height, .3 * this.canvas.width, 0, 2 * Math.PI, false);
            this.context.fill();

            this.orbs = [];
           this.moveSpeed=0;
          
            
            this.movePlayer = function(direction) {
              if (direction == "right") {
               this.moveSpeed=.8;
                
                  
                 
                                } else {
               this.moveSpeed=-0.8;
                 
              }
                /*
                console.log("1: " + this.r + " " + this.d);
                   this.d = dist(this.xPos,this.yPos,GravClusters[this.activeG].cX,GravClusters[this.activeG].cY);
                  this.r = degrees( Math.asin( (this.yPos - GravClusters[this.activeG].cY )/this.d ));
                 console.log("2: " + this.r + " " + this.d);
                */
            };
            
            for (var i = 0; i < 5; i++) {
                this.orbs[i] = new PlayerOrbs(.48 * this.canvas.width, this.context, this.canvas.width);
                this.orbs[i].display();

            }


            
            this.playnote = function(velocity) {
                if (this.gain.gain.value< this.gain2.gain.value) {
                this.gain.gain.value = velocity;
                } else {
                    this.gain2.gain.value = velocity;  
                }
                
                
            };
            

            this.update = function () {
                    if (this.gain.gain.value>=.001) {
                this.gain.gain.value = lerp(this.gain.gain.value, 0, .05);
                        this.osc.frequency.value = this.osc.frequency.value; 
                        this.osc2.frequency.value = this.osc.frequency.value/8;
                         this.osc3.frequency.value = this.osc.frequency.value/2;
                        
                       
                    }
                
                 if (this.gain2.gain.value>=.001) {
                  this.gain2.gain.value = lerp(this.gain2.gain.value, 0, .05);
                     this.osc4.frequency.value = this.osc.frequency.value; 
                        this.osc5.frequency.value = this.osc.frequency.value/8;
                         this.osc6.frequency.value = this.osc.frequency.value/2; 
                 }
                
                
                  
                if (this.r>360) {
                 this.r-=360;   
                } else if (this.r<0) {
                 this.r = 360 + this.r;   
                }
                
               
                for (var i = 0; i < this.triangleD.length; i++) {
                    this.triangleD[i] += .2;
                    if (this.triangleD[i] > this.dMax) {
                        this.triangleD[i] = this.dMax;
                    }
                    if (this.triangleD[i] < 0) {
                        this.triangleD[i] = Math.random() * this.dMax;
                    }
                    this.triangleR[i] += .5
                    if (Math.random() < .1) {
                        this.triangleD[i] = Math.random() * this.dMax;
                        this.triangleR[i] = Math.random() * 720 - 360;

                    }

                }



                this.activeGrav();

                for (var i = 0; i < this.orbs.length; i++) {
                    this.orbs[i].update();
                }

                this.dAcc += this.gravity;
                this.r += this.rSpeed;
                this.r += this.moveSpeed;
               
                this.moveSpeed = lerp(this.moveSpeed,0,.15);
                
                

                this.rSpeed = lerp(this.rSpeed, 0, this.rAcc);

                this.d -= this.dAcc;

                if (this.d < 5) {
                    this.dAcc=-1*this.dAcc;
                   

                }
                //console.log(this.d);
                this.xPos = GravClusters[this.activeG].cX + Math.cos(radians(this.r)) * this.d;
                this.yPos = GravClusters[this.activeG].cY + Math.sin(radians(this.r)) * this.d;

                this.timer++;

                if (this.timer >= 5) {
                    this.timer = 0;

                }

                if (dist(this.xPos, this.yPos, this.halfW, this.halfH) > .15 * window.innerHeight) {

                    var d = dist(this.xPos, this.yPos, this.halfW, this.halfH);
                    var angle = Math.asin((this.yPos - this.halfH) / d);

                    var smallD = d - (0.15 * window.innerHeight);

                    var oA = angle;

                    var xAdd = Math.cos(oA) * smallD;
                    var yAdd = Math.sin(oA) * smallD;


                    if (this.xPos < this.halfW) {
                        xAdd = Math.abs(xAdd);
                    } else if (this.xPos > this.halfW) {
                        xAdd = Math.abs(xAdd) * -1;
                    }

                    if (this.yPos < this.halfH) {
                        yAdd = Math.abs(yAdd);
                    } else if (this.yPos > this.halfH) {
                        yAdd = Math.abs(yAdd) * -1;
                    }



                    this.addOffset(xAdd, yAdd);


                }
                /*
                if (this.xPos < .2 * window.innerWidth) {
            this.addOffset(Math.abs(this.xPos - (.2 * window.innerWidth)), 0);
        } else if (this.xPos > .8 * window.innerWidth) {
            this.addOffset(-1 * Math.abs(this.xPos - (.8 * window.innerWidth)), 0);
        }

        if (this.yPos < .2 * window.innerHeight) {
            this.addOffset(0, Math.abs(this.yPos - (.2 * window.innerHeight)));
        } else if (this.yPos > .8 * window.innerHeight) {
            this.addOffset(0, -1 * Math.abs(this.yPos - (.8 * window.innerHeight)));
        }
        */

            };

            this.activeGrav = function () {
                var shortest = dist(GravClusters[this.activeG].cX, GravClusters[this.activeG].cY, this.xPos, this.yPos);

                for (var i = 0; i < GravClusters.length; i++) {
                    if (dist(GravClusters[i].cX, GravClusters[i].cY, this.xPos, this.yPos) <= shortest - 10) {
                        this.activeG = i;
                        this.d = Math.sqrt(Math.pow(Math.abs(this.xPos - GravClusters[this.activeG].cX), 2) + Math.pow(Math.abs(this.yPos - GravClusters[this.activeG].cY), 2));


                    }

                }


            };

            this.addOffset = function (x, y) {
                for (var i = 0; i < GravClusters.length; i++) {
                    GravClusters[i].cX += x;
                    GravClusters[i].cY += y;

                    //add particle offsets
                }
                for (var i = 0; i < bG.xPos.length; i++) {
                    bG.xPos[i] += x;
                    bG.yPos[i] += x;
                }
                this.xPos += x;
                this.yPos += y;

            };





            this.dMax = .02 * window.innerWidth;
            this.triangleD = [];
            this.triangleR = [];

            for (var i = 0; i < 3; i++) {

                this.triangleD[i] = Math.random() * this.dMax;

                this.triangleR[i] = i * 120;



            }

            this.centerX = .5 * this.canvas.width;
            this.centerY = .5 * this.canvas.height;





            this.display = function () {
                // if (this.timer==0) {
                //if (Math.random()<.1) {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                //}
                canvasReset(this.context);

                this.context.beginPath();
                this.context.fillStyle = "rgba(255,255,255,1)";
                this.context.shadowBlur = Math.random()*25;
                this.context.shadowColor = "rgb(0,255,255)";
                for (var i = 0; i < this.triangleD.length; i++) {
                    var x = Math.floor(Math.cos(radians(this.triangleR[i])) * this.triangleD[i] + this.centerX);
                    var y = Math.floor(Math.sin(radians(this.triangleR[i])) * this.triangleD[i] + this.centerY);
                    if (i == 0) {
                        this.context.moveTo(x, y);
                    } else {
                        this.context.lineTo(x, y);
                    }

                }

                this.context.fill();


                /*
             
                   this.context.fillStyle = "rgba(20,29,40,.13)";
                
                this.context.arc(.5*this.canvas.width,.5*this.canvas.height,.3*this.canvas.width, 0, 2 * Math.PI, false);
             this.context.fill();
                
                */
                this.context.strokeWidth = 1;
                this.context.strokeStyle = "rgba(80,10,200,.3)";
                for (var i = 0; i < this.orbs.length; i++) {
                    if (i == 0) {
                        this.context.fillStyle = "rgba(40,186,198,.4)";
                    } else if (i == Math.floor(.66 * this.orbs.length)) {
                        this.context.fillStyle = "rgba(200,106,100,.3)";
                    }

                    this.orbs[i].display();
                }
                this.context.fill();

                //}
                mCtx.translate(this.xPos, this.yPos);
                mCtx.drawImage(this.canvas, -.5 * this.canvas.width, -.5 * this.canvas.height);
                canvasReset(mCtx);



            }




        }

        function PlayerOrbs(dMax, context, contextWidth, canvas) {
            this.r = Math.random() * 360;
            this.d = Math.random() * (dMax);
            this.rSpeed = Math.random() * .04;

            this.up = true;

            this.dMax = .8 * dMax;
            this.canvas = canvas;
            this.context = context;
            this.contextWidth = contextWidth;

            this.context.translate(.5 * this.contextWidth, .5 * this.contextWidth);
            this.context.rotate(this.r);
            this.context.translate(this.d, 0);
            this.context.arc(0, 0, 4, 0, 2 * Math.PI, false);
            canvasReset(this.context);
            this.context.fill();

            this.x = 0;
            this.y = 0;
            this.fallCounter
            this.update = function () {
                if (person.dAcc > -.8) {
                    this.r += this.rSpeed;
                    //console.log(this.r);
                    //this.d = Math.random() * this.dMax; 
                    if (this.up) {
                        this.d += .02 * this.dMax;
                    } else {
                        this.d -= .02 * this.dMax;
                    }

                    if (this.d > this.dMax) {
                        this.up = false;
                    }
                    if (this.d < -this.dMax) {
                        this.up = true;
                        if (Math.random() < .2) {
                            this.rSpeed = -1 * this.rSpeed;
                        }
                        if (this.fallCounter != 0) {
                            this.fallCounter = 0;
                            this.x = -1000;
                            this.y = -1000;
                        }
                    }
                } else {
                    this.d = lerp(this.d, 0, .02);

                }

            };



            this.display = function () {
                // if (Math.random()<.3) {




                this.context.beginPath();

                this.context.translate(.5 * this.contextWidth, .5 * this.contextWidth);
                this.context.rotate(this.r);
                this.context.translate(this.d, 0);
                this.context.arc(0, 0, Math.random() * 4, 0, 2 * Math.PI, false);
                this.context.fill();

                canvasReset(this.context);
                // }


            }


        }