export const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        accessibility: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        infinite: false,
        arrows: false,
      },
    },
  ],
}
