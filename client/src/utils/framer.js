export const pageTransition = {
  duration: 1, 
  ease: "easeInOut", 
};


export const formEntrance = {
  from: {
    opacity: 0,
    scale: 0.8, 
    x: 0, 
    y: 0, 
  },
  to: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
  duration: 1, 
  ease: "easeInOut", 
};


export const formTransition = {
  duration: 0.3, 
  ease: "easeInOut", 
};

export const fade = {
  opacity: 0, 
};

export const fadeOut = {
  opacity: 0,
  scale: 0.8,
  x: 0,
  y: 0,
};

export const fadeIn = {
  opacity: 1,
  scale: 1,
  x: 0,
  y: 0,
};

export const slideIn = {
  x: "-100%",
  opacity: 0,
};

export const slideOut = {
  x: "100%", 
  opacity: 0,
};