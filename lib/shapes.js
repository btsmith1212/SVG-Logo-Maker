class Shape{
    // main class used for constructing, sets color based on user input
    
        constructor()
        {
            this.color=''
        }
        setColor(color)
        {
            this.color=(color);
        }
    }
    // circle class, extension of main class,

    class Circle extends Shape{
        render()
        {
            return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}"></circle>`
        }
    }
    // square class, extension of main class, 

    class Square extends Shape{
        render()
        {
            return `<rect x="50" height="200" width="200" fill="${this.color}"></rect>`
        }
    }
    // triangle class, extension of main class, 

    class Triangle extends Shape{
        render()
        {
            return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}"></polygon>`
        }
    };
    
    module.exports = {Circle, Square, Triangle}
    