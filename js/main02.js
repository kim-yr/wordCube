const w = 1200;
const total = $(".carousel .face").length;
const angle = 360 / total;
const tz = Math.round(w / 2 / Math.tan(Math.PI / total));
const cardNum = 8;
let tr = 0;
console.log(tz);
$(".carousel").css({ transform: `translateZ(-${tz}px)` });
// $(".carousel .face").each(function (idx, item) {});
$.each($(".carousel .face"), function (idx, item) {
  //돔 안에 있는 걸 제어하기 위해 달라괄오 안에 아이템을 써야 한다고 함.
  $(item).css({ transform: `rotateY(${angle * idx}deg) translateZ(${tz}px)` });
});

$(".pagination li").on("click", function () {
  if ($(this).hasClass("on")) return;
  $(this).addClass("on").siblings("li").removeClass("on");
});

$(window).on("mousewheel", function (e) {
  console.log(e.originalEvent.deltaY);
  const scroll = e.originalEvent.deltaY;
  if (scroll > 0) {
    tr -= angle;
  } else {
    tr += angle;
  }
  gsap.to(".carousel", { rotateY: tr, duration: 1 });
  //   console.log(e.originalEvent.deltaY);
});

$(".pagination button").on("click", function () {
  if ($(this).hasClass("prev")) {
    tr += angle;
  } else if ($(this).hasClass("next")) {
    tr -= angle;
  }
  gsap.to(".carousel", { rotateY: tr, duration: 1 });
});

$(".face").append(`<ul class="deck"></ul>`);
let output = "";
for (let i = 0; i < cardNum; i++) {
  output += `
    <li class="card">
            <div class="front"></div>
            <div class="back"></div>
    </li>
    `;
}
//ul태그 생성 성공, li붙이는거 할 차례
