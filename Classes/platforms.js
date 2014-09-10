  function Platform(d, r, context, canvas, id, radius, gravId) {

            this.context = context;
            this.canvas = canvas;

            this.xPos = 0;
            this.yPos = 0;

            this.id = id;

            this.d = d;
            this.r = r;
            console.log(this.d);
            this.gravId = gravId;
      
            this.inFront = false;
      
            this.firstIteration = true;
            
            this.rSpeed = lerp(0.1, 1, (this.d / (window.innerWidth * .9)));

            this.w = (this.d / radius) * (600 - 50) + 50;
            if (Math.random()<.5) {
             this.w=this.w*.6;   
            }
            this.h = (this.d / radius) * (250 - 80) + 80;


            this.landCanvas = document.createElement('canvas');
            this.land = this.landCanvas.getContext('2d');
            this.landCanvas.width = this.w;
            this.landCanvas.height = this.h * 1.4;
            this.land.lineWidth = 0;
            this.land.fillStyle = "rgba(0,0,0,.5)";
            this.hasTree = false;
            this.whichTree = 0;
            if (Math.random() < .3) {
                this.hasTree = true;
              if (Math.random() < .05) {  
                  this.tree = new Trees(this.landCanvas.width * 2,  this.landCanvas.width * 2, Math.random() * .5 + .25, this);
                this.tree.createTrunk();
                                       this.whichTree = 0;
                                      } else if(Math.random() < .8) {
                          this.tree = new Tree2(this.landCanvas.width/2,this.landCanvas.height*0.9,this);
                                         this.whichTree = 1;  
                                      } else {
                                        this.tree = new Tree3(this.landCanvas.width/2,this.landCanvas.height*0.9,this);
                                         this.whichTree = 2;     
                                          this.tree.createTree();
                                      }
            }
      
      this.hasRock = false;
      
      if (Math.random()<.3) {
          this.rockNum = rockCounter;
          
          rock[rockCounter] = new Rock(this.landCanvas.width, this.landCanvas.height, this.id, this.gravId);
          rockCounter++;
          this.hasRock = true;
      }
            
            
            this.played = false;
            this.intSet = false;
            this.velocity = lerp(.2, .5, (this.w / (window.innerWidth*.6) ));
            
            this.playNote = function(vel) {
                
              
                if (person.gain.gain.value< person.gain2.gain.value) {
                person.osc.frequency.linearRampToValueAtTime(dMinorScale[ Math.floor( lerp(dMinorScale.length*.5, dMinorScale.length, dist(this.xPos,this.yPos,person.xPos,person.yPos) / window.innerWidth) ) ], audioCtx.currentTime + .05);
                } else {
                  person.osc4.frequency.linearRampToValueAtTime(dMinorScale[ Math.floor( lerp(dMinorScale.length*.5, dMinorScale.length, dist(this.xPos,this.yPos,person.xPos,person.yPos) / window.innerWidth) ) ], audioCtx.currentTime + .05);
                }
                 
                person.playnote(vel);
                
            };
            
            this.checkNote = function() {
              
                if (this.id == person.activeG) {
                   // console.log(this.r  person.r);
                    //  console.log("haha");
              //  console.log(this.r + " " + person.r);
                    if (Math.abs( (this.r) - (person.r) ) < Math.abs(this.rSpeed + person.rSpeed)) {
                      
                        
                       if (this.played==false) {
                        this.playNote(this.velocity);
                       this.played=true;
                       }
                        
                      
                    
                    
                    
                } else {
                 this.played=false;
                    
                }
                
                
                    
                }
                
            };
            

            this.createLand = function () {




                var side = 0;
                var x = 0;
                var startX = 0;
                var startY = 0;
                var y = 0;
                var width = this.w;
                var height = this.h / 1.5;
                var xAdd = xAdd = Math.floor(Math.random() * ((.4 * width) - (.2 * width)) + (.2 * width));;
                var yAdd = Math.floor(Math.random() * (height - .8 * height) + (.8 * height));
                //console.log(yAdd);
                var r1, r2, r3, r4;
                var whichColor = 0;

                var color = "rgba(" + earthColors[whichColor].r + "," + earthColors[whichColor].g + "," + earthColors[whichColor].b + ", .7)";

                this.lineColor = Math.floor(Math.random() * 2);

                this.land.fillStyle = "rgba(" + earthColors[whichColor].r + "," + earthColors[whichColor].g + "," + earthColors[whichColor].b + ", .7)";
                   if (this.firstIteration) {
                this.land.shadowColor = "rgba(0,0,0,1)";
                this.land.shadowBlur = 15;
                   }  else {
                          this.land.shadowColor = "rgba(0,0,0,.3)";
                      this.land.shadowBlur = 3;  
                   }
                for (var i = 0; i < 150 * 4; i++) {



                    if (side > 3) {


                        side = 0;
                        x += xAdd - (Math.random() * (.3 * width));
                        this.land.closePath();
                        this.land.fill();
                       

                        whichColor++;
                        if (whichColor >= 3) {
                            whichColor = 0;
                        }

                        this.land.fillStyle = "rgba(" + earthColors[whichColor].r + "," + earthColors[whichColor].g + "," + earthColors[whichColor].b + ", .7)";
                        //  this.land.stroke();
                        if (this.firstIteration) {
  this.land.shadowColor = "rgba(0,0,0,1)";
                this.land.shadowBlur = 15;
                        }
                        if (x > width) {


                            startX += .2 * width;
                            width = .6 * width;

                            x = startX;
                            y += (Math.random() * .2 + .5) * height;

                            height = .9 * height;
                            xAdd = Math.random() * ((.3 * width) - (.2 * width)) + (.2 * width);
                            yAdd = Math.random() * (height - .8 * height) + (.8 * height);


                        }


                    }

                    r1 = Math.random() * (.8 * height) - (.4 * height);
                    r2 = Math.random() * (.7 * height) - (.35 * height);
                    r3 = Math.random() * (.6 * height) - (.3 * height);
                    r4 = Math.random() * (height) - (.5 * height);
                    switch (side) {
                    case 0:



                        this.land.beginPath();
                        this.land.moveTo(x, y);

                        x += xAdd;

                        //console.log(x);
                        this.land.lineTo(x, y + r1);

                        break;
                    case 1:

                        y += yAdd;

                        this.land.lineTo(x + r2, y + r1);
                        break;
                    case 2:
                        x -= xAdd;

                        this.land.lineTo(x + r2, y + r3);
                        break;
                    case 3:
                        y -= yAdd;
                        this.land.lineTo(x, y);
                        break;

                    }

                    side++;

                }
                this.land.closePath();

                //this.land.rect(0,0,100,100);
                
                this.land.fill();


                /* this.land.strokeStyle = this.land.fillStyle= "rgba(" + earthColors[this.lineColor].r + "," + earthColors[this.lineColor].g + "," + earthColors[this.lineColor].b + ", .6)";
            this.land.moveTo(0, 0);
                this.land.lineTo(this.w, 0);
                this.land.lineWidth = 5;
                 this.land.stroke();
               // this.context.drawImage(this.landCanvas,Math.random()*800,Math.random()*800);
                */
                this.land.fillStyle = "rgba(255,255,255,.1)";
                   if (this.firstIteration) {
                this.land.shadowColor = "rgba(0,0,0,.7)";
                this.land.shadowBlur = 15;
                   } else {
                      this.land.shadowBlur = 0;  
                   }
                       
                var xx = 0;
                var yy = 0;
                var ww = Math.random() * (.05 * this.w);


                while (xx < this.w) {
                    ww = Math.random() * (.02 * this.w);

                    if (Math.random() < .05) {
                        this.land.rect(xx, yy, ww, Math.random() * this.h * 1.3);
                    } else {
                        this.land.rect(xx, yy, ww, Math.random() * this.h / 3);
                    }
                     if (Math.random()<.05) {
                         this.land.fill();
                     }
                         
                         xx += ww * Math.random() - 0.3;


                }
                this.land.fill();
               

                 side = null;
                x = null;
                startX = null;
                startY = null;
                y = null;
                width = null;
                height = null;
                xAdd = null;
                yAdd = null;
                //console.log(yAdd);
                r1 = null;
                r2 = null;
                r3 = null;
                r4 = null;
                
                whichColor = null;

               color = null;
                
                this.firstIteration = false;
                
            };

            this.createLand();
      this.firstIteration = true;
            this.createLand();
          
            this.createLand();
      
      
        this.blackData = this.land.getImageData(0,0,this.landCanvas.width, this.landCanvas.height);
     
      var i=0;
     
     while(i<this.blackData.data.length) {
          
         
          if (this.blackData.data[i+3] >= 50) {
          this.blackData.data[i] = 0;
        this.blackData.data[i+1] = 0;
          this.blackData.data[i+2] = 0;
          this.blackData.data[i+3] = 50;
        
            
              
          } else {
         
          }
         
         
         i+=4;
      }     
      
           
        
            this.colorData = this.land.getImageData(0,0,this.landCanvas.width, this.landCanvas.height);
        var newCanvas2 = document.createElement('canvas');
            newCanvas2.width = this.landCanvas.width;
            newCanvas2.height = this.landCanvas.height;
            var newContext2 = newCanvas2.getContext('2d');      
      
             this.land.clearRect(0,0,this.landCanvas.width, this.landCanvas.height);
           newContext2.putImageData(this.blackData,0,0); 
           //this.land.putImageData(this.blackData,0,0);
                
            this.land.drawImage(newCanvas2,0,0);
            
            var x = .01*newCanvas2.width;
            var y = .01*newCanvas2.height;
            var w = .98*newCanvas2.width;      
            var h = .98*newCanvas2.height;      
      
            for (var i = 0; i<=25; i++) {
            this.land.drawImage(newCanvas2,x,0,w,h);
                
                x+=.01*newCanvas2.width;
                w-=.02*newCanvas2.width;
                h-=.02*newCanvas2.height;
           
                
            }
            
            var newCanvas = document.createElement('canvas');
            newCanvas.width = this.landCanvas.width;
            newCanvas.height = this.landCanvas.height;
            var newContext = newCanvas.getContext('2d');
            newContext.putImageData(this.colorData,0,0); 
            
            this.land.drawImage(newCanvas, .02 * this.landCanvas.width,0,.96*this.landCanvas.width,.96*this.landCanvas.height);
            
            
            this.update = function() {
                 this.checkNote();
              if (this.hasTree) {
                 this.tree.update();
              }
                
                
               /* if (this.d>person.d+15) {
                 this.inFront = false;   
                    
                } else {
                 this.inFront = true;   
                    
                }
                */
                
                if (this.r>360) {
                 this.r-=360;   
                } else if (this.r<0) {
                 this.r = 360 + this.r;   
                }
            }
            
            
            this.updateTree = function() {
             this.tree.update();   
                
            };
      
        
      
            this.displayRock = function() {
                
              if (this.hasRock) {
                
                //  rock[this.rockNum].update();
                
               this.context.drawImage(rock[this.rockNum].canvas,0,-1 * rock[this.rockNum].canvas.height);   
                  
                  
              }
                
                
                
            };
                
            this.displayTree = function() {
                      
                        if (this.hasTree) {
                                
                                switch(this.whichTree) {
                           case 0:
                                this.tree.display();
                            this.context.drawImage(this.tree.canvas3, Math.floor(-.75 * this.w), -1 * this.tree.canvas.height);
                                        break;
                          case 1:
                                        this.tree.display();
                                 this.context.drawImage(this.tree.canvas, Math.floor(-.3 * this.w), -1 * this.tree.canvas.height);  
                                        break;
                            case 2:
                                         this.tree.display();
                              this.context.drawImage(this.tree.canvas, Math.floor(-.3 * this.w), -1 * this.tree.canvas.height);    
                                        break;
                                
                            }
                        }
                
                
            };
            
            
            


            this.display = function () {

                   
            
            



                if ((this.xPos < window.innerWidth + this.h + 50) && (this.xPos > -this.h - 50)) {
                    if ((this.yPos < window.innerHeight + this.h + 50) && (this.yPos > -this.h - 50)) {
                        /*this.context.moveTo(-.5*this.w, 0);
                this.context.lineTo(.5*this.w, 0);
                this.context.lineWidth = 5;
                */
                            
                this.context.translate(.5 * this.canvas.width, .5 * this.canvas.height);
                this.context.rotate(radians(this.r));
                this.context.translate(this.d, 0);
                this.context.rotate(radians(-270));
                //this.context.drawImage(this.platforms[i].canvas, -.5 * this.platforms[i].w, 0);
                        
                        
                        this.context.drawImage(this.landCanvas, Math.floor(-.5 * this.w), 0);
                            this.displayTree();
                            this.displayRock();
                    }
                }
                canvasReset(this.context);

            
            };
            
            this.collisionDetection = function () {
                
                
                
                
                
                this.r += this.rSpeed;

                this.xPos = GravClusters[this.gravId].cX + Math.cos(radians(this.r)) * this.d;
                this.yPos = GravClusters[this.gravId].cY + Math.sin(radians(this.r)) * this.d;



                if (dist(this.xPos, this.yPos, person.xPos, person.yPos) < person.canvas.width + 200) {

                    var aX = this.xPos + (Math.cos(radians(this.r + 90)) * (.51 * this.w));
                    var aY = this.yPos + (Math.sin(radians(this.r + 90)) * (.51 * this.w));

                    var bX = this.xPos - (Math.cos(radians(this.r + 90)) * (.51 * this.w));
                    var bY = this.yPos - (Math.sin(radians(this.r + 90)) * (.51 * this.w));
                    /*
    mCtx.beginPath();
    mCtx.strokeStyle="rgb(255,255,255)";
   
    mCtx.moveTo(aX,aY);
    mCtx.lineTo(this.xPos,this.yPos);
       mCtx.stroke();
    mCtx.strokeStyle="rgb(200,255,170)";
    mCtx.strokeWidth=5;
    mCtx.moveTo(bX,bY);
    mCtx.lineTo(this.xPos,this.yPos);
    
                    mCtx.stroke();
*/
                    //if (this.r>-180) {
                    //if (((player.xPos<=aX)&&(player.xPos>=bX)) || (player.yPos<=aY)&&(player.yPos>=bY)) {
                    var d = dist(bX, bY, person.xPos, person.yPos);
                    var c = dist(aX, aY, person.xPos, person.yPos);
                    var x = lerp(bX, aX, d / (d + c));
                    var y = lerp(bY, aY, d / (d + c));
                    //console.log(d);
                    if (dist(person.xPos, person.yPos, x, y) <= person.w * .8) {
                    
                      
                        
                        if (person.dAcc > 0) {
                            if (person.falling) {
                                person.dAcc = 2;
                            } else {
                                person.dAcc = -.2 * person.dAcc;
                            }

                            person.rSpeed = lerp(person.rSpeed, this.rSpeed, .95);
                           
                            
                            person.d += .1;

                            person.jumpCounter = 0;
                        }

                    }
                }


                //}

                /*
    } 
    else {
      if (((player.xPos>=aX)&&(player.xPos<=bX)) || (player.yPos>=aY)&&(player.yPos<=bY)) {
        var d = dist(bX, bY, player.xPos, player.yPos)-15;
        var c = dist(aX, aY, player.xPos, player.yPos);
        var x = lerp(bX, aX, d/(d+c));
        var y = lerp(bY, aY, d/(d+c));
        if (dist(player.xPos, player.yPos, x, y)<=player.w) {
        player.moveRight(this.rSpeed);
          player.collision=true;
            
            console.log(this.r);
            
        }
      }
    }
    
    */

            };


        }