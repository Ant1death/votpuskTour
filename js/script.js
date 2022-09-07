'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // modal open
    const openReviewModalBtn = document.querySelector('[data-src="#send-comment"]'),
          exitReviewModalBtn = document.querySelectorAll('.modal__review-exit'),
          modalReviewContent = document.querySelector('.modal-review'),
          openProgramBtn = document.querySelectorAll('.tour-program__item-btn'),
          programContent = document.querySelectorAll('.tour-program__item-text'),
          openLevelBtn = document.querySelector('.level__wrapper-btn'),
          levelModal = document.querySelector('.modal-level'),
          closeLevelBtn = document.querySelector('.modal__level-btn');

    openReviewModalBtn.addEventListener('click', (e) => {
        e.preventDefault;
        modalReviewContent.classList.remove('hide');
        modalReviewContent.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    exitReviewModalBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault;
            modalReviewContent.classList.remove('show');
            modalReviewContent.classList.add('hide');
            document.body.style.overflow = 'auto';
        })
    })
    openLevelBtn.addEventListener('click', () => {
        levelModal.classList.remove('hide');
        levelModal.classList.add('show');
    })
    closeLevelBtn.addEventListener('click', () => {
        levelModal.classList.remove('show');
        levelModal.classList.add('hide');
    })
    function openProgramContent (i = 0) {
        openProgramBtn[i].classList.add('active');
        programContent[i].classList.add('active');
    }
    function closeProgramContent () {
        
        openProgramBtn.forEach((item => {
            item.classList.remove('active');
        }));
        programContent.forEach((item => {
            item.classList.remove('active')
        }))
    };
    openProgramBtn.forEach((item,i) => {
        item.addEventListener('click', () => {
            closeProgramContent()
            openProgramContent(i);
        })
    })
});