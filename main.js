let c =document.getElementById("my-canvas")
let ctx = c.getContext("2d")

let loadImage = (src, callback) => {
    let img = document.createElement('img')
    img.onload = () => callback(img)        //callback is called when images gets loaded
    img.src = src
}

let imagePath = (frameNumber, animation)=>{
    return "images/"+animation +"/"+ frameNumber + ".png"
}

let frames = {
    idle:[1, 2, 3, 4, 5, 6, 7, 8],
    kick:[1, 2, 3, 4, 5, 6, 7],
    punch:[1, 2, 3, 4, 5, 6, 7], 
    forward : [1, 2, 3, 4, 5, 6],
    backward : [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

let loadImages = (callback) =>{         //callback will be called when all images are loaded
    let images = {idle: [], kick : [], punch : [], forward : [], backward: [], block: []}
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "forward", "backward", "block"].forEach((animation)=>{  
        let animationFrame = frames[animation];
        imagesToLoad = imagesToLoad + animationFrame.length;

        animationFrame.forEach((frameNumber) =>{
            let path = imagePath(frameNumber, animation)

            loadImage(path, (image) =>{
                images[animation][frameNumber-1] = image
                imagesToLoad = imagesToLoad -1
                if(imagesToLoad == 0){
                    callback(images)
                }
            })
        })
    
    })
}

let animate = (ctx, images,animation, callback)=>{
    images[animation].forEach((image, index)=>{
        setTimeout(()=>{
            ctx.clearRect(0, 0, 500, 500)       //clear canvas before drawing other image
            ctx.drawImage(image, 0, 0, 500, 500)
        }, index *100)
    })
    setTimeout(callback, images[animation].length * 100)
}

loadImages((images) => {
    let queueAnimation = []
    
    let aux =()=>{
        let selectedAnimation;

        if(queueAnimation.length === 0){
            selectedAnimation="idle"
        }else{
            selectedAnimation = queueAnimation.shift()
        }
        animate(ctx, images, selectedAnimation ,aux)
    }
    aux()

    document.getElementById("kick").onclick = ()=>{
        queueAnimation.push("kick")
    }
    document.getElementById("punch").onclick =()=>{
        queueAnimation.push("punch")
    }
    document.getElementById("forward").onclick = ()=>{
        queueAnimation.push("forward")
    }
    document.getElementById("backward").onclick =()=>{
        queueAnimation.push("backward")
    }
    document.getElementById("block").onclick =()=>{
        queueAnimation.push("block")
    }
    document.addEventListener("keyup", (event) =>{
        const key = event.key //"ArrowRight", "ArrowLeft", "ArrowUp" or "ArrowDown"

        if(key === "ArrowLeft"){
            queueAnimation.push("kick")
            console.log("Left");
            
        }else if(key === "ArrowRight"){
            queueAnimation.push("punch")
            console.log("Right");  
        }else if(key === "ArrowUp"){
            queueAnimation.push("forward")
        }else if(key === "ArrowDown"){
            queueAnimation.push("backward")
        }else if(key ==="b"){
            queueAnimation.push("block")
        }
    })
})

