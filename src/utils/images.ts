const images = Array.from({ length: 14 }, (_, i) => i + 1)

export const bgImgUrl = images[Math.floor(Math.random() * images.length)]