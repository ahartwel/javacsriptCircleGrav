class Hexagon {
   int xPos,yPos;
   int w = int( random(1)*100+20);
   int h = int( w * 0.8 );
   int timer = 0;
   int r = int(random(360));
 Hexagon(int x,int y) {
  xPos = x+ int(random(10) -5);
  yPos = y+ int(random(10) -5);
  
 }



void display() {
 
 if (timer<=50) {
 timer++;
 fill(255,10);
 stroke(0,0,0,0);
 pushMatrix();
 translate(xPos,yPos);
 rotate(radians(r));
  shape(hex,-0.5 * w,-0.5 * h,w,h);
 
 popMatrix();
 } else {
   
 }
 
 
 
} 
  
  
  
}
