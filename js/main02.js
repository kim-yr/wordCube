const w = 1200;
const total = $(".carousel .face").length;
const angle = 360 / total;
const tz = Math.round(w / 2 / Math.tan(Math.PI / total));
$(".carousel").css({ transform: `translateZ(-${tz})` });
// $(".carousel .face").each(function (idx, item) {});
$.each($(".carousel .face"), function (idx, item) {
  //돔 안에 있는 걸 제어하기 위해 달라괄오 안에 아이템을 써야 한다고 함.
  $(item).css({ transform: `rotateY(${angle * idx}deg) translateZ(${tz}px)` });
});
