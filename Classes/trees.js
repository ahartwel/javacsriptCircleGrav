
        
        function Tree3(maxWidth, maxHeight, platform) {
             this.canvas = document.createElement('canvas');
            this.canvas.width = Math.random()*(maxWidth) + (maxWidth);
            this.canvas.height = Math.random()*(maxHeight) + (maxHeight);
          
            this.context = this.canvas.getContext('2d');
            this.branchX = [];
            this.branchY = [];
            
            this.branchX[0] = .5*this.canvas.width; 
            this.branchY[0] = this.canvas.height; 
            this.branchX[1] = .5*this.canvas.width;
            this.branchY[1] = .5*this.canvas.height;
            
            this.triangles = [];
            
            this.angle = [];
            this.distance = [];
           this.x = [];
           this.y = [];
            
            this.createTree = function() {
              this.context.strokeStyle = "rgb(255,255,255)";
                this.context.lineWidth = 5;
                this.context.beginPath();
                this.context.moveTo(this.branchX[0],this.branchY[0]);
                this.context.lineTo(this.branchX[1],this.branchY[1]);
                 this.context.stroke();
               
                var numberOfAngles = Math.floor( Math.random()*2 + 15);
               
                var maxDistance = .5*this.canvas.height;
                var angle = 0;
                for (var i =0; i < numberOfAngles; i ++ ) {
                   this.angle[i] = angle;
                    angle += Math.random() * 360/(numberOfAngles/2);
                    this.distance[i] = Math.random()*(50-30)+40;
                   
                
                      this.x[i] = Math.floor( this.branchX[1] + Math.cos( radians(this.angle[i]) ) * this.distance[i] );   
                     this.y[i] = Math.floor( this.branchY[1] + Math.sin( radians(this.angle[i]) ) * this.distance[i] );   
                       
                    }
                    
                
              
                
                this.x[this.x.length+1] = this.branchX[1];
                this.y[numberOfAngles] = this.branchY[1];
                   this.context.beginPath();
                    this.context.fillStyle = "rgba(255,255,255,0.6)";
                    this.context.moveTo(this.x[1],this.y[1]);
                for (var i =1; i <this.x.length;i++) {
                   
                    this.context.lineTo(this.x[i],this.y[i]);
                   
                    
                }
                
                
            
                this.context.lineTo(this.x[0],this.y[0]);
                this.context.closePath();
                this.context.fill();
                
                
                
                
                for (var i = 0; i < 8; i++) {
                 var p1 = Math.floor( Math.random() * this.x.length );
                 var p2 = Math.floor( Math.random() * this.x.length );
                 var p3 = Math.floor( Math.random() * this.x.length );
                 
                   
                    
                    while (p2==p1) {
                          var p2 = Math.floor( Math.random() * this.x.length );
                        
                    } 
                    while (p3==p1 || p3==p2) {
                          var p3 = Math.floor( Math.random() * this.x.length );
                        
                    }
                    
                    
                    this.triangles[i] = [];
                    this.triangles[i] = [];
                    this.triangles[i] = [];
                    
                    this.triangles[i].p1 = [];
                    this.triangles[i].p2 = [];
                    this.triangles[i].p3 = [];
                    
           
                    
                    this.triangles[i].p1.x = this.x[p1];
                    this.triangles[i].p2.x = this.x[p2];
                    this.triangles[i].p3.x = this.x[p3];
                    
                    this.triangles[i].p1.y = this.y[p1];
                    this.triangles[i].p2.y = this.y[p2];
                    this.triangles[i].p3.y = this.y[p3];
                    
                    
                     this.context.beginPath();
                        this.context.fillStyle = "rgba(255,0,190,.1)";
                        this.context.moveTo(this.x[p1],this.y[p1]);
                        this.context.lineTo(this.x[p2],this.y[p2]);
                        this.context.lineTo(this.x[p3],this.y[p3]);
                        this.context.lineTo(this.x[p1],this.y[p1]);
                        
                        this.context.fill();
                        
                    
            
                    
                    
                }
                
                
                
               /*  console.log(this.angle);
                 console.log(this.distance);
                 console.log(this.x);
                 console.log(this.y);
                 */
            };
            
            this.display = function() {
               /* console.log("display!!!");
                     
                      
                for (var i = 0; i < this.triangles.length; i++) {
                      this.context.fillStyle = "rgba(255,0,190,0.7)"; 
                    this.context.beginPath();
                        this.context.moveTo(this.triangles[i].p1.x,this.triangles[i].p1.y);
                        this.context.lineTo(this.triangles[i].p2.x,this.triangles[i].p2.y);
                        this.context.lineTo(this.triangles[i].p3.x,this.triangles[i].p3.y);
                        this.context.lineTo(this.triangles[i].p1.x,this.triangles[i].p1.y);
                        
                       
                 this.context.fill();     
                  }
                 */
                
            };
            
            
            this.newOne = false;
            this.generated = false;
            
            
            this.update = function() {
                
                /*
                  console.log("update");
                if (this.newOne == false) {
                   if (this.generated == false) {
                    this.newOne = true;
                    this.generated = true;
                    for (var i =0; i <this.triangles.length;i++) {
                       var p1New = Math.floor( Math.random() * this.x.length );  
                       var p2New = Math.floor( Math.random() * this.x.length );  
                       var p3New = Math.floor( Math.random() * this.x.length );  
                  
                        
                        this.triangles[i].p1New = {};  
                        this.triangles[i].p2New = {}; 
                    this.triangles[i].p3New = {};
                        
                        this.triangles[i].p1 = {};  
                        this.triangles[i].p2 = {}; 
                    this.triangles[i].p3 = {};
                        
                        this.triangles[i].p1New.x = this.x[p1New];
                        this.triangles[i].p2New.x = this.x[p1New];  
                        this.triangles[i].p3New.x = this.x[p1New];
                        
                        this.triangles[i].p1New.y = this.y[p1New]; 
                         this.triangles[i].p2New.y = this.y[p1New];
                        this.triangles[i].p3New.y = this.y[p1New]; 
                        
                        this.triangles[i].p1.x = this.x[i];
                        this.triangles[i].p2.x = this.x[i];  
                        this.triangles[i].p3.x = this.x[i];
                        
                        this.triangles[i].p1.y = this.y[i]; 
                         this.triangles[i].p2.y = this.y[i];
                        this.triangles[i].p3.y = this.y[i]; 
                    
                    }
                    
                         }
                    
                }
                    for (var i =0; i <this.triangles.length;i++) {
                     
                    this.triangles[i].p1.x = lerp(this.triangles[i].p1.x,this.triangles[i].p1New.x,.4);
                    this.triangles[i].p2.x = lerp(this.triangles[i].p2.x,this.triangles[i].p2New.x,.4);
                    this.triangles[i].p3.x = lerp(this.triangles[i].p3.x,this.triangles[i].p3New.x,.4);
                        
                    this.triangles[i].p1.y = lerp(this.triangles[i].p1.y,this.triangles[i].p1New.y,.4);
                    this.triangles[i].p2.y = lerp(this.triangles[i].p2.y,this.triangles[i].p2New.y,.4);
                    this.triangles[i].p3.y = lerp(this.triangles[i].p3.y,this.triangles[i].p3New.y,.4);
                  
                           if (dist(this.triangles[i].p1.x, this.triangles[i].p1.y, this.triangles[i].p1New.x, this.triangles[i].p1New.y) < 1) {
                       this.newOne = false;
                    this.generated = false;  
                        
                        
                    } 
                        
                                }
                    
                 
                    
                    
            
               
               */
                
            };
            
             this.createTree();
            
            
        }



        


        function tree2Branch(color, x, y, width, height, canvas, context) {
            
            this.color = color;
            
            this.x = x;
            this.originalX = x;
            
            this.y = y;
            
            
            this.width = width;
            
            this.height = height;
            
            this.canvas = canvas;
            
            this.context = context;
            
            this.originalWidth = width;
            
            this.update = function() {
                
             this.y+=2;
             this.width+= Math.random()*1-2;    
                if (this.y>=.7*this.canvas.height) {
                 this.y=0;  
                 this.width = this.originalWidth;
                  this.x=this.originalX;
                    if (Math.random()<.65) {
                     this.x=this.originalX+(this.width);   
                    }
                    
                }
                
                
                
            };
            
            this.display = function() {
                
              this.context.beginPath();  
                this.context.strokeStyle = this.color;
                this.context.moveTo(this.x,this.y);    
                this.context.lineTo(this.x+this.width,this.y);
                this.context.stroke();
                
                
            };
            
            
        }

        
        function Tree2(maxWidth, maxHeight, platform) {
             this.canvas = document.createElement('canvas');
            this.canvas.width = Math.random()*(maxWidth/2) + (maxWidth/2);
            this.canvas.height = Math.random()*(maxHeight/2) + (maxHeight/2);
          
            this.context = this.canvas.getContext('2d');
            this.branchX = [];
            this.branchY = [];
            
            this.branchX[0] = .5*this.canvas.width; 
            this.branchY[0] = this.canvas.height; 
            this.branchX[1] = .5*this.canvas.width;
            this.branchY[1] = 0;
            
           this.x = [];
           this.y = [];
            
            this.createTree = function() {
              this.context.strokeStyle = "rgb(145,81,1)";
                this.context.lineWidth = 5;
                this.context.beginPath();
                this.context.moveTo(this.branchX[0],this.branchY[0]);
                this.context.lineTo(this.branchX[1],this.branchY[1]);
                 this.context.stroke();
                var numOfBranches = Math.random()*8+7;
                var x = .5*this.canvas.width;
                var w = .04*this.canvas.width;
                var y = 0;
                var yAdd = (this.canvas.height*0.75)/numOfBranches;
                var x1 = x - (w/2);
                var x2 = x + (w/2);
                this.x[0] = x1;
                this.x[1] = x2;
                this.y[0] = 0;
                this.y[1] = 0+yAdd;
       
        
                
               
                var r = 242;
                var g = 7;
                var b = 160;
                
                this.branches = [];
                for (var i=0; i<numOfBranches; i ++) {
                 this.context.beginPath();
                    this.context.strokeStyle = "rgb(" + r + "," + g + "," + b + " )";
                    this.context.moveTo(x1,y);
                this.context.lineTo(x2,y);
                 this.branches[i] = new tree2Branch("rgb(" + r + "," + g + "," + b + " )", x1, y, x2-x1, 5, this.canvas, this.context);
                    
                    
                    y+=yAdd;
                    x1 -= (.04*this.canvas.width);
                    x2 += (.04*this.canvas.width);
                    
               
                    
                     this.context.stroke();
                this.context.stroke();
                    r+=4;
                    b+=4;
                    g+=4;
                }
                console.log(this.branches);
               
       
             
                
            };
            
            this.display = function() {
                this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
                
                
                 this.context.strokeStyle = "rgb(145,81,1)";
                this.context.lineWidth = 5;
                this.context.beginPath();
                this.context.moveTo(this.branchX[0],this.branchY[0]);
                this.context.lineTo(this.branchX[1],this.branchY[1]);
                 this.context.stroke();
                
                
                for (var i = 0; i <this.branches.length;i++) {
                 this.branches[i].display();   
                }
                
            };
            
            
            this.update = function() {
                for (var i = 0; i <this.branches.length;i++) {
                 this.branches[i].update();   
                }  
                
            };
            
             this.createTree();
            
            
        }
        
        
        function Trees(maxWidth, maxHeight, whereItGoes, platform) {

            this.canvas = document.createElement('canvas');
            this.canvas.width = Math.random() * (maxWidth - (maxWidth / 2)) + (maxWidth / 2) * 1.2;
            this.canvas.height = Math.random() * (maxHeight - (maxHeight / 2)) + (maxHeight / 2)+200;
            this.context = this.canvas.getContext('2d');

            this.canvas2 = document.createElement('canvas');
            this.canvas2.width = this.canvas.width;
            this.canvas2.height = this.canvas.height;
            this.context2 = this.canvas2.getContext('2d');
            
            this.canvas3 = document.createElement('canvas');
            this.canvas3.width = this.canvas.width;
            this.canvas3.height = this.canvas.height;
            this.context3 = this.canvas3.getContext('2d');

            
            this.platform = platform;
            
            this.colors = [];
            this.colors[0] = "rgba(129,101,154";
            this.colors[1] = "rgba(143,78,116";
            this.colors[2] = "rgba(171,160,73";
            this.colors[3] = "rgba(196,84,62";
            this.colors[4] = "rgba(249,185,88";


            this.getRandomColor = function (o) {
                var wC = Math.floor(Math.random() * 2 + 3);

                return this.colors[wC] + "," + o + ")";
            };


            this.timerMax = 15;
            this.timer = 0;

            this.iterations = 20;
            this.positionOnPlatform = whereItGoes;
            this.xPos = [];
            this.yPos = [];
            this.l = Math.random() * (.3 * (this.canvas.height+200)) + (.3 * (this.canvas.height+200));

            this.xPos[0] = .5 * this.canvas.width;
            this.yPos[0] = this.canvas.height;
            this.xPos[1] = .5 * this.canvas.width;
            this.yPos[1] = this.l;
            this.r=[];
            this.r[0]=0;
            this.r[1]=0;
            this.thickness = 5;
            this.branchTracking = 1;
            this.generation = [];
            this.branchColor = [];
            this.branchThickness = [];
            this.lX = [];
            this.lY =[];
            this.lXMax = [];
            
            this.lXMin = [];
            
            this.color = 0;
            this.lW =[];
            this.lH = [];
            this.lCounter=0;


            this.createBranches = function (startX, startY, l, t, howFar) {

                this.iterations -= 1;
                l = .8 * l;
                t = .8 * t;

                this.branchTracking++;
                var angle = radians(Math.random() * -90 + 45);
                this.r[this.branchTracking] = angle;
                var d = Math.random() * (l/2) + (l/2);
                this.xPos[this.branchTracking] = startX + Math.cos(angle) * (Math.random() * d);
                this.yPos[this.branchTracking] = startY + Math.sin(angle) * (Math.random() * d);
                this.generation[this.branchTracking] = howFar;
                
                this.checkX(startX,d);
                
                this.context.beginPath();
                canvasReset(this.context);
                
                
                this.context.lineWidth = t;
                this.branchColor[this.branchTracking] = this.getRandomColor(1);
                this.context.strokeStyle =  this.branchColor[this.branchTracking];
               
                this.context.moveTo(startX, startY);
                this.context.lineTo(this.xPos[this.branchTracking], this.yPos[this.branchTracking]);
                this.context.stroke();

                this.branchTracking++;
                this.generation[this.branchTracking] = howFar;

                angle = radians(Math.random() * -180 - 45);
                 this.r[this.branchTracking] = angle;
                d = Math.random() * l;

                this.xPos[this.branchTracking] = startX + Math.cos(angle) * (Math.random() * (d / 2) + (d / 2));

                this.yPos[this.branchTracking] = startY + Math.sin(angle) * (Math.random() * (d / 2) + (d / 2));
                
                
                this.checkX(startX,d);
                
                this.branchColor[this.branchTracking] = this.getRandomColor(1);
                this.context.strokeStyle =  this.branchColor[this.branchTracking];
                this.context.beginPath();
                canvasReset(this.context);
                this.context.moveTo(startX, startY);
                this.context.lineTo(this.xPos[this.branchTracking], this.yPos[this.branchTracking]);
                this.context.stroke();

               
                
                
                

                if (l > .1 * this.canvas.height) {

                    var x1 = this.xPos[this.branchTracking];
                    var x2 = this.xPos[this.branchTracking - 1];
                    var y2 = this.yPos[this.branchTracking - 1];
                    var y1 = this.yPos[this.branchTracking];



                    this.createBranches(x1, y1, l, t, howFar + 1);
                    this.createBranches(x2, y2, l, t, howFar + 1);
                    
                        }

                //this.createTrunk();



            };

            
            this.checkX = function(startX, d) {
                
                 if(this.xPos[this.branchTracking]<.1*this.canvas.width) {
                 this.xPos[this.branchTracking]= .1*this.canvas.width + (Math.random() * (.15*this.canvas.width) );   
                 }
                
                if (this.xPos[this.branchTracking]<.1*this.canvas.width) {
                    this.xPos[this.branchTracking]= .9*this.canvas.width - (Math.random() * (.15*this.canvas.width) );    
                }
                      
                    
                
            };
            
            this.newBranches = function (startX, startY, l, t, howFar, wholeTree) {
              
                 //this.iterations -= 1;
               
                l = .8 * l;
                t = .8 * t;
                this.branchTracking++;
                  
                var angle = radians(Math.random() * -90 + 45);
                 this.r[this.branchTracking] += .00002;
                var d = Math.random() * l;
                this.xPos[this.branchTracking] = Math.floor(startX + Math.cos( this.r[this.branchTracking]) * (Math.random() * d));
                this.yPos[this.branchTracking] = Math.floor(startY + Math.sin( this.r[this.branchTracking]) * (Math.random() * d));
                //this.generation[this.branchTracking] = howFar;
                
                    this.checkX(startX,d);
                
                this.context.beginPath();
                canvasReset(this.context);
                
                
                this.context.lineWidth = t;
               // this.branchColor[this.branchTracking] = this.getRandomColor(1);
                this.context.strokeStyle =  this.branchColor[this.branchTracking];
               
                this.context.moveTo(startX, startY);
                this.context.lineTo(this.xPos[this.branchTracking], this.yPos[this.branchTracking]);
                this.context.stroke();
                
                this.branchTracking++;
               // this.generation[this.branchTracking] = howFar;
          
                angle = radians(Math.random() * -180 - 45);
                 this.r[this.branchTracking] += .00002;
               d = Math.random() * l;

               this.xPos[this.branchTracking] = Math.floor(startX + Math.cos( this.r[this.branchTracking]) * (Math.random() * (d / 2) + (d / 2)));

                this.yPos[this.branchTracking] = Math.floor(startY + Math.sin( this.r[this.branchTracking]) * (Math.random() * (d / 2) + (d / 2)));
                
                this.checkX(startX,d);  
                
               // this.branchColor[this.branchTracking] = this.getRandomColor(1);
                this.context.strokeStyle =  this.branchColor[this.branchTracking];
                this.context.beginPath();
                canvasReset(this.context);
                this.context.moveTo(startX, startY);
                this.context.lineTo(this.xPos[this.branchTracking], this.yPos[this.branchTracking]);
                this.context.stroke();
         
               
                  for (var i = 0; i < Math.random() * 23; i++) {
                    this.lX[this.lCounter] = this.xPos[this.branchTracking] + (Math.random() * 40 - 20);
                    this.lXMax[this.lCounter] = this.lX[this.lCounter]+30;
                    this.lXMin[this.lCounter] = this.lX[this.lCounter]-30;
                    this.lY[this.lCounter] = this.yPos[this.branchTracking] +(Math.random() * 40 - 20);
                    this.lW[this.lCounter] =  Math.floor(Math.random() * 15)+1;
                    this.lH[this.lCounter] =  Math.floor(Math.random() * 15)+1;
                      if ((i==0)||(i=10)||(i==17)){
                    this.color = this.getRandomColor(0.05);
                    
                      } else {
                        this.color = this.getRandomColor(0.05); 
                      }
                      
                      this.context2.fillStyle =  this.color;
                    this.context2.beginPath();
                    this.context2.rect(this.lX[this.lCounter], this.lY[this.lCounter], this.lW[this.lCounter], this.lH[this.lCounter]);
                    this.lCounter++;
                    this.context2.fill();
            
                      
                /*
                    this.context2.fillStyle =  this.color[this.lCounter];
                    this.context2.beginPath();
                   this.context2.rect(this.xPos[this.branchTracking] + this.lX[this.lCounter], this.yPos[this.branchTracking] + this.lY[this.lCounter], this.lW[this.lCounter], this.lH[this.lCounter]);
                    this.lCounter++;
                    this.context2.fill();
                */
                }

                if (l > .2 * this.canvas.height) {

                    var x1 = this.xPos[this.branchTracking];
                    var x2 = this.xPos[this.branchTracking - 1];
                    var y2 = this.yPos[this.branchTracking - 1];
                    var y1 = this.yPos[this.branchTracking];



                    this.newBranches(x1, y1, l, t, howFar + 1,wholeTree);
                    this.newBranches(x2, y2, l, t, howFar + 1,wholeTree);
                    
                    
                    x1 = null;
                    x2 = null;
                    y1 = null;
                    y2 = null;
                        }
                
            };
            this.leavesX = 0;
            this.leavesY = 0;
            this.updateLeaves = function() {
                 for (var i = 0; i < this.lX.length; i++) {
                     
                   
                     if (Math.random()<.2) {
                         this.lY[i] += Math.floor(Math.random()*5);   
                         this.context2.fillStyle =  this.getRandomColor(.05);
                         if (Math.random()<.051) {
                            this.context2.fillStyle =  this.getRandomColor(1); 
                         }
                    this.context2.beginPath();
                    this.context2.rect(this.lX[i], this.lY[i], this.lW[i], this.lH[i]);
                    this.lCounter++;
                  
                     this.context2.fill();     
                 
                     
                     }
                   
                  
                   
            
                      
                
                }
                if (this.platform.rSpeed<0) {
                    this.leavesX = Math.floor(lerp(this.leavesX,50,.05));
                     } else {
                     this.leavesX = Math.floor(lerp(this.leavesX,-50,.05));    
                         
                     }
                 
                
            };
            
            this.newTrunk = function (wholeTree) {
                 this.branchTracking = 1;
                this.lX = [];
            this.lY =[];
            this.lXMax = [];
            
            this.lXMin = [];
            
            this.color = [];
            this.lW =[];
            this.lH = [];
            this.lCounter=0;
                
                this.xPos = [];
            this.yPos = [];
            this.l = Math.random() * (.3 * (this.canvas.height+200)) + (.3 * (this.canvas.height+200));

            this.xPos[0] = .5 * this.canvas.width;
            this.yPos[0] = this.canvas.height;
            this.xPos[1] = .5 * this.canvas.width;
            this.yPos[1] = this.l;
            
                
               
                this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
                this.context.strokeStyle = this.branchColor[0];
                this.context.lineWidth = this.thickness;
                this.context.beginPath();
                this.context.moveTo(this.xPos[0], this.yPos[0]);
                this.context.lineTo(this.xPos[1], this.yPos[1]);
                this.context.stroke();
              
                this.newBranches(this.xPos[1], this.yPos[1], this.yPos[0] - this.yPos[1], this.thickness, 1, wholeTree);




            }

            this.threeAlarm = 0;
            this.update = function () {
               this.timer++;
               this.threeAlarm++;
                
                if (this.threeAlarm>=3) {
                 this.threeAlarm=0;   
                  this.updateLeaves();
                }
                
                if (this.timer>this.timerMax*.95) {
                    if (Math.random()<.4) {
                        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
                        this.context2.clearRect(0,0,this.canvas.width, this.canvas.height);
                        this.context3.clearRect(0,0,this.canvas.width, this.canvas.height);
                    this.newTrunk(true);
                           this.context3.drawImage(this.canvas,0,0);
                    }
                
                    if (this.timer>=this.timerMax) {
                     this.timer=0;
                     this.timerMax=Math.floor( Math.random()*1000+120)
                    }
                  
                    
                }
              
            };
            this.display = function () {
                 
                if (this.timer%2==0) {
                  // this.context2.clearRect(0,0,this.canvas.width, this.canvas.height);
                     //this.newTrunk(false);
                  
                     // this.context3.clearRect(0,0,this.canvas.width, this.canvas.height);
               // this.context3.drawImage(this.canvas,0,0);
                this.context3.drawImage(this.canvas2,this.leavesX,0);   
                }
                // console.log(this.canvas.width, this.canvas.height);  

            }

            this.createTrunk = function () {
                this.branchColor[0] = this.getRandomColor("1");
                this.context.strokeStyle = this.branchColor[0];
                this.context.lineWidth = this.thickness;
                this.context.beginPath();
                this.context.moveTo(this.xPos[0], this.yPos[0]);
                this.context.lineTo(this.xPos[1], this.yPos[1]);
                this.context.stroke();
                this.generation[0] = 0;
                this.generation[1] = 0;
                this.createBranches(this.xPos[1], this.yPos[1], this.yPos[0] - this.yPos[1], this.thickness, 1);

                //this.createBranches(this.xPos[1], this.yPos[1],this.yPos[0] - this.yPos[1]);


            };









        }