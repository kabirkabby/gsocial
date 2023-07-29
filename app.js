 function init(){
     gsap.registerPlugin(ScrollTrigger);
 
 // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
 
 const locoScroll = new LocomotiveScroll({
   el: document.querySelector(".container"),
   smooth: true
 });
 // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
 locoScroll.on("scroll", ScrollTrigger.update);
 
 // tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
 ScrollTrigger.scrollerProxy(".container", {
   scrollTop(value) {
     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
   getBoundingClientRect() {
     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
   },
   // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
   pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
 });
 
 
 // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
 ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
 
 // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
 ScrollTrigger.refresh();

 }

 init();

var crsr = document.querySelector('.cursor')
var main = document.querySelector('.container')
main.addEventListener('mousemove', function(dets){
    crsr.style.left = dets.x+"px"
    crsr.style.top = dets.y+'px'
})

// gsap.from('.page1 h1, .page2 h2',{
//     y:10,
//     rotate:10,
//     opacity: 0,
//     delay: 0.3,
//     duration: 0.7
// })

var tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".hero-text-l",
        scroller: '.container',
        markers: true,
        start: 'top 30%',
        end: 'top 0',
        scrub: 3
    }
})
tl.to('.page1 h1',{
    x: -100,

},"anim")

tl.to('.page1 h2',{
    x:100
},"anim")

tl.to('.page1 video',{
    width:"88%",

},'anim')

var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: ".hero-text-l",
        scroller: '.container',
        markers: true,
        start: 'top -90%',
        end: 'top -130%',
        scrub: 3
    }
})
tl2.to('.container',{
    backgroundColor: "#fff"
})