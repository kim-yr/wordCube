const cube = $(".cube");
$(".pagination li").on("click", function () {
  if ($(this).hasClass("on")) return;
  $(this).addClass("on").siblings("li").removeClass("on");

  const tx = $(this).data("rotation-x");
  const ty = $(this).data("rotationY");
  console.log(tx, ",", ty);
  gsap.to(cube, { rotateX: tx, rotateY: ty, ease: "back.inOut", duration: 1 });
});
