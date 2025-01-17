const images = [
    'https://c.tenor.com/690jBcTy_1MAAAAM/adm-kilbin.gif',
    'https://media.tenor.com/images/083fa722f64ce784fa084673512f4d05/tenor.gif',
    'https://media.tenor.com/DuThn51FjPcAAAAC/nerd-emoji-nerd.gif',
    'https://media.tenor.com/images/850f9afcd4220bff6fd68cfe9e19e642/tenor.gif',
    'https://c.tenor.com/mHoMM0sgfysAAAAC/void.gif',
    'https://c.tenor.com/ohhXLh9oys4AAAAd/forever-jojo.gif',
    'https://c.tenor.com/j2yy3RnZ0csAAAAd/mimir-the-piterroles.gif',
    'https://media.tenor.com/32LEtADcrNoAAAAd/monkey.gif',
    'https://lh3.googleusercontent.com/pw/AP1GczNwKI4UMvbCXOrk8qGwn3U6jOGDlZ5UFR6wNjgW5Hz2k7AHYk_uqkJPqoWsfFzW5WMwsQFYtNjHGgWBoTFZBXJixODqAWCuE5SiltVSiNfIqHPZUyaFkAZVDKZM2i8fAa1DIw3hqnahDX2fJ1XiYId6eQ=w417-h395-s-no',
    'https://lh3.googleusercontent.com/pw/AP1GczNZKimEmPU9gmdZqdx9tRGpm0pPvzAnBMjJJ_WOqgp2YsGMKNh3iJZLSBgrH9TzocU0ySdYBcC7XbRkNZDjq3vGcGLCxTZzxihdrJY0LiCdP6_-NsnBp1uT1-rqyys-AgHz1OY3bgcgDB7uuPAyNQGnJA=w269-h375-s-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczPxh4kysoD3P4EzmTl9njgRC5SbOKxpOm17Kt2WGdfUkdqF24gIfkklLUPMtpdacGlc4pPklzlySBm0jlD3oXLwmhgz7vjcM1CpPEUIWdGIlRDu_hJfPCNqe_GieGt2MngMBuVX2zCtjAsLg6DokIusWw=w549-h290-s-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczMt35Cd-l6pGyMo1EIG7nClcYY6rbpuwglulush6ijHgp0KHD4SOX00EbD9haWpAqqcvin2ujjI6jr27lNJVJBPNhv5v02D-pbiZDIB3Q5SyecJyZYPozop9WEysW1W-goEZLdy7Pm4ZG6AYpW0rCtBTA=w599-h888-s-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczP5X21iksDdQwJtIkgrb42zm8Er4Zi-ez_jK_AXFzNVG-cxT_Ye3eF9rheeA70bHFD14KJyjHvMwAWqkZ9m-Lax4CqloFB_XgKeqOxri5oakxaJdPk1a0Bu0lG-M3BwOie0bg-KZ-ifK2eaHjaZxML3sA=w236-h227-s-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczP-YTj8758SLXddaiSo83CzASpZxYovhnJv2Fez_TQAX5nrn7YK9i24PdXNZItHPdc3njnICvNe_-AZf7bHkDVVBO-dEGJjr7enVg2rJ7J5n1vgldrF4QQL7WAeZaEPTGVEmLaItbjoLHZXlltXWdfsAA=w419-h610-s-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczNtjCU6nmclVghWD68t5zZJ_Gl7qevQtIkYvK5h1gvh8w9BJm1ZYafz5xDqsMw5-Q8V1jXRTV_NwBBh1T2kuB_F7fOQgwkxMY6XYNZlGgl9fmO6uS_TOFXiNukbkesq_f2ImzOoGAxeVD9Dg4k9FXiLhA=w927-h834-s-no?authuser=0',
];

const imagesArray = images;
const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex]
}

module.exports = randomImage;