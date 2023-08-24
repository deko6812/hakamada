import { gsap } from 'gsap'
const images = document.getElementsByClassName('image--containers')

const observer = new IntersectionObserver(entries => {
    console.log(entries)
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            observer.unobserve(entry.target)
            if(entry.target.classList.contains('banner--img')) {
                return gsap.to('.banner--img', {
                    opacity: 1,
                    scale: 1,
                    y: '10px'
                })
            }

            gsap.to(entry.target, {
                opacity: 1,
                scale: 1,
                stagger: 0.3,
            })
            // entry.target.style.opacity = '1'
        }
    })
}, {
    threshold: 0.5,
    rootMargin: '-100px'
})

for(let i = 0; i < images.length; i++) {
    observer.observe(images[i])
}