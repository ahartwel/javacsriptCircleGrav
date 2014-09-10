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
    this.y = [];
    
    
    this.platformId = platform;
    this.gravId = grav;
    console.log(this.platformId + " " + grav);
    
    this.xPos=0;
    this.yPos=0;
    this.yPosBuffer = -1 * this.canvas.height;
     this.dis = 0;
    this.rot = 0;
    this.rSpeed = 0;
    this.moveSpeed = 0;
    this.gravity = 0.05;
    this.rAcc = 0;
    this.dAcc = 0;
    this.justStarted = true;
    
    
    this.active = [];
    this.active[0] = 0;
    this.active[1] = 0;
    
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
    this.display = function() {
        
        
        
        
        
    };
    
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
             this.active[1] = i;
         }
         
        
         
      }
       
    
}
        this.cY += yOffset;
        
        
           
    }  
    };
     //----------------------------------------
    this.shit = false;
    this.update = function() {
       if (this.justStarted) {
        
        console.log(this.xPos + " , " + this.yPos);
           
        this.xPos = GravClusters[this.gravId].platforms[this.platformId].xPos;
    this.yPos = GravClusters[this.gravId].platforms[this.platformId].yPos;
         if (this.xPos!==0) {    
        this.justStarted = false;
             
             this.dis = GravClusters[this.gravId].platforms[this.platformId].d;
            this.rot = GravClusters[this.gravId].platforms[this.platformId].r;
           
 console.log(this.xPos + " " + this.yPos + " " + GravClusters[this.gravId].cX + " " + this.rot);
             
             
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
        
    };
    
    
    //----------------------------------------------
    
    
    
    
    this.display = function() {
        
           //  if ((this.xPos < window.innerWidth + this.canvas.width + 50) && (this.xPos > -this.canvas.width - 50)) {
            //        if ((this.yPos < window.innerHeight + this.canvas.width + 50) && (this.yPos > -this.canvas.width - 50)) {
                        /*this.context.moveTo(-.5*this.w, 0);
                this.context.lineTo(.5*this.w, 0);
                this.context.lineWidth = 5;
                */
                            
                canvasReset(mCtx); mCtx.translate(GravClusters[person.activeG].cX,GravClusters[person.activeG].cY);
                mCtx.rotate(radians(this.rot));
                mCtx.translate(this.dis, 0);
                mCtx.rotate(radians(-270));
                //this.context.drawImage(this.platforms[i].canvas, -.5 * this.platforms[i].w, 0);
                        
                        
                        mCtx.drawImage(this.canvas,0,this.yPosBuffer);
                           
                  //  }
              //  }
               canvasReset(mCtx);
        
        
        
    };
    
    //----------------------------------------
    
    
   
    
     //----------------------------------------
    
      this.rotate = function() {
       
            
        this.push();
   
        
       this.context.fillStyle = "rgba(255,0,255,.5)";
    this.context.strokeStyle = "rgba(255,0,255,.5)";
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
        
        
        
    };
    
     //----------------------------------------
    this.rotate();
    
}
    
    
    
    