


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
        