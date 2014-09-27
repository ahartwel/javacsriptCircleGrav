function Rock(w,h, platform, grav) {
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.random()*(w*.5)+(w*.1);
    this.canvas.height = this.canvas.width;
    
    
    this.context = this.canvas.getContext('2d');
    
    this.cX = this.canvas.width/2;
    this.cY = this.canvas.height/2;
    
    this.r = [];
    this.d = [];
    this.x = [];
    this.xNew = [];
    this.y = [];
    this.yNew = [];
    
    
    this.platformId = platform;
    this.gravId = grav;
   
    
    this.xPos=0;
    this.yPos=0;
    this.yPosBuffer = -1 * this.canvas.height;
     this.dis = 0;
    this.rot = 0;
    this.rSpeed = 0;
    this.moveSpeed = 0;
    this.gravity = 0.05;
    this.rAcc = .003;
    this.dAcc = 0;
    this.justStarted = true;
    
    
    this.active = [];
    this.active[0] = 0;
    this.active[1] = 0;
    this.turnPoint = 0;
    
    
    this.turning = false;
    this.animate = false;
    this.hitDirection = "left";
    this.moveDistance = 0;
    
    var length = Math.floor( Math.random() * 8+3);
      
    
    
     for (var i =0; i<length; i++) {
        this.r[i] = (i/length)*360;       
        this.d[i] = Math.random() * (.3*this.canvas.width) + (.2*this.canvas.width);       
        this.x[i] = this.cX + Math.cos(radians(this.r[i])) * this.d[i];
        this.y[i] = (this.canvas.height/2) + Math.sin(radians(this.r[i])) * this.d[i];
       
        
        
        
    }
    
    var stop = false;
    var stopSwitch = false;
    while (stop==false) {
        this.cY++;
         for (var i =0; i<length; i++) {
             
      
        this.y[i]++;
       
             if (this.y[i]>=this.canvas.height) {
              stopSwitch=true;  
                 this.active[0] = i;
                 
             }
        
        
        
    }
        
        if (stopSwitch) {
         stop=true;   
            
        }
        
        
    }

    
    stopSwitch= false;
    stop = false;
    
    while (stop == false) {
     this.r[this.active[0]]+=1;       
        
        var oldX = this.x[ this.active[0] ];
        var oldY = this.y[ this.active[0] ];
        
        this.x[this.active[0]] = this.cX + Math.cos(radians(this.r[this.active[0]])) * this.d[this.active[0]];
        this.y[this.active[0]] = this.cY + Math.sin(radians(this.r[this.active[0]])) * this.d[this.active[0]];
        
        var yOffset = oldY - this.y[ this.active[0] ];
        this.y[this.active[0]]+=yOffset;
      
        
 for (var i =0; i<length; i++) {
     if (i!==this.active[0]) {
         
         this.r[i]+=1;       
              
        this.x[i] = this.cX + Math.cos(radians(this.r[i])) * this.d[i];
        this.y[i] = (this.cY + Math.sin(radians(this.r[i])) * this.d[i]) + yOffset;
         
         if (this.y[i]>=this.y[ this.active[0] ]) {
          stop = true; 
             this.active[1] = i;
         }
         
        
         
      }
       
    
}
        this.cY += yOffset;
        
        
            
        
        
    }
    
    
    
    
     this.context.fillStyle = "rgba(0,255,255,.5)";
    this.context.strokeStyle = "rgba(0,255,255,.5)";
    this.context.beginPath();
    for (var i =0; i<length; i++) {
      
        
        if (i==0) {
         this.context.moveTo(this.x[i],this.y[i]);   
            
        } else {
         this.context.lineTo(this.x[i],this.y[i]);      
            
        }
        
        
        
    }
    this.context.lineTo(this.x[0], this.y[0]);
    this.context.stroke();
    this.context.fill();
    
    
    
     //----------------------------------------

    //----------------------------------------
  
    
    this.push = function() {
        
         var act;
        if (this.x[ this.active[0] ] > this.x[ this.active[1] ]) {
         act = this.active[0];   
        } else {
         act = this.active[1];   
            
        }
        
        
        var stopSwitch= false;
   var stop = false;
    
    while (stop == false) {
     this.r[act]+=1;       
        
        var oldX = this.x[ act ];
        var oldY = this.y[ act ];
        
        this.x[act] = this.cX + Math.cos(radians(this.r[act])) * this.d[act];
        this.y[act] = this.cY + Math.sin(radians(this.r[act])) * this.d[act];
        
        var yOffset = oldY - this.y[ act ];
        this.y[act]+=yOffset;
        
        
 for (var i =0; i<length; i++) {
     if (i!=act) {
         
         this.r[i]+=1;       
              
        this.x[i] = this.cX + Math.cos(radians(this.r[i])) * this.d[i];
        this.y[i] = (this.cY + Math.sin(radians(this.r[i])) * this.d[i]) + yOffset;
         
         if (this.y[i]>=this.y[ act ]) {
          stop = true; 
             if (this.active[0] == act) {
             this.active[1] = i;
             } else {
              this.active[0] = i;   
             }
         }
         
        
         
      }
       
    
}
        this.cY += yOffset;
        
        
           
    }  
    };
    
    
    //----------
    
    
    this.turnLeft = function() {
        
        
        
        
        
        
    };
    
    
    this.turnItRight = function() {
        if (this.turning && this.hitDirection=="right") {
          
         
         var act;
        if (this.x[ this.active[0] ] > this.x[ this.active[1] ]) {
         act = this.active[0];   
        } else {
         act = this.active[1];   
            
        }
        
        
        var stopSwitch= false;
   var stop = false;
    
    while (stop == false) {
     this.r[act]+=1;       
        
        var oldX = this.x[ act ];
        var oldY = this.y[ act ];
        
        this.xNew[act] = this.cX + Math.cos(radians(this.r[act])) * this.d[act];
        this.yNew[act] = this.cY + Math.sin(radians(this.r[act])) * this.d[act];
        
        var yOffset = this.canvas.height - this.yNew[ act ];
        this.yNew[act]+=yOffset;
        
        
 for (var i =0; i<length; i++) {
     if (i!=act) {
         
         this.r[i]+=1;       
              
        this.xNew[i] = this.cX + Math.cos(radians(this.r[i])) * this.d[i];
        this.yNew[i] = (this.cY + Math.sin(radians(this.r[i])) * this.d[i]) + yOffset;
         
         if (this.yNew[i]>=this.yNew[ act ]) {
          stop = true; 
             this.turning=false;
             this.animate=true;
             if (this.active[0] == act) {
             this.active[1] = i;
             } else {
              this.active[0] = i;   
             }
         }
         
        
         
      }
       
    
}
        this.cY += yOffset;
        
        
           
    }   
    
        }
        if (this.animate && this.hitDirection=="right") {
            
           for (var i =0; i<length; i++) {
            this.x[i] = lerp(this.x[i], this.xNew[i],.3);   
            this.y[i] = lerp(this.y[i], this.yNew[i],.3);   
                if (dist(this.x[i], this.y[i], this.xNew[i], this.yNew[i])<.5) {            
                
                 this.animate=false;  
                   
                }
           }
             this.rot+=person.moveSpeed*-1.8;
             this.dis+=0.5;
        }
    };
    
    
    this.turnItLeft = function() {
        if (this.turning && this.hitDirection=="left") {
         
         
         var act;
        if (this.x[ this.active[0] ] > this.x[ this.active[1] ]) {
         act = this.active[1];   
        } else {
         act = this.active[0];   
            
        }
        
        
        var stopSwitch= false;
   var stop = false;
    
    while (stop == false) {
     this.r[act]-=1;       
        
        var oldX = this.x[ act ];
        var oldY = this.y[ act ];
        
        this.xNew[act] = this.cX + Math.cos(radians(this.r[act])) * this.d[act];
        this.yNew[act] = this.cY + Math.sin(radians(this.r[act])) * this.d[act];
        
        var yOffset = this.canvas.height - this.yNew[ act ];
        this.yNew[act]+=yOffset;
        
        
 for (var i =0; i<length; i++) {
     if (i!=act) {
         
         this.r[i]-=1;       
              
        this.xNew[i] = this.cX + Math.cos(radians(this.r[i])) * this.d[i];
        this.yNew[i] = (this.cY + Math.sin(radians(this.r[i])) * this.d[i]) + yOffset;
         
         if (this.yNew[i]>=this.canvas.height) {
          stop = true; 
            
             this.turning=false;
             this.animate=true;
             if (this.active[0] == act) {
             this.active[1] = i;
             } else {
              this.active[0] = i;   
             }
         }
         
        
         
      }
       
    
}
        this.cY += yOffset;
        
        
           
    }   
    
        }
        if (this.animate && this.hitDirection=="left") {
            
           for (var i =0; i<length; i++) {
            this.x[i] = lerp(this.x[i], this.xNew[i],.3);   
            this.y[i] = lerp(this.y[i], this.yNew[i],.3);   
                if (dist(this.x[i], this.y[i], this.xNew[i], this.yNew[i])<.5) {            
                
                 this.animate=false;  
                   
                }
           }
             this.rot+=person.moveSpeed*-1.8;
             this.dis+=0.5;
            
        }
    };
     //----------------------------------------
    this.shit = false;
    this.update = function() {
       if (this.justStarted) {
        
     
        this.xPos = GravClusters[this.gravId].platforms[this.platformId].xPos;
    this.yPos = GravClusters[this.gravId].platforms[this.platformId].yPos;
         if (this.xPos!==0) {    
        this.justStarted = false;
             
             this.dis = GravClusters[this.gravId].platforms[this.platformId].d;
            this.rot = GravClusters[this.gravId].platforms[this.platformId].r;
           

             
            this.rSpeed =  GravClusters[this.gravId].platforms[this.platformId].rSpeed;
                
            this.dis = Math.sqrt(Math.pow(Math.abs(this.xPos - GravClusters[person.activeG].cX), 2) + Math.pow(Math.abs(this.yPos - GravClusters[person.activeG].cY), 2));
        }
        
            
            
        } else {
      
            
            
            if (this.rot>360) {
                 this.rot-=360;   
                } else if (this.r<0) {
                 this.rot = 360 + this.rot;   
                }
                
         
                 this.dAcc += this.gravity;
              
            
                this.rot += this.rSpeed;
             
                this.rot += this.moveSpeed;
               
                this.moveSpeed = lerp(this.moveSpeed,0,.15);
                
        

                this.rSpeed = lerp(this.rSpeed, 0, this.rAcc);
                
                this.dis -= this.dAcc;

                if (this.dis < 5) {
                    this.dAcc=-1*this.dAcc-.05;
                   

                }
                //console.log(this.d);
                this.xPos = GravClusters[this.gravId].cX + Math.cos(radians(this.rot)) * this.dis;
                this.yPos = GravClusters[this.gravId].cY + Math.sin(radians(this.rot)) * this.dis;
          
            
        }
       // this.display();
        
        
        this.collision();
        this.turnItRight();
        this.turnItLeft();
        
    };
    
    
    
    
    //-----------------------------------------
    
    
    this.collision = function() {
        
        
      if (dist(this.xPos, this.yPos, person.xPos, person.yPos)<person.w*1.3) {
          
          
      
      // console.log("collision!!!");  
  
          if (this.turning==false&&this.animate==false) {
              
          if (person.moveSpeed>0 && person.dAcc<.05 && person.dAcc>-.05) {
              
              
        if (this.x[ this.active[0] ] > this.x[ this.active[1] ]) {
         this.turnPoint = this.active[0];   
        } else {
         this.turnPint = this.active[1];   
            
        }
              
                this.hitDirection = "right";
         
              
              this.turning=true;
                 person.moveSpeed=-0.5;
          } else if (person.moveSpeed<0){
            
             this.hitDirection = "left";
              this.turning=true;
              person.moveSpeed=0.5;
          }
          }
          
          
                  
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
        
        
        
        
        
        
        
        
    };
    
    
    
    
    
    
    
    //----------------------------------------------
    
    
    
    
    this.display = function() {
        
           //  if ((this.xPos < window.innerWidth + this.canvas.width + 50) && (this.xPos > -this.canvas.width - 50)) {
            //        if ((this.yPos < window.innerHeight + this.canvas.width + 50) && (this.yPos > -this.canvas.width - 50)) {
                        /*this.context.moveTo(-.5*this.w, 0);
                this.context.lineTo(.5*this.w, 0);
                this.context.lineWidth = 5;
                */
       if ((this.xPos < window.innerWidth + this.canvas.width + 50) && (this.xPos > -this.canvas.width - 50)) {
                  if ((this.yPos < window.innerHeight + this.canvas.width + 50) && (this.yPos > -this.canvas.width - 50)) {  
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
          this.context.fillStyle = "rgba(0,255,255,.5)";
    this.context.strokeStyle = "rgba(0,255,255,.5)";
    this.context.beginPath();
    for (var i =0; i<length; i++) {
      
        
        if (i==0) {
         this.context.moveTo(this.x[i],this.y[i]);   
            
        } else {
         this.context.lineTo(this.x[i],this.y[i]);      
            
        }
        
        
        
    }
    this.context.lineTo(this.x[0], this.y[0]);
    //this.context.stroke();
      
    this.context.fill();
        
          
                canvasReset(mCtx); mCtx.translate(GravClusters[this.gravId].cX,GravClusters[this.gravId].cY);
                mCtx.rotate(radians(this.rot));
                mCtx.translate(this.dis, 0);
                mCtx.rotate(radians(-270));
                //this.context.drawImage(this.platforms[i].canvas, -.5 * this.platforms[i].w, 0);
                        
                        
                        mCtx.drawImage(this.canvas,-.5 * this.canvas.width,this.yPosBuffer);
                        
                        canvasReset(GravClusters[this.gravId].ctx); GravClusters[this.gravId].ctx.translate(GravClusters[this.gravId].cX,GravClusters[this.gravId].cY);
                GravClusters[this.gravId].ctx.rotate(radians(this.rot));
                GravClusters[this.gravId].ctx.translate(this.dis, 0);
                GravClusters[this.gravId].ctx.rotate(radians(-270));
                //this.context.drawImage(this.platforms[i].canvas, -.5 * this.platforms[i].w, 0);
                        
                        
                        GravClusters[this.gravId].ctx.drawImage(this.canvas,-.5 * this.canvas.width,this.yPosBuffer);
        
              
     
               canvasReset(mCtx);
        
                    }
     }
        
    };
    
    //----------------------------------------
    
    
   
    
     //----------------------------------------
    
      this.rotate = function() {
       
            
        this.push();
   
        
       this.context.fillStyle = "rgba(255,0,255,.5)";
    //this.context.strokeStyle = "rgba(255,0,255,.5)";
    this.context.beginPath();
    for (var i =0; i<length; i++) {
      
        
        if (i==0) {
         this.context.moveTo(this.x[i],this.y[i]);   
            
        } else {
         this.context.lineTo(this.x[i],this.y[i]);      
            
        }
        
        
        
    }
    this.context.lineTo(this.x[0], this.y[0]);
    //this.context.stroke();
    this.context.fill();  
        
        
        
    };
    
     //----------------------------------------
    this.rotate();
    
}
    
    
    
    