import { gsap } from 'gsap'
import imagesLoaded from 'imagesloaded'
import pdfLink from './assets/images/Latest-Resume.pdf'

const content = document.querySelector('.homepage')

/**
 * replace resume url
 * Source: https://stackoverflow.com/questions/67665644/pdf-file-gets-exlcluded-from-build-files-vite
 */
document.querySelector('.resume').href = pdfLink

// get all images
const imgLoad = imagesLoaded(content)

// trigger animations when all images are finished loading
imgLoad.on('done', () => {
    const tl1 = gsap.timeline();
    const tl2 = gsap.timeline();
    document.querySelector('body').style.overflow = 'unset'
    tl1
        .to('.blinder', {
            scaleY: 0,
            stagger: 0.25,
        })
        .to(['.mask--banner-description *'], {
            translateX: 0,
            duration: 1.25,
            ease: 'power4.out'
        })

    gsap.to(['.ease-in'], {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power4.out'
    })

    tl2
        .to(['.mask--banner-h1 *', '.mask--banner-h2 *'], {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 2,
            ease: 'power4.out'
        })
        
    gsap.to('.sp--type', {
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out'
    })

    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
    }, 3000)
})

/* mobile menu */
const drawer = document.querySelector('.mobile--header nav')

document.addEventListener('click', drawerHandler)
function drawerHandler(e) {
    console.log(e.target)

    if(e.target.classList.contains('backdrop')) {
        drawer.style.transform = 'translateX(-200%)'
        drawer.style.zIndex = '0'
        return
    }

    if(e.target.classList.contains('menu-mob__trigger')) {
        drawer.style.transform = 'translateX(0)'
        drawer.style.zIndex = '30'
        return
    }
    
    return
}

/* video player modal */
document.addEventListener('click', videoModalHandler)
function videoModalHandler(e) {
    if(e.target.classList.contains('watch--demo-btn')) {
        let videoContainer = e.target.parentElement.parentElement.nextElementSibling
        // console.log(videoContainer)
        videoContainer.style.transform = 'scale(1)'
        videoContainer.style.zIndex = '15'
        return 
    }

    if(e.target.classList.contains('video--modal-btn')) {
        let videoContainer = e.target.parentElement.parentElement.parentElement
        let videoPlayer = e.target.parentElement.previousElementSibling
        videoContainer.style.transform = 'scale(0)'
        videoContainer.style.zIndex = '0'

        // pause video when modal is closed
        // console.log(videoPlayer.getAttribute('src'))
        return videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    }
}