
let DiscPos = document.querySelector('.hero__img')

window.addEventListener("scroll", ()=>{



    if(window.scrollY > 50){
        DiscPos.style.transform = `rotate(360deg)`
        
    } else{
         DiscPos.style.transform = `rotate(-360deg)`
    }
})



const heroImg = document.getElementById('heroImg');
        let isDragging = false;
        let startX, startAngle;

        heroImg.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            const transform = window.getComputedStyle(heroImg).transform;
            startAngle = transform === 'none' ? 0 : getRotationAngle(transform);
            heroImg.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const currentX = e.clientX;
                const deltaX = currentX - startX;
                const newAngle = startAngle + deltaX;
                heroImg.style.transform = `rotate(${newAngle}deg)`;
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                heroImg.style.cursor = 'grab';
            }
        });

        function getRotationAngle(transform) {
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            return Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }

        heroImg.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                heroImg.style.cursor = 'grab';
            }
        });
    