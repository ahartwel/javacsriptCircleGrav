



        function GravityCenter(x, y, r, id) {
            this.cX = x;
            this.cY = y;
            this.id = id;
            this.r = r;
            this.rSpeed = .3;
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = r * 2 + 1000;
            this.canvas.height = r * 2 + 1000;
            this.halfW = this.canvas.width / 2;
            this.halfH = this.canvas.height / 2;

                
            this.imageSwitch = false;

            this.rOffSet = 0;

            this.platforms = [];
            // var numberOfPlatforms = Math.random()*(50-20)+20
            var numberOfPlatforms = 30;
            //var dMax = this.r;
            //var dMin = dMax/2;
            var dNew = .15 * this.r;
            var dUp = false;
            var rotAmount=0;
            for (var i = 0; i < numberOfPlatforms; i++) {
              rotAmount+=25;
                this.platforms[i] = new Platform(dNew, i * rotAmount, this.ctx, this.canvas, i, this.r, this.id);

                
             
                
                /*if (dMax==this.r) {
                    if (Math.random() <.4) {
                    dMax= dMax/2;
                    dMin = dMax*.2;
                    }
                 
                } else {
                 dMax = dMax*2;
                     dMin = dMax/2;
                }*/
                if (dUp == true) {
                    dNew += (Math.random() * (-(1.3 / numberOfPlatforms) + (1 / (numberOfPlatforms * 2))) - (1 / (numberOfPlatforms * 1.2))) * this.r;
                    // console.log(dNew);
                }
                
                    dNew +=Math.random() *( (this.r*1.7)/numberOfPlatforms);
                



                //this.platforms[i].display();

            }
            
          
            
            dNew = null;
            dUp = null;


            this.rotationSpeed = function (amount) {
                for (var i = 0; i < this.platforms.length; i++) {
                    this.platforms[i].rSpeed += amount;
                }


            };

            this.displayBack = function () {
                
                if ((this.cX < window.innerWidth + this.halfW) && (this.cX > -this.halfW)) {
                   if ((this.cY > -this.halfH) && (this.cY < window.innerHeight + this.halfH)) {
  canvasReset(this.ctx);
               this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
               
                
                       
                      
                   
                
                this.ctx.fillStyle = "rgb(255,255,255)";

                this.ctx.beginPath();
                for (var i = this.platforms.length-1; i > 0; i--) {
                    
                   if (this.platforms[i].backLayer) {
                    this.platforms[i].display();
                   }
              
                  

                }
                
                
              
                //this.ctx.stroke();
                mCtx.translate(this.cX, this.cY);
                mCtx.drawImage(this.canvas, -this.halfW, -this.halfH);
                canvasReset(mCtx);
                   }}
                
            };
            
            this.displayFront = function() {

                if ((this.cX < window.innerWidth + this.halfW) && (this.cX > -this.halfW)) {
                   if ((this.cY > -this.halfH) && (this.cY < window.innerHeight + this.halfH)) {
canvasReset(this.ctx);
               this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);                    
                   
               
                this.ctx.fillStyle = "rgb(255,255,255)";

                this.ctx.beginPath();
                for (var i = this.platforms.length-1; i > 0; i--) {
                     if (this.platforms[i].backLayer==false) {
                    this.platforms[i].display();
                   }
              
              
                  

                }
                
                
              
                //this.ctx.stroke();
                mCtx.translate(this.cX, this.cY);
                mCtx.drawImage(this.canvas, -this.halfW, -this.halfH);
                canvasReset(mCtx);
                       
                }
                }
            }


            this.update = function () {
                this.rOffSet += this.rSpeed;

                for (var i = 0; i < this.platforms.length; i++) {
                    this.platforms[i].collisionDetection();
                     this.platforms[i].update();   
                }
                
                
                

               

            };


        }