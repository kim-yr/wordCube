let cubeTotal = 0;
let oldRandom,
  random = 0;
const cubeBox = $("#main #cubeBox");
const paginationUL = $(".pagination ul");
const playOrPause = $(".pagination .btns button");

const cube = `
  <div class="scene">
    <div class="cube">
      <div class="face front">건</div>
      <div class="face back">동</div>
      <div class="face top">비</div>
      <div class="face bottom">김</div>
      <div class="face left">예</div>
      <div class="face right">령</div>
    </div>
  </div>
`;

const famousList = [
  "질병은 입을 좇아 들어가고 화근은 입을 좇아 나온다.",
  "행복이란 타인을 행복하게 해주려는 노력의 부산물이다. 우리가좍",
  "지혜는 듣는 데서 오고 후회는 말하는 데서 온다.",
  "인간은 의욕하는 것, 그리고 창조하는 것에 의해서만이 행복하다.",
  "말을 많이 하는 것과 말을 잘하는 것은 다르다.",
  "착한 일을 하는 사람에게는 하늘이 복을 주시고, 악한 일을 하는 사람에게는 하늘이 재앙을 주느니라.",
  "탐욕은 일체를 얻고자 욕심내어서 도리어 모든 것을 잃어버린다.",
  "백 권의 책에 쓰인 말보다, 한 가지 성실한 마음이 더 크게 사람을 움직인다.",
  "가장 높은 곳에 올라가려면 가장 낮은 곳부터 시작하라.",
  "건강을 이기는 미(美)는 없다.",
  "프로에게서 자기 수련과 극기심을 배워라.",
  "겉으로 보기에 무척 연약해 보이는 모든 것이 바로 힘이다.",
  "확실한 일을 실행할 힘은 누구나 가지고 있다.",
  "힘으로서 사람을 복종시키지 말고 덕으로서 사람을 복종시켜라.",
  "힘으로 유지되어야 할 필요가 있는 것은 무엇이나 불운이다.",
  "생각이야말로 진정한 힘이다. 생각은 에너지인 것이다.",
  "자비·검약·겸허를 몸가짐의 삼보(三寶)로 하라.",
  "타인에 대한 존경은 처세법의 제일 조건이다.",
  "공포로 인해 타협하지 말 것이며, 남이 나에게 타협하는 것을 두려워하지도 말라.",
  "오늘 할 수 있는 일에 전력을 다하라. 그러면 내일에는 한걸음 더 진보한다.",
];

//가장 긴 격언의 글자수만큼 cubeTotal값 설정
let array = [];
$.each(famousList, function (idx, item) {
  array.push(item.length);
  //   console.log(item.length, "/");
});
cubeTotal = Math.max.apply(null, array);

//최대 글자수만큼 큐브 만들어 넣기
function makeCube() {
  let output = "";
  for (let i = 0; i < cubeTotal; i++) {
    output += cube;
  }
  cubeBox.html(output);
}

const rotationArray = [
  { tx: 0, ty: 0 },
  { tx: 0, ty: -180 },
  { tx: 0, ty: 90 },
  { tx: 0, ty: -90 },
  { tx: -90, ty: 0 },
  { tx: 90, ty: 0 },
];
//큐브에 글자 넣기
function showTxt(famousListIdx) {
  $("#cubeBox .scene").show();
  for (i = 0; i < cubeTotal; i++) {
    switch (random) {
      case 0:
        $("#cubeBox .scene").eq(i).find(".front").text(famousList[famousListIdx].charAt(i));
        break;
      case 1:
        $("#cubeBox .scene").eq(i).find(".back").text(famousList[famousListIdx].charAt(i));
        break;
      case 2:
        $("#cubeBox .scene").eq(i).find(".left").text(famousList[famousListIdx].charAt(i));
        break;
      case 3:
        $("#cubeBox .scene").eq(i).find(".right").text(famousList[famousListIdx].charAt(i));
        break;
      case 4:
        $("#cubeBox .scene").eq(i).find(".top").text(famousList[famousListIdx].charAt(i));
        break;
      case 5:
        $("#cubeBox .scene").eq(i).find(".bottom").text(famousList[famousListIdx].charAt(i));
        break;
    }
    if (i >= famousList[famousListIdx].length) {
      $("#cubeBox .scene").eq(i).hide();
    }
  }
}

//페이지 버튼 생성 함수
function makePaginationItem() {
  let output = "";
  const total = famousList.length;
  for (let i = 0; i < total; i++) {
    if (i === 0) {
      output += `<li class="on">${i + 1}</li>`;
    } else {
      output += `<li>${i + 1}</li>`;
    }
  }
  paginationUL.html(output);
}

function clickPaginationItem() {
  paginationUL.on("click", "li", function () {
    if ($(this).hasClass("on")) return;
    $(this).addClass("on").siblings("li").removeClass("on");
    random = Math.floor(Math.random() * 6);
    if (random === oldRandom) {
      random = (random + 1) % 6;
    }
    showTxt($(this).index());
    gsap.to("#cubeBox .scene .cube", {
      rotateY: rotationArray[random].ty,
      rotateX: rotationArray[random].tx,
      z: -40,
      ease: "back.inOut",
      duration: 1.25,
      stagger: {
        from: "random",
        // each: 0.1,
        amount: 0.5,
      },
    });
    oldRandom = random;
  });
}

function AutomaticPlayback(loopOrNot) {
  if (loopOrNot === true) {
  } else {
    return;
  }
}

function clickPlayOrPauseBtn() {
  playOrPause.on("click", function () {
    // $(this).css({ diplay: "none" });
    $(this).addClass("none").siblings("button").removeClass("none");
    // $(this).siblings("button").css({ diplay: "block" });
    // $(this).siblings("button").addClass("on");
    // console.log($(this));
    // console.log($(this)[0].classList[0]);
    if ($(this)[0].classList[0] === "play") {
      AutomaticPlayback(true);
    } else {
      AutomaticPlayback(false);
    }
  });
}

makeCube();
showTxt(0);
makePaginationItem();
clickPaginationItem();
clickPlayOrPauseBtn();
