

        
        function BackgroundOrbs(id) {
            this.centerX = .5*window.innerWidth;  
            this.centerY = .5 * window.innerHeight;  
             this.d = Math.random() * window.innerWidth;
            this.r = Math.random() * 360;
            this.id = id;
            
            this.explosion = false;
            this.explosiondisplay = false;
                 this.hold = false;
            this.explosionCounter=0;
            this.explosionMax=Math.random()*120;
            this.fire = [];
            for (var i =0; i <=Math.random()*10+5;i++) {
                this.fire[i] = [];
             this.fire[i].xPos=0;   
             this.fire[i].yPos=0;   
             this.fire[i].xSpeed=Math.random()*40-20;   
             this.fire[i].ySpeed=Math.random()*40-20; 
                
            }
            
            
            this.size = Math.random()*(window.innerWidth*0.01);
            
            this.speed = Math.random()+1;
            
            
            this.reset = function() {
                this.centerX = .5*window.innerWidth;  
            this.centerY = .5 * window.innerHeight;  
             this.d = Math.random() * window.innerWidth;
            this.r = Math.random() * 360;
            
            this.explosion = false;
            this.explosiondisplay = false;
            this.hold = false;
                
            this.explosionCounter=0;
            this.explosionMax=Math.random()*120;
            this.fire = [];
            for (var i =0; i <=Math.random()*10+5;i++) {
                this.fire[i] = [];
             this.fire[i].xPos=0;   
             this.fire[i].yPos=0;   
             this.fire[i].xSpeed=Math.random()*40-20;   
             this.fire[i].ySpeed=Math.random()*40-20; 
                
            } 
                
                
                
                
            };
            
            
            this.update = function() {
               if (this.hold==false) {
                 
                this.size = Math.random()*(window.innerWidth*0.01);
                this.d-=this.speed;
               this.r+=person.rSpeed;
                
                this.xPos = Math.cos(radians(this.r)) * this.d+GravClusters[person.activeG].cX;
            this.yPos = Math.sin(radians(this.r)) * this.d+GravClusters[person.activeG].cY;
                
                if (dist(GravClusters[person.activeG].cX, GravClusters[person.activeG].cY,this.xPos,this.yPos)<=5) {
                    this.hold = true;
                    this.d = (Math.random() * window.innerWidth*2) - (window.innerWidth*.25) ;
            this.r = Math.random() * 360;
            
             
            
            this.xPos = Math.cos(radians(this.r)) * this.d+GravClusters[person.activeG].cX;
            this.yPos = Math.sin(radians(this.r)) * this.d+GravClusters[person.activeG].cY;
            
                    
                    
                }
                   
               } else {
               
               }
                
                if (this.explosion) {
                   for (var i =0; i <this.fire.length;i++) {
                    
             this.fire[i].xPos=GravClusters[person.activeG].cX;   
             this.fire[i].yPos=GravClusters[person.activeG].cY;  
                       bG.synth.playSound( ((this.size)/(window.innerWidth*0.01)*.8)/15 );
             this.explosion=false;
                       this.explosiondisplay= true;
                       this.hold=false;
            }
                }
                    
                    if(this.explosiondisplay) {
                         this.explosionCounter++;
                          if (this.explosionCounter>=this.explosionMax) {
                               this.explosiondisplay= false; 
                              this.explosionCounter=0;
                              this.xPos = Math.cos(radians(this.r)) * this.d;
            this.yPos = Math.sin(radians(this.r)) * this.d;
                           this.reset();
                          }  
                        
                        for (var i =0; i <this.fire.length;i++) {
                        this.fire[i].xPos+=this.fire[i].xSpeed;
                        this.fire[i].yPos+=this.fire[i].ySpeed;
                          this.fire[i].xSpeed= ((Math.random() * .38 - .16) +.8) * this.fire[i].xSpeed ;   
             this.fire[i].ySpeed= ((Math.random() * .18 - .09) +.9) * this.fire[i].ySpeed;   
                             
                           
                             
                         }
                    }
                    
                
                if (Math.random()<0.01) {
                // this.reset();   
                }
                
            };
            
            
            
            this.explode = function() {
                
             this.explosion = true;   
                
            }
            
            this.display = function() {
             
            bCtx.closePath();
            bCtx.beginPath();
            bCtx.arc(this.xPos,this.yPos,this.size,0,2*Math.PI, false);
            bCtx.fill();
            bCtx.closePath();
         
                if(this.explosiondisplay) {
                    

            
                    
                        
                        bCtx.fillStyle = "rgba(110,20,150,.3)";
                      bCtx.beginPath();   
                    for (var i =0; i <this.fire.length;i++) {
                    
                           
                           bCtx.arc(this.fire[i].xPos,this.fire[i].yPos,5,0,2*Math.PI, false);
                 bCtx.moveTo(GravClusters[person.activeG].cX, GravClusters[person.activeG].cY);  
                    
                    }
                               bCtx.fill();
                    
                    
                  
                   
                    bCtx.fillStyle = "rgba(226,180,150,.1)";
            bCtx.closePath();
                    }
                
            }
            
            
            
        }
        

        function Background() {
            
            
          this.synth = new fmSynth("G2", "triangle","", "", "", "", "square", "fifth", .03, .05, "simpleFM");
            
            this.xPos = [];
            this.yPos = [];
            this.r = [];
            this.g = [];
            this.b = [];
            this.a = [];
            for (var i = 0; i < 25; i++) {

                this.xPos[i] = Math.random() * window.innerWidth;
                this.yPos[i] = Math.random() * window.innerHeight;

                this.r[i] = Math.floor(Math.random() * 255);
                this.g[i] = Math.floor(Math.random() * 255);
                this.b[i] = Math.floor(Math.random() * 255);
                this.a[i] = Math.random();
            }

            bCtx.rect(0, 0, window.innerWidth, window.innerHeight);
            bCtx.fillStyle = "rgb(0,0,0)";
            bCtx.fill();
            
            this.orbs = [];
            
            for (var i = 0; i<Math.random()*75+30;i++) {
             this.orbs[i] = new BackgroundOrbs(i);
             
            }
            
            
            
            
            this.bassDrumHit = function() {
    
                for (var i =0; i<this.orbs.length;i++) {
                        if (this.orbs[i].hold) {
                            this.orbs[i].explode();  
      
                        }
                    }
                };
            
            
            
       
            
            
            this.update = function () {
                this.synth.update();
          
                
                for (var i =0; i <this.orbs.length; i++) {
                 this.orbs[i].update();   
                    
                }
                /*   
                for (var i =0; i<this.xPos.length;i++) {
                 this.yPos[i]=lerp(this.yPos[i],GravClusters[person.activeG].cY,.02);
                 this.xPos[i]=lerp(this.xPos[i],GravClusters[person.activeG].cX,.02);
                    
                     if (Math.random()<.1) {
                      this.xPos[i]+=Math.random()*15-7.5;   
                     }
                    
                    this.r[i] +=1;      
            this.g[i] +=1;      
            this.b[i] +=1;
                    
                    if ((this.r[i]>255) || (this.g[i]>255) || (this.b[i]>255)) {
                         this.r[i] = Math.floor( Math.random()*255 );        
            this.g[i] = Math.floor( Math.random()*255 );        
            this.b[i] = Math.floor( Math.random()*255 );
                        
                    }
                    
                    if (dist(this.xPos[i],this.yPos[i],GravClusters[person.activeG].cY,GravClusters[person.activeG].cX)<20) {
                         this.xPos[i]=Math.floor(Math.random()*window.innerWidth);
                this.yPos[i] = Math.floor(Math.random()*window.innerHeight);
                this.xPos[i] = Math.floor(Math.random()*window.innerWidth);
                
            this.r[i] = Math.floor( Math.random()*255 );        
            this.g[i] = Math.floor( Math.random()*255 );        
            this.b[i] = Math.floor( Math.random()*255 );        
           this.a[i] = Math.random();
                        
                    }
                  */


            }

            
            this.mute = function() {
                
             this.synth.gain2.gain.value = 0;   
            }
            
            this.display = function () {
                
                var gradient = bCtx.createRadialGradient(GravClusters[person.activeG].cX, GravClusters[person.activeG].cY,5,GravClusters[person.activeG].cX, GravClusters[person.activeG].cY,.5*window.innerWidth);
                gradient.addColorStop(0, centerColors[1]);
                gradient.addColorStop(.6, centerColors[2]);
                
                
                bCtx.fillStyle = gradient;
                bCtx.fillRect(GravClusters[person.activeG].cX - (.5*window.innerWidth), GravClusters[person.activeG].cY - (.5*window.innerHeight), window.innerWidth, window.innerHeight);
                
                     bCtx.fillStyle = "rgba(0,0,0,.05)";
                 bCtx.rect(0,0,window.innerWidth, window.innerHeight);   
                 bCtx.fill(); 
                
                
                  bCtx.fillStyle = "rgba(0,0,0,.4)";
                    bCtx.beginPath();
                var i =0;
                while (i<Math.random()*200) {
                   
                    bCtx.rect(Math.random()*window.innerWidth, Math.random() * window.innerHeight, Math.random()* 50, Math.random()*50);
                    i++;
                    
                }
                bCtx.fill();
                
                   bCtx.fillStyle = "rgba(226,180,150,.1)";
                for (var i =0; i <this.orbs.length; i++) {
                 this.orbs[i].display();   
                    
                }
                /* bCtx.clearRect(0,0,bCtx.canvas.width, bCtx.canvas.height);
             if (Math.random()<.1) {
                for (var i =0; i<5;i++) {
                    bCtx.fillStyle = "rgba(" + this.r[i] + "," + this.g[i] + "," + this.b[i] + ",.5)";
            bCtx.beginPath();
                  bCtx.rect(this.xPos[i],this.yPos[i],15,15);
                
                bCtx.fill();
                
                       bCtx.fillStyle = "rgb(0,0,0)";
                     bCtx.beginPath();
                  bCtx.rect(this.xPos[i]+6,this.yPos[i]-25,20,20);
                
                bCtx.fill();
                   
                  
              }
                
             }
                
                */
            };





        }