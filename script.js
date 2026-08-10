document.addEventListener('DOMContentLoaded', () => {
  const brochure = document.getElementById('brochure');
  const toggleBtn = document.getElementById('toggleBtn');
  const hero = document.querySelector('.hero');

  // 상태 관리 순환:
  // 'step1-closed' -> 'open-back' -> 'step2-closed' -> 'open-front' -> 'step1-closed'
  let currentState = 'step1-closed';

  function handleToggle() {
    brochure.classList.remove('closed', 'step-1', 'step-2', 'open-back', 'open-front');

    if (currentState === 'step1-closed') {
      // 1 -> 2: front 오른쪽 패널 -> back 전체 보기
      brochure.classList.add('open-back');
      toggleBtn.textContent = '접기';
      currentState = 'open-back';
    } else if (currentState === 'open-back') {
      // 2 -> 3: back 전체 -> front 중간 패널 단독 접기
      brochure.classList.add('closed', 'step-2');
      toggleBtn.textContent = '전체 보기';
      currentState = 'step2-closed';
    } else if (currentState === 'step2-closed') {
      // 3 -> 4: front 중간 패널 -> front 전체 보기
      brochure.classList.add('open-front');
      toggleBtn.textContent = '처음으로 접기';
      currentState = 'open-front';
    } else if (currentState === 'open-front') {
      // 4 -> 1: front 전체 -> 처음(front 오른쪽 패널 단독)으로
      brochure.classList.add('closed', 'step-1');
      toggleBtn.textContent = '펼치기';
      currentState = 'step1-closed';
    }
  }

  // 버튼 클릭
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleToggle();
  });

  // 메인 터치/클릭 영역 클릭
  hero.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      handleToggle();
    }
  });

  // 모바일 스와이프 지원
  let startX = 0;
  let startY = 0;

  hero.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  hero.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      handleToggle();
    }
  }, { passive: true });
});