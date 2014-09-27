//drag hexagons
PShape hex;
int x=50;
int y = 0;
ArrayList<Hexagon> theHex;
void setup() {
  hex = loadShape("hexagon.svg");
  size(600,800);
  background(0);
  
  
  hex.disableStyle();
  
  theHex = new ArrayList<Hexagon>();
  
  for (int i = 0; i <2; i++) {
   theHex.add( new Hexagon(int(random(1)*width  ), int(random(1)*height ) ) ); 
    
    
  }
  
  println(hex.width);
   println(hex.height);
}



void draw() {
  fill(0,0,0,10);
  rect(0,0,width, height);
  
  for (int i = 0; i <theHex.size();i++) {
    println(i);
    Hexagon hh = theHex.get(i);
    hh.display(); 
   
  }
  
  tint(255,127);
  shape(hex,x,y,100,80);
  y++;
}


void mouseDragged() {
  theHex.add( new Hexagon(mouseX, mouseY)); 
  
  
}

